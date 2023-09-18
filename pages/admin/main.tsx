
import Loading from "@/components/Etc/Loading";
import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import { fetchAuthData } from "@/function/auth/GetAuthencation";
import { AuthData } from "@/interface/Auth/AuthData";
import { Props } from "@/interface/Auth/Props";
import { GetServerSideProps } from "next";

import Link from "next/link";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";

export default function AdminMian({ authData }: Props) {
    const { userNo, userEmail, userRole, authenticated } = authData;
    const router = useRouter()

    useEffect(() => {
        if (userRole !== 'ADMIN') {
            router.push('/')
        }
    }, [authData, authenticated, router, userRole])

    return (
        <MainDiv>
            {
                userRole !== 'ADMIN' && (
                    <Loading></Loading>
                )
            }
            {
                userRole === 'ADMIN' && (
                    <MainSubDiv>
                        <ContentColDiv>
                            <div className="pt-24 pb-15">
                            <ContentRowDiv>
                                <HalfDiv>
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
                                    <div className="bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mt-2">
                                        <Link href="/util/info/list" className=" text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-700 text-purple-400 mb-2">
                                            Get Util List
                                        </Link>
                                        <h2 className="text-white text-3xl font-extrabold mb-2">유틸 목록을 가져옵니다.</h2>
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
                                        <Link href="/menu/enroll" className=" text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-700 text-green-400 mb-2">
                                            Menu Enroll
                                        </Link>
                                        <h2 className="text-white text-3xl font-extrabold mb-2">메뉴 등록</h2>
                                        <p className="text-lg font-normal text-gray-400 mb-4">신규 메뉴 정보를 등록합니다.</p>
                                        <Link href="/menu/enroll" className="text-plusOrange hover:underline font-medium text-lg inline-flex items-center">Go Plus
                                        </Link>
                                    </div>
                                </HalfDiv>
                                <HalfDiv>
                                    <div className="bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mt-2">
                                        <Link href="/menu/list" className=" text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-700 text-purple-400 mb-2">
                                            Get Menu List
                                        </Link>
                                        <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">메뉴 목록을 가져옵니다.</h2>
                                        <p className="text-lg font-normal text-gray-400 mb-4">등록된 메뉴 목록 리스트를 조회하여 가져옵니다.</p>
                                        <Link href="/menu/list" className="text-plusOrange hover:underline font-medium text-lg inline-flex items-center">Go Plus
                                        </Link>
                                    </div>
                                </HalfDiv>
                            </ContentRowDiv>
                            </div>
                        </ContentColDiv>
                    </MainSubDiv>
                )
            }

        </MainDiv>
    )
}

export const getServerSideProps: GetServerSideProps<Props, ParsedUrlQuery> = async ({ req }) => {
    const authData: AuthData = await fetchAuthData(req);
    return {
        props: {
            authData,
        },
    };
};