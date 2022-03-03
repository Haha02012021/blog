export default function Delete({ onCancel, onDelete, deleteSelect }) {
    return (
        <>
            <div className="bg-gray-600/50 absolute h-screen w-screen flex items-center justify-center">
                <div className="w-screen flex justify-center">
                    <div className="w-fit bg-white p-6 rounded-lg opacity-100 z-40" tabIndex={-1} onBlur={onCancel} autoFocus={true}>
                        <h2 className="font-extrabold">Xóa bài viết này</h2>
                        <div className="p-4">Bạn có muốn xóa bài viết này?</div>
                        <div className="text-right">
                            <Button value="Hủy bỏ" onClick={onCancel} />
                            <Button value="Đồng ý" onClick={onDelete} />
                        </div>
                    </div>
                </div>
            </div>
            {deleteSelect && <div className="fixed inset-0 z-20" onClick={onCancel}></div>}
        </>
    )
}

function Button({ onClick, value }) {
    return (
        <button
            className="p-1 rounded-lg border-2 border-black mx-1 hover:bg-black hover:text-white"
            onClick={onClick}
        >
            {value}
        </button>
    )
}