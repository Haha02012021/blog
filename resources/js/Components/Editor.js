import "../../css/editor.css"
import MDEditor, { commands } from "@uiw/react-md-editor";
import { AiOutlineFileImage } from "react-icons/ai";
import { Children, createContext, useContext, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Button from "./Button";
import axios from "axios";

const EditorContext = createContext()

function EditorProvider({ children }) {
    const [showUploadImg, setShowUploadImg] = useState(false)

    return (
        <EditorContext.Provider value={{ showUploadImg, setShowUploadImg }}>
            { children }
        </EditorContext.Provider>
    )
}

function Editor({
    value,
    handleChange,
    height = 200,
    toolbarHeight = 40,
    hideToolbar = false,
    placeholder = "Nhập nội dung vào đây",
}) {
    const { showUploadImg, setShowUploadImg } = useContext(EditorContext)
    return (
        <>
            {showUploadImg && <>
                <UploadImg />
                <div className="fixed inset-0 z-20" onClick={() => setShowUploadImg(false)}></div>
            </>}
            <div className="w-[100%] text-1xl">
                <MDEditor
                    value={value}
                    onChange={(newValue = "") => handleChange(newValue)}
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

function UploadImg() {
    const [files, setFiles] = useState([])
    const { setShowUploadImg } = useContext(EditorContext)

    const handleChange = (file) => {
        setFiles([...files, file])
        for (f in file) {
            const data = new FormData()
            data.append('image', f)
            data.append('imageable_type', 'Article')
            data.append('imageable_id', 0)
            axios.post("/image/upload", data)
                .then(() => console.log(`Đã lưu ${f}`))
                .catch(err => console.log(err))
        }
    }

    const handleOK = () => {
        setShowUploadImg(false)
        console.log(files);
    }

    return (
        <div className="absolute z-40 w-[100vw] h-[100vh] right-0 top-0 bg-gray-600/50">
            <div className="h-[100%] flex items-center justify-center">
                <div className="bg-white w-fit p-4 rounded-md z-50">
                    <FileUploader
                        handleChange={handleChange}
                        name="file"
                        type={fileTypes}
                        multiple={true}
                        onDrop={(drop) => console.log(drop)}
                    />
                    <div>
                        <Button type="button" onClick={handleOK}>OK</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

EditorProvider.Editor = Editor

export default EditorProvider