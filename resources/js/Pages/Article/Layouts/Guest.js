import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import { Link, Head } from '@inertiajs/inertia-react';
import OptionLink from '@/Components/OptionLink';
import { HiOutlineLogout } from 'react-icons/hi';

export default function GuestArticle({ header, headTitle, showOptionsBar = true, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="top-0 sticky bg-white border-b border-gray-100 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-2xl">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/articles/index">
                                    <ApplicationLogo className="block h-9 w-auto text-gray-500" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('articles.index')}>
                                    Bài viết
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative flex items-end text-base">
                                <Link href={route('login')} className="flex items-center">
                                    <HiOutlineLogout />
                                    Đăng nhập/Đăng ký
                                </Link>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            {showOptionsBar && <div className="py-4 bg-gradient-to-r from-rose-900 to-sky-900">
                <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
                    <div className="flex justify-between text-white font-semibold h-10">
                        <nav className="relative flex h-fit">
                            <OptionLink href={route("articles.index")} active={route().current("articles.index")}>
                                MỚI NHẤT
                            </OptionLink>
                        </nav>
                    </div>
                </div>
            </div>}

            <main className="">
                <Head title={headTitle} />
                {children}
            </main>
        </div>
    )
}