import { useState, FC } from 'react';
import Clipboard from 'clipboard';
import { BiCopy } from "react-icons/bi";

type CopyButtonProps = {
    text: string;
};

const CopyButton: FC<CopyButtonProps> = ({ text }) => {

    const handleCopyClick = () => {
        const clipboard = new Clipboard("#plus-copy-button");
        clipboard.on('success', (e) => {
            console.log("success -> " + e.text)
            clipboard.destroy();
        });
        clipboard.on('error', () => {
            console.error('Failed to copy text');
            clipboard.destroy();
        });
    };

    return (
        <div className="inline-block p-1 my-2 hover:">
            <button type="button" id="plus-copy-button" data-clipboard-text={text} onClick={handleCopyClick}><BiCopy className="inline text-plusOrange"></BiCopy></button>
        </div>
    );
};

export default CopyButton;