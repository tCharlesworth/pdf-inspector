
import { useContext } from "react"

import Menu from "./components/menu/menu"
import Canvas from "./components/canvas/canvas"
import PageControls from "./components/pageControls/pageControls"

import { AppContext } from "./ctx/AppContext"

function App() {
  const appContext = useContext(AppContext)

  return (
    <>
      <header>
        <Menu />
      </header>
      <main>
        {appContext.fileData ? (
          <>
            <PageControls />
            <Canvas />
          </>
        ) : (
          <p>Select a file to open</p>
        )}
        </main>
    </>
  )
}

export default App
