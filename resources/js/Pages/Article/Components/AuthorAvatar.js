import UserInfoTable from "@/Pages/User/Components/UserInfoTable"
import { Link } from "@inertiajs/inertia-react"
import axios from "axios"
import { useEffect, useState } from "react"
import { FaUser } from "react-icons/fa"

export default function AuthorAvatar({ userId, authorId, className = " ", classNameAvatar = "", classNameUsername = "", showUserInfoTable = true }) {
    const [informationAuthor, setInformationAuthor] = useState({user: {}, articles: [], avatar: ''})
    
    useEffect(() => {
        axios.get(`/user/api/${authorId}`)
            .then(res => {
                const data = res.data
                const { user, articles, avatar } = data
                setInformationAuthor({ user, articles, avatar })
            })
            .catch(err => {
                console.log(err)
            })
        return () => {
            setInformationAuthor({})
        }
    }, [])

    return (
        <div>
            <div className={`flex ${className} items-start`}>
                <Link href={route("user.show", authorId)}>
                    <div
                        className={`w-10 h-10 rounded-full bg-gray-300 ${classNameAvatar}`}
                    >
                        {informationAuthor.avatar ? (
                            <img className="flex items-center h-[100%] mx-auto rounded-full" src={informationAuthor.avatar} alt="avt" />
                        ) : (
                            <FaUser className="flex items-center h-[100%] mx-auto" />
                        )}
                    </div>
                </Link>
                {showUserInfoTable ?
                    <UserInfoTable
                        username={informationAuthor.user.name}
                        userId={authorId}
                        numberOfArticles={informationAuthor.articles.length}
                    /> :
                    <div>
                        <div className="flex">
                            <Link href={route("user.show", authorId)}>
                                <div className={classNameUsername}>{informationAuthor.user.name}</div>
                            </Link>
                            {userId == authorId ? (
                                <Link
                                    href={route("edit")}
                                    className="flex items-center px-2 ml-2 border rounded-lg hover:bg-blue-600 hover:text-white"
                                >
                                    Sửa
                                </Link>
                            ) : (
                                    <Link className="flex-items-center px-2 ml-2 border rounded-lg hover:bg-blue-600 hover:text-white">
                                        Theo dõi
                                    </Link>
                            )}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}