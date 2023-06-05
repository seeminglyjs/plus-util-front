import { DefaultClassNames } from "@/components/ClassName/DefaultClassName";
import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import HalfAndHalfDiv from "@/components/Layout/HalfAndHalfDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";

import Link from "next/link";

export default function AdminMian() {

    return (
        <MainDiv>
            <MainSubDiv>
                <ContentColDiv>
                    <ContentRowDiv>
                        <HalfDiv>
                            <div></div>
                            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 md:p-12 mt-2">
                                <Link href="/util/info/enroll" className=" text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-700 text-green-400 mb-2">
                                    Util Enroll
                                </Link>
                                <h2 className="text-white text-3xl font-extrabold mb-2">유틸 정보 등록</h2>
                                <p className="text-lg font-normal text-gray-400 mb-4">신규 유틸리티 정보를 등록합니다.</p>
                                <Link href="/util/info/enroll" className="text-plusOrange hover:underline font-medium text-lg inline-flex items-center">Go Plus
                                </Link>
                            </div>
                        </HalfDiv>
                        <HalfDiv>
                            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mt-2">
                                <Link href="/util/info/list" className=" text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-700 text-purple-400 mb-2">
                                    Get Util List
                                </Link>
                                <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">유틸 목록을 가져옵니다.</h2>
                                <p className="text-lg font-normal text-gray-400 mb-4">등록된 유틸 목록 리스트를 조회하여 가져옵니다.</p>
                                <Link href="/util/info/list" className="text-plusOrange hover:underline font-medium text-lg inline-flex items-center">Go Plus
                                </Link>
                            </div>
                        </HalfDiv>
                    </ContentRowDiv>
                    <ContentRowDiv>
                        <HalfDiv>
                            <div></div>
                            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 md:p-12 mt-2">
                                <Link href="/util/info/enroll" className=" text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-700 text-green-400 mb-2">
                                    Util Enroll
                                </Link>
                                <h2 className="text-white text-3xl font-extrabold mb-2">유저 정보 조회</h2>
                                <p className="text-lg font-normal text-gray-400 mb-4">유저 정보를 조회하여 가져옵니다.</p>
                                <Link href="/util/info/enroll" className="text-plusOrange hover:underline font-medium text-lg inline-flex items-center">Go Plus
                                </Link>
                            </div>
                        </HalfDiv>
                        <HalfDiv>
                            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mt-2">
                                <Link href="/util/info/list" className=" text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-700 text-purple-400 mb-2">
                                    Get Util List
                                </Link>
                                <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">유틸 목록을 가져옵니다.</h2>
                                <p className="text-lg font-normal text-gray-400 mb-4">등록된 유틸 목록 리스트를 조회하여 가져옵니다.</p>
                                <Link href="/util/info/list" className="text-plusOrange hover:underline font-medium text-lg inline-flex items-center">Go Plus
                                </Link>
                            </div>
                        </HalfDiv>
                    </ContentRowDiv>
                </ContentColDiv>
            </MainSubDiv>
        </MainDiv>
    )
}