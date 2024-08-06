
'use client';

import React, { useState, useEffect, useRef, useContext } from "react";
import "../../globals.css";
import { useRouter } from "next/navigation";
import User from "@/context/User";
import axios from "axios";
import { getRefreshToken, removeRefreshToken } from "@/utils/auth";
import { removeAccessToken, getUserInfo, authCheckPassed } from "@/utils/auth";


import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { Button } from "@/components/ui/button"




export default function Navbar() {

    const router = useRouter();

    const [showContent, setShowContent] = useState(false);

    const [menu, showMenu] = useState(false);
    const [clicked, setClicked] = useState(false);

    const [globalUser, setGlobalUser] = useContext(User);

    const [currentUser, setCurrentUser] = useState('');

    //const [hideMenu, setHide] = useState("hidden");
    const hideMenu = useRef(null); // Gets the reference of the object element

    const [opacity, setOpacity] = useState("opacity-0");


    useEffect(() => {
        const authPassed = async () => {
            const passed = await authCheckPassed();
            if (!passed) {
                router.push("/login");
                return; // adding a return because router.push is an asynchronous operation therefore could lead to unnecessary code execution of statements below it, hence the return will prevent it.
            }

            if (globalUser === null || globalUser === undefined) {    // Checks if userState is either NULL or undefined
                const userInfo = getUserInfo();
                setGlobalUser(userInfo);
            }

            setShowContent(true);


        }
        authPassed();
    }, []);



    useEffect(() => {
        if (clicked === true) {
            showMenu(true);
            //setHide("");
            if (hideMenu.current && hideMenu.current.classList.contains('hidden')) {
                hideMenu.current.classList.remove('hidden');
            }

            setTimeout(() => {
                setOpacity("opacity-100");
            }, 100);

        } else {
            showMenu(false);
            //setHide("hidden");
            if (hideMenu.current) {
                hideMenu.current.classList.add('hidden');
            }
            
            setOpacity("opacity-0");
        }
    }, [clicked]);

    useEffect(() => {
        function fetchUsers() {
            if (menu === true) {
                if (globalUser != null) { // will pass condition, that is return true if globalUser is null or undefined (type coercion)
                    setCurrentUser(globalUser.username);
                }
            }
        }
        fetchUsers();

    }, [menu]);

    async function signOut() {
        try {
            const refreshToken = getRefreshToken();
            const response = await axios.post(`${process.env.SERVER_API}/logout`, {
                'refreshToken': `${refreshToken}`
            });
            if (response && response.status === 200) {
                removeAccessToken();
                removeRefreshToken();
                console.log(response.data.message);
                setGlobalUser(null);
                router.push("/login");
            }

        } catch (e) {
            console.log(`error cannot logout: ${e}`);
            removeAccessToken();
            removeRefreshToken();
            router.push("/login");
        }

    }



    if (!showContent) {
        return null;
    }


    return (
        <div className="grid grid-cols-1 relative">
            <div className="flex justify-between items-center bg-webprojectblue p-4">
                <div className="flex gap-2">
                    <h1 className="font-bold text-4xl text-webprojectwhite">Logo</h1>
                    <Drawer direction="left">
                        <DrawerTrigger asChild>
                            <div id="menuButton" className="text-white hover:cursor-pointer self-center hover:bg-slate-400 transition duration-200 ease-out">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </DrawerTrigger>
                        <DrawerContent className="focus:outline-none h-full w-[400px]" >
                            <DrawerHeader>
                                <DrawerTitle>Menu</DrawerTitle>
                                <DrawerDescription>Select an option</DrawerDescription>
                            </DrawerHeader>
                            <div className="p-4">
                                {/* Add your menu items here */}
                                <p>Menu Item 1</p>
                                <p>Menu Item 2</p>
                                <p>Menu Item 3</p>
                            </div>
                            <DrawerFooter>
                                <DrawerClose asChild>
                                    <Button variant="ghost" className="transition duration-300 ease-out">Close</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>


                <h1 className="text-webprojectwhite text-3xl">Welcome!</h1>

                <div onClick={() => setClicked(!clicked)} className="hover:cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 text-webprojectwhite">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>
            </div>

            <div ref={hideMenu} className={`grid grid-cols-1 grid-flow-row bg-zinc-100 shadow-sm w-1/5 justify-self-end text-center absolute box-border rounded-xl overflow-hidden duration-500 ${opacity}`} style={{ top: 88 }}>
                <span>{currentUser !== '' ? currentUser : 'userNotFound'}</span>
                <span onClick={signOut} className="cursor-pointer">Sign-Out</span>
            </div>


        </div>
    );
}