import { DefaultClassNames } from "@/components/ClassName/DefaultClassName";
import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import HalfAndHalfDiv from "@/components/Layout/HalfAndHalfDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import MajorityDiv from "@/components/Layout/MajorityDiv";
import MajoritySubDiv from "@/components/Layout/MajoritySubDiv";
import { useState } from 'react';
import CopyButton from "@/components/Etc/Button/CopyButton";
import { InputRegex } from "@/components/Regex/InputRegex";
import { InputRegexFunction } from "@/components/Regex/InputRegexFunction";
import { BiBong, BiText } from "react-icons/bi";

interface SlidingWindowResponseDto {
    slidingWindowArr: string,
    slidingWindowRange: string,
    slidingWindowResult: bigint
}


export default function SlidingWindow() {
    const [slidingWindowArr, setSlidingWindowArr] = useState("");
    const [slidingWindowRange, setSlidingWindowRange] = useState("");
    const [resultData, setResultData] = useState("");

    function textChangeSlidingWindowArr(event: React.ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        value = value.substring(0, 100)
        if(InputRegexFunction(value, InputRegex.SlidingWindowArr)){
            setSlidingWindowArr(value)
        }else if(value == "") setSlidingWindowArr("");
    }

    function textChangeSlidingWindowRange(event: React.ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        if(InputRegexFunction(value, InputRegex.SlidingWindowRange)){
            if(value.length >=2 ) value.substring(0,1)
            setSlidingWindowRange(value)
        }else if(value == "") setSlidingWindowRange("");
    }

    const slidingWindowRequestSend = async () => {
        const url = `${process.env.API_BASE_URL}/algorithm/sliding/window`
        if(slidingWindowArr === "") return
        if(slidingWindowRange === "") return
        const data = {
            slidingWindowArr: slidingWindowArr,
            slidingWindowRange: slidingWindowRange
        }

        if (data === null) return
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
            const slidingWindowResponseDto: SlidingWindowResponseDto = await response.json()
            setResultData(slidingWindowResponseDto.slidingWindowResult.toString());
        }
    }

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
                                            <span className="text-xl font-bold text-white text-center mr-1">슬라이딩 알고리즘</span><BiBong className="inline-block text-xl font-bold text-white mb-2 hover:animate-pulse"></BiBong>
                                        </div>
                                        <div className="sm:col-span-2 mb-5">
                                            <label htmlFor="slidingWindowRange" className="block mb-2 text-sm font-medium text-white">윈도우 크기</label>
                                            <input onChange={textChangeSlidingWindowRange} type="text" name="slidingWindowRange" id="slidingWindowRange" className={DefaultClassNames.FormDefaultChangeInput} placeholder="포인터 ex)6" value={slidingWindowRange} />
                                        </div>
                                        <div className="sm:col-span-2 mt-5">
                                            <label htmlFor="slidingWindowArr" className="block mb-2 text-sm font-medium text-white">탐색 배열</label>
                                            <input onChange={textChangeSlidingWindowArr} type="text" name="slidingWindowArr" id="slidingWindowArr" className={DefaultClassNames.FormDefaultChangeInput} placeholder="수열 ex)3456678" value={slidingWindowArr} />
                                        </div>

                                        <div className="text-center">
                                                <button onClick={slidingWindowRequestSend} type="button" className={DefaultClassNames.FormDefaultSendButton}>
                                                    확인
                                                </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </HalfDiv>
                        <HalfAndHalfDiv>
                        </HalfAndHalfDiv>
                    </ContentRowDiv>

                    <ContentRowDiv>
                        <MajoritySubDiv>
                        </MajoritySubDiv>
                        <MajorityDiv>
                            <div className="">
                                <h2 className="mb-4 text-xl font-bold text-white py-2 pl-2">결과 확인</h2>
                                <div className="break-all border border-plusGreen100 py-5 rounded-2xl bg-white relative">
                                    <div className="text-black p-3" id="">
                                        {resultData}
                                    </div>
                                    <div className="absolute bottom-0 right-0 mr-2 mb-2">
                                        <CopyButton text={resultData}></CopyButton>
                                    </div>
                                </div>
                            </div>
                        </MajorityDiv>
                        <MajoritySubDiv>
                        </MajoritySubDiv>
                    </ContentRowDiv>

                </ContentColDiv>
            </MainSubDiv>
        </MainDiv>
    )
}