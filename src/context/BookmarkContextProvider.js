import { createContext, useState} from "react"

export const BookmarkContext = createContext()

export const BookContextProvider=({children})=>{
    const [bookmarkPost , setBookmarkpost] = useState([])
    const [bookmarkbutton , setbookmarkbutton] = useState(true)
    return(
        <BookmarkContext.Provider value={{bookmarkPost ,setBookmarkpost,bookmarkbutton , setbookmarkbutton}}>{children}</BookmarkContext.Provider>
    )
}