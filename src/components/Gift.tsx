import React, { useState } from 'react';
import './Gift.css';
import Button from './Button';
import { useUserContext } from './UserContext'; 

interface GiftProps {
    imgUrl: string;
    name: string;
    requiredStampCount: number;
    description: string;
    collectedStamps: string[];
    isEligibleForGift: boolean;
    redeemedAt: string | null;
}

const Gift: React.FC<GiftProps> = ({imgUrl,name,requiredStampCount,description,collectedStamps,isEligibleForGift,redeemedAt: initialRedeemedAt}) => {

    const { redeemGift, attendeeId } = useUserContext(); 
    const [redeemedAt, setRedeemedAt] = useState(initialRedeemedAt);

    const handleRedeemClick = async () => {
        if (!redeemedAt && isEligibleForGift) {
            try {
                await redeemGift({ attendeeId, categoryName: name });
                setRedeemedAt(new Date().toISOString()); 
                console.log("Redemption successful");
            } catch (error) {
                console.error("Failed to redeem gift:", error);
            }
        }
    };

    return (
        <div className="gift-wrapper">
            <div className="top">
                <img src={imgUrl} alt={name} />
                <div>
                    <p className="name">{name}</p>
                    <p className="description">{description}</p>
                </div>
            </div>
            <div className="bottom">
                <p>Collected ({collectedStamps.length}/{requiredStampCount}):</p>
                <p>{collectedStamps.length > 0 ? collectedStamps.join(', ') : "No stamps collected yet."}</p>
            </div>
            <div className="button">
                <Button 
                    label={redeemedAt ? "Already Redeemed" : isEligibleForGift ? "Eligible For Gift" : "Need More Stamps"}
                    onClick={handleRedeemClick}
                    isDisabled={!isEligibleForGift || redeemedAt !== null}
                    type={redeemedAt ? 'redeemed' : isEligibleForGift ? 'redeem' : 'moreStamps'}
                />
            </div>
        </div>
    );
};

export default Gift;