import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import { useState, useEffect } from 'react';
import MajorityDiv from '../../components/Layout/MajorityDiv';
import MajoritySubDiv from '../../components/Layout/MajoritySubDiv';


interface NoticePageContentDto {
    noticeNo: number,
    title: string,
    content: string,
    writeDate: string,
    upDateDate?: string,
    writer: string,
    category: string,
    subInfo1?: string,
    subInfo2?: string,
    subInfo3?: string
}

interface NoticePageListDto {
    content: NoticePageContentDto[]
}

interface NoticeDto {
    pageExist: boolean,
    startPage: number,
    endPage: number,
    totalPage: number,
    noticePageList: NoticePageListDto
}


export default function NoticeList() {
    const [currentPage, setCurrentPage] = useState(0);
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
        }
        getNoticeList(currentPage)
    }, [currentPage])

    return (
        <MainDiv>
            <MainSubDiv>
                <ContentColDiv>
                    <ContentRowDiv>
                        <MajoritySubDiv>
                        </MajoritySubDiv>
                        <MajorityDiv>
                            <div className="py-10">
                                <div className="relative overflow-x-auto rounded">
                                    <table className="w-full text-sm text-left text-plus200">
                                        {/* <caption className="p-5 text-lg font-semibold text-left text-plus300 bg-plus200">
                                            PlusUtil 공지사항
                                            <p className="mt-1 text-sm font-normal text-plus300">. .</p>
                                        </caption> */}
                                        <thead className="text-xs text-center text-white uppercase bg-plusOrange">
                                            <tr>
                                                <th scope="col" className="px-1 py-3">
                                                
                                                </th>
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
                                            {
                                                noticeList.map((notice) => (
                                                    <tr key={notice.noticeNo} className="bg-plus300">
                                                        <td className="px-1 py-4">
                                                            {notice.noticeNo}
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            {notice.category}
                                                        </td>
                                                        <td className="px-12 py-4 cursor-pointer">
                                                            {notice.title}
                                                        </td>
                                                        <td className="px-5 py-4">
                                                            {notice.writer}
                                                        </td>
                                                        <td className="px-5 py-4">
                                                            {notice.writeDate.substring(0,4) + "-"
                                                            +notice.writeDate.substring(4,6) + "-"
                                                            +notice.writeDate.substring(6,8)}
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
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