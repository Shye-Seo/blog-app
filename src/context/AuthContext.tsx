import { ReactNode, createContext, useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";

interface AuthProps {
    children: ReactNode;
}

const AuthContext = createContext({
    user: null as User | null,
});

// provider : context를 구독하는 컴포넌트들에 context의 변화를 알려줌
export const AuthContextProvider = ({ children }: AuthProps) => {
    const auth = getAuth(app);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setCurrentUser(user);
          } else {
            setCurrentUser(user);
          }
        });
      }, [auth]);

      return (
        <AuthContext.Provider value={{ user: currentUser }}>
            {children}
        </AuthContext.Provider>
      );
};

// 이걸 적용하기 위해서는 가장 최상위폴더에 적용해야함
export default AuthContext;