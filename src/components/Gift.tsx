// Gift.tsx
import React, { useState } from 'react';
import './Gift.css';
import { useUserContext } from './UserContext';
import Button from './Button';

interface GiftProps {
    imgUrl: string;
    name: string;
    requiredStampCount: number;
    description: string;
    collectedStamps?: string[];
}

const Gift: React.FC<GiftProps> = ({ imgUrl, name, requiredStampCount, description, collectedStamps }) => {
    const { redeemGift, attendeeId } = useUserContext();
    const [isRedeemed, setIsRedeemed] = useState(false);

    const handleRedeemClick = async () => {
        if (collectedStamps && collectedStamps.length >= requiredStampCount) {
            try {
                await redeemGift({ attendeeId, categoryName: name });
                setIsRedeemed(true);
            } catch (error) {
                console.error('Redemption failed:', error);
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
                <p>Collected ({collectedStamps?.length ?? 0}/{requiredStampCount}):</p>
                {collectedStamps && collectedStamps.length > 0 ? (
                    <p>{collectedStamps.join(', ')}</p>
                ) : (
                    <p>No stamps collected yet.</p>
                )}
            </div>
            <div className="button">
                <Button
                    label={isRedeemed ? "Already Redeemed" : collectedStamps && collectedStamps.length >= requiredStampCount ? "Eligible For Gift" : "Need More Stamps"}
                    onClick={handleRedeemClick}
                    isDisabled={isRedeemed || !collectedStamps || collectedStamps.length < requiredStampCount}
                    type={isRedeemed ? 'redeemed' : collectedStamps && collectedStamps.length >= requiredStampCount ? 'redeem' : 'moreStamps'}
                />
            </div>
        </div>
    );
};

export default Gift;