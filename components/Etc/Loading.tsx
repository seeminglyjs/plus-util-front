import ContentColDiv from "../Layout/ContentColDiv";
import MainDiv from "../Layout/MainDiv";
import MainSubDiv from "../Layout/MainSubDiv";
import ContentRowDiv from '../Layout/ContentRowDiv';
import HalfDiv from "../Layout/HalfDiv";
import HalfAndHalfDiv from "../Layout/HalfAndHalfDiv";
import {BiLoaderCircle} from "react-icons/bi";

export default function Loading(){
    return(
        <MainDiv>
            <MainSubDiv>
                <ContentColDiv>
                    <ContentRowDiv>
                        <HalfAndHalfDiv>
    
                        </HalfAndHalfDiv>
                        <HalfDiv>
                            <div className="py-60 text-2xl text-center text-plus200">
                                Loading . . . <BiLoaderCircle className="inline animate-spin"></BiLoaderCircle> 
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