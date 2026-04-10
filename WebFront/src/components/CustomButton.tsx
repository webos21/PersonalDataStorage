import React, { ReactNode } from 'react';

export enum ButtonType {
    WHITE = 'white',
    BLUE = 'blue'
}

export interface CustomButtonProps {
    icon?: ReactNode;
    onClick?: () => void;
    message?: string;
    variant?: 'white' | 'blue';
}

const CustomButton: React.FC<CustomButtonProps> = ({ icon, onClick, message, variant }) => {
    const baseClass = "flex h-11 cursor-pointer items-center justify-center shadow-md rounded-full px-5 transition duration-300 border border-transparent";
    const whiteClass = "bg-white text-black hover:bg-black hover:text-white";
    const blueClass = "bg-blue-700 text-white ml-2";

    const variantClass = variant === 'blue' ? blueClass : whiteClass;

    return (
        <div className={`${baseClass} ${variantClass}`} onClick={onClick}>
            <div className="flex flex-row items-center">
                {icon}
                <span className={`text-xs ${icon ? 'ml-1' : ''}`}>{message}</span>
            </div>
        </div>
    );
};

export default CustomButton;
