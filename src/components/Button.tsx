import React from 'react';
import './Button.css';  

interface ButtonProps {
    label: string;
    onClick: () => void;
    isDisabled: boolean;
    type: 'redeem' | 'moreStamps' | 'redeemed';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, isDisabled, type }) => {
    // const getIcon = () => {
    //     switch (type) {
    //         case 'redeem':
    //             return <someicon />;
    //         case 'moreStamps':
    //             return <someicon />;
    //         case 'redeemed':
    //             return <someicon />;
    //         default:
    //             return null;
    //     }
    // };

    return (
        <button
            className={`button ${type}`}  
            onClick={onClick}
            disabled={isDisabled}
        >
            {/* {getIcon()} */}
            {label}
        </button>
    );
};

export default Button;