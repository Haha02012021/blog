import AuthorAvatar from "@/Pages/Article/Components/AuthorAvatar";
import ControllerBar from "@/Pages/Article/Components/ControllerBar";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import MDEditor, { link } from "@uiw/react-md-editor";
import EmojiPicker from "emoji-picker-react";
import { createContext, useContext, useState, useEffect } from "react";
import { BsChat } from "react-icons/bs";
import { HiOutlineChatAlt2, HiOutlineEmojiHappy } from "react-icons/hi";
import Button from "./Button";
import EditorProvider from "./Editor";
import CustomPagination from "./Pagination";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import axios from "axios";

const CommentContext = createContext()

function Comment({ commentsData, author, authorAvatar, articleId, children }) {
    const [comments, setComments] = useState({
        ...commentsData,
        links: commentsData.links.map(link => {
            return { ...link, url: link.url + "#comment" }
        })
    })
    const [showRep, setShowRep] = useState(0)
    const [showEdit, setShowEdit] = useState(false)

    return (
        <>
            <CommentContext.Provider
                value={{
                    comments,
                    setComments,
                    author,
                    authorAvatar,
                    articleId,
                    showRep,
                    setShowRep,
                    showEdit,
                    setShowEdit
                }}
            >
                { children }
            </CommentContext.Provider>
        </>
    )    
}

function CommentEditor({ showTitle = true, showCancel = false, className = "" }) {
    const [active, setActive] = useState([true, false])
    const [content, setContent] = useState("")
    const [showEmoji, setShowEmoji] = useState(false)
    const [currentPage, setCurrentPage] = useState("")

    const { setComments, author, authorAvatar, articleId, showRep, setShowRep } = useContext(CommentContext)

    const handleSubmitComment = (event) => {
        event.preventDefault()

        if (content) {
            setContent("")

            const data = {
                user_id: author.id,
                article_id: articleId,
                content,
                parent_id: showRep == 0 ? null : showRep
            }

            setShowRep(0)

            axios.post("/comments/store", data)
                .then(res => {
                    const resData = res.data
                    if (data.parent_id != null) {
                        axios.post("/comments/reply", { comment_id: data.parent_id, reply_id: resData.replyId, article_id: articleId })
                            .then(res => {
                                if (window.location.search.match(/\d+/g)) {
                                    const currentPage = window.location.href;
                                    setCurrentPage(currentPage)
                                }
                                setComments({
                                    ...res.data,
                                    links: res.data.links.map(link => {
                                        return { ...link, url: link.url + "#comment" }
                                    })
                                })
                                Inertia.get(currentPage + `#comment-${resData.replyId}`)
                            })
                            .catch(err => console.log(err))
                    } else (
                        setComments({
                            ...resData.comments,
                            links: resData.comments.links.map(link => {
                                return { ...link, url: link.url + "#comment" }
                            })
                        })
                    )
                })
                .catch(err => console.log(err))
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
            {showTitle && (
                <div className={`text-2xl font-bold w-4/5 mx-auto`}>
                    Bình luận
                </div>
            )}
            <div>
                <div className={`bg-white rounded-sm p-6 w-4/5 mx-auto  ${className}`}>
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
                                            <EditorProvider handleChange={newValue => handleChangeComment(newValue)}>
                                                <EditorProvider.Editor
                                                    value={content}
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
                                        {showCancel && (
                                            <button
                                                className="bg-transparent text-gray-600 hover:text-gray-900 transition ease-in-out duration-150 uppercase font-semibold text-xs cursor-pointer"
                                                onClick={() => setShowRep(0)}
                                                formMethod="head"
                                            >
                                                Hủy
                                            </button>
                                        )}
                                        <Button
                                            className={` absolute right-0 ${content ? "" : "opacity-50"}`}>{showCancel ? "Trả lời" : "Bình luận"}</Button> 
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
    const { comments, setComments, author, authorAvatar, articleId, showRep, setShowRep } = useContext(CommentContext)
    return (
        <>
            {comments.data && comments.data.map(comment => {
                return (
                    <Element
                        key={comment.id}
                        userId={userId}
                        comment={comment}
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

function Element({ userId, comment, className = "" }) {

    const { comments, setComments, showRep, setShowRep, showEdit, setShowEdit } = useContext(CommentContext)

    const handleReply = () => {
        console.log("cmts", comments)
        setShowRep(comment.id)
    }

    const handleEdit = () => {
        setShowEdit(true)
    }

    const handleDelete = () => {
        console.log("comments", comments);
        
        axios.delete(`/comments/destroy/${comment.id}`, { comment })
            .then(res => {
                setComments({
                    ...res.data,
                    links: res.data.links.map(link => {
                        return { ...link, url: link.url + "#comment" }
                    })
                });
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="pb-8">
            <div id={"comment-" + comment.id} className={`bg-white sm:rounded-sm p-4 ${className}`}>
            <AuthorAvatar
                userId={userId}
                authorId={comment.user_id}
                showUserInfoTable={false}
                className=" ml-0"
                classNameAvatar="w-[20px] h-[20px] text-[10px] mr-2"
            />
            <MDEditor.Markdown source={comment.content} />
            <div className="flex">
                {/*<VoteComment />*/}
                <div
                    className="text-gray-600 hover:text-gray-900 hover:underline cursor-pointer"
                    onClick={handleReply}
                >
                    Trả lời
                </div>
                {userId == comment.user_id && (
                    <>
                        <ControllerBar onClickEdit={handleEdit} onClick={handleDelete} type={"comments"} />
                    </>
                    
                )}
            </div>
                {comment.children && comment.children.map((chid => {
                    return (
                        <Element
                            userId={userId}
                            comment={chid}
                            showRep={showRep}
                            setShowRep={setShowRep}
                        />
                    )
                }))}
                {showRep == comment.id && (
                    <CommentEditor showCancel={true} showTitle={false} className="w-[100%]"/>
                )}
            </div>
        </div>
    )
}

function VoteComment() {
    return (
        <div className="flex items-center">
            <div>
                <FaAngleUp />
            </div>
            <div>

            </div>
            <div>
                <FaAngleDown />
            </div>
        </div>
    )
}

Comment.Editor = CommentEditor
Comment.Thread = Thread
Comment.Display = Display

export default Comment