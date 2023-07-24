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
import { BiText } from "react-icons/bi";
import CopyButton from "@/components/Etc/Button/CopyButton";
import { StringSimilarityResponseDto } from "@/interface/Util/Text/StringSimilarityResponseDto";
import { requestFetch } from "@/function/request/RequestFetch";
import UtilLayout from "@/components/Util/UtilLayOut";

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
        let path = `/util/string/similarity`
        data = {
            firstContent: firstContent,
            secondContent: secondContent
        };

        if (data === null) return
        const response: Response | null = await requestFetch('POST', path, data, 'application/json')

        if (response !== null) {
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
                                <div className={DefaultClassNames.FormMotherDiv}>
                                    <div className="py-8 px-4 mx-auto max-w-3xl">
                                        <div className="py-3 my-2 text-center">
                                            <span className={DefaultClassNames.FormNameSpan} >문자열 유사성 확인</span><BiText className="inline-block text-xl font-bold text-white mb-2 hover:animate-pulse"></BiText>
                                        </div>

                                        <div className="sm:col-span-2 mb-5">
                                            <label htmlFor="firstContent" className={DefaultClassNames.FormDefaultChangeLabel}>첫번째 문자열</label>
                                            <textarea rows={15} onChange={textFirstContetChange} id="firstContent" name="firstContent" className={DefaultClassNames.FormDefaultTextArea} placeholder="내용을 입력해주세요." value={firstContent}></textarea>
                                            <p className={DefaultClassNames.FormRegexSpanWhite}>{firstContent.length} 자  / 최대 5000자 | {textByte1} Byte</p>
                                        </div>

                                        <div className="sm:col-span-2 mt-5">
                                            <label htmlFor="secondContent" className={DefaultClassNames.FormDefaultChangeLabel}>두번째 문자열</label>
                                            <textarea rows={15} onChange={textSecondContetChange} id="secondContent" name="secondContent" className={DefaultClassNames.FormDefaultTextArea} placeholder="내용을 입력해주세요." value={secondContent}></textarea>
                                            <p className={DefaultClassNames.FormRegexSpanWhite}>{secondContent.length} 자  / 최대 5000자 | {textByte2} Byte</p>
                                        </div>

                                        <div className="text-center">
                                            <button onClick={textSimilarityRequestSend} type="button" className={DefaultClassNames.FormDefaultSendButton}>
                                                확인
                                            </button>
                                        </div>
                                        <UtilLayout>

                                        </UtilLayout>
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