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
import { MouseEvent } from 'react';
import CopyButton from "@/components/Etc/Button/CopyButton";

interface StringInitialResponseDto {
    stringContent : string,
    initialString : string
}

interface StringConvertCaseResponseDto {
    stringContent : string,
    upperOrLower : string,
    convertStringContent : string
}

export default function TwoPointer() {
    const [textContent, setTextContet] = useState("");
    const [textByte, setTextByte] = useState(0);
    const [resultData, setResultData] = useState("");

    function textContetChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        let value = event.target.value;
        const encoder = new TextEncoder();
        value = value.substring(0, 5000)
        setTextByte(encoder.encode(value).length)
        setTextContet(value)
    }

    const textUtilRequestSend = async (requestNumber:number, event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); //a 태그 동작 막기
        let data = null
        let url = `${process.env.API_BASE_URL}/util/string/`
        if(requestNumber == 1){//초성추출
            url = url + 'initial';
            data = {
                stringContent: textContent,
            };
        }else if(requestNumber == 2){//대문자 변환
            url = url + 'convert/case';
            data = {
                stringContent: textContent,
                upperOrLower: 'upper'
            };
        }else if(requestNumber == 3){//소문자 변환
            url = url + 'convert/case';
            data = {
                stringContent: textContent,
                upperOrLower: 'lower'
            };
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
            if(requestNumber == 1){//초성추출
                const stringInitialResponseDto: StringInitialResponseDto = await response.json()
                setResultData(stringInitialResponseDto.initialString);
            }else if(requestNumber == 2 || requestNumber == 3){ //대소문자 일경우
                const stringConvertCaseResponseDto: StringConvertCaseResponseDto = await response.json()
                setResultData(stringConvertCaseResponseDto.convertStringContent);
            }
            
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
                                            <span className="text-xl font-bold text-white text-center mr-1">투 포인트 알고리즘</span><BiText className="inline-block text-xl font-bold text-white mb-2 hover:animate-pulse"></BiText>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="textContent" className="block mb-2 text-sm font-medium text-white">텍스트</label>
                                            <textarea rows={30} onChange={textContetChange} id="textContent" name="textContent" className={DefaultClassNames.FormDefaultTextArea} placeholder="내용을 입력해주세요." value={textContent}></textarea>
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