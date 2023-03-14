import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from "./Button";
import NavBarLinks from "./NavBarLinks";
import { BiMenu } from "react-icons/bi";


export default function NavBar() {
    const [open, setOpen] = useState(false)

    return (
        <nav className="">
            <div className='flex items-center font-medium justify-around'>
                <div className="z-50 p-5 md:w-auto w-full flex justify-between md:">
                    <Link href="/">
                    <p className="text-plusOrange font-bold text-3xl cursor-pointer">
                        Plus<span className="text-plus200">Util</span>
                    </p>
                    </Link>
                    <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
                        <span className="cursor-pointer"><BiMenu /></span>
                    </div>
                </div>
                <ul className="md:flex hidden uppercase items-center gap-8">
                    <li>
                        <Link href="" className="py-7 px-3 inline-block">공지사항</Link>
                    </li>
                    <NavBarLinks />
                </ul>
                <div className="md:block hidden">
                    <Button />
                </div>
                {/*Mobile nav*/}
                <ul className={
                    `md:hidden bg-plus300 absolute w-full h-full bottom-0 py-24 pl-4
                    duration-500 ${open ? 'left-0' : 'left-[-100%]'}`
                }>
                    <li>
                        <Link href="" className="py-7 px-3 inline-block">Home</Link>
                    </li>
                    <NavBarLinks />
                    <div className="py-5">
                        <Button />
                    </div>
                </ul>
            </div>
        </nav>
    )
}
