import { useContext, useEffect, useRef } from "react"
import { AppContext } from "../../ctx/AppContext"
import type { Line } from "pdf2json"
import "./canvas.css"
import { PDFColorToHex } from "../../utils/pdfColors"

type Vector = {
  x: number,
  y: number
}
type JSONLine = Line & {
  l: number
}

const WIDTH = 1200, HEIGHT = 920

export default function canvas() {
  const appContext = useContext(AppContext)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pageData = appContext.fileData?.pages[appContext.currentPage-1]
  console.log('draw: ', Date.now())

  function draw() {
    if(canvasRef.current && pageData) {
      const cvs = canvasRef.current
      const ctx = cvs.getContext("2d")


      if(ctx) {
        ctx.clearRect(0,0,WIDTH,HEIGHT)
        // Outline
        ctx.strokeStyle = "red"
        ctx.fillStyle = "white"
        ctx.fillRect(0,0,WIDTH-1,HEIGHT)

        // H Lines
        pageData.HLines.forEach((l)=>{
          const line = l as JSONLine
          drawLine(ctx, calcVector(line.x, line.y), calcVector(line.x+line.l, line.y), line.w, line.oc || PDFColorToHex(line.clr || 0))
        })
        // V Lines
        pageData.VLines.forEach((l)=>{
          const line = l as JSONLine
          drawLine(ctx, calcVector(line.x,line.y), calcVector(line.x, line.y+line.l), line.w, line.oc || PDFColorToHex(line.clr || 0))
        })
      }
    }

    function calcVector(x: number, y: number):Vector {
      if(pageData) {
        return {
          x: (x/pageData.Width) * WIDTH,
          y: (y/pageData.Height) * HEIGHT
        }
      }
      return { x, y }
    }

    function drawLine(ctx:CanvasRenderingContext2D, start: Vector, end: Vector, strokeWidth: number = 1, strokeColor: string = "black") {
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = strokeWidth
      ctx.stroke
      ctx.beginPath()
      ctx.moveTo(start.x, start.y)
      ctx.lineTo(end.x, end.y)
      ctx.closePath()
      ctx.stroke()
    }


  }

  useEffect(()=>{
    draw()
  },[])
  
  return (
    <canvas width={WIDTH} height={HEIGHT} ref={canvasRef}></canvas>
  )
}