import { DefaultClassNames } from "@/components/ClassName/DefaultClassName";
import CopyButton from "@/components/Etc/Button/CopyButton";
import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import HalfAndHalfDiv from "@/components/Layout/HalfAndHalfDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import MajorityDiv from "@/components/Layout/MajorityDiv";
import MajoritySubDiv from "@/components/Layout/MajoritySubDiv";
import { InputRegex } from "@/components/Regex/InputRegex";
import { InputRegexFunction } from "@/components/Regex/InputRegexFunction";
import { TimeCalculateResponseDto } from "@/interface/Util/Time/TimeCalculateResponseDto";
import { useState } from "react";
import { BiCalendarCheck } from "react-icons/bi";

export default function TimeCalculate() {

    const [startDateStr, setStartDateStr] = useState("");
    const [endDateStr, setEndDateStr] = useState("");
    const [startDateText, setStartDateText] = useState("날짜를 입력해주세요.")
    const [endDateText, setEndDateText] = useState("날짜를 입력해주세요.")
    const [sendStartFlag, setSendStartFlag] = useState(false);
    const [sendEndFlag, setSendEndFlag] = useState(false);
    const [resultData, setResultData] = useState("");


    const startDateStrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        isValidDate(value, 1)
        setStartDateStr(value);
    }

    const endDateStrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        isValidDate(value, 2)
        setEndDateStr(value);
    }

    function isValidDate(dateString: string, flagNum: number) {
        if (!InputRegexFunction(dateString, InputRegex.DateyyyyMMdd)) {
            if (flagNum == 1) {
                setStartDateText("시작날짜 형식이 올바르지 않습니다. ex) 20210103")
                setSendStartFlag(false)
            } else if (flagNum == 2) {
                setEndDateText("종료날짜 형식이 올바르지 않습니다. ex) 20210104")
                setSendEndFlag(false)
            }
        } else {
            if (flagNum == 2) {
                setEndDateText("올바른 형식입니다.")
                setSendEndFlag(true)
            } else if (flagNum == 1) {
                setStartDateText("올바른 형식입니다.")
                setSendStartFlag(true)
            }
        }
    }

const timeCalculateRequestSend = async () => {
    let data = null
    const url = `${process.env.API_BASE_URL}/util/time/calculate/day`
    if(startDateStr > endDateStr) {
        setStartDateText("시작날짜가 종료날짜 보다 큽니다.")
        return;
    }else setStartDateText("올바른 형식입니다.")
    if (sendStartFlag && sendEndFlag) {
        data = {
            startDateStr: startDateStr,
            endDateStr: endDateStr
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
        const timeCalculateResponseDto: TimeCalculateResponseDto = await response.json()
        setResultData(timeCalculateResponseDto.calculateDay)
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
                                <div className="py-3 my-2 text-center">
                                    <span className="text-xl font-bold text-white text-center mr-1"> 날짜 차이 계산</span><BiCalendarCheck className="inline-block text-xl font-bold text-white mb-2 hover:animate-pulse"></BiCalendarCheck>
                                </div>
                                <div className="sm:col-span-2 my-4">
                                    <label htmlFor="startDateStr" className="block mb-2 text-sm font-medium text-white">시작 날짜</label>
                                    <input onChange={startDateStrChange} type="text" name="startDateStr" id="startDateStr" className={DefaultClassNames.FormDefaultChangeInput} placeholder="ex)20220101" value={startDateStr} />
                                    <p className="text-xs mt-1 text-plusGreen100">{startDateText}</p>
                                </div>

                                <div className="sm:col-span-2 my-4">
                                    <label htmlFor="endDateStr" className="block mb-2 text-sm font-medium text-white">종료 날짜</label>
                                    <input onChange={endDateStrChange} type="text" name="endDateStr" id="endDateStr" className={DefaultClassNames.FormDefaultChangeInput} placeholder="ex)20220111" value={endDateStr} />
                                    <p className="text-xs mt-1 text-plusGreen100">{endDateText}</p>
                                </div>
                                <div className="text-center">
                                    <button onClick={timeCalculateRequestSend} type="button" className={DefaultClassNames.FormDefaultSendButton}>
                                        확인
                                    </button>
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
