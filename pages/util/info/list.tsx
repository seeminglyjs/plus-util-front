import Loading from "@/components/Etc/Loading";
import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import MajorityDiv from "@/components/Layout/MajorityDiv";
import MajoritySubDiv from "@/components/Layout/MajoritySubDiv";
import { fetchAuthData } from "@/function/auth/GetAuthencation";
import { AuthData } from "@/interface/Auth/AuthData";
import { Props } from "@/interface/Auth/Props";
import { UtilInfoDto } from "@/interface/Util/Info/UtilInfoDto";
import { UtilInfoGetResponseDto } from "@/interface/Util/Info/UtilInfoGetResponseDto";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from 'react';

export default function UtilList({ authData }: Props) {
    const { name, authorities, authenticated } = authData;
    const router = useRouter()
    const [utilName, setUtilName] = useState("");
    const [isEmpty, setIsEmpty] = useState(true);
    const [utilInfoList, setUtilInfoList] = useState<UtilInfoDto[]>([]);;

    useEffect(() => {
        if (authData.authorities[0].authority !== 'ROLE_ADMIN') {
            router.push('/') // Redirect to dashboard if authenticated
        }
    }, [authData, authenticated, router])

    useEffect(() => {
        getUtilInfoList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getUtilInfoList = async () => {
        const url = `${process.env.API_BASE_URL}/util/info/list?utilName=${utilName}`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorMessage = `HTTP error! Status: ${response.status}`;
            console.error(errorMessage);
            return;
        } else {
            const utilInfoGetResponseDto: UtilInfoGetResponseDto = await response.json()
            setIsEmpty(utilInfoGetResponseDto.isEmpty);
            setUtilInfoList(utilInfoGetResponseDto.utilInfoDtoList)
            console.log(utilInfoGetResponseDto);
        }
    }

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
                                <MajoritySubDiv>
                                </MajoritySubDiv>
                                <MajorityDiv>
                                <div>
                                    {/* utilInfoDtoList의 순서대로 출력 */}
                                    {utilInfoList.map((utilInfoDto, index) => (
                                        <div key={index}>
                                        {/* utilInfoDto 요소의 내용을 출력 */}
                                        <p>{utilInfoDto.utilName}</p>
                                        {/* 추가적인 요소들을 출력 */}
                                        </div>
                                    ))}
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
    return {
        props: {
            authData,
        },
    };
};