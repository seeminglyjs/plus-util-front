import { ReactNode, useEffect, useState } from 'react';
import { UtilInfoDto } from "@/interface/Util/Info/UtilInfoDto";
import { useRouter } from "next/router";
import { getUtilInfoByUrlPath, likeUtilInfoCheck, utilInfoLike, utilInfoLikeRevoke, viewUtilInfoToday } from "@/function/util/UtilViewAndLikeFunction";
import { UtilLikeResponseDto } from "@/interface/Encrypt/Aes/UtilLikeResponseDto";
import { UtilLikeRevokeResponseDto } from "@/interface/Encrypt/Aes/UtilLikeRevokeResponseDto";
import { AiFillEye, AiFillLike, AiOutlineLike } from "react-icons/ai";


type LayoutProps = {
  children: ReactNode;
};


export default function UtilLayout ({ children }: LayoutProps){
    const [utilInfoDto, setUitlInfoDto] = useState({} as UtilInfoDto);
    const [isLike, setIsLike] = useState(false);
    const [likeCount, setLikeCount] = useState(BigInt(0));
    const [viewCount, setViewCount] = useState(BigInt(0));
    const router = useRouter();

    const settingUtilInfo = async () => {
        const currentPath = router.pathname;
        const utilInfoDto: UtilInfoDto = await getUtilInfoByUrlPath(currentPath)
        setUitlInfoDto(utilInfoDto)
        viewUtilInfoToday(utilInfoDto.utilNo)
        const requestLike: boolean = await likeUtilInfoCheck(utilInfoDto.utilNo);
        setIsLike(requestLike)
        setViewCount(BigInt(utilInfoDto.utilViews))
        setLikeCount(BigInt(utilInfoDto.utilLikes))
    }

    const handleLikeClick = async () => {
        const utilLikeResponseDto: UtilLikeResponseDto | null = await utilInfoLike(utilInfoDto.utilNo);
        if (utilLikeResponseDto !== null) {
            setIsLike(utilLikeResponseDto.like)
            setLikeCount(utilLikeResponseDto.likeCount)
        }
    };

    const handleLikeRevokeClick = async () => {
        const utilLikeRevokeResponseDto: UtilLikeRevokeResponseDto | null = await utilInfoLikeRevoke(utilInfoDto.utilNo);
        if (utilLikeRevokeResponseDto !== null) {
            setIsLike(utilLikeRevokeResponseDto.like)
            setLikeCount(utilLikeRevokeResponseDto.likeCount)
        }
    };


    useEffect(() => {
        settingUtilInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <>
          <span>
        {
            isLike && (
                <span className="mt-2">
                    <AiFillEye className="inline mx-1 text-2xl"></AiFillEye>
                    <span className="inline mx-1 text-sm">{viewCount.toString()}</span>
                    <AiFillLike className="inline mx-1 text-2xl hover:cursor-pointer" onClick={handleLikeRevokeClick}>{likeCount.toString()}</AiFillLike>
                    <span className="inline mx-1 text-sm">{likeCount.toString()}</span>
                </span>
            )
        }
        {
            !isLike && (
                <span className="mt-2">
                    <AiFillEye className="inline mx-1 text-2xl"></AiFillEye>
                    <span className="inline mx-1 text-sm">{viewCount.toString()}</span>
                    <AiOutlineLike className="inline mx-1 text-2xl hover:cursor-pointer" onClick={handleLikeClick}>{likeCount.toString()}</AiOutlineLike>
                    <span className="inline mx-1 text-sm">{likeCount.toString()}</span>
                </span>
            )
        }
    </span>
      </>
    );
  };
