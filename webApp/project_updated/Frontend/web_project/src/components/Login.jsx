
'use client';

import React, { useEffect, useState, useContext } from "react";
import "../../globals.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from "next/image";
import User from "@/context/User";
import { getRefreshToken, getUserInfo } from "@/utils/auth";

import { getAccessToken, setTokens } from "@/utils/auth";

export default function Login() {

    const [userState, setUserState] = useContext(User);

    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const accessToken = getAccessToken();
        const refreshToken = getRefreshToken();

        if (accessToken || refreshToken) {

            router.push("/home");
            return;
            
        } else {
            setShowContent(true);
        }

        
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        console.log('Username:', username);
        console.log('Password:', password);

        {/*const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);*/}

        try {
            const response = await axios.post(`${process.env.SERVER_API}/login`, {
                username,
                password,
            });

            console.log(response.data);

            if (response.status === 200) {
                setTokens(response.data.accessToken, response.data.refreshToken);
                const userInfo = getUserInfo();
                setUserState(userInfo);
                router.push("/home");
            }


        } catch (e) {
            console.log(`error : ${e}`);
        }

    }

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    if (!showContent) {
        /*return (
            <h1>REDIRECTING TO HOME PAGE.......</h1>
        )*/

        return null;
    }

    return (
        <div className="h-screen py-4">
            <div className="flex flex-col items-center justify-center mx-4 sm:mx-10 md:mx-20 bg-zinc-50 border shadow-md h-full rounded-md">
                <h1 className="font-bold text-4xl text-webprojectblue">Logo</h1>
                <h1 className="text-lg sm:text-xl md:text-2xl mt-2">
                    Register or Sign in to your account
                </h1>
                <div className="bg-white w-4/5 md:w-3/4 lg:w-4/6 xl:w-3/6 px-10 shadow-sm mt-10 rounded-lg py-7">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username" id="labelEmail" className="text-sm sm:text-base">
                            Email address
                        </label>
                        <div className="my-2">
                            <input
                                name="username"
                                id="username"
                                type="email"
                                autoComplete="email"
                                required
                                value={username}
                                className="border border-zinc-300 rounded-md w-full p-1"
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <label htmlFor="password" id="labelPassword" className="text-sm sm:text-base">
                            Password
                        </label>
                        <div className="my-2">
                            <input
                                name="password"
                                id="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                value={password}
                                className="border border-zinc-300 rounded-md w-full p-1"
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-md p-1 bg-indigo-600 mt-3 font-medium text-white hover:opacity-75 transition ease-out duration-300 text-sm sm:text-base"
                        >
                            Sign In
                        </button>
                    </form>
                    <div className="mt-4">
                        <Link href={'/register'}>
                            <i className="text-xs">Register now</i>
                        </Link>
                    </div>
                    <div className="flex w-full mt-4 justify-between">
                        <div className="flex h-10 w-1/3 items-center">
                            <hr className="w-full" />
                        </div>
                        <span className="flex items-center text-xs">Or continue with</span>
                        <div className="flex h-10 w-1/3 items-center">
                            <hr className="w-full" />
                        </div>
                    </div>
                    <div className="flex w-full justify-center">
                        <div className="w-1/2 rounded-md">
                            {/*Sign In with Google*/}
                            <a
                                href="/auth/google"
                                role="button"
                                className="border flex gap-2 py-2 w-full justify-center items-center rounded-md"
                            >
                                <span className="self-center text-sm sm:text-base">Google</span>
                                <Image
                                    src="/images/google.png"
                                    className="rounded-full w-5 h-5 sm:w-7 sm:h-7"
                                    alt="Google Logo"
                                    width={28}
                                    height={28}
                                    priority
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}