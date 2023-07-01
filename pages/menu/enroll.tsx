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
    type: string,
    message: string

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
interface MenuNavRes {
    navNo: bigint,
    navName: string
}
interface MenuHeadRes {
    navNo: bigint,
    headNo: bigint,
    navName: string,
    headName: string
}
interface MenuRes {
    menuNo: bigint,
    headNo: bigint,
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
    const [navNo, setNavNo] = useState(0)
    const [headName, setHeadName] = useState("")
    const [headNo, setHeadNo] = useState(0)
    const [menuName, setMenuName] = useState("")
    const [navList, setNavList] = useState<MenuNavRes[]>([])
    const [headList, setHeadList] = useState<MenuHeadRes[]>([])
    const [menuList, setMenuList] = useState<MenuRes[]>([])
    const router = useRouter()


    const menuTypeChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setMenuType(value);
        if (value === "nav") {
            setDynamicInputs(navInput)
        } else if (value === "head") {
            if (navList.length !== 0) {
                setDynamicInputs(headInput)
            } else {
                event.target.value = "nav"
                setDynamicInputs(navInput)
                setMenuType("nav")
                openModal("확인", "네비게이션 정보를 우선 등록해주세요.", "확인")
            }
        } else {//menu
            if (headList.length !== 0) {
                setDynamicInputs(menuInput)
            } else {
                event.target.value = "nav"
                setDynamicInputs(navInput)
                setMenuType("nav")
                openModal("확인", "주 메뉴 정보를 우선 등록해주세요.", "확인")
            }
        }
    }

    function trimmedStrLenCheck10(str:string){
        const trimmedStr = str.replace(/\s/g, "") // 정규식을 사용하여 공백 제거
        const length = trimmedStr.length
        if(length < 5){
            return false
        }else{
            return true
        }
    }

    const navNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length <= 20) setNavName(value);
    }
    const navNameSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        const parts = value.split('_');
        if(parts.length < 2 || parts.length > 2){
            openModal("Error!", "메뉴 등록 시스템에 문제가 있습니다.", "확인")
        }else{
            setNavNo(parseInt(parts[0]))
            setNavName(parts[1]);
        }
    }
    const headNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length <= 20) setHeadName(value);
    }
    const headNameSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        const parts = value.split('_');
        if(parts.length < 2 || parts.length > 2){
            openModal("Error!", "메뉴 등록 시스템에 문제가 있습니다.", "확인")
        }else{
            setHeadNo(parseInt(parts[0]))
            setHeadName(parts[1]);
        }
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
                    <option key={String(nav.navNo)} value={nav.navNo+"_"+nav.navName}>{nav.navName}</option>
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
                {headList.map((head) => (
                    <option key={String(head.headNo)} value={head.headNo+"_"+headName}>{head.headName}</option>
                ))}
            </select>
        </div>),

        (<div key="menuInputMenuName">
            <label htmlFor="menuName" className={DefaultClassNames.FormDefaultChangeLabel}>메뉴명</label>
            <input onChange={menuNameChange} type="text" name="menuName" id="menuName" className={DefaultClassNames.FormDefaultChangeInputSmall} placeholder="menu" />
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
            if(trimmedStrLenCheck10(navName)){
                data = {
                    type: "nav",
                    menuObject: { navName: navName }
                }
            }else{
                openModal("입력값 확인", "네비게이션 명은 5 ~ 20 자 사이입니다.", "확인")
                return
            }
        } else if (menuType === "head") {
            if(trimmedStrLenCheck10(headName)){
                data = {
                    type: "head",
                    menuObject: { 
                        headName: headName, 
                        navName: navName,
                        navNo : navNo
                    }
                };
            }else{
                openModal("입력값 확인", "주메뉴 명은 5 ~ 20 자 사이입니다.", "확인")
                return
            }
            
        } else { // 메뉴 타입일 경우
            if(trimmedStrLenCheck10(menuName)){
                data = {
                    type: "menu",
                    menuObject: {
                        headName: headName,
                        headNo : headNo,
                        menuName: menuName,
                        url: urlPath
                    }
                };
            }else{
                openModal("입력값 확인", "메뉴 명은 5 ~ 20 자 사이입니다.", "확인")
                return
            }
            
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
                openModal("성공", menuEnrollResponseDto.message, "확인")
            } else {
                openModal("실패", menuEnrollResponseDto.message, "확인")
            }
        }
    }

    const getSomeMenuList = async (name: string) => {
        const url = `${process.env.API_BASE_URL}/${name}/list`
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
            if (name === "nav") {
                const menuNavList: MenuNavRes[] = await response.json()
                setNavList(menuNavList)
                if(menuNavList.length > 0){
                    setNavNo(Number(menuNavList[0].navNo))
                }
            } else if (name === "head") {
                const menuHeadList: MenuHeadRes[] = await response.json()
                setNavList(menuHeadList)
                if(menuHeadList.length > 0){
                    setHeadNo(Number(menuHeadList[0].headNo))
                }
                setHeadList(menuHeadList)
            } else if (name === "menu") {
                const menuList: MenuRes[] = await response.json()
                setMenuList(menuList)
            }
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
        getSomeMenuList("nav")
        getSomeMenuList("head")
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
        getSomeMenuList("nav")
        getSomeMenuList("head")
        //getSomeMenuList("menu")
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