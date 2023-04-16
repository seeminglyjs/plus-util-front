import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { BiChevronUp } from "react-icons/bi";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="text-gray-500 py-2 px-1 m-2">
      <button className="flex items-center justify-between w-full py-5 font-medium text-left text-plus200 border-b border-plusGreen150" type="button" onClick={handleToggle}>
       {title} {!isOpen && <BiChevronDown className="inline"></BiChevronDown>} {isOpen && <BiChevronUp className="inline"></BiChevronUp>}
      </button>
      {isOpen && 
      <div className="py-5 border-b border-gray-200">
        <p className="mb-2 text-white">
            {children}
        </p>
      </div>}
    </div>
  );
};

export default Accordion;
