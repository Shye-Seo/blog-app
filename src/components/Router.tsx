import { Route, Routes, Navigate } from 'react-router-dom';
import Home from 'pages/home';
import PostList from 'pages/posts';
import PostDetail from 'pages/posts/detail';
import PostNew from 'pages/posts/new';
import PostEdit from 'pages/posts/edit';
import ProfilePage from 'pages/profile';
import LoginPage from 'pages/login';
import SignupPage from 'pages/signup';

interface RouteProps {
  isAuthenticated: boolean;
}

export default function Router({ isAuthenticated }: RouteProps) {
  
  return (
    <>
      <Routes>
        {/* root path 설정 */}

        {isAuthenticated ? (
          // 사용자 인증이 되었다면 해당 Route
          <>
            <Route path='/' element={<Home />} />
            <Route path='/posts' element={<PostList />} />
            <Route path='/posts/:id' element={<PostDetail />} />
            <Route path='/posts/new' element={<PostNew />} />
            <Route path='/posts/edit/:id' element={<PostEdit />} />
            <Route path='/profile' element={<ProfilePage />} />

            {/* default값 설정 -> Navigate 기능을 통해 메인 페이지로 이동 */}
            <Route path='*' element={<Navigate replace to='/' />} />
          </>
        ) : (
          // 아니라면 해당 Route
          <>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='*' element={<LoginPage />} />
          </>
        )}

      </Routes>

      {/* 하나하나 코드를 짜는 것이 아닌, 컴포넌트로 만들 예정 
       Router 안에 전부 작업하게 되면 코드의 가독성이 떨어지고, 유지보수도 어려워지기 때문*/}
    </>
  );
}

