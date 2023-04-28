import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import HalfAndHalfDiv from "@/components/Layout/HalfAndHalfDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import Calendar from "@/components/Util/Calendar";
import { BiCalendarCheck } from "react-icons/bi";


export default function DayOfTheWeek() {

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
                                        <span className="text-xl font-bold text-white text-center mr-1"> 요일 구하기</span><BiCalendarCheck className="inline-block text-xl font-bold text-white mb-2 hover:animate-pulse"></BiCalendarCheck>
                                    </div>
                                    <Calendar />
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