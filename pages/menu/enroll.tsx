import MainDiv from "@/components/Layout/MainDiv";
import { InputRegex } from "@/components/Regex/InputRegex";
import { InputRegexFunction } from "@/components/Regex/InputRegexFunction";
import { Props } from "@/interface/Auth/Props";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../test";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import HalfAndHalfDiv from "@/components/Layout/HalfAndHalfDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import { DefaultClassNames } from "@/components/ClassName/DefaultClassName";
import Link from "next/link";
import DefaultModal from "@/components/Modal/DefaultModal";
import { GetServerSideProps } from "next";
import { AuthData } from "@/interface/Auth/AuthData";
import { fetchAuthData } from "@/function/auth/GetAuthencation";
import { ParsedUrlQuery } from "querystring";
import { BiEditAlt } from "react-icons/bi";
import React from "react";

interface MenuEnrollResponseDto {
    success: boolean,
    menuObject: object,
    type: string
}

interface MenuNav {
    navName: string
}
interface MenuHead {
    navNo: bigint,
    navName: string,
    headName: string
}
interface Menu {
    headName: string,
    menuName: string,
    url: string,
}

export default function MenuList({ authData }: Props) {
    const { name, authorities, authenticated } = authData
    const [dynamicInputs, setDynamicInputs] = useState<JSX.Element[]>([]);
    const [menuType, setMenuType] = useState("nav") //nav | head | menu

    const [urlPath, setUrlPath] = useState("")
    const [navName, setNavName] = useState("")
    const [headName, setHeadName] = useState("")
    const [menuName, setMenuName] = useState("")
    const [navList, setNavList] = useState<MenuNav[]>([])
    const router = useRouter()


    const menuTypeChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setMenuType(value);
        if (value === "nav") {
            setDynamicInputs(navInput)
        } else if (value === "head") {
            if (navList.length !== 0) {
                setDynamicInputs(headInput)
            }else{
                setMenuType("nav")
            }
        } else {//menu
            setDynamicInputs(menuInput)
        }
    }


    const navNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length <= 20) setNavName(value);
    }
    const navNameSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setNavName(value);
    }
    const headNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length <= 20) setHeadName(value);
    }
    const headNameSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setHeadName(value);
    }
    const menuNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length <= 20) setMenuName(value);
    }
    const urlPathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length <= 200) setUrlPath(value);
    }

    const navInput: JSX.Element[] = [
        (<div key="navInputHeadName" className="sm:col-span-2">
            <label htmlFor="navName" className={DefaultClassNames.FormDefaultChangeLabel}>네비게이션명</label>
            <input onChange={navNameChange} type="text" name="navName" id="navName" className={DefaultClassNames.FormDefaultChangeInputSmall} placeholder="nav" />
        </div>)
    ]

    const headInput: JSX.Element[] = [
        (<div key="headInputNavName">
            <label htmlFor="navName" className={DefaultClassNames.FormDefaultChangeLabel}>네비게이션명</label>
            <select onChange={navNameSelectChange} id="navName" name="navName" className={DefaultClassNames.FormDefaultChangeSelect}>
                {navList.map((nav) => (
                    <option key={nav.navName} value={nav.navName}>{nav.navName}</option>
                ))}
            </select>
        </div>),

        (<div key="headInputHeadName">
            <label htmlFor="headName" className={DefaultClassNames.FormDefaultChangeLabel}>주 메뉴명</label>
            <input onChange={headNameChange} type="text" name="headName" id="headName" className={DefaultClassNames.FormDefaultChangeInputSmall} placeholder="head" />
        </div>)
    ]

    const menuInput: JSX.Element[] = [
        (<div key="menuInputNavName" className="sm:col-span-2">
            <label htmlFor="headName" className={DefaultClassNames.FormDefaultChangeLabel}>주 메뉴명</label>
            <select onChange={headNameSelectChange} id="headName" name="headName" className={DefaultClassNames.FormDefaultChangeSelect}>
                <option value="nav">네비게이션</option>
                <option value="head">주메뉴</option>
                <option value="menu">메뉴</option>
            </select>
        </div>),

        (<div key="menuInputMenuName">
            <label htmlFor="menuName" className={DefaultClassNames.FormDefaultChangeLabel}>메뉴명</label>
            <input onChange={headNameChange} type="text" name="menuName" id="menuName" className={DefaultClassNames.FormDefaultChangeInputSmall} placeholder="menu" />
        </div>),

        (<div key="menuInputUrlPath">
            <label htmlFor="urlPath" className={DefaultClassNames.FormDefaultChangeLabel}>url</label>
            <input onChange={urlPathChange} type="text" name="urlPath" id="urlPath" className={DefaultClassNames.FormDefaultChangeInputSmall} placeholder="url" />
        </div>)
    ]


    const enrollMenuInfo = async () => {
        if (menuType === "menu") { //url 경로는 메뉴타입일 때만 체크하면 된다.
            if (!InputRegexFunction(urlPath, InputRegex.UrlPath)) {
                openModal("입력값 확인", "잘못된 URL 경로 입니다.", "확인")
                return false;
            }
        }
        let data = {};
        const url = `${process.env.API_BASE_URL}/menu/enroll`
        if (menuType === "nav") {
            data = {
                type: "nav",
                menuObject: { navName: navName }
            };
        } else if (menuType === "head") {
            data = {
                type: "head",
                menuObject: { headName: headName, navName: navName }
            };
        } else { // 메뉴 타입일 경우
            data = {
                type: "menu",
                menuObject: {
                    headName: headName,
                    menuName: menuName,
                    url: urlPath
                }
            };
        }

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
            openModal("실패", errorMessage, "확인")
            return;
        } else {
            const menuEnrollResponseDto: MenuEnrollResponseDto = await response.json();
            if (menuEnrollResponseDto.success) {
                openModal("성공", "등록요청이 성공했습니다!", "확인")
            } else {
                openModal("실패", "이미 등록된 건이거나 \n 등록 중 오류가 발생했습니다.", "확인")
            }
        }
    }

    const getNavList = async () => {
        const url = `${process.env.API_BASE_URL}/nav/list`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            },
            credentials: 'include'
        });
        if (!response.ok) {
            const errorMessage = `HTTP error! Status: ${response.status}`;
            console.error(errorMessage);
            openModal("실패", errorMessage, "확인")
            return []
        } else {
            const menuNavList: MenuNav[] = await response.json()
            setNavList(menuNavList)
        }
    }


    let [isOpen, setIsOpen] = useState(false)
    let [modalTitle, setModalTitle] = useState("확인요청")
    let [modalContent, setModalContent] = useState("정보를 확인해주세요.")
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

    useEffect(() => {
        if (authData.authorities[0].authority !== 'ROLE_ADMIN') {
            router.push('/') // Redirect to dashboard if authenticated
        }
    }, [authData, authenticated, router])

    useEffect(() => {
        setDynamicInputs(navInput)
        getNavList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                                <HalfAndHalfDiv>
                                </HalfAndHalfDiv>
                                <HalfDiv>
                                    <div className="pt-48 py-15">
                                        <div className="border border-gray-700 rounded-3xl py-8 px-4">
                                            <div className="py-8 px-4 mx-auto max-w-3xl">
                                                <div className="py-3 my-2 text-center">
                                                    <span className="text-xl font-bold text-white text-center mr-1">메뉴 정보 등록</span><BiEditAlt className="inline-block text-xl font-bold text-white mb-2 hover:animate-pulse"></BiEditAlt>
                                                </div>
                                                <form action="#">
                                                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                                        <div className="sm:col-span-2">
                                                            <label htmlFor="menuType" className={DefaultClassNames.FormDefaultChangeLabel}>메뉴 타입</label>
                                                            <select onChange={menuTypeChange} id="menuType" name="menuType" className={DefaultClassNames.FormDefaultChangeSelect}>
                                                                <option value="nav">네비게이션</option>
                                                                <option value="head">주메뉴</option>
                                                                <option value="menu">메뉴</option>
                                                            </select>
                                                        </div>
                                                        {dynamicInputs.map((input, index) => (
                                                            <React.Fragment key={index}>{input}</React.Fragment>
                                                        ))}
                                                    </div>
                                                    <div className="text-center">
                                                        {
                                                            authenticated && authorities[0].authority === 'ROLE_ADMIN' && (
                                                                <button onClick={enrollMenuInfo} type="button" className={DefaultClassNames.FormDefaultSendButton}>
                                                                    등록
                                                                </button>
                                                            )
                                                        }
                                                        <span className="mx-2"></span>
                                                        <Link href={"/admin/main"}>
                                                            <button type="button" className={DefaultClassNames.FormDefaultSendButton}>
                                                                관리자메인
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <DefaultModal
                                        isOpen={isOpen}
                                        closeModal={closeModal}
                                        title={modalTitle}
                                        content={modalContent}
                                        buttonContent={modalButtonContetnt}
                                    />
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
    return {
        props: {
            authData,
        },
    };
};