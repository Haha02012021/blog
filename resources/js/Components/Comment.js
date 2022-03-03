import AuthorAvatar from "@/Pages/Article/Components/AuthorAvatar";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import MDEditor, { link } from "@uiw/react-md-editor";
import EmojiPicker from "emoji-picker-react";
import { createContext, useContext, useState } from "react";
import { BsChat } from "react-icons/bs";
import { HiOutlineChatAlt2, HiOutlineEmojiHappy } from "react-icons/hi";
import Button from "./Button";
import EditorProvider from "./Editor";
import CustomPagination from "./Pagination";

const CommentContext = createContext()

function Comment({ commentsData, children }) {
    const [comments, setComments] = useState({
        ...commentsData,
        links: commentsData.links.map(link => {
            return { ...link, url: link.url + "#comment" }
        })
    })

    return (
        <CommentContext.Provider value={{ comments, setComments }}>
            { children }
        </CommentContext.Provider>
    )    
}

function CommentEditor({ author, authorAvatar, articleId }) {
    const [active, setActive] = useState([true, false])
    const [content, setContent] = useState("")
    const [showEmoji, setShowEmoji] = useState(false)

    const { comments, setComments } = useContext(CommentContext)

    const handleSubmitComment = (event) => {
        event.preventDefault()

        if (content) {
            setContent("")

            const data = {
                user_id: author.id,
                article_id: articleId,
                content
            }

            setComments({ ...comments, data: [{ id: comments.total + 1, ...data }, ...comments.data]})
            
            axios.post("/comments/store", data)
                .then(res => console.log("Comment thành công"))
                .catch(err => console.log(err))
            
            if (window.location.search.match(/\d+/g)[0] > 1) Inertia.get(comments.first_page_url + "#comment")
        }
        
    }

    const handleChangeComment = (newValue) => {
        setContent(newValue)
    }

    const handleEdit = () => {
        setActive([true, false])
    }

    const handlePreview = () => {
        setActive([false, true])
    }

    const handleEmojiIcon = () => {
        setShowEmoji(!showEmoji)
    }

    const handleEmojiClick = (event, emojiObject) => {
        setContent(content + emojiObject.emoji)
    }

    return (
        <div id="comment" className="pb-8">
            <div className="text-2xl font-bold w-4/5 mx-auto">
                Bình luận
            </div>
            <div>
                <div className="bg-white rounded-sm p-6 w-4/5 mx-auto">
                    {author ? (
                        <>
                            <div className="w-full border-b-1 border-b-2 border-gray-200 mb-2">
                        <div className="flex">
                            <div
                                onClick={handleEdit}
                                className={`p-4 text-gray-400 cursor-pointer ${active[0] ?
                                    " text-black border-b-2 border-indigo-500" : ""}`}
                            >
                                Viết
                            </div>
                            <div
                                onClick={handlePreview}
                                className={`p-4 text-gray-400 cursor-pointer ${active[1] ?
                                    " text-black border-b-2 border-indigo-500" : ""}`}
                            >
                                Xem trước
                            </div>
                        </div>
                            </div>
                            <div className="flex">
                                <div className="w-[40px] h-[40px] rounded-full bg-gray-600 mr-2">
                                    {authorAvatar ? (
                                        <img src={authorAvatar} className="rounded-full" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-[20px]">
                                            { author.name.substring(0, 1) }
                                        </div>
                                    )}
                                </div>
                                <form 
                                    className="w-full"
                                    onSubmit={handleSubmitComment}
                                >
                                    {active[0] ? (
                                        <div className="relative">
                                            <EditorProvider>
                                                <EditorProvider.Editor
                                                    value={content}
                                                    handleChange={newValue => handleChangeComment(newValue)}
                                                    hideToolbar={true}
                                                    //height={160}
                                                />
                                            </EditorProvider>
                                            
                                            <div className="absolute top-[64px] right-0 text-2xl">
                                                <div
                                                    className="flex justify-end cursor-pointer"
                                                    onClick={handleEmojiIcon}
                                                >
                                                    <HiOutlineEmojiHappy color="gray" className="mr-2" />
                                                </div>
                                                {showEmoji && (
                                                    <EmojiPicker 
                                                        onEmojiClick={handleEmojiClick}
                                                        native
                                                        pickerStyle={{zIndex: 4}}
                                                    />
                                                )}
                                                {showEmoji && <div className="fixed inset-0 z-2" onClick={() => setShowEmoji(false)}></div>}

                                            </div>
                                            
                                        </div>
                                    ) : (
                                            <div className="h-40 rounded border">
                                                <MDEditor.Markdown
                                                    source={content}
                                                    className="px-[10px] m-0"
                                                />
                                            </div>
                                    )}
                                    <div className="relative p-6">
                                        <Button className={` absolute right-0 ${content ? "" : "opacity-50"}`}>Bình luận</Button> 
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                            <Link href={route("login")} className="flex justify-center items-center text-gray-600">
                                <BsChat className="mr-2" /> Đăng nhập để bình luận
                            </Link>
                    )}
                </div>
            </div>    
        </div>
    )
}

function Thread({ userId }) {
    const { comments } = useContext(CommentContext)
    return (
        <>
            {comments.data.map(comment => {
                return (
                    <Element
                        key={comment.id}
                        userId={userId}
                        authorId={comment.user_id}
                        contentComment={comment.content}
                        className="w-4/5 mx-auto"
                    />
                )
            })}

            <CustomPagination data={comments} />
        </>
    )
}

function Display() {
    const { comments } = useContext(CommentContext)

    return (
        <a href="#comment" className="flex items-center mr-4">
            <div className="mr-1">
            <HiOutlineChatAlt2 /> 
            </div>
            
            {comments.total}
        </a>
    )
}

function Element({ userId, authorId, contentComment, className = "" }) {
    return (
        <div className="pb-8">
            <div className={`bg-white sm:rounded-sm p-4 ${className}`}>
                <AuthorAvatar
                    userId={userId}
                    authorId={authorId}
                    showUserInfoTable={false}
                    className=" ml-0"
                    classNameAvatar="w-[20px] h-[20px] text-[10px] mr-2"
                />
                <MDEditor.Markdown source={contentComment} />
            </div>
        </div>
    )
}

Comment.Editor = CommentEditor
Comment.Thread = Thread
Comment.Display = Display

export default Comment