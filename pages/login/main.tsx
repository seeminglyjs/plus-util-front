
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import Button from "@/components/Navbar/Button";
import { useEffect } from "react";
import { useRouter } from 'next/router'
import ContentColDiv from '../../components/Layout/ContentColDiv';
import HalfAndHalfDiv from '../../components/Layout/HalfAndHalfDiv';


import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Loading from "@/components/Etc/Loading";
import { Props } from '../../interface/Auth/Props';
import { AuthData } from '../../interface/Auth/AuthData';
import { fetchAuthData } from "@/function/auth/GetAuthencation";
import NavBar from "@/components/Navbar/NavBar";
import Footer from '../../components/Footer/Footer';


export default function LoginMain({ authData }: Props) {
    const { name, authorities, authenticated } = authData;
    console.log("authData name -> " + name)
    console.log("authData authorities -> " + authorities[0].authority)
    console.log("authData authenticated -> " + authenticated)

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
                                                <input type="email" id="userEmail" name="userEmail" className="bg-gray-50 border border-gray-300 text-plus200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                                            </div>
                                            <div className="mb-6">
                                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-plus200">비밀번호</label>
                                                <input type="password" id="userPassword" name="userPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                            </div>
                                            <div className="flex items-start mb-6">
                                                <div className="flex items-center h-5">
                                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                                </div>
                                                <label htmlFor="remember" className="ml-2 text-sm font-medium text-plus200">Remember me</label>
                                            </div>
                                            <Button buttonName="login"></Button>
                                        </form>
                                    </div>
                                </div>
                            )}
                            {authenticated && (
                                <Loading></Loading>
                            )
                            }
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