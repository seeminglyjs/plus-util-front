
import BackButton from "@/components/Etc/Button/BackButton";
import Loading from "@/components/Etc/Loading";
import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import MajorityDiv from "@/components/Layout/MajorityDiv";
import MajoritySubDiv from "@/components/Layout/MajoritySubDiv";
import DefaultModal from "@/components/Modal/DefaultModal";
import CategorySpan from "@/components/Notice/CategorySpan";
import DeleteButton from "@/components/Notice/DeleteButton";
import UpdateButton from "@/components/Notice/UpdateButton";
import { DateDto } from "@/interface/Notice/DateDto";
import { DeleteNoticeResponseDto } from "@/interface/Notice/DeleteNoticeResponseDto";
import { NoticeDetailDto } from "@/interface/Notice/NoticeDetailDto";
import { NoticeDto } from "@/interface/Notice/NoticeDto";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';


export default function NoticeDetail() {
    const router = useRouter()
    const [noticeDetailSubDto, setNoticeDetailSubDto] = useState<NoticeDto>();
    const [updateRole, setUpdateRole] = useState(false);
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
                    },
                    credentials: 'include',
                })

                const noticeDetail: NoticeDetailDto = await response.json()

                setNoticeDetailSubDto(noticeDetail.noticeDto)
                setDateDto(noticeDetail.dateDto)
                setUpdateRole(current => noticeDetail.updateRoleCheck);
                if (!response.ok) {
                    throw new Error('Failed to fetch getNoticeDetail data');
                }
            }
        }
        getNoticeDetail(Number(noticeNo))

    }, [router.query])

    
    const deleteNotice =  async ()=> {
        const url = `${process.env.API_BASE_URL}/notice/remove`
        const data = {
            noticeNo : router.query.noticeNo,
            currentPage : router.query.currentPage
        };

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorMessage = `HTTP error! Status: ${response.status}`;
            console.error(errorMessage);
            return;
        } else {
            const deleteNoticeResponseDto: DeleteNoticeResponseDto = await response.json()
            if (!deleteNoticeResponseDto.deleteOk) {
                setIsOpen(true);
                setModalContent("게시글 삭제에 실패했습니다.")
            }else{
                router.push('/notice/list');
            }
        }
    }

    const updateNoticeLink = ()=>{
        router.push({
            pathname: `/notice/update/${noticeDetailSubDto?.noticeNo}`,
            query: { noticeNo: noticeDetailSubDto?.noticeNo,
                    // noticeTitle: noticeDetailSubDto?.title,
                    // noticeContent: noticeDetailSubDto?.content, 
                    // noticeCategory: noticeDetailSubDto?.category
                }
          },
          `/notice/update/${noticeDetailSubDto?.noticeNo}`
          )
    }


    let [isOpen, setIsOpen] = useState(false)
    let [modalTitle, setModalTitle] = useState("확인요청")
    let [modalContent, setModalContent] = useState("서버 요청 실패")
    let [modalButtonContetnt, setModalButtonContetnt] = useState("확인")

    function closeModal() {
        setIsOpen(false)
    }

    function openModal(title: string, content: string, buttonContent: string) {
        setModalTitle(current => title)
        setModalContent(current => content)
        setModalButtonContetnt(current => buttonContent)
        setIsOpen(true)
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
                                                {
                                                    updateRole && (
                                                        <span>
                                                            <UpdateButton noticeInfo={updateNoticeLink}></UpdateButton>
                                                            <DeleteButton fetchNoticeInfo={deleteNotice}></DeleteButton>
                                                        </span>
                                                    )
                                                }
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
                        <DefaultModal
                            isOpen={isOpen}
                            closeModal={closeModal}
                            title={modalTitle}
                            content={modalContent}
                            buttonContent={modalButtonContetnt}
                        />
                    </ContentRowDiv>
                </ContentColDiv>
            </MainSubDiv>
        </MainDiv>
    )
}