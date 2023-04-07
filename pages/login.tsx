
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import Button from "@/components/Navbar/Button";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import ContentColDiv from '../components/Layout/ContentColDiv';
import HalfAndHalfDiv from '../components/Layout/HalfAndHalfDiv';


import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Loading from "@/components/Etc/Loading";
import { Props } from '../interface/Auth/Props';
import { AuthData } from '../interface/Auth/AuthData';
import { fetchAuthData } from "@/function/auth/GetAuthencation";
import Footer from '../components/Footer/Footer';
import DefaultModal from "@/components/Modal/DefaultModal";


export default function Login({ authData }: Props) {
    const { name, authorities, authenticated } = authData;

    const [email, setEmail] = useState("");
    const [vaildEmail, SetVaildEmail] = useState(false);
    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    function handleChangeEmail
        (event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setEmail(value);
        SetVaildEmail(validateEmail(value));
    }

    const [password, setPassword] = useState("");
    const [vaildPassword, setVaildPassword] = useState(false);
    function validatePassword(password: string) {
        const regex = /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
        // const regex = /^\d{8,}$/;
        return regex.test(password);
    }
    function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setPassword(value);
        setVaildPassword(validatePassword(value));
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

    const router = useRouter()

    useEffect(() => {
        if (authenticated) {
            router.push('/') // Redirect to dashboard if authenticated
        }
    }, [authData, authenticated, router])

    return (
        <div>
            <MainDiv>
                <MainSubDiv>
                    <ContentColDiv>
                        <ContentRowDiv>
                            <HalfAndHalfDiv>
                            </HalfAndHalfDiv>
                            <HalfDiv>
                                {!authenticated && (
                                    <div className="pt-48 py-64">
                                        <div className="mx-auto max-w-md p-10 border border-white rounded-3xl">
                                            <form method="post" action={`${process.env.API_BASE_URL}/login/action`}>
                                                <div className="mb-6">
                                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-plus200 ">아이디</label>
                                                    <input onChange={handleChangeEmail} type="email" id="userEmail" name="userEmail" className="bg-gray-50 border border-gray-300 text-plus200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="test@test.com" required />
                                                    {vaildEmail && (
                                                        <p className="text-xs text-plus200 py-1"></p>
                                                    )
                                                    }
                                                    {!vaildEmail && (
                                                        <p className="text-xs text-plus200 py-1">아이디를 확인해주세요.</p>
                                                    )
                                                    }
                                                </div>
                                                <div className="mb-6">
                                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-plus200">비밀번호</label>
                                                    <input onChange={handleChangePassword} type="password" id="userPassword" name="userPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" required />
                                                    {vaildPassword && (
                                                        <p className="text-xs text-plus200 py-1"></p>
                                                    )
                                                    }
                                                    {!vaildPassword && (
                                                        <p className="text-xs text-plus200 py-1">비밀번호를 확인해주세요.</p>
                                                    )
                                                    }
                                                </div>
                                                <div className="flex items-start mb-6">
                                                    <div className="flex items-center h-5">
                                                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                                    </div>
                                                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-plus200">Remember me</label>
                                                </div>
                                                <Button buttonName="로그인" disableCheck={vaildEmail && vaildPassword}></Button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                                {authenticated && (
                                    <Loading></Loading>
                                )
                                }
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
            </MainDiv>
            <Footer></Footer>
        </div>
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