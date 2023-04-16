import { useRouter } from "next/router";


export default function BackButton() {
    const router = useRouter();

    const handleClick = () => {
        router.back();
    }


    return (
        <button className="text-plusGreen200 hover:text-white border border-plusGreen200 hover:bg-plus400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2" 
        onClick={handleClick}>
            뒤로
        </button>
    );
}