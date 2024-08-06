'use client';

import React, { useState, useEffect, useRef, useContext } from "react";
import "../../globals.css";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from "next/image";
import User from "@/context/User";
import axios from "axios";
import { getAccessToken, authCheckPassed, getUserInfo } from "@/utils/auth";


const Note = () => {

    const router = useRouter();
    const [showContent, setShowContent] = useState(false);
    const [userState, setUserState] = useContext(User);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [notes, setNotes] = useState([]);

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

    const saveNote = async () => {
        const accessToken = getAccessToken();
        const formData = new FormData();
        formData.append('files', new Blob([content], { type: 'text/plain' }), title + '.txt');
        fetch(`${process.env.SERVER_API}/note-taker/uploads`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                window.location.reload(); // Refresh the page
            })
            .catch(error => {
                console.error('Error saving note:', error);
                router.push("/login");
            });
    };


    useEffect(() => {
        const accessToken = getAccessToken();
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`${process.env.SERVER_API}/note-taker/notes`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setNotes(response.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
                router.push("/login");
            }
        };

        fetchNotes();
    }, []);


    if (!showContent) {
        return null;
    }

    return (
        <div className='box-border h-32 w-full p-4 border-4 shadow-md rounded-xl'>
            <div className=''>
                <input className='w-52'
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className=''>
                <textarea className='w-full'
                    placeholder="Enter your note here"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                {/* Adding referesh below to show note saved */}
                <button onClick={saveNote}>Save Note</button>
            </div>

            <div>
                <h1>Saved Notes</h1>
                <ul>
                    {notes.map((note, index) => (
                        <li key={index}>
                            <h2>{note.title}</h2>
                            <p>{note.content}</p>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default Note;