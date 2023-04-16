
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import { GetServerSideProps } from 'next';
import { AuthData } from "@/interface/Auth/AuthData";
import { fetchAuthData } from '@/function/auth/GetAuthencation';
import { ParsedUrlQuery } from 'querystring';
import { Props } from '@/interface/Auth/Props';
import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import MajoritySubDiv from "@/components/Layout/MajoritySubDiv";
import MajorityDiv from "@/components/Layout/MajorityDiv";
import BackButton from "@/components/Etc/Button/BackButton";
import { useState, useEffect } from 'react';
import DefaultModal from "@/components/Modal/DefaultModal";
import WriteButton from "@/components/Notice/WriteButton";
import { useRouter } from "next/router";
import { CookieAndAuth } from "@/interface/Auth/CookieAndAuth";
import { NoticeDetailDto } from "@/interface/Notice/NoticeDetailDto";
import { NoticeUpdateResponse } from "@/interface/Notice/NoticeUpdateResponse";


export default function NoticeWrite({ authData, cookie }: CookieAndAuth) {
    const { name, authorities, authenticated } = authData;
    const [entriesNavigationTimingType, setEntriesNavigationTiming] = useState("")
    const router = useRouter()
    
    if(authorities[0].authority !== "ROLE_ADMIN"){
        router.push("/notice/list")
    }
    const noticeNo = Number(router.query.noticeNo)

    useEffect(() => {
        const entries = performance.getEntriesByType("navigation")[0];
        const entriesNavigationTiming = entries as PerformanceNavigationTiming
        setEntriesNavigationTiming(entriesNavigationTiming.type)
      }, []);

    useEffect(()=>{
        const noticeNo = Number(router.query.noticeNo)

        async function getNoticeDetail(noticeNo:number) {
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

                setTitle(noticeDetail.noticeDto.title)
                setContent(noticeDetail.noticeDto.content)
                setCategory(noticeDetail.noticeDto.category);
                if (!response.ok) {
                    throw new Error('Failed to fetch getNoticeDetail data');
                }
            }
        }
        getNoticeDetail(Number(noticeNo))
    },[entriesNavigationTimingType, router.query.noticeNo])  

    const currentNo = router.query.currentPage
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("notice");

    const getTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const getContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(content)
        setContent(event.target.value);
    }

    const getCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    }


    // 게시글 작성전에 제목과 내용을 확인한다.
    const updateNotice = async () => {
        if (title.trim().length <= 1 || content.trim().length <= 1) {
            setModalContent("제목과 내용은 2글자 이상이어야 합니다.")
            setIsOpen(true);
            return;
        } else {//이상없으면
            const url = `${process.env.API_BASE_URL}/notice/update`
            const data = {
                noticeNo: noticeNo,
                noticeTitle: title,
                noticeContent: content,
                category: category,
            };

            const response = await fetch(url, {
                method: 'PUT',
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
                const noticeUpdateResponse: NoticeUpdateResponse = await response.json()
                if (!noticeUpdateResponse.updateOk) {
                    setIsOpen(true);    
                } else {
                    router.push(`/notice/detail/${noticeNo}`);
                }
            }
        }
    }

    let [isOpen, setIsOpen] = useState(false)
    let [modalTitle, setModalTitle] = useState("확인요청")
    let [modalContent, setModalContent] = useState("글 내용을 확인해주세요.")
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
                            <div className="py-15">
                                <div>
                                    <input onChange={getTitle} type="text" id="small-input" className="block w-full p-2 text-white bg-plus300 rounded" placeholder="제목을 입력해주세요." defaultValue={title}/>
                                </div>
                                <div className="my-3">
                                    <span>
                                        <select onChange={getCategory} id="countries" className="bg-plus300 text-white text-sm block p-1 rounded" defaultValue={category}>
                                            <option value="notice">공지사항</option>
                                            <option value="updateNote">업데이트</option>
                                            <option value="etc">기타</option>
                                        </select>
                                    </span>
                                </div>
                                <div className="my-5">
                                    <textarea onChange={getContent} id="message" rows={30} className="block p-2.5 w-full text-sm text-white bg-plus300 rounded" placeholder="내용을 입력해주세요." defaultValue={content}></textarea>
                                </div>
                                <div>
                                    {
                                        authenticated && authorities[0].authority === 'ROLE_ADMIN' && (
                                            <WriteButton fetchNoticeInfo={updateNotice} buttonContent="수정"></WriteButton>
                                        )
                                    }
                                    <BackButton></BackButton>
                                </div>
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

export const getServerSideProps: GetServerSideProps<Props, ParsedUrlQuery> = async ({ req }) => {
    const authData: AuthData = await fetchAuthData(req);
    return {
        props: {
            authData,
        },
    };
};