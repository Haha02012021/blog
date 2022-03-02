export default function Note({ note }) {
    return (
        <div className="relative bg-black text-white rounded p-1 w-fit before:content-[''] before:absolute before:-l-4 before:b-6 before:border-solid before:border-y-transparent before:border-t-transparent before:border-b-black">
            { note }
        </div>
    )
}