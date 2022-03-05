import Dropdown from "@/Components/Dropdown";
import { Inertia } from "@inertiajs/inertia";
import { FaPenSquare, FaTrashAlt } from "react-icons/fa";
import { GoKebabHorizontal } from "react-icons/go";

export default function ControllerBar({ type, articleId, onClick, classNameTrigger = "" }) {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <div className={`text-2xl ${classNameTrigger}`}>
                    <GoKebabHorizontal
                        color="transparent"
                        stroke="gray"
                        strokeWidth={1}
                    />
                </div>
            </Dropdown.Trigger>

            <Dropdown.Content width="w-40" className=" z-1">
                <Dropdown.Link href={route(`${type}.edit`, articleId)} method="get" as="button">
                    <FaPenSquare />
                    <div className="ml-2">
                        Sửa bài viết
                    </div>
                </Dropdown.Link>
                <Dropdown.Link onClick={onClick} as="button" method="head">
                    <FaTrashAlt />
                    <div className="ml-2">
                        Xóa bài viết
                    </div>
                </Dropdown.Link>
            </Dropdown.Content>
        </Dropdown>
    )
}