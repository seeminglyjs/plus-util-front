import api from "@/lib/axios";
import MainBanner from '../components/Main/MainBanner';

interface GithubLanguages {
  gvalue: string;
  gkey: string;
}

interface Data {
  code: string;
  githubCodeSum: number;
  githubLanguagesList: [GithubLanguages];
};

export default function HomePage({datas} : any) {
  const data:Data = datas;

  return (
    <div>
      <MainBanner />
      <div className="container mx-auto md:flex md:pt-6">
          <div className="flex flex-col md:flex-row md:justify-between mt-4">
            <div className="w-full md:w-2/4 md:mr-4 mb-4 md:mb-0">
              <span className="text-2xl font-bold hover:text-white transition duration-500">
                About
              </span>
              <p>
                자주 사용하는 유틸 정보들을 한곳에 모아 편하게 사용하고자 해당 서비스를 기획하게 되었으며, 필요에 따라 기능을 추가하고 있습니다.
              </p>
            </div>
            <div className="w-full md:w-2/4">
              여기에 프로그래스 바를 넣자{data?.code}
            </div>
          </div>
        </div>
    </div>
  );
}


export async function getStaticProps() {
  const res = await api.get('/home')
  const datas:Data = await res.data
  
  return {
    props: {
      datas,
    },
  }
}
