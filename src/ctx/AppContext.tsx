import { createContext, useState } from "react"

type ApplicationContext = {
  isLoading: boolean
  fileData: any

  setIsLoading: (value: boolean)=>void
  loadFile: (file: File)=>void
}

export const AppContext = createContext<ApplicationContext>({
  isLoading: false,
  setIsLoading: (_value:boolean)=>{},
  loadFile: (_file:File)=>{},
  fileData: {},
})

interface AppContextProviderProps {
  children: JSX.Element
}
export function AppContextProvider({ children }:AppContextProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [fileData, setFileData] = useState()

  function loadFile(file:File) {
    try {
      setIsLoading(true)
      file.text().then((text)=>{
        const data = JSON.parse(text)
        if(data) {
          setFileData(data)
        }
      })
    } catch (err) {
      console.error("Error loading file", err)
      setIsLoading(false)
    }
  }

  const val: ApplicationContext = {
    isLoading,
    setIsLoading,
    loadFile,
    fileData,
  }
  return (
    <AppContext.Provider value={val}>
      {children}
    </AppContext.Provider>
  )
}