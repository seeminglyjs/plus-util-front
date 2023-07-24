import { DefaultClassNames } from "@/components/ClassName/DefaultClassName";
import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import HalfAndHalfDiv from "@/components/Layout/HalfAndHalfDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import Calendar from "@/components/Util/Calendar";
import UtilLayout from "@/components/Util/UtilLayOut";
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
                                <div className={DefaultClassNames.FormMotherDiv}>
                                    <div className="py-3 my-2 text-center">
                                        <span className="text-xl font-bold text-white text-center mr-1"> 요일 구하기</span><BiCalendarCheck className="inline-block text-xl font-bold text-white mb-2 hover:animate-pulse"></BiCalendarCheck>
                                    </div>
                                    <Calendar />
                                    <div className="py-3 my-2">
                                    <UtilLayout>

                                    </UtilLayout>
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