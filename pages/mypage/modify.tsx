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
import { DefaultClassNames } from "@/components/ClassName/DefaultClassName";
import { requestFetch } from "@/function/request/RequestFetch";


export default function MypageModiy({ authData, cookie }: CookieAndAuth) {
    const {userNo, userEmail, userRole, authenticated } = authData;
    const [userName, setUserName] = useState("");    
    const [userPhone, setUserPhone] = useState("");
    const [nickName, setNickName] = useState("");
    const [description, setDescription] = useState("");
    const [myPageInfo, setMyPageInfo] = useState({} as MyPageDto)

    const router = useRouter()

    const userNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if (value.length <= 50) setUserName(value);
    }

    const userPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if (value.length <= 50) setUserPhone(value);
    }

    const nickNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if (value.length <= 50) setNickName(value);
    }
    
    const descriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        if (value.length <= 200) setDescription(value);
    }


    const myPageModifyRequestSend = async () => {
            const path = `/my/modify/page`
            const data = {
                userNo: userNo,
                userName: userName,
                userPhone: userPhone,
                nickName: nickName,
                description: description,
                role: userRole,
            }
            const response: Response | null = await requestFetch('POST', path, data, 'application/json')
            if (response !== null) {
                router.push('/mypage/main') // Redirect to dashboard if authenticated
            }else{
                alert("마이페이지 수정 실패")
            }
    }

    useEffect(() => {
        async function getMyPage(userNo: number) {
            if (userNo < 1) router.push('/login')
            else {
                const url = `${process.env.API_BASE_URL}/my/page?userNo=${userNo}&viewPlus=no`

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
                    console.log(myPageDto)
                    if (myPageDto.userNo != -1) {
                        setUserName(myPageDto.userName)
                        setUserPhone(myPageDto.userPhone)
                        setNickName(myPageDto.nickName)
                        setDescription(myPageDto.description == null ? "" : myPageDto.description)
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
                (userNo === undefined || userNo === null) && (
                    <Loading></Loading>
                )
            }
            {
                (userNo !== undefined || userNo !== null) && (
                    <MainSubDiv>
                        <ContentColDiv>
                            <ContentRowDiv>
                                <MajoritySubDiv>
                                </MajoritySubDiv>
                                <MajorityDiv>
                                    <div className="flex justify-center pt-48 py-15">
                                        <div className={DefaultClassNames.FormMotherDiv}>
                                            <div className="py-8 px-4 mx-auto max-w-3xl">
                                                <div className="py-3 my-2 text-center">
                                                    <span className={DefaultClassNames.FormNameSpan}>마이페이지 정보 수정</span>
                                                </div>
                                                <form action="#">
                                                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                                        <div>
                                                            <label htmlFor="userName" className={DefaultClassNames.FormDefaultChangeLabel}>이름</label>
                                                            <input onChange={userNameChange} type="text" name="userName" id="userName" className={DefaultClassNames.FormDefaultChangeInput} placeholder="이름" value={userName || ''} />
                                                            <p className={DefaultClassNames.FormRegexSpanWhite}>{userName.length} 자 </p>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="userPhone" className={DefaultClassNames.FormDefaultChangeLabel}>연락처</label>
                                                            <input onChange={userPhoneChange} type="text" name="userPhone" id="userPhone" className={DefaultClassNames.FormDefaultChangeInput} placeholder="연락처" value={userPhone || ''} />
                                                            <p className={DefaultClassNames.FormRegexSpanWhite}> </p>
                                                        </div>
                                                        <div className="sm:col-span-2">
                                                            <label htmlFor="nickName" className={DefaultClassNames.FormDefaultChangeLabel}>닉네임</label>
                                                            <input onChange={nickNameChange} type="text" name="nickName" id="nickName" className={DefaultClassNames.FormDefaultChangeInput} placeholder="닉네임" value={nickName || ''} />
                                                            <p className={DefaultClassNames.FormRegexSpanWhite}>{nickName.length} 자 </p>
                                                        </div>
                                                        <div className="sm:col-span-2">
                                                            <label htmlFor="description" className={DefaultClassNames.FormDefaultChangeLabel}>텍스트</label>
                                                            <textarea rows={10} onChange={descriptionChange} id="aesContent" name="aesContent" className={DefaultClassNames.FormDefaultTextArea} placeholder="자신을 멋지게 표현해 보세요!"  value={description} ></textarea>
                                                            <p className={DefaultClassNames.FormRegexSpanWhite}>{description.length} 자  / 최대 200자</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <button onClick={myPageModifyRequestSend} type="button" className={DefaultClassNames.FormDefaultSendButton}>
                                                            수정
                                                        </button>
                                                    </div>
                                                </form>
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
    console.log(authData)
    return {
        props: {
            authData,
        },
    };
};