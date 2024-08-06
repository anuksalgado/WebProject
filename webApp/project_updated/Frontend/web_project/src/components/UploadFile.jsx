
'use client';

import React, { useState, useEffect, useRef, useContext } from "react";
import "../../globals.css";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from "next/image";
import User from "@/context/User";
import axios from "axios";
import { getAccessToken, authCheckPassed, getUserInfo } from "@/utils/auth";

export default function UploadFile() {

    //const upload_URL = "http://localhost:3000/file-converter/getdocument";

    const router = useRouter();

    const [showContent, setShowContent] = useState(false);

    const [convertFrom, setConvertFrom] = useState('');
    const [convertTo, setConvertTo] = useState('');

    const [userState, setUserState] = useContext(User);

    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const authPassed = async () => {
            const passed = await authCheckPassed();
            if (!passed) {
                router.push("/login");
                return;
            }

            if (userState === null || userState === undefined) {
                const userInfo = getUserInfo();
                setUserState(userInfo);
            }

            setShowContent(true);
        }
        authPassed();
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            if (fileInputRef.current) {
                fileInputRef.current.files = e.dataTransfer.files;
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            console.error('No file selected');
            return;
        }

        const accessToken = getAccessToken();

        const formData = new FormData();
        formData.append('doc-upload', file);

        try {
            const response = await axios.post(`${process.env.SERVER_API}/file-converter/getdocument`, formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                },
                responseType: 'blob'
            });

            // Extract filename from Content-Disposition header
            const disposition = response.headers['content-disposition'] || response.headers['Content-Disposition'];
            console.log(response.headers);
            const fileNameMatch = disposition && disposition.match(/filename="([^"]+)"/i);
            let fileName = fileNameMatch ? fileNameMatch[1] : 'downloaded-file.pdf'; // Fallback filename

            // Remove any surrounding quotes
            //fileName = fileName.replace(/^["']|["']$/g, '');

            // Create a Blob object from the response data
            const blob = new Blob([response.data], { type: response.headers['content-type'] });

            console.log("filename:", fileName);

            // prompt the user to download the file
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

        } catch (err) {
            console.error('Error during file conversion:', err);
            // Handle error (e.g., show an error message to the user)
        }
    }


    if (!showContent) {
        return null;
    }



    return (
        <div className="h-screen flex justify-center pt-4 overflow-y-visible overflow-x-hidden">
            <form onSubmit={handleSubmit} id="form" encType="multipart/form-data" className="w-4/5">
                <div className="space-y-12">
                    <label htmlFor="document-upload-area" className="block text-sm font-medium leading-6 text-gray-900">Document
                        Upload</label>

                    <div className="mt-2 flex gap-4 justify-center items-center flex-col sm:flex-row">
                        <p className="text-sm self-center">Convert</p>
                        <select id="convert-from" name="convert-from" required
                            value={convertFrom}
                            onChange={(e) => setConvertFrom(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option value="" disabled>--Select--</option>
                            <option value="doc">DOCX, DOC</option>
                            <option value="other-format">Other Format</option>
                        </select>

                        <p className="text-sm self-center">to</p>

                        <select id="convert-to" name="convert-to" required
                            value={convertTo}
                            onChange={(e) => setConvertTo(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option value="pdf">PDF</option>
                        </select>
                    </div>

                    <div id="drop-area"
                        className={`mt-2 flex justify-center rounded-lg border border-dashed ${isDragging ? 'border-indigo-600' : 'border-gray-900/25'} py-52`}
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div>
                            <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink" width="40" zoomAndPan="magnify"
                                viewBox="0 0 30 30.000001" height="40" preserveAspectRatio="xMidYMid meet" version="1.0">
                                <defs>
                                    <clipPath id="id1">
                                        <path
                                            d="M 2.742188 3.484375 L 27.417969 3.484375 L 27.417969 25.257812 L 2.742188 25.257812 Z M 2.742188 3.484375 "
                                            clipRule="nonzero" />
                                    </clipPath>
                                </defs>
                                <g clipPath="url(#id1)">
                                    <path fill="rgb(8.239746%, 42.349243%, 86.669922%)"
                                        d="M 15.082031 3.484375 L 2.742188 5.902344 L 2.742188 22.839844 L 15.082031 25.257812 Z M 17.546875 5.902344 L 17.546875 8.324219 L 20.015625 8.324219 L 20.015625 10.742188 L 17.546875 10.742188 L 17.546875 13.160156 L 20.015625 13.160156 L 20.015625 15.582031 L 17.546875 15.582031 L 17.546875 18 L 20.015625 18 L 20.015625 20.417969 L 17.546875 20.417969 L 17.546875 22.839844 L 27.417969 22.839844 L 27.417969 5.902344 Z M 22.484375 8.324219 L 24.953125 8.324219 L 24.953125 10.742188 L 22.484375 10.742188 Z M 5.425781 9.890625 L 7.621094 9.890625 L 8.757812 12.570312 C 8.851562 12.789062 8.921875 13.042969 8.992188 13.332031 L 9.023438 13.332031 C 9.066406 13.160156 9.148438 12.894531 9.273438 12.550781 L 10.542969 9.890625 L 12.542969 9.890625 L 10.15625 14.332031 L 12.613281 18.851562 L 10.480469 18.851562 L 9.105469 15.929688 C 9.054688 15.828125 8.992188 15.621094 8.941406 15.332031 L 8.921875 15.332031 C 8.890625 15.46875 8.832031 15.675781 8.738281 15.953125 L 7.351562 18.851562 L 5.210938 18.851562 L 7.753906 14.367188 Z M 22.484375 13.160156 L 24.953125 13.160156 L 24.953125 15.582031 L 22.484375 15.582031 Z M 22.484375 18 L 24.953125 18 L 24.953125 20.417969 L 22.484375 20.417969 Z M 22.484375 18 "
                                        fillOpacity="1" fillRule="nonzero" />
                                </g>
                            </svg>
                            <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                <label htmlFor="doc-upload"
                                    className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-0 hover:text-indigo-500">
                                    <span>Upload a file</span>
                                    <input id="doc-upload" name="doc-upload" type="file" className="sr-only" onChange={handleFileChange} ref={fileInputRef} />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p id="doc-name" className="text-lg leading-5 text-gray-600 text-center">
                                {file ? file.name : ''}
                            </p>
                        </div>
                    </div>
                </div>

                <div id="buttons" className={`mt-6 justify-center gap-x-6 ${file ? 'flex' : 'hidden'}`}>
                    <Link href="/home" className="flex justify-center items-center">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                    </Link>
                    <button id="submit-btn" type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Convert</button>
                </div>
            </form>
        </div>
    );
}