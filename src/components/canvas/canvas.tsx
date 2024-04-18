import { useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "../../ctx/AppContext"
import { PDFColorToHex } from "../../utils/pdfColors"
import {  GetFontFromCode, GetStyleRecord, StyleRecord } from "../../utils/pdfStyles"
import type { Line } from "pdf2json"
import "./canvas.css"

type Point = {
  x: number,
  y: number
}
type JSONLine = Line & {
  l: number
}

const PDFPOINTS = 72

export default function canvas() {
  const appContext = useContext(AppContext)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasSize, setCanvasSize] = useState<Point>({x: 500, y: 300})
  const [dpr, setDpr] = useState<number>(1)
  const [clickSpots, setClickSpots] = useState<Array<Point>>([])

  function draw() {
    const pageData = appContext.fileData?.pages[appContext.currentPage-1]
    console.log('draw: ', Date.now())
    console.log('cvs: ', canvasSize)
    if(canvasRef.current && pageData) {
      const cvs = canvasRef.current
      const ctx = cvs.getContext("2d")


      if(ctx) {
        ctx.clearRect(0,0,canvasSize.x,canvasSize.y)
        // Outline
        ctx.strokeStyle = "red"
        ctx.fillStyle = "white"
        ctx.fillRect(0,0,canvasSize.x-1,canvasSize.y)

        // H Lines
        pageData.HLines.forEach((l)=>{
          const line = l as JSONLine
          drawLine(ctx, calcPoint(line.x, line.y), calcPoint(line.x+line.l, line.y), line.w, line.oc || PDFColorToHex(line.clr || 0))
        })
        // V Lines
        pageData.VLines.forEach((l)=>{
          const line = l as JSONLine
          drawLine(ctx, calcPoint(line.x,line.y), calcPoint(line.x, line.y+line.l), line.w, line.oc || PDFColorToHex(line.clr || 0))
        })
        // Text
        pageData.Texts.forEach((t)=>{
          const pos = calcPoint(t.x, t.y)
          t.R.forEach((r)=>{
            let styleArray: StyleRecord = r.TS
            if(r.S !== -1) {
              styleArray = GetStyleRecord(r.S)
            }
            const fontFamily = GetFontFromCode(styleArray[0]) 
            const fontSize = Math.floor(styleArray[1] * dpr)

            ctx.font = `${Math.floor(fontSize * dpr)}px ${fontFamily}`
            ctx.strokeStyle = t.oc || PDFColorToHex(t.clr || 0)
            // ctx.strokeText(decodeURIComponent(r.T), pos.x, pos.y+(fontSize*2))
            ctx.strokeText(decodeURIComponent(r.T), pos.x, pos.y+fontSize)
          })
        })
        // Click Spot
        clickSpots.forEach((spot)=>{
          drawCircle(ctx, spot, 40, "red", "red")
        })
      }
    }
  }

  
  function calcPoint(x: number, y: number):Point {
    return { 
      x: x * PDFPOINTS * dpr, 
      y: y * PDFPOINTS * dpr
    }
  }

  function drawLine(ctx:CanvasRenderingContext2D, start: Point, end: Point, strokeWidth: number = 1, strokeColor: string = "black") {
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = strokeWidth * dpr
    ctx.stroke
    ctx.beginPath()
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.closePath()
    ctx.stroke()
  }

  function drawCircle(ctx:CanvasRenderingContext2D, spot: Point, size: number, strokeColor: string = "red", fillColor: string = "transparent") {
    ctx.strokeStyle = strokeColor
    ctx.fillStyle = fillColor
    ctx.moveTo(spot.x, spot.y)
    ctx.beginPath()
    ctx.arc(spot.x, spot.y, size, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.stroke()
  }

  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    if(canvasRef.current) {
      const rect = canvasRef.current?.getBoundingClientRect()
      const spot: Point = {
        x: ((e.clientX - rect.left) / rect.width) * canvasSize.x,
        y: ((e.clientY - rect.top) / rect.height) * canvasSize.y
      }
      setClickSpots([...clickSpots, spot])
    }

  }

  useEffect(()=>{
    draw()
  },[appContext.currentPage, canvasSize, clickSpots])

  useEffect(()=>{
    // Calculate DPR and canvas size
    if(appContext && appContext.currentPage && appContext.fileData) {
      const pageData = appContext.fileData?.pages[appContext.currentPage-1]
      const w = pageData.Width * PDFPOINTS,
            h = pageData.Height * PDFPOINTS
      if(canvasSize.x !== w || canvasSize.y !== h) {
        console.log("set canvas size")
        // console.log("dpr", window.devicePixelRatio)
        const pixelRatio = window.devicePixelRatio || 1
        setDpr(pixelRatio)
        setCanvasSize({x: w * pixelRatio, y: h * pixelRatio})
      }
    }
  },[appContext.fileData, appContext.currentPage])

  
  return (
    <canvas width={canvasSize.x} height={canvasSize.y} ref={canvasRef} onClick={handleClick}></canvas>
  )
}