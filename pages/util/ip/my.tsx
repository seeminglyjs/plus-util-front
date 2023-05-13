import { DefaultClassNames } from "@/components/ClassName/DefaultClassName";
import CopyButton from "@/components/Etc/Button/CopyButton";
import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import HalfAndHalfDiv from "@/components/Layout/HalfAndHalfDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { BiBuildingHouse, BiText } from "react-icons/bi";


interface Props {
    myIpCheckResponseDto: MyIpCheckResponseDto;
}

interface MyIpCheckResponseDto {
    ip: string,
    country: string

}

export default function MyIp({ myIpCheckResponseDto }: Props) {

    return (
        <MainDiv>
            <MainSubDiv>
                <ContentColDiv>
                    <ContentRowDiv>
                        <HalfAndHalfDiv>

                        </HalfAndHalfDiv>
                        <HalfDiv>
                            <div className="pt-48 py-15">
                                <div className="border border-plusGreen100 rounded-3xl py-8 px-4">
                                    <div className="py-8 px-4 mx-auto max-w-3xl">
                                        <div className="py-3 my-2 text-center">
                                            <span className="text-xl font-bold text-white text-center mr-1">나의 아이피 확인</span><BiBuildingHouse className="inline-block text-xl font-bold text-white mb-2 hover:animate-pulse"></BiBuildingHouse>
                                        </div>

                                        <div className="sm:col-span-2 mb-5">
                                            <h2 className="mb-4 text-m font-bold text-white py-2 pl-2">아이피 정보</h2>
                                            <div className="break-all border border-plusGreen100 py-5 rounded-2xl bg-white relative">
                                                <div className="text-black p-3 text-center" id="">
                                                    {myIpCheckResponseDto.ip}
                                                </div>
                                                <div className="absolute bottom-0 right-0 mr-2 mb-2">
                                                    <CopyButton text={myIpCheckResponseDto.ip}></CopyButton>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 mt-5">
                                        <h2 className="mb-4 text-m font-bold text-white py-2 pl-2">국가 정보</h2>
                                            <div className="break-all border border-plusGreen100 py-5 rounded-2xl bg-white relative">
                                                <div className="text-black p-3 text-center" id="">
                                                    {myIpCheckResponseDto.country}
                                                </div>
                                                <div className="absolute bottom-0 right-0 mr-2 mb-2">
                                                    <CopyButton text={myIpCheckResponseDto.ip}></CopyButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </HalfDiv>
                        <HalfAndHalfDiv>
                        </HalfAndHalfDiv>
                    </ContentRowDiv>

                </ContentColDiv>
            </MainSubDiv>
        </MainDiv>
    )
}



export const getServerSideProps: GetServerSideProps<Props, ParsedUrlQuery> = async ({ req }) => {
    const url = `${process.env.API_BASE_URL}/util/etc/ip/my`;
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    console.log(clientIp)

    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        const errorMessage = `HTTP error! Status: ${response.status}`;
        console.error(errorMessage);
    }
    const myIpCheckResponseDto: MyIpCheckResponseDto = await response.json();
    return {
        props: {
            myIpCheckResponseDto,
        },
    };
};
