import { Link } from "@inertiajs/inertia-react";

export default function OptionLink({ href, children, active }) {
    return (
        <div
            className={`p-4 ${active ?
                "border-b-2 border-indigo-600 text-indigo-600" :
                "hover:text-black"}`}
        >
            <Link
                href={href}
            >
                {children}
            </Link>
        </div>
    )
}