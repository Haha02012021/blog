import React from "react";
import OptionLink from "@/Components/OptionLink";
import { Link, Head } from "@inertiajs/inertia-react";
import { memo } from "react";
import { FaPen } from "react-icons/fa";
import Authenticated from "@/Layouts/Authenticated";

function AuthenticatedArticle({ auth, errors, header, headTitle, showOptionsBar = true, children }) {

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{header}</h2>}
        >
            <Head title={headTitle} />

            {showOptionsBar && <div className="py-4 bg-black">
                <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
                    <div className="flex justify-between text-white font-semibold h-10">
                        <nav className="relative flex h-fit">
                            <OptionLink href={route("articles.index")} active={route().current("articles.index")}>
                                MỚI NHẤT
                            </OptionLink>
                            <OptionLink href={route("bookmark.index")} active={route().current("bookmark.index")}>
                                BOOKMARK CỦA TÔI
                            </OptionLink>
                        </nav>
                        <Link href={route("articles.create")} className="flex items-center border-white border-2 rounded-lg from-current p-2 rounded-lg uppercase font-extrabold">
                            <FaPen />
                            VIẾT BÀI
                        </Link>
                    </div>
                </div>
            </div>}

            {children}
        </Authenticated>
    )
}

export default memo(AuthenticatedArticle)