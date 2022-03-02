export default function TitleArticle({ titleName, className }) {
    return (
        <h2 className={"font-bold text-2xl" + className}>
            { titleName }
        </h2>
    )
}