import { ReactNode } from "react";
import Footer from "./Footer/Footer";
import NavBar from "./Navbar/NavBar";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout ({ children }: LayoutProps){
    return (
      <div>
        <div className="md:container md:mx-auto md:max-w-full">
          <NavBar></NavBar>
          <div>
          {children}
          </div>
          <Footer></Footer>
        </div>
      </div>
    );
  };
