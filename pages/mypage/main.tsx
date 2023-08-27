import MainDiv from "@/components/Layout/MainDiv";
import { fetchAuthData } from "@/function/auth/GetAuthencation";
import { AuthData } from "@/interface/Auth/AuthData";
import { CookieAndAuth } from "@/interface/Auth/CookieAndAuth";
import { Props } from "@/interface/Auth/Props";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from 'react';
import Loading from "../test";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import MajoritySubDiv from "@/components/Layout/MajoritySubDiv";
import MajorityDiv from "@/components/Layout/MajorityDiv";
import Link from "next/link";
import { MyPageDto } from "@/interface/myPage/MyPageDto";


export default function Mypage({ authData, cookie }: CookieAndAuth) {
    const { userNo, userEmail, userRole, authenticated } = authData;
    const [myPageInfo, setMyPageInfo] = useState({} as MyPageDto)
    const router = useRouter()

    useEffect(() => {
        async function getMyPage(userNo: number) {
            if (userNo < 1) router.push('/login')
            else {
                const url = `${process.env.API_BASE_URL}/my/page?userNo=${userNo}`

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                    credentials: 'include',
                })
                if (!response.ok) {
                    const errorMessage = `HTTP error! Status: ${response.status}`;
                    console.error(errorMessage);
                    return;
                } else {
                    const myPageDto: MyPageDto = await response.json()
                    if(myPageDto.userNo == -1) router.push("/")
                    console.log(myPageDto)
                    if (myPageDto.userNo != -1) {
                        setMyPageInfo(myPageDto);
                    } else {
                        router.push('/login');
                    }
                }
            }

        }
        getMyPage(userNo)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <MainDiv>
            {
                myPageInfo.userNo === undefined && myPageInfo.viewCnt === undefined && (
                    <Loading></Loading>
                )
            }
            {
                myPageInfo.userNo !== undefined && myPageInfo.viewCnt !== undefined && (
                    <MainSubDiv>
                        <ContentColDiv>
                            <ContentRowDiv>
                                <MajoritySubDiv>
                                </MajoritySubDiv>

                                <MajorityDiv>
                                    <div className="flex justify-center pt-48 py-15">
                                        <div className="w-full max-w-sm bg-gray-800 border-gray-700 border rounded-md">
                                            <div className="flex justify-center px-4 pt-4">
                                                <span className="mx-2 text-sm text-gray-400">View : {myPageInfo.viewCnt.toString()}</span>
                                                <span className="text-sm mx-2 text-gray-400">Like : {myPageInfo.likeCnt.toString()}</span>
                                            </div>
                                            <div className="flex flex-col items-center pb-10">
                                                <h5 className="mb-1 text-l font-medium text-white">{myPageInfo.nickName}</h5>
                                                <span className="text-sm text-gray-400">{myPageInfo.description}</span>
                                                <div>
                                                    {
                                                        myPageInfo.userName && myPageInfo.nameShow === 'y' && (
                                                            <div>
                                                            <span className="text-sm text-gray-400">이름 : {myPageInfo.userName}</span>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        myPageInfo.userPhone && myPageInfo.phoneShow === 'y' && (
                                                            <div>
                                                            <span className="text-sm text-gray-400">연락처 : {myPageInfo.userPhone}</span>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                {
                                                    userNo == myPageInfo.userNo && (
                                                        <div className="flex mt-4 space-x-3 md:mt-6">  
                                                         <Link href={`/mypage/modify`}>
                                                            <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">정보 수정
                                                            </span>
                                                          </Link> 
                                                    </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </MajorityDiv>
                                <MajoritySubDiv>
                                </MajoritySubDiv>
                            </ContentRowDiv>
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