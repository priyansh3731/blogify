import { createContext, useState} from "react"

export const BookmarkContext = createContext()

export const BookContextProvider=({children})=>{
    const [bookmarkPost , setBookmarkpost] = useState([])
    return(
        <BookmarkContext.Provider value={{bookmarkPost ,setBookmarkpost}}>{children}</BookmarkContext.Provider>
    )
}