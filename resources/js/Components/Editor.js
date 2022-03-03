import "../../css/editor.css"
import MDEditor, { commands, image } from "@uiw/react-md-editor";
import { AiOutlineFileImage } from "react-icons/ai";
import { Children, createContext, useContext, useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Button from "./Button";
import axios from "axios";
import Dropzone from "react-dropzone";

const EditorContext = createContext()

function EditorProvider({ children, handleChange }) {
    const [showUploadImg, setShowUploadImg] = useState(false)
    const [valueEditor, setValueEditor] = useState("")

    return (
        <EditorContext.Provider value={{ showUploadImg, setShowUploadImg, valueEditor, setValueEditor, handleChange }}>
            { children }
        </EditorContext.Provider>
    )
}

function Editor({
    value,
    height = 200,
    toolbarHeight = 40,
    hideToolbar = false,
    placeholder = "Nhập nội dung vào đây",
    authorId,
    imagesLib
}) {
    const { showUploadImg, setShowUploadImg, handleChange } = useContext(EditorContext)

    return (
        <>
            {showUploadImg && <>
                <UploadImg authorId={authorId} imagesLib={imagesLib} />
                <div className="fixed inset-0 z-20" onClick={() => setShowUploadImg(false)}></div>
            </>}
            <div className="w-[100%] text-1xl">
                <MDEditor
                    value={value}
                    onChange={(value = "") => handleChange(value)}
                    placeholder={placeholder}
                    height={height}
                    extraCommands={[
                        commands.codeEdit,
                        commands.codePreview
                    ]}
                    commands={[
                        {
                            name: "image-editor",
                            keyCommand: "image-editor",
                            icon: (
                                <AiOutlineFileImage />
                            ),
                            buttonProps: 'Insert title3',
                            execute: (state, api) => {
                                setShowUploadImg(true)
                            }
                        }
                    ]}
                    toolbarHeight={toolbarHeight}
                    preview="edit"
                    hideToolbar={hideToolbar}
                    visiableDragbar={false}
                />
            </div>
        </>
    )
}

const fileTypes = ["JPG", "PNG", "GIF"];

function UploadImg({ authorId, imagesLib }) {
    console.log(imagesLib);
    const { showUploadImg, setShowUploadImg, handleChange } = useContext(EditorContext)
    const [lib, setLib] = useState(imagesLib)

    const handleChangeFiles = (newFiles) => {
        console.log(newFiles);
        if (newFiles) {
            const files = [...newFiles]

            const data = new FormData()
            files.forEach((image) => {
                data.append('image[]', image)
            })
            data.append('imageable_type', 'User')
            data.append('imageable_id', authorId)
            data.append('role', 'article')

            console.log(files)

            axios.post("/image/upload", data)
                .then((res) => {
                    const data = res.data
                    console.log(`Đã lưu`, ...data)
                    setLib([...lib, ...data])
                })
                .catch(err => console.log(err))
        }
    }

    const handleOK = () => {
        setShowUploadImg(false)

    }

    const handleImage = (event) => {
        const textarea = document.querySelectorAll(`.${"w-md-editor-text-input "}`)[0]
        handleChange(textarea.value + "\n" + `![](${event.target.src})`)
        setShowUploadImg(false)
    }

    return (
        <>
            <div className="absolute z-40 w-[100vw] h-[100vh] right-0 top-0 bg-gray-600/50">
                <div className="h-[100%] flex items-center justify-center">
                    <div className="bg-white w-fit p-4 rounded-md z-50">
                        <div>
                            {/*<FileUploader
                                handleChange={handleChangeFiles}
                                name="images[]"
                                type={fileTypes}
                                multiple={true}
                                onDrop={(drop) => console.log(drop)}
                            />*/}

                            <Dropzone
                                onDrop={handleChangeFiles}
                                accept="image/*"
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps({ className: "text-center p-5 bg-gray-100 text-gray-500 mb-5 text-center p-5 border-dashed border-gray-200 bg-gray-100 text-gray-500 mb-5 border-2" })}>
                                        <input {...getInputProps()} />
                                        <p>Drag'n'drop files, or click to select files</p>
                                    </div>
                                )}
                            </Dropzone>
                        </div>
                        {lib && (
                            <div className="flex py-8 grid grid-cols-4 gap-y-1">
                                {lib.map((preview, index) => {
                                    return (
                                        <img src={preview} key={index} className="object-cover h-24 px-1" onClick={handleImage} />
                                    )
                                })}
                            </div>
                        )}
                        <div>
                            <Button type="button" onClick={handleOK}>OK</Button>
                        </div>
                    </div>
                </div>
            </div>
            {showUploadImg && <div className="fixed inset-0 z-40" onClick={() => setShowUploadImg(false)}></div>}
        </>
    )
}

EditorProvider.Editor = Editor

export default EditorProvider