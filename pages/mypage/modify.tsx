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
import Link from "next/link";
import { MyPageDto } from "@/interface/myPage/MyPageDto";
import { DefaultClassNames } from "@/components/ClassName/DefaultClassName";
import { requestFetch } from "@/function/request/RequestFetch";
import HalfAndHalfDiv from "@/components/Layout/HalfAndHalfDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import { MouseEvent } from 'react';
import { InputRegex } from "@/components/Regex/InputRegex";
import { InputRegexFunction } from "@/components/Regex/InputRegexFunction";


export default function MypageModiy({ authData, cookie }: CookieAndAuth) {
    const { userNo, userEmail, userRole, authenticated } = authData;
    const [userName, setUserName] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [nickName, setNickName] = useState("");
    const [description, setDescription] = useState("");

    const [nowPassword, setNowPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordCheck, setNewPasswordCheck] = useState("");

    const [myPageInfo, setMyPageInfo] = useState({} as MyPageDto)

    const [showMypageModify, setShowMypageModify] = useState(true);
    const [showMypageModifyClassName, setShowMypageModifyClassName] = useState(DefaultClassNames.listGroupDefaultASelected);
    const [showSecurityModify, setShowSecurityModify] = useState(false);
    const [showSecurityModifyClassName, setShowSecurityModifyClassName] = useState(DefaultClassNames.listGroupDefaultA);
    const [showChangePassword, setShowChangePassword] = useState(false);

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


    const nowPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if (value.length <= 20) setNowPassword(value);
    }

    const newPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if (value.length <= 20) setNewPassword(value);
    }

    const newPasswordCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if (value.length <= 20) setNewPasswordCheck(value);
    }


    const showMyPageModifyFn = async (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); //a 태그 동작 막기
        setShowSecurityModify(false)
        setShowChangePassword(false)
        setShowSecurityModifyClassName(DefaultClassNames.listGroupDefaultA)

        setShowMypageModify(true)
        setShowMypageModifyClassName(DefaultClassNames.listGroupDefaultASelected)
    }

    const showSecurityModifyFn = async (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); //a 태그 동작 막기
        setShowMypageModify(false)
        setShowChangePassword(false)
        setShowMypageModifyClassName(DefaultClassNames.listGroupDefaultA)

        setShowSecurityModify(true)
        setShowSecurityModifyClassName(DefaultClassNames.listGroupDefaultASelected)
    }

    const showChangePasswordFn = async (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); //a 태그 동작 막기
        setShowMypageModify(false)
        setShowSecurityModify(false)

        setShowChangePassword(true)
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
        } else {
            alert("마이페이지 수정 실패")
        }
    }

    const passwordChangeSend = async () => {
        if(newPassword === newPasswordCheck && InputRegexFunction(newPassword, InputRegex.LoginPassword)){
        // const path = `/my/modify/page`
        // const data = {
        //     userNo: userNo,
        //     userName: userName,
        //     userPhone: userPhone,
        //     nickName: nickName,
        //     description: description,
        //     role: userRole,
        // }
        // const response: Response | null = await requestFetch('POST', path, data, 'application/json')
        // if (response !== null) {
        //     router.push('/mypage/main') // Redirect to dashboard if authenticated
        // } else {
        //     alert("마이페이지 수정 실패")
        // }
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
                                <HalfAndHalfDiv>
                                    <div className="pt-48 py-15">
                                        <div className="py-3 my-2 text-center">
                                            <span className="text-xl font-bold text-white text-center mr-1">정보 수정</span>
                                        </div>
                                        <div className={DefaultClassNames.listGroupDefaultDiv}>
                                            <a href="" onClick={(event) => showMyPageModifyFn(event)} className={showMypageModifyClassName}>
                                                프로필 정보 수정
                                            </a>
                                            <a href="" onClick={(event) => showSecurityModifyFn(event)} className={showSecurityModifyClassName}>
                                                보안 설정
                                            </a>
                                            {/* <a href=""  className={DefaultClassNames.listGroupDefaultA}>
                                            이력 관리
                                        </a> */}
                                        </div>
                                    </div>
                                </HalfAndHalfDiv>
                                <HalfDiv>
                                    {(showMypageModify) && (
                                        <div className="pt-48 py-15">
                                            <div className={DefaultClassNames.FormMotherDiv}>
                                                <div className="py-8 px-4 mx-auto max-w-3xl">
                                                    <div className="py-3 my-2 text-center">
                                                        <span className={DefaultClassNames.FormNameSpan}>프로필 정보 수정</span>
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
                                                                <textarea rows={10} onChange={descriptionChange} id="aesContent" name="aesContent" className={DefaultClassNames.FormDefaultTextArea} placeholder="자신을 멋지게 표현해 보세요!" value={description} ></textarea>
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
                                    )}
                                    {(showSecurityModify) && (
                                        <div className="pt-48 py-15">
                                            <div className={DefaultClassNames.FormMotherDiv}>
                                                <div className="py-8 px-4 mx-auto max-w-3xl">
                                                    <div className="py-3 my-2 text-center">
                                                        <span className={DefaultClassNames.FormNameSpan}>보안 설정</span>
                                                    </div>
                                                    <form action="#">
                                                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                                            <div className="sm:col-span-2 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                                                                <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                                                                    기본 보안 설정
                                                                </h5>
                                                                <ul className="my-4 space-y-3">
                                                                    <li>
                                                                        <a onClick={showChangePasswordFn} href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                                                            <span className="flex-1 ml-3 whitespace-nowrap">비밀번호 변경</span>
                                                                            <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">설정</span>
                                                                        </a>
                                                                    </li>
                                                                    {/* <li>
                                                                        <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                                                            <span className="flex-1 ml-3 whitespace-nowrap">2차 인증</span>
                                                                            <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span>
                                                                        </a>
                                                                    </li> */}
                                                                </ul>
                                                            </div>

                                                            {/* <div>
                                                                <label htmlFor="overseasBlock" className={DefaultClassNames.FormDefaultChangeLabel}>해외 아이피 차단</label>
                                                                <select id="overseasBlock" name="overseasBlock" className={DefaultClassNames.FormDefaultChangeSelect}>
                                                                    <option value="y">허용</option>
                                                                    <option value="n">차단</option>
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="ipBlock" className={DefaultClassNames.FormDefaultChangeLabel}>아이피 차단 추가</label>
                                                                <input type="text" name="ipBlock" id="ipBlock" className={DefaultClassNames.FormDefaultChangeInput} placeholder="ex) 10.10.10.10" value={''} />
                                                            </div> */}
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
                                    )}
                                    {(showChangePassword) && (
                                        <div className="pt-48 py-15">
                                            <div className={DefaultClassNames.FormMotherDiv}>
                                                <div className="py-8 px-4 mx-auto max-w-3xl">
                                                    <div className="py-3 my-2 text-center">
                                                        <span className={DefaultClassNames.FormNameSpan}>비밀번호 설정</span>
                                                    </div>
                                                    <form action="#">
                                                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                                            <div className="sm:col-span-2">
                                                                <label htmlFor="nowPassword" className={DefaultClassNames.FormDefaultChangeLabel}>현재 비밀번호</label>
                                                                <input onChange={nowPasswordChange} type="password" name="nowPassword" id="nowPassword" className={DefaultClassNames.FormDefaultChangeInput} placeholder="현재 비밀번호" value={nowPassword || ''}/>
                                                                <p className={DefaultClassNames.FormRegexSpanWhite}>{nickName.length} 자 </p>
                                                            </div>
                                                            <div className="sm:col-span-2">
                                                                <label htmlFor="newPassword" className={DefaultClassNames.FormDefaultChangeLabel}>변경 비밀번호</label>
                                                                <input onChange={newPasswordChange} type="password" name="newPassword" id="newPassword" className={DefaultClassNames.FormDefaultChangeInput} placeholder="변경 비밀번호" value={newPassword || ''} />
                                                                <p className={DefaultClassNames.FormRegexSpanWhite}>{nickName.length} 자 </p>
                                                            </div>
                                                            <div className="sm:col-span-2">
                                                                <label htmlFor="newPasswordCheck" className={DefaultClassNames.FormDefaultChangeLabel}>변경 비밀번호 확인</label>
                                                                <input onChange={newPasswordCheckChange} type="password" name="newPasswordCheck" id="newPasswordCheck" className={DefaultClassNames.FormDefaultChangeInput} placeholder="변경 비밀번호 확인" value={newPasswordCheck || ''} />
                                                                <p className={DefaultClassNames.FormRegexSpanWhite}>{nickName.length} 자 </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-center">
                                                            <button onClick={passwordChangeSend} type="button" className={DefaultClassNames.FormDefaultSendButton}>
                                                                변경
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </HalfDiv>
                                <HalfAndHalfDiv>
                                </HalfAndHalfDiv>
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