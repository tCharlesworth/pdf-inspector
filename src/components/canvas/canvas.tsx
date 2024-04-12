import { useContext, useEffect, useRef } from "react"
import { AppContext } from "../../ctx/AppContext"
import "./canvas.css"

const WIDTH = 500, HEIGHT = 300

export default function canvas() {
  const appContext = useContext(AppContext)
  console.log('draw: ', appContext.fileData)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)

  function draw() {
    if(canvasRef.current && appContext.fileData) {
      const cvs = canvasRef.current
      const ctx = cvs.getContext("2d")

      if(ctx) {
        const pdfWidth = appContext.fileData.meta
        // Outline
        ctx.strokeStyle = "red"
        ctx.fillStyle = "white"
        ctx.fillRect(0,0,WIDTH-1,HEIGHT)

        // 
      }
    }

    function drawHLine() {

    }

    function drawLine(ctx:CanvasRenderingContext2D, x: number, y: number, length: number) {
      ctx.beginPath()
      ctx.moveTo(x,y)
      ctx.lineTo(x+length, y)
      ctx.closePath()
    }


  }

  useEffect(()=>{
    draw()
  },[])
  
  return (
    <canvas width={WIDTH} height={HEIGHT} ref={canvasRef}></canvas>
  )
}