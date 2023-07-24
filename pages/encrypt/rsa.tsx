import CopyButton from "@/components/Etc/Button/CopyButton";
import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import HalfAndHalfDiv from "@/components/Layout/HalfAndHalfDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import MajorityDiv from "@/components/Layout/MajorityDiv";
import MajoritySubDiv from "@/components/Layout/MajoritySubDiv";
import { useEffect, useState } from "react";
import { BiLockOpen } from "react-icons/bi";
import { BiKey } from "react-icons/bi";
import Accordion from '../../components/Etc/Accordion';
import { RsaClassNames } from "@/components/ClassName/RsaClassName";
import { DefaultClassNames } from "@/components/ClassName/DefaultClassName";
import { RsaKeyMakeResponseDto } from "@/interface/Encrypt/Rsa/RsaKeyMakeResponseDto";
import { RsaEncryptResponseDto } from "@/interface/Encrypt/Rsa/RsaEncryptResponseDto";
import { RsaDecryptResponseDto } from "@/interface/Encrypt/Rsa/RsaDecryptResponseDto";
import { requestFetch } from "@/function/request/RequestFetch";
import UtilLayout from "@/components/Util/UtilLayOut";


export default function Rsa() {
    const [rsaWay, setRsaWay] = useState("encrypt");
    const [rsaPublicKey, setRsaPublicKey] = useState("");
    const [rsaPrivateKey, setRsaPrivateKey] = useState("");
    const [rsaContent, setRsaContent] = useState("");
    const [rsaResult, setRsaResult] = useState("적절한 값을 먼저 입력해주세요.");

    const rsaWayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setRsaWay(value);
    }

    const rsaPublicKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if (value.length <= 32) setRsaPublicKey(value);
    }

    const rsaPrivateKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length <= 16) setRsaPrivateKey(value);
    }

    const rsaContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setRsaContent(value);
    }

    function isValidRsaPublicKey(rsaPublicKey: string) {
        return rsaPublicKey.length == 392;
    }

    function isValidRsaPrivateKey(rsaPrivateKey: string) {
        return rsaPrivateKey.length == 1624;
    }

    function isValidRsaContent(rsaContent: string) {
        return rsaContent.length <= 5000;
    }

    const rsaRequestCheck = () => {
        if (isValidRsaPublicKey(rsaPublicKey)) {
            if (isValidRsaPrivateKey(rsaPrivateKey)) {
                if (isValidRsaContent(rsaContent)) return true;
                else false;
            } else return false;
        } else return false;
    }

    const rsaKeyMake = async () => {
        const path = `/enc/rsa/key/make`
        const response: Response | null = await requestFetch('GET', path, null, 'application/json')
        if (response !== null) {
            const rsaKeyMakeResponseDto: RsaKeyMakeResponseDto = await response.json()
            setRsaPublicKey(rsaKeyMakeResponseDto.publicKey)
            setRsaPrivateKey(rsaKeyMakeResponseDto.privateKey)
        }
    }

    const rsaRequestSend = async () => {
        if (rsaRequestCheck()) {
            const requestType = rsaWay;
            let data = null
            const path = `/enc/rsa/content/${requestType}`
            if(requestType === 'encrypt'){
                data = {
                    rsaPublicKey : rsaPublicKey,
                    rsaBeforeContent : rsaContent
                };
            }else if(requestType === 'decrypt'){
                data = {
                    rsaPrivateKey : rsaPrivateKey,
                    rsaAfterContent : rsaContent
                };
            }

            if(data === null) return
            const response: Response | null = await requestFetch('POST', path, data, 'application/json')
            if (response !== null) {
                if (requestType === "encrypt") {
                    const rsaEncryptResponseDto: RsaEncryptResponseDto = await response.json()
                    setRsaResult(rsaEncryptResponseDto.encryptContent)
                } else if (requestType === "decrypt") {
                    const rsaDecryptResponseDto: RsaDecryptResponseDto = await response.json()
                    setRsaResult(rsaDecryptResponseDto.decryptContent)
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
                                        RSA암호는 공개키 암호시스템의 하나로, 암호화뿐만 아니라 전자서명이 가능한 최초의 알고리즘으로 알려져 있다. RSA가 갖는 전자서명 기능은 인증을 요구하는 전자 상거래 등에 RSA의 광범위한 활용을 가능하게 하였다.
                                        1978년 로널드 라이베스트(Ron Rivest), 아디 샤미르(Adi Shamir), 레너드 애들먼(Leonard Adleman)의 연구에 의해 체계화되었으며, RSA라는 이름은 이들 3명의 이름 앞글자를 딴 것이다. 이 세 발명자는 이 공로로 2002년 튜링상을 수상했다. 그러나 RSA 방식을 제일 먼저 개발한 사람은 영국 GCHQ에 근무하던 수학자였으며, 이보다 빠른 1973년도에 개발하게 된다. 이 내용은 GCHQ에서 비밀로 취급되었으며, 이후 1997년 세상으로 발표되게 된다.
                                        RSA 암호체계의 안정성은 큰 숫자를 소인수 분해하는 것이 어렵다는 것에 기반을 두고 있다. 그러므로 큰 수의 소인수 분해를 획기적으로 빠르게 할 수 있는 알고리즘이 발견된다면 이 암호 체계는 가치가 떨어질 것이다. 1993년 피터 쇼어는 쇼어 알고리즘을 발표하여, 양자 컴퓨터를 이용하여 임의의 정수를 다항 시간 안에 소인수 분해하는 방법을 발표하였다. 따라서 양자 컴퓨터가 본격적으로 실용화되면 RSA 알고리즘은 무용지물이 될 것이다. 그러나 양자 컴퓨터가 이 정도 수준으로 실용화되려면 아직 여러 해가 더 필요할 것으로 보인다.
                                        RSA 암호화 알고리즘은 1983년에 MIT 발명자들에 의해 미국에 특허로 등록되었고, 2000년 9월 21일에 그 특허가 만료되었다.
                                    </p>
                                    <br />
                                    <p >
                                        출처 : <a className="text-plusOrange" href="https://ko.wikipedia.org/wiki/RSA_%EC%95%94%ED%98%B8">위키피디아(RSA 암호)</a>
                                    </p>
                                </Accordion>
                            </div>
                        </HalfAndHalfDiv>
                        <HalfDiv>
                            <div className="pt-48 py-15">
                                <div className={DefaultClassNames.FormMotherDiv}>
                                    <div className="py-8 px-4 mx-auto max-w-3xl">
                                        <div className="py-3 my-2 text-center">
                                            <span className="text-xl font-bold text-white text-center mr-1"> RSA 암호화</span><BiLockOpen className="inline-block text-xl font-bold text-white mb-2 hover:animate-pulse"></BiLockOpen>
                                        </div>
                                        <form action="#">
                                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                                <div>
                                                    <label htmlFor="rsaWay" className={DefaultClassNames.FormDefaultChangeLabel}>암/복호화</label>
                                                    <select onChange={rsaWayChange} id="aesWay" name="aesWay" className={DefaultClassNames.FormDefaultChangeSelect}>
                                                        <option value="encrypt">암호화</option>
                                                        <option value="decrypt">복호화</option>
                                                    </select>
                                                </div>
                                                <div className="flex justify-center">
                                                    <button onClick={rsaKeyMake} type="button" className={RsaClassNames.reaKeyMakeButton}>키 생성 <BiKey className="inline"></BiKey></button>
                                                </div>
                                                <div className="sm:col-span-2 relative">
                                                    <label htmlFor="rsaPublicKey" className={DefaultClassNames.FormDefaultChangeLabel}>RSA PublicKey</label>
                                                    <input onChange={rsaPublicKeyChange} type="text" name="rsaPublicKey" id="rsaPublicKey" className={DefaultClassNames.FormDefaultChangeInput} placeholder="공개키 정보" value={rsaPublicKey} />
                                                    <div className="absolute bottom-0 right-0 mr-2 mb-2">
                                                        <CopyButton text={rsaPublicKey}></CopyButton>
                                                    </div>
                                                    <p className={DefaultClassNames.FormRegexSpanWhite}>{rsaPublicKey.length} Byte </p>
                                                </div>
                                                <div className="sm:col-span-2 relative">
                                                    <label htmlFor="rsaPrivateKey" className={DefaultClassNames.FormDefaultChangeLabel}>RSA PrivateKey</label>
                                                    <input onChange={rsaPrivateKeyChange} type="text" name="rsaPrivateKey" id="rsaPrivateKey" className={DefaultClassNames.FormDefaultChangeInput} placeholder="비밀키 정보" value={rsaPrivateKey} />
                                                    <div className="absolute bottom-0 right-0 mr-2 mb-2">
                                                        <CopyButton text={rsaPrivateKey}></CopyButton>
                                                    </div>
                                                    <p className={DefaultClassNames.FormRegexSpanWhite}>{rsaPrivateKey.length} Byte </p>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <label htmlFor="rsaContent" className={DefaultClassNames.FormDefaultChangeLabel}>텍스트</label>
                                                    <textarea rows={10} onChange={rsaContentChange} id="aesContent" name="aesContent" className={DefaultClassNames.FormDefaultTextArea} placeholder="테스트를 진행할 내용을 입력해주세요."></textarea>
                                                    <p className={DefaultClassNames.FormRegexSpanWhite}>{rsaContent.length} 자  / 최대 5000자</p>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button onClick={rsaRequestSend} type="button" className={DefaultClassNames.FormDefaultSendButton}>
                                                    확인
                                                </button>
                                            </div>
                                        </form>
                                        <UtilLayout>

                                        </UtilLayout>
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
                                        {rsaResult}
                                    </div>
                                    <div className="absolute bottom-0 right-0 mr-2 mb-2">
                                        <CopyButton text={rsaResult}></CopyButton>
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