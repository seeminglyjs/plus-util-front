
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
import BackButton from "@/components/Etc/BackButton";
import { useState } from 'react';
import DefaultModal from "@/components/Modal/DefaultModal";
import WriteButton from "@/components/Notice/WriteButton";
import { useRouter } from "next/router";
import { CookieAndAuth } from "@/interface/Auth/CookieAndAuth";


interface NoticeWriteResponse {
    writeOk: boolean
}

type CookieState = {
    [key: string]: string;
  };

export default function NoticeWrite({ authData, cookie }: CookieAndAuth) {
    const { name, authorities, authenticated } = authData;
    console.log(cookie)
    // const cookies: { [key: string]: string } = {};
    // cookie.split(";").forEach((cookiePart:string) => {
    //   const [key, value] = cookiePart.trim().split("=");
    //   cookies[key] = value;
    // });  
    // const partialCookies: Partial<{ [key: string]: string }> = cookies;


    const router = useRouter()
    const currentNo = router.query.currentPage
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("notice");

    const getTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const getContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    }

    const getCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setContent(event.target.value);
    }

    // 게시글 작성전에 제목과 내용을 확인한다.
    const writeNotice = async () => {
        if (title.trim().length === 0 || content.trim().length === 0) {
            console.error('Title or content cannot be empty');
            setIsOpen(true);
            return;
        } else {//이상없으면
            const url = `${process.env.API_BASE_URL}/notice/write`
            const data = {
                noticeTitle: title,
                noticeContent: content,
                category: category,
                currentNo:currentNo
            };

            const response = await fetch(url, {
                method: 'POST',
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
                const noticeWriteResponse: NoticeWriteResponse = await response.json()
                if (!noticeWriteResponse.writeOk) {
                    setIsOpen(true);
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
                                    <input onChange={getTitle} type="text" id="small-input" className="block w-full p-2 text-white bg-plus300 rounded" placeholder="제목을 입력해주세요." />
                                </div>
                                <div className="my-3">
                                    <span>
                                        <select onChange={getCategory} id="countries" className="bg-plus300 text-white text-sm block p-1 rounded">
                                            <option value="notice">공지사항</option>
                                            <option value="updateNote">업데이트</option>
                                            <option value="etc">기타</option>
                                        </select>
                                    </span>
                                </div>
                                <div className="my-5">
                                    <textarea onChange={getContent} id="message" rows={30} className="block p-2.5 w-full text-sm text-white bg-plus300 rounded" placeholder="내용을 입력해주세요."></textarea>
                                </div>
                                <div>
                                    {
                                        authenticated && authorities[0].authority === 'ROLE_ADMIN' && (
                                            <WriteButton fetchNoticeInfo={writeNotice} ></WriteButton>
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
    // const cookie = req.headers.cookie || "";
    return {
        props: {
            authData,
        },
    };
};