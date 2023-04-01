
import { useRouter } from "next/router";
import { BiEdit } from "react-icons/bi";

interface noticeFunction {
    noticeInfo: () => void;
  }

export default function UpdateButton(noticeFunction:noticeFunction) {
    const router = useRouter();

    const handleClick =  () => {
        noticeFunction.noticeInfo();
    }


    return (
        <button className="text-plus200 hover:text-white border border-plusOrange hover:bg-plus400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2" 
        onClick={handleClick}>
        <BiEdit className="inline"></BiEdit> 수정
        </button>
    );
}