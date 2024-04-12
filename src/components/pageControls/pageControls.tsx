import { useContext } from "react"
import { AppContext } from "../../ctx/AppContext"

export default function PageControls() {
  const appContext = useContext(AppContext)

  function setCurrentPage(num:number) {
    if(num > 0) {
      if(appContext.fileData && num <= appContext.fileData.pages.length) {
        appContext.setCurrentPage(num)
      }
    }
  }
  return (
    <div>
      <button onClick={()=>{setCurrentPage(appContext.currentPage - 1)}}>{'<'}</button>
      <span>{appContext.currentPage}</span>
      <button onClick={()=>{setCurrentPage(appContext.currentPage + 1)}}>{'>'}</button>
    </div>
  )
}