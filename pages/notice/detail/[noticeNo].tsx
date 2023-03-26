
import BackButton from "@/components/Etc/BackButton";
import Loading from "@/components/Etc/Loading";
import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import MajorityDiv from "@/components/Layout/MajorityDiv";
import MajoritySubDiv from "@/components/Layout/MajoritySubDiv";
import CategorySpan from "@/components/Notice/CategorySpan";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';


interface DateDto {
    day: string,
    time: string,
}

interface NoticeDto {
    noticeNo: number,
    title: string,
    content: string,
    writeDate: string,
    writer: string,
    category: string,
    subInfo1: string,
    subInfo2: string,
    subInfo3: string,
}

interface NoticeDetailDto {
    noticeDto: NoticeDto
    dateDto: DateDto
    updateRoleCheck: boolean

}

export default function NoticeDetail() {
    const router = useRouter()
    const [noticeDetailSubDto, setNoticeDetailSubDto] = useState<NoticeDto>();
    const [dateDto, setDateDto] = useState<DateDto>();

    useEffect(() => {
        const noticeNo = router.query.noticeNo
        const currentNo = router.query.currentPage

        async function getNoticeDetail(noticeNo: number) {
            const url = `${process.env.API_BASE_URL}/notice/detail?noticeNo=${noticeNo}`
            if (noticeNo !== undefined && !Number.isNaN(noticeNo)) {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                    }
                })

                const noticeDetail: NoticeDetailDto = await response.json()

                setNoticeDetailSubDto(noticeDetail.noticeDto)
                setDateDto(noticeDetail.dateDto)
                if (!response.ok) {
                    throw new Error('Failed to fetch getNoticeDetail data');
                }
            }
        }
        getNoticeDetail(Number(noticeNo))

    }, [router.query])

    return (
        <MainDiv>
            <MainSubDiv>
                <ContentColDiv>
                    <ContentRowDiv>
                        <MajoritySubDiv>
                        </MajoritySubDiv>
                        <MajorityDiv>
                            <div className="py-10">
                                {
                                    noticeDetailSubDto && (
                                    <div className="">
                                        <div className="border border-plus250 rounded" style={{ height: "650px" }}>
                                            <div className="py-4 px-5 mx-2 border-b-2 border-plus250 flex justify-between">
                                                <CategorySpan spanContent={noticeDetailSubDto.category}></CategorySpan>
                                                <h3 className="inline text-2xl">{noticeDetailSubDto?.title}</h3>
                                                <span className="pt-4 text-xs">{dateDto?.day} {dateDto?.time}</span>
                                            </div>
                                            <div className="py-5 px-5 mx-2">
                                                <p className="text-right text-sm">작성자:{noticeDetailSubDto.writer}</p>
                                            </div>
                                            <div className="py-5 px-5 mx-2">
                                                <p className="">
                                                {noticeDetailSubDto?.content}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="my-5">
                                            <BackButton></BackButton>
                                        </div>
                                    </div>
                                    )
                                }
                                {
                                    !noticeDetailSubDto && (
                                        <Loading></Loading>
                                    )
                                }
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