import { createContext, useState } from "react"
import type { Page } from "pdf2json"

type PDFFileData = {
  filepath: string,
  meta: object,
  pages: Array<Page>
}

type ApplicationContext = {
  isLoading: boolean
  fileData: PDFFileData | null
  currentPage: number

  setIsLoading: (value: boolean)=>void
  setCurrentPage: (value: number)=>void
  loadFile: (file: File)=>void
}

export const AppContext = createContext<ApplicationContext>({
  isLoading: false,
  currentPage: 0,
  setIsLoading: (_value:boolean)=>{},
  setCurrentPage: (_value:number)=>{},
  loadFile: (_file:File)=>{},
  fileData: null,
})

interface AppContextProviderProps {
  children: JSX.Element
}
export function AppContextProvider({ children }:AppContextProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [fileData, setFileData] = useState<PDFFileData | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(0)

  function loadFile(file:File) {
    try {
      setIsLoading(true)
      file.text().then((text)=>{
        const data = JSON.parse(text)
        if(data && data.filepath && data.meta && data.pages) {
          setFileData(data as PDFFileData)
          if(data.pages.length > 0) {
            setCurrentPage(1)
          }
        }
      })
    } catch (err) {
      console.error("Error loading file", err)
      setIsLoading(false)
    }
  }

  const val: ApplicationContext = {
    isLoading,
    currentPage,
    setIsLoading,
    setCurrentPage,
    loadFile,
    fileData,
  }
  return (
    <AppContext.Provider value={val}>
      {children}
    </AppContext.Provider>
  )
}