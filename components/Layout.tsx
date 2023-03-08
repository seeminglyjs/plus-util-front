import { ReactNode } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout ({ children }: LayoutProps){
    return (
      <div>
      <div className="container mx-auto px-4 ">
        <NavBar></NavBar>
        <div>
        {children}
        </div>
        <Footer></Footer>
      </div>
      </div>
    );
  };
