import { ReactNode, useEffect, useState } from 'react';
import Footer from "./Footer/Footer";
import NavBar from "./Navbar/NavBar";
import { AuthData } from '@/interface/Auth/AuthData';
import { fetchAuthData } from "@/function/auth/GetAuthencation";
import { AuthTop } from "@/interface/Auth/AuthTop";


type LayoutProps = {
  children: ReactNode;
};


export default function Layout ({ children }: LayoutProps){
  const [authData, setAuthData] = useState<AuthData>(
    {userNo: -1,
    userEmail: '',
    userRole: '',
    authenticated: false,}
  ); // Update the type
  const [authTop, setAuthTop] = useState<AuthTop>()

  useEffect(() => {
    const getAuthData = async () => {
      const fetchedAuthData: AuthData = await fetchAuthData("");
      setAuthData(current => fetchedAuthData);
    };
    getAuthData();
  }, [children]); {/*자식요소 변경이 되면 인증 정보를 가져온다. */}

    return (
      <div>
        <div className="md:container md:mx-auto md:max-w-full">
          <div id="navBarDiv">
        <NavBar userNo={authData.userNo} userEmail={authData.userEmail} userRole={authData.userRole} authenticated={authData.authenticated} />
          </div>
          <div>
          {children}
          </div>
          <Footer></Footer>
        </div>
      </div>
    );
  };
