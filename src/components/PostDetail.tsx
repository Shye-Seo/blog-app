// 컴포넌트로 작업하는 이유
// 레이아웃뿐만 아니라 포스트를 가져오는 작업, 어떤 포스트인지 분류하는 작업 등을 해야하기 때문
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PostProps } from "./PostList";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import Loader from "./Loader";

export default function PostDetail() {
    const [post, setPost] = useState<PostProps | null>(null);
    const params = useParams();

    const getPost = async (id: string) => {
        if (id) {
            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);

            setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
        }
    };

    const handleDelete = () => {
        console.log("delete!");
    };

    useEffect(() => {
        if (params?.id) getPost(params?.id);
    }, [params?.id]);

    return (
        <>
            <div className="post__detail">
                {post ? (
                    <div className="post__box">
                        <div className="post__title">
                            {post?.title}
                        </div>
                        <div className="post__profile-box">
                            <div className="post__profile" />
                            <div className="post__author-name">{post?.email}</div>
                            <div className="post__date">{post?.createdAt}</div>
                        </div>
                        <div className="post__utils-box">
                            <div className="post__delete" role="presentation" onClick={handleDelete}>삭제</div>
                            <div className="post__edit">
                                <Link to={`/posts/edit/1`}>수정</Link>
                            </div>
                        </div>
                        <div className="post__text post__text--pre-wrap">
                            {post?.content}
                        </div>
                    </div>

                ) : <Loader />}
            </div>
        </>
    )
}