import AuthenticatedArticle from "./Authenticated";
import GuestArticle from "./Guest";

export default function Layout({ auth, errors, header, headTitle, showOptionsBar, children  }) {
    return (
        <>
            {auth.user ?
                (
                    <AuthenticatedArticle
                        auth={auth}
                        errors={errors}
                        header={header}
                        headTitle={headTitle}
                        showOptionsBar={showOptionsBar}
                    >
                        {children}
                    </AuthenticatedArticle>
                ) : (
                    <GuestArticle
                        header={header}
                        headTitle={headTitle}
                        showOptionsBar={showOptionsBar}
                    >
                        {children}
                    </GuestArticle>
                )}
        </>
    )
}