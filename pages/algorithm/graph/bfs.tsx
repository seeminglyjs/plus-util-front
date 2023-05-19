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
import { BiBong } from "react-icons/bi";
import { BfsResponseDto } from "@/interface/Algorithm/Grapth/BfsResponseDto";


export default function SlidingWindow() {
    const [bfsRow, setBfsRow] = useState("");
    const [bfsCol, setBfsCol] = useState("");
    const [bfsStartRow, setBfsStartRow] = useState("");
    const [bfsStartCol, setBfsStartCol] = useState("");
    const [bfsEndRow, setBfsEndRow] = useState("");
    const [bfsEndCol, setBfsEndCol] = useState("");

    const [resultData, setResultData] = useState("");

    function textChangeBfs(event: React.ChangeEvent<HTMLInputElement>) {
        let target = event.target
        let id = target.id
        let value = target.value;
        if(parseInt(value,10) > 15) value = "15"
        if(parseInt(value,10) < 1) value = "1"
        if(id === "bfsRow") setBfsRow(value)
        if(id === "bfsCol") setBfsCol(value)
        if(id === "bfsStartRow") setBfsStartRow(value)
        if(id === "bfsStartCol") setBfsStartCol(value)
        if(id === "bfsEndRow") setBfsEndRow(value)
        if(id === "bfsEndCol") setBfsEndCol(value)
    }

    const bfsRequestSend = async () => {
        const url = `${process.env.API_BASE_URL}/algorithm/bfs/distance`
        if(bfsRow === "" || bfsCol === "" || bfsStartRow === "" || bfsStartCol === "" || bfsEndRow === "" || bfsEndCol === "") return
        if(bfsRow < bfsStartRow|| bfsCol < bfsStartCol || bfsEndRow < bfsStartRow || bfsEndCol < bfsStartCol) return
        
        const data = {
            bfsRow: bfsRow,
            bfsCol: bfsCol,
            bfsStartRow: bfsStartRow,
            bfsStartCol: bfsStartCol,
            bfsEndRow: bfsEndRow,
            bfsEndCol: bfsEndCol
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
            const BfsResponseDto: BfsResponseDto = await response.json()
            setResultData(BfsResponseDto.bfsSearchResult.toString());
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
                                    <div className="py-8 px-4 mx-auto max-w-3xl">
                                        <div className="py-3 my-2 text-center">
                                            <span className="text-xl font-bold text-white text-center mr-1">BFS 알고리즘</span><BiBong className="inline-block text-xl font-bold text-white mb-2 hover:animate-pulse"></BiBong>
                                        </div>
                                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                            <div>
                                                <label htmlFor="bfsRow" className={DefaultClassNames.FormDefaultChangeLabel}>행</label>
                                                <input onChange={textChangeBfs} type="number" name="bfsRow" id="bfsRow" className={DefaultClassNames.FormDefaultChangeInput} placeholder="값을 입력해 주세요. 15이하" value={bfsRow} />
                                            </div>
                                            <div >
                                                <label htmlFor="bfsCol" className={DefaultClassNames.FormDefaultChangeLabel}>열</label>
                                                <input onChange={textChangeBfs} type="number" name="bfsCol" id="bfsCol" className={DefaultClassNames.FormDefaultChangeInput} placeholder="값을 입력해 주세요. 15이하" value={bfsCol} />
                                            </div>
                                            <div>
                                                <label htmlFor="bfsStartRow" className={DefaultClassNames.FormDefaultChangeLabel}>시작 행</label>
                                                <input onChange={textChangeBfs} type="number" name="bfsStartRow" id="bfsStartRow" className={DefaultClassNames.FormDefaultChangeInput} placeholder="값을 입력해 주세요. 15이하" value={bfsStartRow} />
                                            </div>
                                            <div >
                                                <label htmlFor="bfsStartCol" className={DefaultClassNames.FormDefaultChangeLabel}>시작 열</label>
                                                <input onChange={textChangeBfs} type="number" name="bfsStartCol" id="bfsStartCol" className={DefaultClassNames.FormDefaultChangeInput} placeholder="값을 입력해 주세요. 15이하" value={bfsStartCol} />
                                            </div>
                                            <div>
                                                <label htmlFor="bfsEndRow" className={DefaultClassNames.FormDefaultChangeLabel}>도착 행</label>
                                                <input onChange={textChangeBfs} type="number" name="bfsEndRow" id="bfsEndRow" className={DefaultClassNames.FormDefaultChangeInput} placeholder="값을 입력해 주세요. 15이하" value={bfsEndRow} />
                                            </div>
                                            <div >
                                                <label htmlFor="bfsEndCol" className={DefaultClassNames.FormDefaultChangeLabel}>도착 열</label>
                                                <input onChange={textChangeBfs} type="number" name="bfsEndCol" id="bfsEndCol" className={DefaultClassNames.FormDefaultChangeInput} placeholder="값을 입력해 주세요." value={bfsEndCol} />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button onClick={bfsRequestSend} type="button" className={DefaultClassNames.FormDefaultSendButton}>
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