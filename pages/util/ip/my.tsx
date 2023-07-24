import { DefaultClassNames } from "@/components/ClassName/DefaultClassName";
import CopyButton from "@/components/Etc/Button/CopyButton";
import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import HalfAndHalfDiv from "@/components/Layout/HalfAndHalfDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import UtilLayout from "@/components/Util/UtilLayOut";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiBuildingHouse, BiText } from "react-icons/bi";


export default function MyIp() {
    const [ipInfo, setIpInfo] = useState("확인중...");
    const [countryCode, setCountryCode] = useState("확인중...");
    const [countryName, setCountryName] = useState("확인중...");


    useEffect(() => {  
        const res = axios.get('https://geolocation-db.com/json/')
        .then((res) => {
            setIpInfo(res.data.IPv4)
            setCountryCode(res.data.country_code)
            setCountryName(res.data.country_name)
        })
    }, [])

    return (
        <MainDiv>
            <MainSubDiv>
                <ContentColDiv>
                    <ContentRowDiv>
                        <HalfAndHalfDiv>

                        </HalfAndHalfDiv>
                        <HalfDiv>

                            <div className="pt-48 py-15">
                                <div className={DefaultClassNames.FormMotherDiv}>
                                    <div className="py-8 px-4 mx-auto max-w-3xl">
                                        <div className="py-3 my-2 text-center">
                                            <span className={DefaultClassNames.FormNameSpan}>나의 아이피 확인</span><BiBuildingHouse className="inline-block text-xl font-bold text-white mb-2 hover:animate-pulse"></BiBuildingHouse>
                                        </div>

                                        <div className="sm:col-span-2 mb-5">
                                            <h2 className={DefaultClassNames.FormDefaultChangeLabel}>아이피 정보</h2>
                                            <div className="break-all border border-white py-5 rounded-2xl bg-white relative">
                                                <div className="text-black p-3 text-center" id="">
                                                    {ipInfo}
                                                </div>
                                                <div className="absolute bottom-0 right-0 mr-2 mb-2">
                                                    <CopyButton text={ipInfo}></CopyButton>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 mt-5">
                                        <h2 className={DefaultClassNames.FormDefaultChangeLabel}>국가 정보</h2>
                                            <div className="break-all border border-white py-5 rounded-2xl bg-white relative">
                                                <div className="text-black p-3 text-center" id="">
                                                    {countryCode + " / " + countryName}
                                                </div>
                                                <div className="absolute bottom-0 right-0 mr-2 mb-2">
                                                    <CopyButton text={countryCode + " / " + countryName}></CopyButton>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-3 my-2">
                                        <UtilLayout>

                                        </UtilLayout>
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
