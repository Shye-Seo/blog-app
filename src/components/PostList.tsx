import AuthContext from "context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react"; // 전체/나의글 상태관리 위해 추가
import { Link } from "react-router-dom";

interface PostListProps {
    hasNavigation?: boolean;
}

type TabType = "all" | "my";

export interface PostProps {
    id?: string;
    title: string;
    email: string;
    summary: string;
    content: string;
    createdAt: string;
}

export default function PostList({ hasNavigation = true }: PostListProps) {
    const [activeTab, setActiveTab] = useState<TabType>("all");
    const [posts, setPosts] = useState<PostProps[]>([]);
    const { user } = useContext(AuthContext);

    const getPosts = async () => {
        const datas = await getDocs(collection(db, "posts"));

        datas?.forEach((doc) => {
            console.log(doc.data(), doc.id);
            const dataObj = { ...doc.data(), id: doc.id };
            setPosts((prev) => [...prev, dataObj as PostProps]);
        });
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            {/* 프로필 페이지에서는 navigation 안보이게 */}
            {hasNavigation && (
                <div className="post__navigation">
                    {/* 동적으로 active 클래스 추가 */}
                    {/* div 태그로 되어있기 때문에 버튼처럼 사용하려면 role="presentation" */}
                    <div
                        role="presentation"
                        onClick={() => setActiveTab("all")}
                        className={activeTab === 'all' ? 'post__navigation--active' : ''}
                    >
                        전체
                    </div>
                    <div
                        role="presentation"
                        onClick={() => setActiveTab("my")}
                        className={activeTab === 'my' ? 'post__navigation--active' : ''}
                    >
                        나의 글
                    </div>
                </div>
            )}
            <div className="post__list">
                {/* 게시글 배열 만들기 */}
                {posts?.length > 0 ? posts.map((post, index) => (
                    <div key={post?.id} className="post__box">
                        <Link to={`/posts/${post?.id}`}>
                            <div className="post__profile-box">
                                <div className="post__profile" />
                                <div className="post__author-name">{post?.email}</div>
                                <div className="post__date">{post?.createdAt}</div>
                            </div>
                            <div className="post__title">{post?.title}</div>
                            <div className="post__text">{post?.summary}</div>
                            </Link>
                            {post?.email === user?.email && (
                                <div className="post__utils-box">
                                    <div className="post__delete">삭제</div>
                                        <Link to={`/posts/edit/${post?.id}`} className="post__edit">수정</Link>
                                </div>
                            )}
                        
                    </div>
                )) : (
                    <div className="post__no-post">게시글이 없습니다.</div>
                )}
            </div>
        </>
    )
}