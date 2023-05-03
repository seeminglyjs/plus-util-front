import { FormDefaultClassNames } from "@/components/ClassName/FormDefaultClassName";
import CopyButton from "@/components/Etc/Button/CopyButton";
import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import HalfAndHalfDiv from "@/components/Layout/HalfAndHalfDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import Calendar from "@/components/Util/Calendar";
import moment from "moment";
import { useState } from "react";
import { BiCalendarCheck } from "react-icons/bi";


export default function TimeCalculate() {

    const [startDateStr, setStartDateStr] = useState("");
    const [endDateStr, setEndDateStr] = useState("");

    const startDateStrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        setStartDateStr(value);
    }

    const endDateStrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setEndDateStr(value);
    }

    function isValidDate(dateString:string) {
        // 정규식으로 yyyyMMdd 형식인지 확인
        const dateRegex = /^\d{4}(0?[1-9]|1[0-2])(0?[1-9]|[12][0-9]|3[01])$/;
        if (!dateRegex.test(dateString)) {
          return false;
        }
      
        // moment.js를 사용하여 날짜 유효성 체크
        const date = moment(dateString, 'YYYYMMDD');
        return date.isValid();
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
                                    <div className="sm:col-span-2 relative">
                                                    <label htmlFor="startDateStr" className="block mb-2 text-sm font-medium text-white">시작 날짜</label>
                                                    <input onChange={startDateStrChange} type="text" name="startDateStr" id="startDateStr" className={FormDefaultClassNames.FormDefaultChangeInput} placeholder="ex)20220101" value={startDateStr} />
                                                    <div className="absolute bottom-0 right-0 mr-2 mb-2">
                                                        <CopyButton text={startDateStr}></CopyButton>
                                                    </div>
                                                    <p className="text-xs mt-1 text-plusGreen100">{} Byte </p>
                                                </div>
                                                <div className="sm:col-span-2 relative">
                                                    <label htmlFor="endDateStr" className="block mb-2 text-sm font-medium text-white">종료 날짜</label>
                                                    <input onChange={endDateStrChange} type="text" name="endDateStr" id="endDateStr" className={FormDefaultClassNames.FormDefaultChangeInput} placeholder="ex)20220111" value={endDateStr} />
                                                    <div className="absolute bottom-0 right-0 mr-2 mb-2">
                                                        <CopyButton text={endDateStr}></CopyButton>
                                                    </div>
                                                    <p className="text-xs mt-1 text-plusGreen100">{} Byte </p>
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