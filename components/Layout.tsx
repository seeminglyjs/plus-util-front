import { ReactNode } from "react";
import Link from 'next/link';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout ({ children }: LayoutProps){
    return (
      <div>
      <div className="container mx-auto px-4 ">
        
        <nav className="flex justify-center space-x-4 py-4">
          <Link href="/">
            <span className="font-normal px-3 py-2 rounded-lg hover:text-white transition duration-500">Home</span>
          </Link>
          <Link href="/test/main">
            <span className="font-normal px-3 py-2 rounded-lg hover:text-white transition duration-500">Test</span>
          </Link>
          <Link href="/dashboard">
            <span className="font-normal px-3 py-2 rounded-lg hover:text-white transition duration-500">API_TEST</span>
          </Link>
          <Link href="/dashboard">
            <span className="font-normal px-3 py-2 rounded-lg hover:text-white transition duration-500">Home</span>
          </Link>
        </nav>

        <div>
        {children}
        </div>
        <footer>...</footer>
      
      </div>
      </div>
    );
  };
