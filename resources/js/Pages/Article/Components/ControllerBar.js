import Dropdown from "@/Components/Dropdown";
import { Inertia } from "@inertiajs/inertia";
import { FaPenSquare, FaTrashAlt } from "react-icons/fa";
import { GoKebabHorizontal } from "react-icons/go";

export default function ControllerBar({ type, articleId, onClick, onClickEdit = null, classNameTrigger = "" }) {
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
                <Dropdown.Link onClick={onClickEdit} href={!onClickEdit ? route(`${type}.edit`, articleId) : null} method="get" as="button">
                    <FaPenSquare />
                    <div className="ml-2">
                        Sửa
                    </div>
                </Dropdown.Link>
                <Dropdown.Link onClick={onClick} as="button" method="head">
                    <FaTrashAlt />
                    <div className="ml-2">
                        Xóa
                    </div>
                </Dropdown.Link>
            </Dropdown.Content>
        </Dropdown>
    )
}