import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import Link from "next/link";
import { useState, useEffect } from 'react';
import MajorityDiv from '../../components/Layout/MajorityDiv';
import MajoritySubDiv from '../../components/Layout/MajoritySubDiv';
import { BiCaretLeft } from "react-icons/bi";
import { BiCaretRight } from "react-icons/bi";
import { NoticePageContentDto } from "@/interface/Notice/NoticePageContentDto";
import { NoticeDto } from "@/interface/Notice/NoticeDto";
import { useRouter } from "next/router";
import CategorySpan from "@/components/Notice/CategorySpan";
import { GetServerSideProps } from 'next';
import { AuthData } from '@/interface/Auth/AuthData';
import { fetchAuthData } from '@/function/auth/GetAuthencation';
import { Props } from '@/interface/Auth/Props';
import { ParsedUrlQuery } from "querystring";
import { BiPencil } from "react-icons/bi";



export default function NoticeList({ authData }: Props) {
    const { name, authorities, authenticated } = authData;

    const [currentPage, setCurrentPage] = useState(0);
    const [startPage, setStartPage] = useState(0);
    const [endPage, setEndPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [noticeList, setNoticeList] = useState<NoticePageContentDto[]>([]);

    useEffect(() => {
        async function getNoticeList(currentPage: number = 0) {
            const url = `${process.env.API_BASE_URL}/notice/list?currentPage=${currentPage}`
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch getNoticeList data');
            }

            const noticeDto: NoticeDto = await response.json();
            setNoticeList(noticeDto.noticePageList.content)
            setStartPage(current => noticeDto.startPage)
            setEndPage(current => noticeDto.endPage)
            setCurrentPage(current => noticeDto.currentPage)
            setTotalPage(current => noticeDto.totalPage)

        }
        getNoticeList(currentPage)
    }, [currentPage])

    function GoPage(pageNumber: number) {
        setCurrentPage(current => pageNumber)
    }


    return (
        <MainDiv>
            <MainSubDiv>
                <ContentColDiv>
                    <ContentRowDiv>
                        <MajoritySubDiv>
                        </MajoritySubDiv>
                        <MajorityDiv>
                            <div className="py-10">
                                <div className="rounded" style={{ height: "650px" }}>
                                    <table className="w-full text-sm text-left text-plus200">
                                        {/* <caption className="p-5 text-lg font-semibold text-left text-plus300 bg-plus200">
                                            PlusUtil 공지사항
                                            <p className="mt-1 text-sm font-normal text-plus300">. .</p>
                                        </caption> */}
                                        <thead className="text-xs text-center text-white uppercase bg-plusOrange">
                                            <tr>
                                                <th scope="col" className="px-1 py-3"></th>
                                                <th scope="col" className="px-4 py-3">
                                                    카테고리
                                                </th>
                                                <th scope="col" className="px-12 py-3">
                                                    제목
                                                </th>
                                                <th scope="col" className="px-5 py-3">
                                                    작성자
                                                </th>
                                                <th scope="col" className="px-5 py-3">
                                                    작성일
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                            {!noticeList && (
                                               <div className="text-center text-2xl"> 준비된 공지 사항이 없습니다. </div>
                                            )
                                            }
                                            {
                                                noticeList.map((notice) => (
                                                    <tr key={notice.noticeNo} className="bg-plus300">
                                                        <td className="px-1 py-4">
                                                            {notice.noticeNo}
                                                        </td>
                                                        <td className="px-4 py-4">
                                                           <CategorySpan spanContent={notice.category}></CategorySpan> 
                                                        </td>
                                                        <td className="px-12 py-4 cursor-pointer">
                                                            <Link href={`/notice/detail/${notice.noticeNo}`}>
                                                                {notice.title}
                                                            </Link>
                                                        </td>
                                                        <td className="px-5 py-4">
                                                            {notice.writer}
                                                        </td>
                                                        <td className="px-5 py-4">
                                                            {notice.writeDate.substring(0, 4) + "-"
                                                                + notice.writeDate.substring(4, 6) + "-"
                                                                + notice.writeDate.substring(6, 8)}
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                    <div className="text-right">
                                        {
                                            authenticated && (
                                                <Link href="/notice/write">
                                                    <button className="border border-plusOrange rounded text-plus200 hover:text-white py-1 px-2 mr-2"><BiPencil className="inline"></BiPencil> 글쓰기</button>
                                                </Link>
                                            )
                                        }
                                    </div>
                                {/* 페이징 처리 부분 */}
                                <div className="py-5 text-center">
                                    <BiCaretLeft onClick={() => currentPage !== 0 && GoPage(currentPage-1)} className={`${currentPage === 0 && "disabled: opacity-50"} inline mr-3 text-white ${currentPage !== 0 && "cursor-pointer"}` }></BiCaretLeft>
                                    {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                                        <span key={page + 1}>
                                            <span onClick={() => GoPage(page)} className={`${currentPage === page && "bg-plusOrange rounded-md"} px-3 py-2 leading-tight text-plus100 hover:text-plus100 cursor-pointer`}>
                                                {page + 1}
                                            </span>
                                        </span>
                                    ))}
                                    <BiCaretRight onClick={() => currentPage !== endPage && GoPage(currentPage+1)} className={`${currentPage === endPage && "disabled: opacity-50"} inline ml-3 text-white ${currentPage !== endPage && "cursor-pointer"}`}></BiCaretRight>
                                </div>

                            </div>
                        </MajorityDiv>
                        <MajoritySubDiv>
                        </MajoritySubDiv>
                    </ContentRowDiv>
                </ContentColDiv>
            </MainSubDiv>
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