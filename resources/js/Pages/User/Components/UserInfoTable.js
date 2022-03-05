import { Link } from "@inertiajs/inertia-react";
import { FaPencilAlt } from "react-icons/fa";

export default function UserInfoTable({ userId, username, numberOfArticles }) {
    return (
        <div>
            <div className="flex">
                <Link href={route("user.show", userId)}>
                    <div>{username}</div>
                </Link>
                <Link className="flex-items-center px-2 ml-2 border rounded-lg hover:bg-blue-600 hover:text-white">
                    Theo dõi
                </Link>
            </div>
            <div className="flex items-center w-fit">
                <FaPencilAlt />{numberOfArticles}
            </div>
        </div>
    )
}