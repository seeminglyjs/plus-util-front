import { DayOfTheWeekClassNames } from "@/components/ClassName/DayOfTheWeekClassName";
import CopyButton from "@/components/Etc/Button/CopyButton";
import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import HalfAndHalfDiv from "@/components/Layout/HalfAndHalfDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import MajorityDiv from "@/components/Layout/MajorityDiv";
import MajoritySubDiv from "@/components/Layout/MajoritySubDiv";
import Calendar from "@/components/Util/Calendar";




export default function DayOfTheWeek(){
    
    
    function range(start: number, end: number): number[] {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }

    return(
        <MainDiv>
        <MainSubDiv>
            <ContentColDiv>
                <ContentRowDiv>
                    <HalfAndHalfDiv>

                    </HalfAndHalfDiv>
                    
                    <HalfDiv>
                        <Calendar />
                    </HalfDiv>
                    
                    <HalfAndHalfDiv>

                    </HalfAndHalfDiv>
                </ContentRowDiv>
            </ContentColDiv>
        </MainSubDiv>
    </MainDiv>
    )
}