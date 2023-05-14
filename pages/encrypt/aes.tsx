import CopyButton from "@/components/Etc/Button/CopyButton";
import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import HalfAndHalfDiv from "@/components/Layout/HalfAndHalfDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import MajorityDiv from "@/components/Layout/MajorityDiv";
import MajoritySubDiv from "@/components/Layout/MajoritySubDiv";
import { useState } from "react";
import { BiLockOpen } from "react-icons/bi";
import Accordion from '../../components/Etc/Accordion';
import { InputRegexFunction } from "@/components/Regex/InputRegexFunction";
import { InputRegex } from "@/components/Regex/InputRegex";
import { DefaultClassNames } from "@/components/ClassName/DefaultClassName";
import { AesEncryptResponseDto } from '@/interface/Encrypt/Aes/AesEncryptResponseDto';
import { AesDecryptResponseDto } from "@/interface/Encrypt/Aes/AesDecryptResponseDto";

export default function Aes() {
    const [aesWay, setAesWay] = useState("encrypt");
    const [aesType, setAesType] = useState("256");
    const [aesKey, setAesKey] = useState("");
    const [aesIv, setAesIv] = useState("");
    const [aesContent, setAesContent] = useState("");
    const [aesResult, setAesResult] = useState("적절합 값을 먼저 입력해주세요.");


    const aesWayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setAesWay(value);
    }

    const aesTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setAesType(value);
    }

    const aesKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if (value.length <= 32) setAesKey(value);
    }

    const aesIvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length <= 16) setAesIv(value);
    }

    const aesContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setAesContent(value);
    }

    function isValidAesContent(aesContent: string) {
        return aesContent.length <= 5000;
    }

    const aesRequestCheck = () => {
        if (InputRegexFunction(aesKey,InputRegex.AesKey)) {
            if (InputRegexFunction(aesIv,InputRegex.AesIv)) {
                if (isValidAesContent(aesContent)) return true;
                else false;
            } else return false;
        } else return false;
    }


    const aesRequestSend = async () => {
        if (aesRequestCheck()) {
            const requestType = aesWay;

            const url = `${process.env.API_BASE_URL}/enc/aes/${requestType}`
            const data = {
                aesKey: aesKey,
                aesIv: aesIv,
                aesContent: aesContent,
                type: aesType,
            };

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
                if (requestType === "encrypt") {
                    const aesEncryptResponseDto: AesEncryptResponseDto = await response.json()
                    setAesResult(aesEncryptResponseDto.encryptContent)
                } else if (requestType === "decrypt") {
                    const aesDecryptResponseDto: AesDecryptResponseDto = await response.json()
                    setAesResult(aesDecryptResponseDto.decryptContent)
                }

            }
        }
    }

    return (
        <MainDiv>
            <MainSubDiv>
                <ContentColDiv>
                    <ContentRowDiv>
                        <HalfAndHalfDiv>
                            <div className="pt-48 py-15">
                                <Accordion title="About">
                                    <p>
                                        고급 암호화 표준(Advanced Encryption Standard, AES)은 2001년 미국 표준 기술 연구소(NIST)에 의해 제정된 암호화 방식이다. AES는 두 명의 벨기에 암호학자인 요안 다먼과 빈센트 레이먼에 의해 개발된 Rijndael 에 기반하며 AES 공모전에서 선정되었다.
                                        AES는 미국 정부가 채택한 이후 전 세계적으로 널리 사용되고 있다. 1977년 공표된 DES를 대체한 AES는, 암호화와 복호화 과정에서 동일한 키를 사용하는 대칭 키 알고리즘이다.
                                        미국 표준 기술 연구소(NIST)는 2001년 11월 26일 AES를 미국 연방 정보 처리 표준(FIPS-197)으로 공포하였다. NIST는 5년의 표준화 과정을 거쳤으며 이 과정에서 15개의 알고리즘이 경쟁, Rijndael 암호가 가장 적합한 알고리즘으로 선정되었다. 이 표준은 2002년 5월 26일부터 효력을 발휘하기 시작했다. AES는 ISO/IEC 18033-3 표준에 포함되어 있으며 여러 암호화 패키지에서 사용되고 있다. AES는 또한 미 국가안보국에 의해 1급비밀(Top Secret)에 사용할 수 있도록 승인된 알고리즘 중 최초로 공개되어 있는 알고리즘이다.
                                        Rijndael은 알고리즘의 개발자인 빈센트 레이먼(Vincent Rijmen)과 요안 다먼(Joan Daemen)의 이름을 따서 지은 것으로 AES 표준은 여러 Rijndael 알고리즘 중 블록 크기가 128비트인 알고리즘을 말한다.
                                    </p>
                                    <br />
                                    <p >
                                        출처 : <a className="text-plusOrange" href="https://ko.wikipedia.org/wiki/%EA%B3%A0%EA%B8%89_%EC%95%94%ED%98%B8%ED%99%94_%ED%91%9C%EC%A4%80">위키피디아(고급 암호화 표준)</a>
                                    </p>
                                </Accordion>
                            </div>

                        </HalfAndHalfDiv>
                        <HalfDiv>
                            <div className="pt-48 py-15">
                                <div className="border border-plusGreen100 rounded-3xl py-8 px-4">
                                    <div className="py-8 px-4 mx-auto max-w-3xl">
                                        <div className="py-3 my-2 text-center">
                                            <span className="text-xl font-bold text-white text-center mr-1"> Aes 암호화</span><BiLockOpen className="inline-block text-xl font-bold text-white mb-2 hover:animate-pulse"></BiLockOpen>
                                        </div>
                                        <form action="#">
                                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                                <div>
                                                    <label htmlFor="aesWay" className={DefaultClassNames.FormDefaultChangeLabel}>암/복호화</label>
                                                    <select onChange={aesWayChange} id="aesWay" name="aesWay" className={DefaultClassNames.FormDefaultChangeSelect}>
                                                        <option value="encrypt">암호화</option>
                                                        <option value="decrypt">복호화</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label htmlFor="aesType" className={DefaultClassNames.FormDefaultChangeLabel}>Type Bit</label>
                                                    <select onChange={aesTypeChange} id="aesType" name="aesType" className={DefaultClassNames.FormDefaultChangeSelect}>
                                                        <option value="256">256 Bit</option>
                                                        <option disabled value="192">192 Bit</option>
                                                        <option disabled value="128">128 Bit</option>
                                                    </select>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <label htmlFor="aesKey" className={DefaultClassNames.FormDefaultChangeLabel}>Aes Key</label>
                                                    <input onChange={aesKeyChange} type="text" name="aesKey" id="aesKey" className={DefaultClassNames.FormDefaultChangeInput} placeholder="32Byte" value={aesKey} />
                                                    <p className="text-xs mt-1 text-plusGreen100">{aesKey.length} Byte </p>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <label htmlFor="aesIv" className={DefaultClassNames.FormDefaultChangeLabel}>Aes Iv</label>
                                                    <input onChange={aesIvChange} type="text" name="aesIv" id="aesIv" className={DefaultClassNames.FormDefaultChangeInput} placeholder="16Byte" value={aesIv} />
                                                    <p className="text-xs mt-1 text-plusGreen100">{aesIv.length} Byte </p>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <label htmlFor="aesContent" className={DefaultClassNames.FormDefaultChangeLabel}>텍스트</label>
                                                    <textarea rows={10} onChange={aesContentChange} id="aesContent" name="aesContent" className={DefaultClassNames.FormDefaultTextArea} placeholder="테스트를 진행할 내용을 입력해주세요."></textarea>
                                                    <p className="text-xs mt-1 text-plusGreen100">{aesContent.length} 자  / 최대 5000자</p>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button onClick={aesRequestSend} type="button" className={DefaultClassNames.FormDefaultSendButton}>
                                                    확인
                                                </button>
                                            </div>
                                        </form>
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
                                        {aesResult}
                                    </div>
                                    <div className="absolute bottom-0 right-0 mr-2 mb-2">
                                        <CopyButton text={aesResult}></CopyButton>
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