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


interface StringSimilarityResponseDto {
    firstContent: string,
    secondContent: string,
    similarity: string
}

export default function TextSimilarity() {
    const [firstContent, setFirstContent] = useState("");
    const [secondContent, setSecondContent] = useState("");
    
    const [textByte1, setTextByte1] = useState(0);
    const [textByte2, setTextByte2] = useState(0);
    const [resultData, setResultData] = useState("");

    function textFirstContetChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        let value = event.target.value;
        const encoder = new TextEncoder();
        value = value.substring(0, 5000)
        setTextByte1(encoder.encode(value).length)
        setFirstContent(value)
    }

    function textSecondContetChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        let value = event.target.value;
        const encoder = new TextEncoder();
        value = value.substring(0, 5000)
        setTextByte2(encoder.encode(value).length)
        setSecondContent(value)
    }

    const textSimilarityRequestSend = async () => {
        let data = null
        let url = `${process.env.API_BASE_URL}/util/string/similarity`
        data = {
            firstContent: firstContent,
            secondContent: secondContent
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
            const stringSimilarityResponseDto: StringSimilarityResponseDto = await response.json()
            setResultData(stringSimilarityResponseDto.similarity);
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
                                            <span className="text-xl font-bold text-white text-center mr-1">문자열 유사성 확인</span><BiText className="inline-block text-xl font-bold text-white mb-2 hover:animate-pulse"></BiText>
                                        </div>

                                        <div className="sm:col-span-2 mb-5">
                                            <label htmlFor="textContent" className="block mb-2 text-sm font-medium text-white">첫번째 문자열</label>
                                            <textarea rows={15} onChange={textFirstContetChange} id="textContent" name="textContent" className={DefaultClassNames.FormDefaultTextArea} placeholder="내용을 입력해주세요." value={firstContent}></textarea>
                                            <p className="mt-1 text-xs text-plusGreen100">{firstContent.length} 자  / 최대 5000자 | {textByte1} Byte</p>
                                        </div>

                                        <div className="sm:col-span-2 mt-5">
                                            <label htmlFor="textContent" className="block mb-2 text-sm font-medium text-white">두번째 문자열</label>
                                            <textarea rows={15} onChange={textSecondContetChange} id="textContent" name="textContent" className={DefaultClassNames.FormDefaultTextArea} placeholder="내용을 입력해주세요." value={secondContent}></textarea>
                                            <p className="mt-1 text-xs text-plusGreen100">{secondContent.length} 자  / 최대 5000자 | {textByte2} Byte</p>
                                        </div>

                                        <div className="text-center">
                                            <button onClick={textSimilarityRequestSend} type="button" className={DefaultClassNames.FormDefaultSendButton}>
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