import CustomPagination from "@/Components/Pagination";
import { Link } from "@inertiajs/inertia-react";
import AuthorAvatar from "../Components/AuthorAvatar";
import TitleArticle from "../Components/TitleArtilce";
import Authenticated from "../Layouts/Authenticated";

export default function Bookmarks({ auth, errors, bookmarks }) {

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            headTitle="Bookmarks của tôi"
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {bookmarks.data.map(bookmark => {
                            return (
                                <div key={bookmark.id} className="p-6 bg-white border-b border-gray-200">
                                    <AuthorAvatar
                                        userId={auth.user ? auth.user.id : 0}
                                        authorId={bookmark.user_id}
                                        className=" ml-0"
                                        showUserInfoTable={false}
                                    />
                                    <Link href={route("articles.show", bookmark.id)}>
                                        <TitleArticle titleName={bookmark.title} className=" ml-10 -mt-5 absolute"/>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <CustomPagination data={bookmarks} />
         </Authenticated>
    )
}

