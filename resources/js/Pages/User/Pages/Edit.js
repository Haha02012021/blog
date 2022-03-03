import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Layout from "@/Pages/Article/Layouts/Layout";
import { useForm } from "@inertiajs/inertia-react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Edit({ auth, errors }) {
    console.log(auth);
    const [previewAvatar, setPreviewAvatar] = useState()
    const { data, setData, post } = useForm({
        gender: auth.user.gender ? auth.user.gender : "Nam",
        birthday: auth.user.birthday ? auth.user.birthday : ""
    })
  
    useEffect(() => {
  
      return () => previewAvatar && URL.revokeObjectURL(previewAvatar.preview)
  
    }, [previewAvatar])

    const handleChangeInfo = (e) => {
        e.preventDefault()

        post(route("update", auth.user.id))

        const file = e.target.avatar.files[0]

        const dataImage = new FormData()
        dataImage.append('image[]', file)
        dataImage.append('imageable_id', auth.user.id)
        dataImage.append('imageable_type', 'User')
        dataImage.append('role', 'avatar')
        console.log(file);

        axios.post("/image/upload", dataImage)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

    }
  
    const handleChangeAvatar = (e) => {
        const file = e.target.files[0]
        
        file.preview = URL.createObjectURL(file)
        setPreviewAvatar(file)
    }

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    return (
        <Layout
            auth={auth}
            errors={errors}
            showOptionsBar={false}
        >
            <div className="sm:px-6 lg:px-8">
                <form onSubmit={handleChangeInfo} className="bg-white rounded-lg p-8 max-w-5xl mx-auto mt-8">
                    <h2 className="text-3xl font-extrabold">Thông tin cá nhân</h2>
                    <div className="mt-4">
                        <div className="w-20 h-20">
                            {previewAvatar ? (
                                <img className="rounded-full" src={previewAvatar.preview} alt="avt" />
                            ) : (
                                    !auth.avatar ? (
                                        <div className="rounded-full bg-blue-400 h-[100%] text-2xl flex items-center justify-center">
                                            {auth.user.name.substring(0, 1)}
                                        </div>) : (
                                            <img className="rounded-full" src={auth.avatar} alt="avt" />
                                        )
                            )}
                        </div>
                        <Label
                            forInput="avatar"
                            value="Ảnh đại diện"
                            className="mb-2"
                        />
                        <Input
                            type="file"
                            name="avatar"
                            handleChange={handleChangeAvatar}
                        />
                    </div>

                    <div className="flex justify-between mt-4">
                        <div className="w-[45%]">
                            <Label
                                forInput="birthday"
                                value="Ngày sinh"
                                className="mb-2"
                            />
                            <Input
                                type="date"
                                name="birthday"
                                className="w-full"
                                handleChange={handleChange}
                                value={data.birthday}
                            />
                        </div>

                        <div className="w-[45%]">
                            <Label
                                forInput="gender"
                                value="Giới tính"
                                className="mb-2"
                            />
                            <select value={data.gender} onChange={handleChange} name="gender" className="w-full border-1 border-gray-300 rounded-lg focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm">
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>

                    </div>

                    <div className="mt-4 flex justify-end">
                        <Button>Lưu</Button>
                    </div>
                </form>
            </div>

        </Layout>
    )
}