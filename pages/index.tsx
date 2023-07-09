import api from "@/lib/axios";
import MainBanner from '../components/Main/MainBanner';
import { useState, useEffect } from 'react';
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from '../components/Layout/MainSubDiv';
import ContentColDiv from '../components/Layout/ContentColDiv';
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import { GitData } from "@/interface/Index/GitData";
import Link from "next/link";
import { DefaultClassNames } from "@/components/ClassName/DefaultClassName";
import { Data } from "@/interface/Index/Data";
import { UtilInfoDto } from "@/interface/Util/Info/UtilInfoDto";
import { AdminRoleResponseDto } from "@/interface/Admin/AdminRoleResponseDto";
import { UtilInfoGetResponseDto } from "@/interface/Util/Info/UtilInfoGetResponseDto";
import { BiHeart,BiMouseAlt } from "react-icons/bi";

export default function HomePage({ datas }: any) {
  const gitData: GitData = datas.gitData;
  const [topUtilArr, setTopUtilArr] = useState<UtilInfoDto[]>(datas.utilInfoDtoArr);
  const [getDataCheck, setGitDataCheck] = useState(false);

  useEffect(() => {
    if (gitData !== null) {
      setGitDataCheck(true);
    }
  }, [gitData])

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
                  {!topUtilArr && (
                    <p className={DefaultClassNames.indexUtilTopListP}> 현재 등록된 유틸 정보가 없습니다.</p>
                  )
                  }

                  {
                    topUtilArr.map((topUtil, index) => (
                      <p key={topUtil.utilNo.toString()} className={DefaultClassNames.indexUtilTopListP}>
                          <Link href={topUtil.urlPath}><span className="mx-1">{index + 1}. <b>[{topUtil.subject}]</b> {topUtil.utilName} </span>
                          
                          <a href="#" className={DefaultClassNames.indexUtilTopLikeA}>
                            좋아요 <BiHeart className="inline ml-1"></BiHeart> <span className="mx-1">:</span> <span className="ml-1">{topUtil.utilLikes}</span>
                          </a>
                          
                          <span className="mx-1"></span>
                          
                          <a href="#" className={DefaultClassNames.indexUtilTopViewA}>
                            조회수 <BiMouseAlt className="inline ml-1"></BiMouseAlt> <span className="mx-1">:</span> <span className="ml-1">{topUtil.utilViews}</span>
                          </a></Link>
                      </p>
                    ))
                  }
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
                  {getDataCheck && (gitData.githubLanguagesList.map((codeMap) => (
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
                  {!getDataCheck && (
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
  const res1 = await api.get("/home")
  const gitData: GitData = await res1.data

  const res2 = await api.get("/util/info/top/list")
  const utilInfoGetResponseDto: UtilInfoGetResponseDto = await res2.data
  const utilInfoDtoArr: UtilInfoDto[] = utilInfoGetResponseDto.utilInfoDtoList as UtilInfoDto[]
  const datas: Data = {
    gitData: gitData,
    utilInfoDtoArr: utilInfoDtoArr
  }
  return {
    props: {
      datas,
    },
  }
}
