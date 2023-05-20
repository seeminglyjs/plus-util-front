import Link from 'next/link';
import { FaBlog } from "react-icons/fa"
import { FaGithub } from "react-icons/fa"
import { BiCopyright } from "react-icons/bi"

export default function Footer() {
    return (
        <>
            <div className="h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20">
                <div className="p-5">
                    <ul>
                        <p className="text-plusOrange font-bold text-3xl pb-6">
                            Plus<span className="text-plus200">Util</span>
                        </p>
                        <div className="flex gap-6 pb-5">
                            {/* Section for icon */}
                            <Link href="https://seeminglyjs.tistory.com/">
                                <FaBlog className="text-2xl cursor-pointer hover:text-plusOrange" />
                            </Link>
                            <Link href="https://github.com/seeminglyjs">
                                <FaGithub className="text-2xl cursor-pointer hover:text-plusOrange" />
                            </Link>
                        </div>
                    </ul>
                </div>
                <div className="p-5">
                    <ul>
                        <p className="font-bold text-2xl pb-4">Board</p>
                        <li className="text-md pb-2 font-semibold hover:text-plusOrange cursor-pointer">
                            <Link href="/notice/list">
                                공지사항
                            </Link>
                        </li>
                        <li className="text-md pb-2 font-semibold hover:text-plusOrange cursor-pointer">
                            <Link href="/">
                                홈페이지
                            </Link>
                        </li>
                        <li className="text-md pb-2 font-semibold hover:text-plusOrange cursor-pointer">
                            기타
                        </li>
                    </ul>
                </div>
                <div className="p-5">
                    <ul>
                        <p className="font-bold text-2xl pb-4">추천유틸</p>
                        <li className="text-md pb-2 font-semibold hover:text-plusOrange cursor-pointer">
                            <Link href="/util/text/textutil">
                                텍스트 도구
                            </Link>
                        </li>
                        <li className="text-md pb-2 font-semibold hover:text-plusOrange cursor-pointer">
                            <Link href="/util/text/textsimilarity">
                                문자열 유사성
                            </Link>
                        </li>
                        <li className="text-md pb-2 font-semibold hover:text-plusOrange cursor-pointer">
                            <Link href="/util/time/dayoftheweek">
                                요일 구하기
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="p-5">
                    <ul>
                        <p className="font-bold text-2xl pb-5">암호화</p>
                        <li className="text-md pb-2 font-semibold hover:text-plusOrange cursor-pointer">
                            <Link href="/encrypt/aes">
                                AES 암호화
                            </Link>
                        </li>
                        <li className="text-md pb-2 font-semibold hover:text-plusOrange cursor-pointer">
                            <Link href="/encrypt/rsa">
                                RSA 암호화
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center text-center p-5">
                <h1 className="font-semibold"><BiCopyright className="inline"></BiCopyright> Seeminglyjs All right reserved
                    <span className="font-semibold cursor-pointer"> | Plus-Util</span>
                </h1>
            </div>
        </>
    )
}