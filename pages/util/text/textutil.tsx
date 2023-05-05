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
import { BiPointer, BiText } from "react-icons/bi";

export default function TextUtil() {
    const [textContent, setTextContet] = useState("");
    const [textByte, setTextByte] = useState(0);
    const [textCase, setTextCase] = useState("대문자")

    function textContetChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        let value = event.target.value;
        const encoder = new TextEncoder();
        value = value.substring(0, 5000)
        setTextByte(encoder.encode(value).length)
        setTextContet(value)
    }

    const textUtilRequestSend = async () => {
        let data = null
        const url = `${process.env.API_BASE_URL}/util/time/calculate/day`
        data = {
            startDateStr: "",
            endDateStr: ""
        };

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
            // const timeCalculateResponseDto: TimeCalculateResponseDto = await response.json()
            // setResultData(timeCalculateResponseDto.calculateDay)
        }
    }

    return (
        <MainDiv>
            <MainSubDiv>
                <ContentColDiv>
                    <ContentRowDiv>
                        <HalfAndHalfDiv>
                            <div className="pt-48 py-15">
                                <div className="py-3 my-2 text-center">
                                            <span className="text-xl font-bold text-white text-center mr-1">변환 리스트</span><BiPointer className="inline-block text-xl font-bold text-white mb-2 hover:animate-pulse"></BiPointer>
                                </div>
                                <div className={DefaultClassNames.listGroupDefaultDiv}>
                                    <a href="" className={DefaultClassNames.listGroupDefaultA}>
                                        초성추출 
                                        <p className="text-xs mt-1 text-plusGreen100">텍스트 중 한글이 있을 경우 초성만 추출하여 결과로 보여줍니다.</p>
                                    </a>
                                    <a href="" className={DefaultClassNames.listGroupDefaultA}>
                                        대문자변환 
                                        <p className="text-xs mt-1 text-plusGreen100">텍스트 중 영문을 대문자로 변경해줍니다.</p>
                                    </a>
                                    <a href="" className={DefaultClassNames.listGroupDefaultA}>
                                        소문자변환 
                                        <p className="text-xs mt-1 text-plusGreen100">텍스트 중 영문을 소문자로 변경해줍니다.</p>
                                    </a>
                                </div>
                            </div>
                        </HalfAndHalfDiv>
                        <HalfDiv>
                            <div className="pt-48 py-15">
                                <div className="border border-plusGreen100 rounded-3xl py-8 px-4">
                                    <div className="py-8 px-4 mx-auto max-w-3xl">
                                        <div className="py-3 my-2 text-center">
                                            <span className="text-xl font-bold text-white text-center mr-1"> 텍스트 도구</span><BiText className="inline-block text-xl font-bold text-white mb-2 hover:animate-pulse"></BiText>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="textContent" className="block mb-2 text-sm font-medium text-white">텍스트</label>
                                            <textarea rows={30} onChange={textContetChange} id="textContent" name="textContent" className={DefaultClassNames.FormDefaultTextArea} placeholder="내용을 입력해주세요."></textarea>
                                            <p className="mt-1 text-plusGreen100">{textContent.length} 자  / 최대 5000자 | {textByte} Byte</p>
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
                                        { }
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