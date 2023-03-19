interface ButtonProps {
    buttonName: string;
    disableCheck?: boolean;
}

export default function Button({ buttonName, disableCheck = true}: ButtonProps) {
    return (
        <>
            {disableCheck && (<button className="bg-plusOrange px-4 py-2 rounded-full">
                {buttonName ? buttonName : "Button"}
            </button>)}
            {!disableCheck && (<button className="bg-gray-500 text-gray-300 px-4 py-2 rounded-full cursor-not-allowed" disabled>
                {buttonName ? buttonName : "Button"}
            </button>)}
        </>
    )
}