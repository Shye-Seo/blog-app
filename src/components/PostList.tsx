import { useState } from "react"; // 전체/나의글 상태관리 위해 추가
import { Link } from "react-router-dom";

interface PostListProps {
    hasNavigation?: boolean;
}

type TabType = "all" | "my";

export default function PostList({ hasNavigation = true }: PostListProps) {
    const [activeTab, setActiveTab] = useState<TabType>("all");

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
                {[...Array(10)].map((e, index) => (
                    <div key={index} className="post__box">
                        <Link to={`/posts/${index}`}>
                            <div className="post__profile-box">
                                <div className="post__profile" />
                                <div className="post__author-name">패스트캠퍼스</div>
                                <div className="post__date">2023.11.20 월요일</div>
                            </div>
                            <div className="post__title">게시글 {index}</div>
                            <div className="post__text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum, lorem a mollis dictum, erat eros viverra odio, in egestas metus lectus a neque. Quisque eget eros justo. Aliquam vel felis id lorem laoreet vehicula. Praesent pretium molestie est. Ut at risus feugiat, tristique ex quis, ullamcorper massa. Etiam in venenatis massa. Ut ut magna posuere, faucibus turpis vitae, egestas leo. Nulla cursus eu libero a condimentum. Vivamus varius felis id ultricies bibendum.
                            </div>
                            <div className="post__utils-box">
                                <div className="post__delete">삭제</div>
                                <div className="post__edit">수정</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}