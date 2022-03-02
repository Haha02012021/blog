import AuthorAvatar from "@/Pages/Article/Components/AuthorAvatar";
import Layout from "@/Pages/Article/Layouts/Layout";
import { Link } from "@inertiajs/inertia-react";
import OptionLink from "../Components/OptionLink";

export default function LayoutUser({ auth, errors, user, children }) {
    return (
        <Layout
            auth={auth}
            errors={errors}
            headTitle={user.name}
            showOptionsBar={false}
            header={
                <AuthorAvatar
                    userId={auth.user ? auth.user.id : 0}
                    authorId={user.id}
                    showUserInfoTable={false}
                    classNameAvatar="w-14 h-14 mr-4"
                    classNameUsername="text-2xl"
                />}    
        >
            <div className="text-gray-600 bg-white border-t-2 shadow-md">
                <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto flex">
                    <OptionLink href={route("user.show", user.id)} active={route().current("user.show")}>Bài viết</OptionLink>
                    <OptionLink href={route("user.show.bookmarks", user.id)} active={route().current("user.show.bookmarks")}>Bookmark</OptionLink>
                    <OptionLink>Liên hệ</OptionLink> 
                </div>
            </div>
            { children }
        </Layout>
    )
}