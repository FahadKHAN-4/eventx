import React, { useState, useEffect } from 'react';
import { useUserContext } from './UserContext';
import Gift from './Gift';
import './main.css';

interface Category {
    name: string;
    iconUrl: string;
}

interface StampData {
    category: Category;
    requiredStampCount: number;
    description: string;
}

interface CollectedStampInfo {
    categoryName: string;
    collectedStamps: string[];
    isEligibleForGift: boolean;
    redeemedAt: string | null;
}

interface GiftData extends StampData {
    collectedStamps: string[];
    isEligibleForGift: boolean;
    redeemedAt: string | null;
}

const Main: React.FC = () => {
    const { getAllStaticData, getCollectedStampsData } = useUserContext();
    const [giftData, setGiftData] = useState<GiftData[]>([]); 

    useEffect(() => {
        const stampData = getAllStaticData();
        const collectedData = getCollectedStampsData();

        const mergedData = stampData.map((stamp): GiftData => {
            const collectedInfo = collectedData.find(collected => collected.categoryName === stamp.category.name);
            return {
                ...stamp,
                collectedStamps: collectedInfo ? collectedInfo.collectedStamps : [],
                isEligibleForGift: collectedInfo ? collectedInfo.isEligibleForGift : false,
                redeemedAt: collectedInfo ? collectedInfo.redeemedAt : null
            };
        });

        setGiftData(mergedData);
    }, [getAllStaticData, getCollectedStampsData]);

    return (
        <div className="main-container">
            <div className='stampheader'>
                <h1>Stamp Collection</h1>
                <div>
                    <i className="fa-solid fa-rotate-right"></i>
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className="gifts-container">
                {giftData.map((gift, index) => (
                    <Gift
                        key={index}
                        imgUrl={gift.category.iconUrl}
                        name={gift.category.name}
                        requiredStampCount={gift.requiredStampCount}
                        description={gift.description}
                        collectedStamps={gift.collectedStamps}
                        isEligibleForGift={gift.isEligibleForGift}
                        redeemedAt={gift.redeemedAt}
                    />
                ))}
            </div>
        </div>
    );
};

export default Main;