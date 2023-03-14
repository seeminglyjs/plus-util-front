import Link from "next/link";
import { useState } from "react";

export default function SideBar() {
    const [navName, setNavName] = useState(1);
    const [isOpen, setIsOpen] = useState(true);

    function toggleDropdown(navName:string) {
        if(navName === "encryption"){
            if(isOpen) setIsOpen(false)
            setNavName(current => 1);
            setIsOpen(true)
        }else if (navName === "util"){
            if(isOpen) setIsOpen(false)
            setNavName(current => 2);
            setIsOpen(true)
        }else if (navName === "algorithm"){
            if(isOpen) setIsOpen(false)
            setNavName(current => 3);
            setIsOpen(true)
        }      
    }
    
    return (
        <div>
            <div className="text-white w-full">
                <ul className="p-4">
                    <li className="flex items-center py-2">
                        <span className="text-white text-lg hover:text-gray-400 cursor-pointer" onClick={() => toggleDropdown("encryption")}>🔒 암호화</span>
                    </li>
                    {navName === 1 && isOpen && (
                        <ul>
                            <li className="px-4 py-2 text-sm transition duration-500 ease-in-out transform hover:scale-105">
                                <Link href="#" className="text-white">AES암호화</Link>
                            </li>
                            <li className="px-4 py-2 text-sm transition duration-500 ease-in-out transform hover:scale-105">
                                <Link href="#" className="text-white">RSA암호화</Link>
                            </li>
                        </ul>
                    )}
                    <li className="flex items-center py-2">
                        <span className="text-white text-lg hover:text-gray-400 cursor-pointer" onClick={() => toggleDropdown("util")}>🛠 유틸</span>
                    </li>
                    {navName === 2 && isOpen && (
                        <ul>
                            <li className="px-4 py-2 text-sm transition duration-500 ease-in-out transform hover:scale-105">
                                <Link href="#" className="text-white">시간</Link>
                            </li>
                            <li className="px-4 py-2 text-sm transition duration-500 ease-in-out transform hover:scale-105">
                                <Link href="#" className="text-white">문자</Link>
                            </li>
                            <li className="px-4 py-2 text-sm transition duration-500 ease-in-out transform hover:scale-105">
                                <Link href="#" className="text-white">기타</Link>
                            </li>
                            <li className="px-4 py-2 text-sm transition duration-500 ease-in-out transform hover:scale-105">
                                <Link href="#" className="text-white">SQL</Link>
                            </li>
                        </ul>
                    )}
                    <li className="flex items-center py-2">
                        <span className="text-white text-lg hover:text-gray-400 cursor-pointer" onClick={() => toggleDropdown("algorithm")}>⛓ 알고리즘</span>
                    </li>
                    {navName === 3 && isOpen && (
                        <ul>
                            <li className="px-4 py-2 text-sm transition duration-500 ease-in-out transform hover:scale-105">
                                <Link href="#" className="text-white">BASIC</Link>
                            </li>
                            <li className="px-4 py-2 text-sm transition duration-500 ease-in-out transform hover:scale-105">
                                <Link href="#" className="text-white">그래프</Link>
                            </li>
                        </ul>
                    )}
                </ul>
            </div>
        </div>
    )
}