import Image from 'next/image';
import mainBackgroundImage from '../../public/main/pramod-tiwari-BpmtsO4JTEw-unsplash.jpg';
import MainDiv from "../Layout/MainDiv";
import Link from "next/link";

export default function MainBanner() {
  const mainBannerStyle: React.CSSProperties = {
    backgroundImage: `url(${mainBackgroundImage.src})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '600px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingLeft: '50px',
    paddingBottom: '50px',
  };

  const authorStyle: React.CSSProperties = {
    alignSelf: 'flex-end',
    marginTop: 'auto',
    color: '#fff',
    fontWeight: 'bold',
    textDecoration: 'none',
  };

  return (
    <div>
      <div
        className="max-w-full mx-auto py-56 px-4 sm:px-6 lg:px-8"
        style={mainBannerStyle}
      >
        <div>
          <h1 className="text-4xl font-bold">
            Plus-Util[Beta]
          </h1>
          <p className="mt-4 text-xl">
            이곳저곳 유틸리티 집합소

          </p>
          <button className="mt-4 bg-plus300 hover:bg-plusOrange font-semibold py-2 px-4 rounded-full shadow btn-sm">
            <Link href="/notice/list">
            Go Plus
            </Link>
          </button>
        </div>
        <a
          href="https://unsplash.com/ko/%EC%82%AC%EC%A7%84/BpmtsO4JTEw"
          style={authorStyle}
        >
          By Pramod Tiwari
        </a>
      </div>
    </div>
  );
}
