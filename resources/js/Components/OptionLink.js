import { Link } from "@inertiajs/inertia-react";
import "../../css/optionlink.css"

export default function OptionLink({ href, active, children }) {
    return (
        <div className="optionitem">
            <Link 
                href={href}
                className={`optionlink ${active ? "active" : "nonactive"}`}
            >
                <div>
                {children} 
                </div>
            </Link>
        </div>

    )
}