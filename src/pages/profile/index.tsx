import Footer from "components/Footer";
import Header from "components/Header";
import PostList from "components/PostList";
import Profile from "components/Profile";

export default function ProfilePage() {
    return (
        <>
            <Header />
            <Profile />
            {/* 나의 글만 가져오면 되기 때문에 hasNavigation = false */}
            <PostList hasNavigation={false} />
            <Footer />
        </>
    );
}