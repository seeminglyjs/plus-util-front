import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface AuthData {
  // Define the authentication object properties you want to access here
  name: string;
  authorities: string[];
  // Add more properties as needed
}

interface Props {
  authData: AuthData;
}

export const getServerSideProps: GetServerSideProps<Props, ParsedUrlQuery> = async ({ req }) => {
  const baseUrl = process.env.API_BASE_URL; // replace with your Spring Boot API endpoint base URL
  const cookie = req.headers.cookie;
  const url = `${baseUrl}/auth/`;

  const response = await fetch(url, {
    headers: {
      Cookie: cookie ?? '',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    return {
      redirect: {
        destination: '/login', // replace with your login page URL
        permanent: false,
      },
    };
  }

  const authData: AuthData = await response.json();

  return {
    props: {
      authData,
    },
  };
};

export default function MyPage({ authData }: Props) {
  // Use the authentication object properties as needed
  const { name, authorities } = authData;
    console.log("authData-> " +authData)
    console.log("authData name -> " +name)
}