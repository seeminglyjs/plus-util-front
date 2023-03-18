import { ReactNode, useEffect, useState } from 'react';
import Footer from "./Footer/Footer";
import NavBar from "./Navbar/NavBar";
import { AuthData } from '@/interface/Auth/AuthData';
import { fetchAuthData } from "@/function/auth/GetAuthencation";


type LayoutProps = {
  children: ReactNode;
};


export default function Layout ({ children }: LayoutProps){
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const getAuthData = async () => {
      const authData: AuthData = await fetchAuthData("");
      setAuthenticated(current => authData.authenticated);
    };
    getAuthData();
  }, []);

    return (
      <div>
        <div className="md:container md:mx-auto md:max-w-full">
          <NavBar authenticated={authenticated}></NavBar>
          <div>
          {children}
          </div>
          <Footer></Footer>
        </div>
      </div>
    );
  };
