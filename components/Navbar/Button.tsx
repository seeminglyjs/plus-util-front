interface ButtonProps {
    buttonName: string;
  }

export default function Button ({buttonName} : ButtonProps){
    return (
        <button className="bg-plusOrange px-4 py-2 rounded-full">
            {buttonName? buttonName : "Button"}
        </button>
    )
}