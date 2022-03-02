import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from 'react-icons/fa';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <Guest>
            <Head title="Đăng nhập" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <ValidationErrors errors={errors} />

            <h2 className="text-3xl font-extrabold text-center mb-4 mt-4">Đăng nhập</h2>

            <form onSubmit={submit}>
                <div>
                    <Label forInput="email" value="Email" />

                    <Input
                        type="text"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />

                        <span className="ml-2 text-sm text-gray-600">Ghi nhớ tài khoản</span>
                    </label>
                </div>

                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link
                                href={route("register")}
                                className="underline text-sm text-gray-600 hover:text-gray-900"
                            >
                                Chưa có tài khoản?
                            </Link>
                        </div>
                        <div>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="underline text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Quên mật khẩu?
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button className="w-[100%] justify-center" processing={processing}>
                            Đăng nhập
                        </Button>
                    </div>
                </div>
            </form>
            <div className="my-4">
                <span className="divide-line">Hoặc đăng nhập bằng</span>
            </div>
            <div className="flex text-4xl justify-center mb-2">
                <a href={"/redirect/facebook"} className="cursor-pointer mx-4"><FaFacebook color="blue" /></a>
                <a href={"/redirect/google"} className="cursor-pointer mx-4"><FcGoogle /> </a>
            </div>
        </Guest>
    );
}
