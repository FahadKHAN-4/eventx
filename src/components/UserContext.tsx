import React, { createContext, useContext, ReactNode } from 'react';

const API_BASE_URL = 'https://test-api-url.com'; 

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

interface RedeemStampBody {
  attendeeId: string;
  categoryName: string;
}

interface UserContextType {
    getAllStaticData: () => StampData[];
    getCollectedStampsData: () => CollectedStampInfo[];
    redeemGift: (params: RedeemStampBody) => Promise<void>;
    attendeeId: string;  // Adding attendeeId here
}

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
}

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const attendeeId = "134b3437-b522-4b0c-bb2c-e42cab930571";  // Define your constant attendeeId here

    const getAllStaticData = (): StampData[] => [
        {
            category: {
                name: "Sponsor Booth",
                iconUrl: "https://example.com/logo.ico"
            },
            requiredStampCount: 5,
            description: "Visit 5+ sponsor booths to get the AWS LED lamp."
        },
        {
            category: {
                name: "4/F Activity",
                iconUrl: "https://example.com/logo.ico"
            },
            requiredStampCount: 2,
            description: "Participate in 2+ activities on 4/F to get AWS camping cup."
        },
        {
            category: {
                name: "Attend Sessions",
                iconUrl: "https://example.com/logo.ico"
            },
            requiredStampCount: 4,
            description: "Attend 4+ sessions to get the AWS inflatable pillow."
        }
    ];

    const getCollectedStampsData = (): CollectedStampInfo[] => [
        // Your collected stamps data...
        {
            categoryName: "Sponsor Booth",
            collectedStamps: ["Booth 1", "Booth 2", "Booth 3", "Booth 4", "Booth 5", "Booth 6", "Booth 7"],
            isEligibleForGift: true,
            redeemedAt: null
        },
        {
            categoryName: "4/F Activity",
            collectedStamps: ["Activity 1 Name", "Activity 2 Name"],
            isEligibleForGift: true,
            redeemedAt: "2024-05-03T09:36:35.378Z"
        },
        {
            categoryName: "Attend Sessions",
            collectedStamps: ["Session 1 Name", "Session 2 Name", "Session 3 Name"],
            isEligibleForGift: false,
            redeemedAt: null
        }
    ];

    async function redeemGift({ attendeeId, categoryName }: RedeemStampBody): Promise<void> {
      const body = JSON.stringify({ categoryName });
    //   return fetch(`${API_BASE_URL}/api/stamp/${attendeeId}/redeem`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //     },
    //     body,
    //   });
    }

    return (
        <UserContext.Provider value={{ getAllStaticData, getCollectedStampsData, redeemGift, attendeeId }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

