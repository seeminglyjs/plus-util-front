import Link from "next/link"
import { links } from "./MyLinks"
import { useState, useEffect } from 'react';
import { BiChevronDown } from "react-icons/bi";
import { BiChevronUp } from "react-icons/bi";



export default function NavBarLinks() {
    const [heading, setHeading] = useState("")
    const [subHeading, setSubHeading] = useState("")

    return (
        <>
            {
                links.map((link,index) => (
                    <div key={index}>
                        <div className="px-3 text-left md:cursor-pointer group">
                            <h1 className="py-7 flex justify-between items-center md:pr-0 pr-5 group" onClick={() => {
                                heading !== link.name ? setHeading(link.name) : setHeading("")
                                setSubHeading("")
                            }}>
                                {link.name}
                                <span className="text-xl md:hidden inline">
                                    {
                                        heading === link.name ?  <BiChevronUp/> : <BiChevronDown/>
                                    }
                                </span>
                                <span className="text-xl md:mt-1 md:ml-2 md:block hidden group-hover:rotate-180">
                                    {
                                     <BiChevronDown/>
                                    }
                                </span>
                            </h1>
                            {link.submenu && (
                                <div>
                                    <div className="absolute top-20 hidden group-hover:md:block hover:md:block">
                                        <div className="py-3">
                                            <div className="w-4 h-4 left-3 absolute mt-1 bg-gray-800 rotate-45 border-t border-l"></div>
                                        </div>
                                        <div className="bg-gray-800 p-5 grid grid-cols-3 gap-10 rounded border border-plus200">
                                            {
                                                link.sublink.map((mysublinks, index) => (
                                                    <div key={index}>
                                                        <h1 className="text-lg font-semibold">{mysublinks.Head}</h1>
                                                        {mysublinks.sublink.map((slink,index) => (
                                                            <li className="text-sm my-2.5" key={index}>
                                                                <Link className="hover:text-green-400" href={slink.link}>{slink.name}</Link>
                                                            </li>
                                                        ))}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    {/*Mobile Menu*/}
                                    <div className={
                                        `${heading === link.name ? 'md:hidden' : 'hidden'}`
                                    }>
                                        {/* subLinks */}
                                        {
                                            link.sublink.map((slink) => (
                                                <div key={slink.Head}>
                                                    <div>
                                                        <h1 onClick={() =>
                                                            subHeading !== slink.Head ? setSubHeading(slink.Head) : setSubHeading("")} 
                                                            className="py-4 pl-7 font-semibold md:pr-0 pr-5 flex justify-between items-center cursor-pointer">{slink.Head}

                                                            <span className="text-xl md:mt-1 md:ml-2 inline">
                                                                {
                                                                    subHeading === slink.Head ? <BiChevronUp/> : <BiChevronDown/>
                                                                }
                                                            </span>
                                                        </h1>
                                                        <div className={`${subHeading === slink.Head ? "md:hidden" : "hidden"
                                                            }`}>
                                                            {slink.sublink.map((slink, index) => (
                                                                <li className="py-3 pl-14" key={index}>
                                                                    <Link href={slink.link} className="hover:text-green-400">{slink.name}</Link>
                                                                </li>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            }
        </>
    )
}
