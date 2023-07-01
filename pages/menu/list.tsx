import { Props } from "@/interface/Auth/Props";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchAuthData } from '@/function/auth/GetAuthencation';
import { AuthData } from "@/interface/Auth/AuthData";
import { ParsedUrlQuery } from "querystring";
import MajorityDiv from "@/components/Layout/MajorityDiv";
import MajoritySubDiv from "@/components/Layout/MajoritySubDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import ContentColDiv from "@/components/Layout/ContentColDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import MainDiv from "@/components/Layout/MainDiv";
import { BiCaretLeft, BiCaretRight, BiPencil } from "react-icons/bi";
import Link from "next/link";
import Loading from "../test";


interface NavInfoDto {
    navNo : bigint
    navName : string
    headNo : string
    headName : string
    menuNo : bigint
    menuName : string
    url : string
}


export default function MenuList({ authData }: Props) {
    const { name, authorities, authenticated } = authData;
    const router = useRouter()
    const [navInfoList, setNavInfoList] = useState<NavInfoDto[]>([]);


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
        const url = `${process.env.API_BASE_URL}/menu/join/list`
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
            const navList: NavInfoDto[] = await response.json()
            console.log(navList)
            setNavInfoList(navList)
        }
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
                                                        <th scope="col" className="px-12 py-3">
                                                            네비게이션명
                                                        </th>
                                                        <th scope="col" className="px-4 py-3">
                                                            주메뉴명
                                                        </th>
                                                        <th scope="col" className="px-5 py-3">
                                                            메뉴명
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-center">
                                                    {!navInfoList && (
                                                        <div className="text-center text-2xl"> 등록된 메뉴 정보가 없습니다. </div>
                                                    )
                                                    }
                                                    {
                                                        navInfoList.map((menuInfo) => (
                                                            <tr key={menuInfo.navNo.toString()} className="bg-plus300">
                                                                <td className="px-1 py-4">
                                                                    {menuInfo.navNo.toString()}
                                                                </td>
                                                                <td className="px-4 py-4">
                                                                    <span>{menuInfo.navName}</span>
                                                                </td>
                                                                <td className="px-12 py-4 cursor-pointer">
                                                                    <Link href={`/menu/detail/${menuInfo.headNo.toString()}`}>
                                                                        {menuInfo.headName}
                                                                    </Link>
                                                                </td>
                                                                <td className="px-5 py-4">
                                                                    {menuInfo.menuName}
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
                                                        <Link href={`/menu/enroll`}>
                                                            <button className="border border-gray-400 rounded text-white py-1 px-2 mr-2"><BiPencil className="inline"></BiPencil> 메뉴등록</button>
                                                        </Link>
                                                        <Link href={`/admin/main`}>
                                                            <button className="border border-gray-400 rounded text-white py-1 px-2 mr-2">관리자메인</button>
                                                        </Link>
                                                    </span>
                                                )
                                            }
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