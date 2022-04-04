import React, { memo, useEffect, useState } from 'react';
import Time from '@/Components/Time';
import Comment from '@/Components/Comment';
import AuthorAvatar from '@/Pages/Article/Components/AuthorAvatar';
import Vote from '../../../Components/Vote';
import Bookmark from '../Components/Bookmark';
import Layout from '../Layouts/Layout';
import ControllerBar from '../Components/ControllerBar';
import Delete from '../Components/Delete';
import { Inertia } from "@inertiajs/inertia";
import MDEditor from '@uiw/react-md-editor';

function Show({ auth, errors, article, comments, tags, bookmarkedUsers, canControl }) {

    console.log(tags);

    const [time, setTime] = useState({})
    const [deleteSelect, setDeleteSelect] = useState(false)

    useEffect(() => {
        if (article) {
            const viCreatedTime = new Date(article.created_at)
            const viUpdatedTime = new Date(article.updated_at)
            setTime({
                created: viCreatedTime.toLocaleString('vi', { timeZone: 'Asia/Ho_Chi_Minh' }),
                updated: viUpdatedTime.toLocaleString('vi', { timeZone: 'Asia/Ho_Chi_Minh' }),
            })
        }
    }, [])

    const handleCancel = () => {
        setDeleteSelect(false)
    }

    const handleDelete = () => {
        Inertia.delete(`/articles/destroy/${article.id}`, {
            onSuccess: (page) => {
                console.log("Xóa bài viết thành công");
            }
        })
    }

    return (
        <>
            {article && deleteSelect && <Delete deleteSelect={deleteSelect} onCancel={handleCancel} onDelete={handleDelete} />}
            <Layout
                auth={auth}
                errors={errors}
                headTitle={article ? article.title : "Not Found"}
                showOptionsBar={false}
            >
                {article ? (
                    <>
                        <Comment
                            commentsData={comments}
                            author={auth.user ? auth.user : null}
                            authorAvatar={auth.avatar ? auth.avatar : null}
                            articleId={article.id} 
                        >

                            <div className="py-16 flex justify-center">
                                <Bookmark articleId={article.id}>
                                    <div>
                                        <div className={"w-fit pt-20 sticky top-0"}>
                                            <Vote typePost="articles" post={article} userId={auth.user ? auth.user.id : '0'} />
                                            <Bookmark.Button />
                                        </div>
                                    </div>
                                    <div className="w-4/5">
                                        <div className="flex justify-between">
                                            <AuthorAvatar
                                                className=" sm:px-6 lg:px-8"
                                                authorId={article.user_id}
                                                userId={auth.user ? auth.user.id : 0}
                                            />
                                            <div className="mr-6 relative">
                                                <Time
                                                    time={`Đã đăng vào ${time.created}`}
                                                />
                                                <div className="flex mr-0 absolute right-0 text-[20px] text-gray-400">
                                                    <Comment.Display />
                                                    <Bookmark.Display defaultBookmark={bookmarkedUsers.length} />
                                                </div>
                                            </div>
                                        </div>
                                            
                                        
                                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
                                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                                <div className="p-6 bg-white border-b border-gray-200">
                                                    <div className="flex items-end justify-between">
                                                        <h2 className="text-4xl font-extrabold mb-12">{article.title}</h2>
                                                        {canControl && <ControllerBar type="articles" articleId={article.id} onClick={() => setDeleteSelect(true)} />}
                                                    </div>
                                                    <MDEditor.Markdown source={article.content}/>
                                                    <Time
                                                        className="block text-right pt-4"
                                                        time={`Cập nhật lần cuối: ${time.updated}`}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex pt-2">
                                                {tags.map(tag => {
                                                    return (
                                                        <div
                                                            key={tag.name}
                                                            className="bg-white h-8 px-2 flex items-center justify-center rounded-md mr-2 shadow-inner border-gray-200 shadow-sm border-solid text-gray-600/50 hover:bg-gray-200/50 cursor-pointer"
                                                        >
                                                            {tag.name}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </Bookmark>
                            </div>

                            <Comment.Editor />
                            <Comment.Thread userId={auth.user ? auth.user.id : null} />
                        </Comment>
                    </>
                ) : (
                        <div
                            className="h-screen flex items-center justify-center text-3xl"
                        >
                            404 | Not Found
                        </div>
                )}
            </Layout>
        </>
    )
}

export default memo(Show)