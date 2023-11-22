import { useState } from 'react';
import { app } from 'firebaseApp';
import { getAuth } from 'firebase/auth'; // 사용자 인증여부 check

import Router from './components/Router';

function App() {
  const auth = getAuth(app);

  // 사용자 인증이 됐는지(로그인 여부) -> 기본값 false setting
  // firebase Auth가 인증되었으면 true로 변경해주는 로직 추가
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  // 라우터 바로 적용 -> 가독성 높일 수 있음
  return <Router isAuthenticated={isAuthenticated} />;
}

export default App;
