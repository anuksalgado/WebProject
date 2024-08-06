'use client';

import React, { useMemo } from "react";
import "../../globals.css";
import Link from "next/link";

export default function Card({ id, heading, details, ctaText = "Add a Call to Action" }) {
    const url = useMemo(() => {
        switch (id) {
            case 1:
                return "/home/file-converter";
            case 3:
                return "/home/note-taker";
            default:
                return "#";
        }
    }, [id]);

    return (
        <div className="py-3 bg-webprojectwhite px-6 hover:ring-2 hover:shadow-2xl transition ease-out duration-200">
            <div className="flex flex-col h-96 justify-center items-center relative overflow-hidden" style={{ width: 300 }}>
                <span className="absolute top-5 font-extrabold text-xl">{heading}</span>
                <div>
                    <p>{details}</p>
                </div>

                <Link href={url}>
                    <div className="bg-webprojectblue py-2 px-4 flex justify-center absolute w-full cursor-pointer" style={{ bottom: 0, left: 0 }}>
                        <span className="text-white">{ctaText}</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}