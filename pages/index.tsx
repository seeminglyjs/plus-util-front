import api from "@/lib/axios";
import MainBanner from '../components/Main/MainBanner';
import { useState, useEffect } from 'react';
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from '../components/Layout/MainSubDiv';
import ContentColDiv from '../components/Layout/ContentColDiv';
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import { Data } from "@/interface/Index/Data";
import MajorityDiv from "@/components/Layout/MajorityDiv";
import MajoritySubDiv from "@/components/Layout/MajoritySubDiv";
import Link from "next/link";


export default function HomePage({ datas }: any) {
  const data: Data = datas;
  const [dataCheck, setDataCheck] = useState(false);
  useEffect(() => {
    if (data !== null) {
      setDataCheck(true);
    }
  }, [data])

  return (
    <div>
      <MainDiv>
        <MainBanner />
        <MainSubDiv>
          <ContentColDiv>

            <ContentRowDiv>
              <HalfDiv>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 md:p-12 mb-8">
                  <a href="#" className="text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-700 text-blue-400 mb-2">
                    Rank
                  </a>
                  <h1 className="text-white text-3xl md:text-5xl font-extrabold mb-2">Top Util</h1>
                  <p className="text-lg font-normal text-gray-400 mb-2 hover:underline hover:cursor-pointer">1. 텍스트 도구 : 문자열에 다양한 방법으로 변환시킬 수 있습니다. </p>
                  <p className="text-lg font-normal text-gray-400 mb-2">2. Static websites are now used to bootstrap lots of websites and are </p>
                  <p className="text-lg font-normal text-gray-400 mb-2">3. Static websites are now used to bootstrap lots of websites and are </p>
                  <p className="text-lg font-normal text-gray-400 mb-2">4. Static websites are now used to bootstrap lots of websites and are </p>
                  <p className="text-lg font-normal text-gray-400 mb-2">5. Static websites are now used to bootstrap lots of websites and are </p>
                  <a href="#" className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-900">
                    Read more
                  </a>
                </div>
              </HalfDiv>

              <HalfDiv>
                <p className="text-2xl font-bold text-white">
                  Source Code List
                </p>
                <div className="pt-3">
                  {dataCheck && (data.githubLanguagesList.map((codeMap) => (
                    <div className="mt-3" key={codeMap.gkey}>
                      <div className="flex justify-between mb-1">
                        <span className="text-base font-medium dark:text-white">{codeMap.gkey}</span>
                        <span className="text-sm font-medium dark:text-white">{codeMap.gvalue}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-plusOrange h-2.5 rounded-full" style={{ width: `${codeMap.gvalue}%` }}></div>
                      </div>
                    </div>
                  )))}
                  {!dataCheck && (
                    <div className="text-xl font-semibold"><p>소스 코드 정보를 불러오는 중입니다. . . .</p></div>
                  )
                  }
                </div>
              </HalfDiv>
            </ContentRowDiv>

            <ContentRowDiv>
              <HalfDiv>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 md:p-12 mt-2">
                  <Link href="/encrypt/aes" className=" text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-700 text-green-400 mb-2">
                    AES
                  </Link>
                  <h2 className="text-white text-3xl font-extrabold mb-2">AES 암호화</h2>
                  <p className="text-lg font-normal text-gray-400 mb-4">고급 암호화 표준(Advanced Encryption Standard, AES)은 2001년 미국 표준 기술 연구소(NIST)에 의해 제정된 암호화 방식이다.</p>
                  <Link href="/encrypt/aes" className="text-plusOrange hover:underline font-medium text-lg inline-flex items-center">Go Plus
                  </Link>
                </div>
              </HalfDiv>
              <HalfDiv>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mt-2">
                  <Link href="/encrypt/rsa" className=" text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-700 text-purple-400 mb-2">
                    RSA
                  </Link>
                  <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">RSA 암호화</h2>
                  <p className="text-lg font-normal text-gray-400 mb-4">RSA암호는 공개키 암호시스템의 하나로, 암호화뿐만 아니라 전자서명이 가능한 최초의 알고리즘으로 알려져 있다. </p>
                  <Link href="/encrypt/rsa" className="text-plusOrange hover:underline font-medium text-lg inline-flex items-center">Go Plus
                  </Link>
                </div>
              </HalfDiv>
            </ContentRowDiv>

          </ContentColDiv>
        </MainSubDiv>
      </MainDiv>
    </div >
  );
}

export async function getStaticProps() {
  const res = await api.get('/home')
  const datas: Data = await res.data

  return {
    props: {
      datas,
    },
  }
}
