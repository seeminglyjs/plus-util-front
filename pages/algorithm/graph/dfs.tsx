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
import { DfsResponseDto } from "@/interface/Algorithm/Grapth/DfsResponseDto";


export default function SlidingWindow() {
    const [dfsRow, setDfsRow] = useState("");
    const [dfsCol, setDfsCol] = useState("");
    const [dfsStartRow, setDfsStartRow] = useState("");
    const [dfsStartCol, setDfsStartCol] = useState("");
    const [dfsEndRow, setDfsEndRow] = useState("");
    const [dfsEndCol, setDfsEndCol] = useState("");

    const [resultData, setResultData] = useState("");

    function textChangedfs(event: React.ChangeEvent<HTMLInputElement>) {
        let target = event.target
        let id = target.id
        let value = target.value;
        if(parseInt(value,10) > 15) value = "15"
        if(parseInt(value,10) < 1) value = "1"
        if(id === "dfsRow") setDfsRow(value)
        if(id === "dfsCol") setDfsCol(value)
        if(id === "dfsStartRow") setDfsStartRow(value)
        if(id === "dfsStartCol") setDfsStartCol(value)
        if(id === "dfsEndRow") setDfsEndRow(value)
        if(id === "dfsEndCol") setDfsEndCol(value)
    }

    const dfsRequestSend = async () => {
        const url = `${process.env.API_BASE_URL}/algorithm/dfs/distance`
        if(dfsRow === "" || dfsCol === "" || dfsStartRow === "" || dfsStartCol === "" || dfsEndRow === "" || dfsEndCol === "") return
        if(dfsRow < dfsStartRow|| dfsCol < dfsStartCol || dfsEndRow < dfsStartRow || dfsEndCol < dfsStartCol) return
        
        const data = {
            dfsRow: dfsRow,
            dfsCol: dfsCol,
            dfsStartRow: dfsStartRow,
            dfsStartCol: dfsStartCol,
            dfsEndRow: dfsEndRow,
            dfsEndCol: dfsEndCol
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
            const dfsResponseDto: DfsResponseDto = await response.json()
            setResultData(dfsResponseDto.dfsSearchResult.toString());
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
                                            <span className="text-xl font-bold text-white text-center mr-1">DFS 알고리즘</span><BiBong className="inline-block text-xl font-bold text-white mb-2 hover:animate-pulse"></BiBong>
                                        </div>
                                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                            <div>
                                                <label htmlFor="dfsRow" className={DefaultClassNames.FormDefaultChangeLabel}>행</label>
                                                <input onChange={textChangedfs} type="number" name="dfsRow" id="dfsRow" className={DefaultClassNames.FormDefaultChangeInput} placeholder="값을 입력해 주세요. 15이하" value={dfsRow} />
                                            </div>
                                            <div >
                                                <label htmlFor="dfsCol" className={DefaultClassNames.FormDefaultChangeLabel}>열</label>
                                                <input onChange={textChangedfs} type="number" name="dfsCol" id="dfsCol" className={DefaultClassNames.FormDefaultChangeInput} placeholder="값을 입력해 주세요. 15이하" value={dfsCol} />
                                            </div>
                                            <div>
                                                <label htmlFor="dfsStartRow" className={DefaultClassNames.FormDefaultChangeLabel}>시작 행</label>
                                                <input onChange={textChangedfs} type="number" name="dfsStartRow" id="dfsStartRow" className={DefaultClassNames.FormDefaultChangeInput} placeholder="값을 입력해 주세요. 15이하" value={dfsStartRow} />
                                            </div>
                                            <div >
                                                <label htmlFor="dfsStartCol" className={DefaultClassNames.FormDefaultChangeLabel}>시작 열</label>
                                                <input onChange={textChangedfs} type="number" name="dfsStartCol" id="dfsStartCol" className={DefaultClassNames.FormDefaultChangeInput} placeholder="값을 입력해 주세요. 15이하" value={dfsStartCol} />
                                            </div>
                                            <div>
                                                <label htmlFor="dfsEndRow" className={DefaultClassNames.FormDefaultChangeLabel}>도착 행</label>
                                                <input onChange={textChangedfs} type="number" name="dfsEndRow" id="dfsEndRow" className={DefaultClassNames.FormDefaultChangeInput} placeholder="값을 입력해 주세요. 15이하" value={dfsEndRow} />
                                            </div>
                                            <div >
                                                <label htmlFor="dfsEndCol" className={DefaultClassNames.FormDefaultChangeLabel}>도착 열</label>
                                                <input onChange={textChangedfs} type="number" name="dfsEndCol" id="dfsEndCol" className={DefaultClassNames.FormDefaultChangeInput} placeholder="값을 입력해 주세요." value={dfsEndCol} />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button onClick={dfsRequestSend} type="button" className={DefaultClassNames.FormDefaultSendButton}>
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