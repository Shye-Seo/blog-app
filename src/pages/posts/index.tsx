import Footer from "components/Footer";
import Header from "components/Header";
import PostList from "components/PostList";

export default function PostsPage() {
    return (
        // 여러개 컴포넌트를 쓰려면 리액트 fragment(<></>)로 감싸줘야함
        <>
            <Header />
            <PostList hasNavigation={false} />
            <Footer />
        </>
    );
}