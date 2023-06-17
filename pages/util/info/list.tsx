import Loading from "@/components/Etc/Loading";
import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import MajorityDiv from "@/components/Layout/MajorityDiv";
import MajoritySubDiv from "@/components/Layout/MajoritySubDiv";
import { fetchAuthData } from "@/function/auth/GetAuthencation";
import { AdminRoleResponseDto } from "@/interface/Admin/AdminRoleResponseDto";
import { AuthData } from "@/interface/Auth/AuthData";
import { Props } from "@/interface/Auth/Props";
import { UtilInfoDto } from "@/interface/Util/Info/UtilInfoDto";
import { UtilInfoGetResponseDto } from "@/interface/Util/Info/UtilInfoGetResponseDto";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from 'react';
import { BiCaretLeft, BiCaretRight, BiPencil } from "react-icons/bi";

export default function UtilList({ authData }: Props) {
    const { name, authorities, authenticated } = authData;
    const router = useRouter()
    const [utilName, setUtilName] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [startPage, setStartPage] = useState(0);
    const [endPage, setEndPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [isEmpty, setIsEmpty] = useState(true);
    const [utilInfoList, setUtilInfoList] = useState<UtilInfoDto[]>([]);


    useEffect(() => {
        if (authData.authorities[0].authority !== 'ROLE_ADMIN') {
            router.push('/') // Redirect to dashboard if authenticated
        }
    }, [authData, authenticated, router])

    useEffect(() => {
        getUtilInfoList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getUtilInfoList = async () => {
        const url = `${process.env.API_BASE_URL}/util/info/list?utilName=${utilName}`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorMessage = `HTTP error! Status: ${response.status}`;
            console.error(errorMessage);
            return;
        } else {
            const adminRoleResponseDto: AdminRoleResponseDto = await response.json();
            const utilInfoGetResponseDto: UtilInfoGetResponseDto = adminRoleResponseDto.dto as UtilInfoGetResponseDto
            setIsEmpty(utilInfoGetResponseDto.isEmpty);
            setUtilInfoList(utilInfoGetResponseDto.utilInfoDtoList)
            console.log(utilInfoGetResponseDto);
        }
    }

    function GoPage(pageNumber: number) {
        setCurrentPage(current => pageNumber)
    }

    return (
        <MainDiv>
            {
                authData.authorities[0].authority !== 'ROLE_ADMIN' && (
                    <Loading></Loading>
                )
            }
            {
                authData.authorities[0].authority === 'ROLE_ADMIN' && (
                    <MainSubDiv>
                        <ContentColDiv>
                            <ContentRowDiv>
                                <MajoritySubDiv>
                                </MajoritySubDiv>
                                <MajorityDiv>
                                    <div className="py-10">
                                        <div className="rounded" style={{ height: "650px" }}>
                                            <table className="w-full text-sm text-left text-plus200">
                                                <thead className="text-xs text-center text-white uppercase bg-plusOrange">
                                                    <tr>
                                                        <th scope="col" className="px-1 py-3"></th>
                                                        <th scope="col" className="px-5 py-3">
                                                            카테고리
                                                        </th>
                                                        <th scope="col" className="px-12 py-3">
                                                            유틸명
                                                        </th>
                                                        <th scope="col" className="px-4 py-3">
                                                            주제
                                                        </th>
                                                        <th scope="col" className="px-5 py-3">
                                                            등록일
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-center">
                                                    {!utilInfoList && (
                                                        <div className="text-center text-2xl"> 등록된 유틸정보가 없습니다. </div>
                                                    )
                                                    }
                                                    {
                                                        utilInfoList.map((utilInfo) => (
                                                            <tr key={utilInfo.utilNo.toString()} className="bg-plus300">
                                                                <td className="px-1 py-4">
                                                                    {utilInfo.utilNo.toString()}
                                                                </td>
                                                                <td className="px-4 py-4">
                                                                    <span>{utilInfo.category}</span>
                                                                </td>
                                                                <td className="px-12 py-4 cursor-pointer">
                                                                    <Link href={`/util/info/detail/${utilInfo.utilNo.toString()}?currentPage=${currentPage}`}>
                                                                        {utilInfo.utilName}
                                                                    </Link>
                                                                </td>
                                                                <td className="px-5 py-4">
                                                                    {utilInfo.subject}
                                                                </td>
                                                                <td className="px-5 py-4">
                                                                    {utilInfo.utilEnrollDate.substring(0, 4) + "-"
                                                                        + utilInfo.utilEnrollDate.substring(4, 6) + "-"
                                                                        + utilInfo.utilEnrollDate.substring(6, 8)}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="text-right">
                                            {
                                                authenticated && authorities[0].authority === 'ROLE_ADMIN' && (
                                                    <span>
                                                        <Link href={`/util/info/enroll?currentPage=${currentPage}`}>
                                                            <button className="border border-gray-400 rounded text-white py-1 px-2 mr-2"><BiPencil className="inline"></BiPencil> 유틸등록</button>
                                                        </Link>
                                                        <Link href={`/admin/main`}>
                                                            <button className="border border-gray-400 rounded text-white py-1 px-2 mr-2">관리자메인</button>
                                                        </Link>
                                                    </span>
                                                )
                                            }
                                        </div>
                                        {/* 페이징 처리 부분 */}
                                        <div className="py-5 text-center">
                                            <BiCaretLeft onClick={() => currentPage !== 0 && GoPage(currentPage - 1)} className={`${currentPage === 0 && "disabled: opacity-50"} inline mr-3 text-white ${currentPage !== 0 && "cursor-pointer"}`}></BiCaretLeft>
                                            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                                                <span key={page + 1}>
                                                    <span onClick={() => GoPage(page)} className={`${currentPage === page && "bg-plusOrange rounded-md"} px-3 py-2 leading-tight text-plus100 hover:text-plus100 cursor-pointer`}>
                                                        {page + 1}
                                                    </span>
                                                </span>
                                            ))}
                                            <BiCaretRight onClick={() => currentPage !== endPage && GoPage(currentPage + 1)} className={`${currentPage === endPage && "disabled: opacity-50"} inline ml-3 text-white ${currentPage !== endPage && "cursor-pointer"}`}></BiCaretRight>
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