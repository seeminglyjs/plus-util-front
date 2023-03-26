
import { useRouter } from "next/router";

interface FetchNoticeFunction {
    fetchNoticeInfo: () => Promise<void>;
  }

export default function WriteButton(fetchNoticeFunction:FetchNoticeFunction) {
    const router = useRouter();

    const handleClick = async () => {
        await fetchNoticeFunction.fetchNoticeInfo();
    }


    return (
        <button className="text-plusOrange hover:text-white border border-plusOrange hover:bg-plus400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2" 
        onClick={handleClick}>
            작성
        </button>
    );
}