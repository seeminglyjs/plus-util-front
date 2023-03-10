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
                        <span className="text-white text-lg hover:text-gray-400 cursor-pointer" onClick={() => toggleDropdown("encryption")}>ð ìí¸í</span>
                    </li>
                    {navName === 1 && isOpen && (
                        <ul>
                            <li className="px-4 py-2 text-sm transition duration-500 ease-in-out transform hover:scale-105">
                                <Link href="#" className="text-white">AESìí¸í</Link>
                            </li>
                            <li className="px-4 py-2 text-sm transition duration-500 ease-in-out transform hover:scale-105">
                                <Link href="#" className="text-white">RSAìí¸í</Link>
                            </li>
                        </ul>
                    )}
                    <li className="flex items-center py-2">
                        <span className="text-white text-lg hover:text-gray-400 cursor-pointer" onClick={() => toggleDropdown("util")}>ð  ì í¸</span>
                    </li>
                    {navName === 2 && isOpen && (
                        <ul>
                            <li className="px-4 py-2 text-sm transition duration-500 ease-in-out transform hover:scale-105">
                                <Link href="#" className="text-white">ìê°</Link>
                            </li>
                            <li className="px-4 py-2 text-sm transition duration-500 ease-in-out transform hover:scale-105">
                                <Link href="#" className="text-white">ë¬¸ì</Link>
                            </li>
                            <li className="px-4 py-2 text-sm transition duration-500 ease-in-out transform hover:scale-105">
                                <Link href="#" className="text-white">ê¸°í</Link>
                            </li>
                            <li className="px-4 py-2 text-sm transition duration-500 ease-in-out transform hover:scale-105">
                                <Link href="#" className="text-white">SQL</Link>
                            </li>
                        </ul>
                    )}
                    <li className="flex items-center py-2">
                        <span className="text-white text-lg hover:text-gray-400 cursor-pointer" onClick={() => toggleDropdown("algorithm")}>â ìê³ ë¦¬ì¦</span>
                    </li>
                    {navName === 3 && isOpen && (
                        <ul>
                            <li className="px-4 py-2 text-sm transition duration-500 ease-in-out transform hover:scale-105">
                                <Link href="#" className="text-white">BASIC</Link>
                            </li>
                            <li className="px-4 py-2 text-sm transition duration-500 ease-in-out transform hover:scale-105">
                                <Link href="#" className="text-white">ê·¸ëí</Link>
                            </li>
                        </ul>
                    )}
                </ul>
            </div>
        </div>
    )
}