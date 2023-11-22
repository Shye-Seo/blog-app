// 컴포넌트로 작업하는 이유
// 레이아웃뿐만 아니라 포스트를 가져오는 작업, 어떤 포스트인지 분류하는 작업 등을 해야하기 때문
import { Link } from "react-router-dom";

export default function PostDetail() {
    return <>
        <div className="post__detail">
            <div className="post__box">
                <div className="post__title">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nulla nisl, aliquet in dignissim ut, hendrerit et neque.
                </div>
                <div className="post__profile-box">
                    <div className="post__profile" />
                    <div className="post__author-name">패스트캠퍼스</div>
                    <div className="post__date">2023.11.20 월요일</div>
                </div>
                <div className="post__utils-box">
                    <div className="post__delete">삭제</div>
                    <div className="post__edit">
                        <Link to={`/posts/edit/1`}>수정</Link>
                    </div>
                </div>
                <div className="post__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum, lorem a mollis dictum, erat eros viverra odio, in egestas metus lectus a neque. Quisque eget eros justo. Aliquam vel felis id lorem laoreet vehicula. Praesent pretium molestie est. Ut at risus feugiat, tristique ex quis, ullamcorper massa. Etiam in venenatis massa. Ut ut magna posuere, faucibus turpis vitae, egestas leo. Nulla cursus eu libero a condimentum. Vivamus varius felis id ultricies bibendum.
                </div>
            </div>
        </div>
    </>
}