import React, { memo, useRef } from "react";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Authenticated from "@/Layouts/Authenticated"
import { useForm, Head } from "@inertiajs/inertia-react";
import EditorProvider from "@/Components/Editor";
import { FaTimes } from "react-icons/fa";

function Add(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: props.auth.user.id,
        title: props.article ? props.article.title : "",
        content: props.article ? props.article.content : "",
        tags: props.tags ? props.tags : []
    });

    const inputTagRef = useRef()

    const handleChangeTitle = (event) => {
        setData('title', event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && event.target.value.match(/\w+/g)) {
            if (data.tags.length < 5) {
                const newTag = event.target.value.replace("/\s+/g", "")
                if (!data.tags.includes(newTag)) setData('tags', data.tags.concat([newTag]))
            }
            inputTagRef.current.value = ""
        }
    }

    const handleChangeEditor = (newValue) => {
        console.log(newValue);
        setData('content', newValue)
    }

    const handleEraseTag = (index) => {
        delete data.tags[index]
        setData("tags", data.tags)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (data.tags.length > 0) {
            if (props.article) {
                post(route("articles.update", props.article.id))
            } else {
                post(route("articles.store"))
            }
        } else {
            alert("Bạn cần có ít nhất 1 tag!")
        }
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Bài viết mới" />
            <form
                onSubmit={handleSubmit}
                className="mx-24 h-fit pt-4"
            >
                <div className="pt-4">
                    <Label
                        forInput="title"
                        value="Tiêu đề"
                    />
                    <Input
                        type="text"
                        name="title"
                        value={data.title}
                        className="mt-1 block w-full"
                        autoComplete="title"
                        isFocused={true}
                        handleChange={handleChangeTitle}
                        required
                    />
                </div>

                <div className="pt-4">
                    <Label
                        forInput="tags"
                        value="Tags"
                    />
                    <div className="flex bg-white py-2 rounded-md border-gray-300 shadow-sm h-[42px]">
                        {data.tags.map((tag, index) => {
                            return (
                                <div key={tag} className="flex flex-none p-1 bg-gray-300/50 text-gray-400 border-gray-400 rounded-md ml-2 items-center shadow-inner">
                                    <p>{tag}</p>
                                    <div onClick={() => handleEraseTag(index)}>
                                        <FaTimes />
                                    </div>
                                </div>
                            )
                        })}
                        <input
                            ref={inputTagRef}
                            onKeyDown={handleKeyDown}
                            className="border-none outline-none ml-2 mr-2 w-full"
                            placeholder="Ít nhất 1 thẻ. Tối đa 5 thẻ."
                        />
                    </div>
                </div>
                
                <div className="pt-4 rounded">
                    <Label
                        value="Nội dung"
                    />
                    <EditorProvider handleChange={(newValue) => handleChangeEditor(newValue)}
>
                        <EditorProvider.Editor
                            value={data.content}
                            height={520}
                            authorId={props.auth.user.id}
                        />
                    </EditorProvider>
                </div>

                <div className="pt-4 pb-16">
                    <Button className="right-24 absolute" processing={processing}>
                        {props.article ? "Lưu bài" : "Đăng bài"}
                    </Button>
                </div>
            </form>
        </Authenticated>
    )

}

export default memo(Add)