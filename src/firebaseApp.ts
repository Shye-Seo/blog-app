import { initializeApp, FirebaseApp, getApp } from "firebase/app";
import "firebase/auth";

// app을 지역변수로 선언
export let app: FirebaseApp;

// Your web app's Firebase configuration
const firebaseConfig = {
    // 환경변수를 통해서 값을 가져옴 (공유되면 안되는 정보 보호 -> gitignore)
    // 해당값들은 전부 local값들이기 때문에 나중에 배포하거나 다른 환경으로 올리는 경우, 해당 환경에도 따로 환경변수 추가로 설정필요
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID
};

// 처음에 app을 가져올때 앱이 initialize 됐다면 기존에 초기화된 앱을 가져오고,
// 그게 아니라면, 초기화함
// -> import할때마다 초기화하는 것은 비효율적이기 때문
try {
  app = getApp("app")
} catch (e) {
  app = initializeApp(firebaseConfig, "app")
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;