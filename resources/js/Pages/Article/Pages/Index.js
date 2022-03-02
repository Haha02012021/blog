import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import TitleArticle from '@/Pages/Article/Components/TitleArtilce';
import AuthorAvatar from '../Components/AuthorAvatar';
import Layout from '../Layouts/Layout';
import CustomPagination from '@/Components/Pagination';

export default function Index({ auth, errors, articles }) {
    console.log(articles);

    return (
        <Layout
            auth={auth}
            errors={errors}
            headTitle="Mới nhất"
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {articles.data.map(article => {
                            return (
                                <div key={article.id} className="p-6 bg-white border-b border-gray-200">
                                    <AuthorAvatar
                                        userId={auth.user ? auth.user.id : 0}
                                        authorId={article.user_id}
                                        className=" ml-0"
                                        showUserInfoTable={false}
                                    />
                                    <Link href={route("articles.show", article.id)}>
                                        <TitleArticle titleName={article.title} className=" ml-10 -mt-5 absolute" />
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <CustomPagination data={articles} />
        </Layout>
    )
}