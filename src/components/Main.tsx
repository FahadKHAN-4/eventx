import React, { useState, useEffect } from 'react';
import { useUserContext } from './UserContext';
import Gift from './Gift';

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
    collectedStamps?: string[];
}

const Main: React.FC = () => {
    const { getAllStaticData, getCollectedStampsData } = useUserContext();
    // Explicitly set the type of state to GiftData[]
    const [giftData, setGiftData] = useState<GiftData[]>([]);

    useEffect(() => {
        const stampData = getAllStaticData();
        const collectedData = getCollectedStampsData();

        // Merge the static stamp data with dynamic collected stamps data
        const mergedData = stampData.map(stamp => {
            const collectedInfo = collectedData.find(collected => collected.categoryName === stamp.category.name);
            return {
                ...stamp,
                collectedStamps: collectedInfo ? collectedInfo.collectedStamps : undefined
            };
        });

        setGiftData(mergedData);
    }, [getAllStaticData, getCollectedStampsData]);

    return (
        <div className="main-container">
            <h1>Stamp Collection</h1>
            <div className="gifts-container">
                {giftData.map((gift, index) => (
                    <Gift
                        key={index}
                        imgUrl={gift.category.iconUrl}
                        name={gift.category.name}
                        requiredStampCount={gift.requiredStampCount}
                        description={gift.description}
                        collectedStamps={gift.collectedStamps}
                    />
                ))}
            </div>
        </div>
    );
};

export default Main;