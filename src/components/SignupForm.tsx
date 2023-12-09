import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { app } from "firebaseApp";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

export default function SignupForm() {
    const [error, setError] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const navigate = useNavigate();

    // onSubmit method 생성 -> firebase에 사용자 저장
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const auth = getAuth(app);
            // 비동기요청
            await createUserWithEmailAndPassword(auth, email, password);

            // 성공적으로 호출했으면,
            toast.success("회원가입에 성공했습니다.");
            navigate("/");
        } catch (error : any) {
            toast.error(error?.code);
            console.log(error);
        }
    };

    // onChange method 생성
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // target에서 name, value를 꺼내와서 분기처리
        const {
            target: { name, value },
        } = e;

        if (name === 'email') {
            setEmail(value);
            // 이메일이 유효한지 체크하는 정규표현식 활용
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if (!value?.match(validRegex)) {
                setError("이메일 형식이 올바르지 않습니다.");
            } else {
                setError("");
            }
        }

        if (name === 'password') {
            setPassword(value);

            if (value?.length < 8) {
                setError("비밀번호는 8자리 이상으로 입력해주세요.");
            } else if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
                setError("비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요.");
            } else {
                setError("");
            }
        }

        if (name === 'password_confirm') {
            setPasswordConfirm(value);

            if (value?.length < 8) {
                setError("비밀번호는 8자리 이상으로 입력해주세요.");
            } else if (value !== password) {
                setError("비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요.");
            } else {
                setError("");
            }
        }
    };

    return (
        <form onSubmit={onSubmit} className="form form--lg">
            <h1 className="form__title">회원가입</h1>
            <div className="form__block">
                <label htmlFor="email">이메일</label>
                <input type="email" name="email" id="email" required onChange={onChange} />
            </div>
            <div className="form__block">
                <label htmlFor="password">비밀번호</label>
                <input type="password" name="password" id="password" required onChange={onChange} />
            </div>
            <div className="form__block">
                <label htmlFor="password_confirm">비밀번호 확인</label>
                <input type="password" name="password_confirm" id="password_confirm" required onChange={onChange} />
            </div>
            {error && error?.length > 0 && (
                <div className="form__block">
                    <div className="form__error">{error}</div>
                </div>
            )}
            <div className="form__block">
                계정이 이미 있으신가요?
                <Link to="/login" className="form__link">
                    로그인하기
                </Link>
            </div>
            <div className="form__block">
                <input type="submit" value="회원가입" className="form__btn--submit" disabled={error?.length > 0} />
            </div>
        </form >
    )
}