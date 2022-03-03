import React, { memo } from "react";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Authenticated from "@/Layouts/Authenticated"
import Editor from "@/Components/Editor";
import { configEditorArticle } from "../../../../constant/editor";
import { useForm, Head } from "@inertiajs/inertia-react";
import EditorProvider from "@/Components/Editor";

function Add(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: props.auth.user.id,
        title: props.article ? props.article.title : "",
        content: props.article ? props.article.content : "",
    });

    const handleChangeTitle = (event) => {
        setData('title', event.target.value)
    }

    const handleChangeEditor = (newValue) => {
        console.log(newValue);
        setData('content', newValue)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        
        if (props.article) {
            post(route("articles.update", props.article.id))
        } else {
            post(route("articles.store"))
        }
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Bài viết mới" />
            <form onSubmit={handleSubmit} className="mx-24 h-fit pt-4">
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
                            imagesLib={props.imagesLib}
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