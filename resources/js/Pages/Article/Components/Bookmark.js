import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";

const BookmarkContext = createContext()

function Bookmark({ articleId, children }) {
    const [iconColor, setIconColor] = useState("gray")
    const [bookmarkDefault, setBookmarkDefault] = useState(false)

    useEffect(() => {
        axios.get(`/bookmark/show/${articleId}`)
            .then(res => {
                if (res.data.length != 0) {
                    setBookmarkDefault(true)
                    setIconColor("white")
                }
            })
            .catch(err => console.log(err))
        
        return () => {
            setIconColor()
        }
    }, [])

    return (
        <BookmarkContext.Provider value={{ iconColor, setIconColor, bookmarkDefault, articleId }}>
            { children }
        </BookmarkContext.Provider>
    )
}

function Button() {
    const [showNote, setShowNote] = useState(false)
    const { iconColor, setIconColor, articleId } = useContext(BookmarkContext)

    const handleBookmark = () => {
        if (iconColor == "white") {  
            setIconColor("gray")
            axios.post(`/bookmark/destroy/${articleId}`, { article_id: articleId })
                .then(() => console.log("Bỏ bookmark thành công"))
                .catch(err => console.log(err))
        } else {
            setIconColor("white")
            axios.post('/bookmark', { article_id: articleId })
                .then((res) => {
                    if (res.data == "ok") console.log("Bookmark thành công")
                    else Inertia.get(res.data)
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div>
            <div
                className={`flex items-center justify-center h-8 w-8 mt-4 border rounded-full border-black cursor-pointer`}
                style={{backgroundColor: iconColor == "white" ? "black" : "transparent"}}
                onClick={handleBookmark}
            >
                <FaBookmark
                    value={iconColor == "white" ?
                        "Bỏ bookmark bài viết này!" :
                        "Bookmark bài viết này!"}
                    className={`text-${iconColor == "white" ? iconColor : "gray-400 hover:text-black"}`}
                />  
            </div>
        </div>
    )
}

function Display({ defaultBookmark }) {
    const { iconColor, bookmarkDefault } = useContext(BookmarkContext)
    const [bookmark, setBookmark] = useState(0)

    useEffect(() => {
        if (bookmarkDefault) {
            if (iconColor == "white") setBookmark(0)
            else setBookmark(-1)
        } else {
            if (iconColor == "white") setBookmark(1)
            else setBookmark(0)
        }
    }, [iconColor])

    return (
        <button className="flex items-center">
            <div className="mr-1">
                <FaBookmark />
            </div>
            
            {defaultBookmark + bookmark}
        </button>
    )
}

Bookmark.Button = Button
Bookmark.Display = Display

export default Bookmark