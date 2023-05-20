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
import CopyButton from "@/components/Etc/Button/CopyButton";
import { InputRegex } from "@/components/Regex/InputRegex";
import { InputRegexFunction } from "@/components/Regex/InputRegexFunction";
import { BiBong} from "react-icons/bi";
import { TwoPointerResponseDto } from "@/interface/Algorithm/Basic/TwoPointerResponseDto";

export default function TwoPointer() {
    const [twoPointerArr, setTwoPointerArr] = useState("");
    const [twoPointerTarget, setTwoPointerTarget] = useState("");
    const [resultData, setResultData] = useState("");

    function textChangeTwoPointerArr(event: React.ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        value = value.substring(0, 100)
        if(InputRegexFunction(value, InputRegex.TwoPointerArr)){
            setTwoPointerArr(value)
        }else if(value == "") setTwoPointerArr("");
    }

    function textChangeTwoPointerTarget(event: React.ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        if(InputRegexFunction(value, InputRegex.TwoPointerTarget)){
            if(value.length >=2 ) value.substring(0,1)
            setTwoPointerTarget(value)
        }else if(value == "") setTwoPointerTarget("");
    }

    const twoPointerRequestSend = async () => {
        const url = `${process.env.API_BASE_URL}/algorithm/two/pointer/`
        if(twoPointerArr === "") return
        if(twoPointerTarget === "") return
        const data = {
            twoPointerArr: twoPointerArr,
            twoPointerTarget: twoPointerTarget
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
            const TwoPointerResponseDto: TwoPointerResponseDto = await response.json()
            setResultData(TwoPointerResponseDto.twoPointerResult.toString());
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
                                <div className={DefaultClassNames.FormDefaultParentDiv}>
                                    <div className="py-8 px-4 mx-auto max-w-3xl">
                                        <div className="py-3 my-2 text-center">
                                            <span className="text-xl font-bold text-white text-center mr-1">투 포인트 알고리즘</span><BiBong className="inline-block text-xl font-bold text-white mb-2 hover:animate-pulse"></BiBong>
                                        </div>
                                        <div className="sm:col-span-2 mb-5">
                                            <label htmlFor="twoPointerTarget" className="block mb-2 text-sm font-medium text-white">포인트 합계</label>
                                            <input onChange={textChangeTwoPointerTarget} type="text" name="twoPointerTarget" id="twoPointerTarget" className={DefaultClassNames.FormDefaultChangeInput} placeholder="포인터 ex)6" value={twoPointerTarget} />
                                        </div>
                                        <div className="sm:col-span-2 mt-5">
                                            <label htmlFor="twoPointerArr" className="block mb-2 text-sm font-medium text-white">탐색 배열</label>
                                            <input onChange={textChangeTwoPointerArr} type="text" name="twoPointerArr" id="twoPointerArr" className={DefaultClassNames.FormDefaultChangeInput} placeholder="수열 ex)3456678" value={twoPointerArr} />
                                        </div>

                                        <div className="text-center">
                                                <button onClick={twoPointerRequestSend} type="button" className={DefaultClassNames.FormDefaultSendButton}>
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