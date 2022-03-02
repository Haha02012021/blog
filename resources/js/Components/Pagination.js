import { Inertia } from "@inertiajs/inertia";
import { Pagination } from "react-headless-pagination";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

export default function CustomPagination({ data }) {
    const handlePageClick = (selected) => {
        Inertia.get(data.links[selected + 1].url, {
            onSuccess: (page) => {
                console.log("Chuyển trang thành công!");
            }
        })
    }

    return (
        <div className="pb-10">
            <Pagination
                currentPage={data.current_page - 1}
                setCurrentPage={(selected) => handlePageClick(selected)}
                totalPages={data.links.length - 2}
                edgePageCount={2}
                middlePagesSiblingCount={2}
                className="flex w-fit mx-auto"
                truncableText="..."
                truncableClassName=""
            >
                <Pagination.PrevButton className="rounded-lg cursor-pointer m-2 w-10 h-10 bg-white border flex justify-center items-center">
                    <BsChevronCompactLeft className="" />
                </Pagination.PrevButton>

                <div className="flex items-center justify-center flex-grow">
                    <Pagination.PageButton
                        activeClassName="text-white bg-blue-600"
                        inactiveClassName=""
                        className="rounded-lg cursor-pointer m-2 w-10 h-10 bg-white border flex justify-center items-center hover:outline hover:outline-4 hover:outline-blue-500/50"
                    />
                </div>

                <Pagination.NextButton className="rounded-lg cursor-pointer m-2 w-10 h-10 bg-white border flex justify-center items-center">
                    <BsChevronCompactRight />
                </Pagination.NextButton>
            </Pagination>
        </div>
    )
}