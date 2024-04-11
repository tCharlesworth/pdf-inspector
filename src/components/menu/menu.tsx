import { useContext } from "react"
import { AppContext } from "../../ctx/AppContext"
import "./menu.css"

export default function menu() {
  const appContext = useContext(AppContext)

  function showFileDialog() {
    const input = document.createElement("input")
    input.type = "file"
    input.accept=".json"
    input.onchange = handleFileSelected
    input.click()
  }

  function handleFileSelected(e:Event) {
    if(e.target) {
      const target = e.target as HTMLInputElement
      if(target.files && target.files.length === 1) {
        appContext.loadFile(target.files[0])
      }
    }
  }

  return (
    <nav>
      <ul>
        <li><button disabled={appContext.isLoading} onClick={showFileDialog}>Open a file</button></li>
      </ul>
    </nav>
  )
}