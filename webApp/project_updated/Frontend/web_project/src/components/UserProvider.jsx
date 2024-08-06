
'use client';

import React, { useState } from "react";
import User from "@/context/User";

export default function UserProvider({ children }) {
    const [userObj, setUser] = useState(null);

    return (
        <User.Provider value={[userObj, setUser]}>
            {children}
        </User.Provider>
    );
}