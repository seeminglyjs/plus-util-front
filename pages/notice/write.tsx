
import MainDiv from "@/components/Layout/MainDiv";
import MainSubDiv from "@/components/Layout/MainSubDiv";
import { GetServerSideProps } from 'next';
import { AuthData } from "@/interface/Auth/AuthData";
import { fetchAuthData } from '@/function/auth/GetAuthencation';
import { ParsedUrlQuery } from 'querystring';
import { Props } from '@/interface/Auth/Props';


export default function NoticeWrite(){

    return(
        <MainDiv>
            <MainSubDiv>
                
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