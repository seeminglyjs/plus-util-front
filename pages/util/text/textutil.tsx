import { DefaultClassNames } from "@/components/ClassName/DefaultClassName";
import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import HalfAndHalfDiv from "@/components/Layout/HalfAndHalfDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import MajorityDiv from "@/components/Layout/MajorityDiv";
import MajoritySubDiv from "@/components/Layout/MajoritySubDiv";
import { useEffect, useState } from 'react';
import { BiPointer, BiText } from "react-icons/bi";
import { MouseEvent } from 'react';
import CopyButton from "@/components/Etc/Button/CopyButton";
import { StringInitialResponseDto } from "@/interface/Util/Text/StringInitialResponseDto";
import { StringConvertCaseResponseDto } from "@/interface/Util/Text/StringConvertCaseResponseDto";
import { requestFetch } from "@/function/request/RequestFetch";
import UtilLayout from "@/components/Util/UtilLayOut";


interface StringReplaceResponseDto {
    content :string,
    findStr : string,
    replaceStr : string
}

export default function TextUtil() {
    const [textContent, setTextContet] = useState("");
    const [textByte, setTextByte] = useState(0);
    const [resultData, setResultData] = useState("");
    const [findStr, setFindStr] = useState("");
    const [replaceStr, setReplaceStr] = useState("");
    const [findReplaceWarn, setFindReplaceWarn] = useState("");

    function textContetChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        let value = event.target.value;
        const encoder = new TextEncoder();
        value = value.substring(0, 5000)
        setTextByte(encoder.encode(value).length)
        setTextContet(value)
    }

    function textChange(event: React.ChangeEvent<HTMLInputElement>) {
        let target = event.target
        let id = target.id
        let value = target.value
        if(id === "findStr") if(value.length <= 15) setFindStr(value)
        if(id === "replaceStr") if(value.length <= 15) setReplaceStr(value)
    }

    const textUtilRequestSend = async (requestNumber: number, event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); //a 태그 동작 막기
        let data = null
        let path = `/util/string/`
        if (requestNumber == 1) {//초성추출
            path = path + 'initial';
            data = {
                stringContent: textContent,
            };
        } else if (requestNumber == 2) {//대문자 변환
            path = path + 'convert/case';
            data = {
                stringContent: textContent,
                upperOrLower: 'upper'
            };
        } else if (requestNumber == 3) {//소문자 변환
            path = path + 'convert/case';
            data = {
                stringContent: textContent,
                upperOrLower: 'lower'
            };
        }else if (requestNumber == 4) {//글자변환
            if(findStr.length <= 0 || replaceStr.length <= 0){setFindReplaceWarn("Find 와 Replace는 필수값입니다."); return} else{setFindReplaceWarn("")}
            path = path + 'replace';
            data = {
                content: textContent,
                findStr: findStr,
                replaceStr: replaceStr
            };
        }
        if (data === null) return
        const response: Response | null = await requestFetch('POST', path, data, 'application/json')
        if (response !== null) {
            if (requestNumber == 1) {//초성추출
                const stringInitialResponseDto: StringInitialResponseDto = await response.json()
                setResultData(stringInitialResponseDto.initialString);
            } else if (requestNumber == 2 || requestNumber == 3) { //대소문자 일경우
                const stringConvertCaseResponseDto: StringConvertCaseResponseDto = await response.json()
                setResultData(stringConvertCaseResponseDto.convertStringContent);
            } else if (requestNumber == 4) { //치환일 경우우
                const stringReplaceResponseDto: StringReplaceResponseDto = await response.json()
                setResultData(stringReplaceResponseDto.content);
            }
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
                                    <a href="" onClick={(event) => textUtilRequestSend(1, event)} className={DefaultClassNames.listGroupDefaultA}>
                                        초성추출
                                        <p className="text-xs mt-1 text-white">텍스트 중 한글이 있을 경우 초성만 추출하여 결과로 보여줍니다.</p>
                                    </a>
                                    <a href="" onClick={(event) => textUtilRequestSend(2, event)} className={DefaultClassNames.listGroupDefaultA}>
                                        대문자변환
                                        <p className="text-xs mt-1 text-white">텍스트 중 영문을 대문자로 변경해줍니다.</p>
                                    </a>
                                    <a href="" onClick={(event) => textUtilRequestSend(3, event)} className={DefaultClassNames.listGroupDefaultA}>
                                        소문자변환
                                        <p className="text-xs mt-1 text-white">텍스트 중 영문을 소문자로 변경해줍니다.</p>
                                    </a>
                                    <a href="" onClick={(event) => textUtilRequestSend(4, event)} className={DefaultClassNames.listGroupDefaultA}>
                                        문자열 치환
                                        <p className="text-xs mt-1 text-white">요청문자열을 원하는 문자열로 변경해줍니다. </p>
                                        <p className="text-xs mt-1 text-yellow-500">{findReplaceWarn}</p>
                                    </a>
                                </div>
                            </div>
                        </HalfAndHalfDiv>
                        <HalfDiv>
                            <div className="pt-48 py-15">
                                <div className={DefaultClassNames.FormMotherDiv}>
                                    <div className="py-8 px-4 mx-auto max-w-3xl">
                                        <div className="py-3 my-2 text-center">
                                            <span className={DefaultClassNames.FormNameSpan}> 텍스트 도구</span><BiText className="inline-block text-xl font-bold text-white mb-2 hover:animate-pulse"></BiText>
                                        </div>
                                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                        <div>
                                            <label htmlFor="findStr" className={DefaultClassNames.FormDefaultChangeLabel}>Find</label>
                                            <input onChange={textChange} type="text" name="findStr" id="findStr" className={DefaultClassNames.FormDefaultChangeInput} placeholder="15 글자 이하" value={findStr}/>
                                        </div>
                                        <div >
                                            <label htmlFor="replaceStr" className={DefaultClassNames.FormDefaultChangeLabel}>Replace</label>
                                            <input onChange={textChange} type="text" name="replaceStr" id="replaceStr" className={DefaultClassNames.FormDefaultChangeInput} placeholder="15 글자 이하" value={replaceStr}/>
                                        </div>
                                        </div>
                                        <br></br>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="textContent" className={DefaultClassNames.FormDefaultChangeLabel}>텍스트</label>
                                            <textarea rows={17} onChange={textContetChange} id="textContent" name="textContent" className={DefaultClassNames.FormDefaultTextArea} placeholder="내용을 입력해주세요." value={textContent}></textarea>
                                            <p className={DefaultClassNames.FormRegexSpanWhite}>{textContent.length} 자  / 최대 5000자 | {textByte} Byte</p>
                                        </div>
                                    </div>
                                    <UtilLayout>

                                    </UtilLayout>
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