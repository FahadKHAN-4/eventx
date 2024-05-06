import React from 'react';
import './Gift.css';

interface GiftProps {
    imgUrl: string;
    name: string;
    requiredStampCount: number;
    description: string;
    collectedStamps?: string[];
}

// Functional component with TypeScript
const Gift: React.FC<GiftProps> = ({ imgUrl, name, requiredStampCount, description, collectedStamps }) => {
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
                <button type="submit" disabled={!collectedStamps || collectedStamps.length < requiredStampCount}>
                    Eligible For Prize
                </button>
            </div>
        </div>
    );
};

export default Gift;