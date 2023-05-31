import ContentColDiv from "@/components/Layout/ContentColDiv";
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { AuthData } from '@/interface/Auth/AuthData';
import { fetchAuthData } from '@/function/auth/GetAuthencation';
import { Props } from '@/interface/Auth/Props';
import { ParsedUrlQuery } from "querystring";
import { BiEditAlt, BiPencil } from "react-icons/bi";
import { DefaultClassNames } from "@/components/ClassName/DefaultClassName";
import MainDiv from "@/components/Layout/MainDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import HalfAndHalfDiv from "@/components/Layout/HalfAndHalfDiv";


export default function NoticeList({ authData }: Props) {
    const { name, authorities, authenticated } = authData;
    const [utilName, setUtilName] = useState("");
    const [utilDescription, setUtilDescription] = useState("");

    const utilNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length <= 16) setUtilName(value);
    }

    
    const utilDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        if (value.length <= 16) setUtilDescription(value);
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
                                <div className="border border-gray-700 rounded-3xl py-8 px-4">
                                    <div className="py-8 px-4 mx-auto max-w-3xl">
                                        <div className="py-3 my-2 text-center">
                                            <span className="text-xl font-bold text-white text-center mr-1">유틸 정보 등록</span><BiEditAlt className="inline-block text-xl font-bold text-white mb-2 hover:animate-pulse"></BiEditAlt>
                                        </div>
                                        <form action="#">
                                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                                <div className="sm:col-span-2">
                                                    <label htmlFor="utilName" className={DefaultClassNames.FormDefaultChangeLabel}>유틸 명</label>
                                                    <input onChange={ utilNameChange} type="text" name="utilName" id="utilName" className={DefaultClassNames.FormDefaultChangeInput} placeholder="16Byte" value={utilName} />
                                                    <p className="text-xs mt-1 text-white">{utilName.length} 글자 수 </p>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <label htmlFor="utilDescription" className={DefaultClassNames.FormDefaultChangeLabel}>유틸 설명</label>
                                                    <textarea rows={10} onChange={utilDescriptionChange} id="utilDescription" name="utilDescription" className={DefaultClassNames.FormDefaultTextArea} placeholder="테스트를 진행할 내용을 입력해주세요." value={utilDescription}></textarea>
                                                    <p className="text-xs mt-1 text-white">{utilDescription.length} 자  / 최대 5000자</p>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                {
                                                    authenticated && authorities[0].authority === 'ROLE_ADMIN' && (
                                                        <Link href={`/notice/write?currentPage=${utilName}`}>
                                                            <button type="button" className={DefaultClassNames.FormDefaultSendButton}>
                                                                등록
                                                            </button>
                                                        </Link>
                                                    )
                                                }
                                            </div>
                                        </form>
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


export const getServerSideProps: GetServerSideProps<Props, ParsedUrlQuery> = async ({ req }) => {
    const authData: AuthData = await fetchAuthData(req);
    return {
        props: {
            authData,
        },
    };
};