import { useContext, useRef } from "react"
import { AppContext } from "../../ctx/AppContext"

export default function canvas() {
  const appContext = useContext(AppContext)
  console.log('draw: ', appContext.fileData)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)

  function draw() {
    if(canvasRef.current) {
      const cvs = canvasRef.current
      const ctx = cvs.getContext("2d")
    }


  }
  
  return (
    <canvas width={500} height={300} ref={canvasRef}></canvas>
  )
}