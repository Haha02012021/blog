import { Link } from "@inertiajs/inertia-react";
import { FaPencilAlt } from "react-icons/fa";

export default function UserInfoTable({ userId, username, numberOfArticles }) {
    return (
        <div>
            <Link href={route("user.show", userId)}>
                <div>{username}</div>
            </Link>
            <div className="flex items-center w-fit">
                <FaPencilAlt />{numberOfArticles}
            </div>
        </div>
    )
}