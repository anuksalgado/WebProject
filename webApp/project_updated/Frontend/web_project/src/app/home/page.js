
/*import React, { useEffect, useContext } from "react";
import { authCheckPassed, getUserInfo } from "@/utils/auth";
import { useRouter } from "next/navigation";
import User from "@/context/User"; */
import CardGrid from "@/components/CardGrid";
import Navbar from "@/components/Navbar";



export default function home() {

    /*const router = useRouter();

    const [userState, setUserState] = useContext(User);

    useEffect(() => {
        const authPassed = async () => {
            const passed = await authCheckPassed();
            if (!passed) {
                router.push("/login");
            }

            if (userState === null || userState === undefined) {    // Checks if userState is either NULL or undefined
                const userInfo = getUserInfo();
                setUserState(userInfo);
            }
            


        }
        authPassed();
    }, []);*/

    return (
        <div><Navbar /><CardGrid /></div>
    );
}

