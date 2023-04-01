
import { useRouter } from "next/router";
import { BiTrash } from "react-icons/bi";

interface FetchNoticeFunction {
    fetchNoticeInfo: () => Promise<void>;
  }

export default function DeleteButton(fetchNoticeFunction:FetchNoticeFunction) {
    const router = useRouter();

    const handleClick = async () => {
        await fetchNoticeFunction.fetchNoticeInfo();
    }


    return (
        <button className="text-plus200 hover:text-white border border-plusOrange hover:bg-plus400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2" 
        onClick={handleClick}>
        <BiTrash className="inline"></BiTrash> 삭제
        </button>
    );
}