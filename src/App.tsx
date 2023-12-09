import { useEffect, useState } from 'react';
import { app } from 'firebaseApp';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // 사용자 인증여부 check
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Router from './components/Router';
import Loader from 'components/Loader';

function App() {
  const auth = getAuth(app);

  // Auth를 제대로 인식못해서 로그인 페이지를 잠깐씩 보여주는 문제 해결
  // auth를 체크하기 전에 (initialize 전) loader를 띄워주는 용도
  const [init, setInit] = useState<boolean>(false);

  // 사용자 인증이 됐는지(로그인 여부) 
  // -> currentUser가 없으면 false, 있으면 true인 상태로 라우터를 렌더링하게 됨
  // firebase Auth가 인증되었으면 true로 변경해주는 로직 추가
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  // 관찰자를 설정하여 현재 로그인한 사용자 가져오기
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  // 라우터 바로 적용 -> 가독성 높일 수 있음
  return (
    <>
      <ToastContainer />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </>
  );
}

export default App;
