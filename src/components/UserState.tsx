// import React, { useState, ReactNode } from 'react';
// import UserContext, { UserContextType } from './UserContext';

// interface UserProviderProps {
//   children: ReactNode;
// }

// const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<string | null>(null);

//   // The context value must match the shape of UserContextType
//   const contextValue: UserContextType = {
//     user,
//     // Define setUser only if you're storing an object and need to update it:
//     // setUser
//   };

//   return (
//     <UserContext.Provider value={contextValue}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;

import React from 'react'

export default function UserState() {
  return (
    <div>
      
    </div>
  )
}
