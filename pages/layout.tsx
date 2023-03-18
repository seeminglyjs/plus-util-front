import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import LeftDiv from "@/components/Layout/HalfDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import ContentColDiv from '../components/Layout/ContentColDiv';
import HalfAndHalfDiv from '../components/Layout/HalfAndHalfDiv';


export default function layout(){
    return(
        <div>
            <MainDiv>
                <MainSubDiv>
                    <ContentColDiv>
                        <ContentRowDiv>
                            <HalfDiv>

                            </HalfDiv>
                            <HalfDiv>

                            </HalfDiv>
                        </ContentRowDiv>
                        <ContentRowDiv>
                            <HalfAndHalfDiv>
                            
                            </HalfAndHalfDiv>
                            <HalfDiv>
                            
                            </HalfDiv>
                            <HalfAndHalfDiv>
                            
                            </HalfAndHalfDiv>
                        </ContentRowDiv>

                    </ContentColDiv>
                </MainSubDiv>
            </MainDiv>
        </div>
    )

}