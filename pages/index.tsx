import api from "@/lib/axios";
import MainBanner from '../components/Main/MainBanner';
import { useState, useEffect } from 'react';
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from '../components/Layout/MainSubDiv';
import ContentColDiv from '../components/Layout/ContentColDiv';
import ContentRowDiv from "@/components/Layout/ContentRowDiv";
import HalfDiv from "@/components/Layout/HalfDiv";
import NavBar from "@/components/Navbar/NavBar";

interface GithubLanguages {
  gvalue: string;
  gkey: string;
}

interface Data {
  code: string;
  githubCodeSum: number;
  githubLanguagesList: [GithubLanguages];
};

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
              <p className="text-2xl font-bold text-plus200">
                About
              </p>
              <div className="pt-3">
                <p>
                  자주 사용하는 유틸 정보들을 한곳에 모아 편하게 사용하고자 해당 서비스를 기획하게 되었으며, 필요에 따라 기능을 추가하고 있습니다.
                </p>
              </div>
            </HalfDiv>

            <HalfDiv>
              <p className="text-2xl font-bold text-plus200">
                Source Code List
              </p>
              <div className="pt-3">
                {dataCheck && (data.githubLanguagesList.map((codeMap) => (
                  <div key={codeMap.gkey}>
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
        
        </ContentColDiv>
      </MainSubDiv>

    </MainDiv>
    </div>
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
