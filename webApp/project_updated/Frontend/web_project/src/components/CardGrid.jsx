
'use client';

import React, { useState, useEffect } from "react";
import "../../globals.css";
import Card from "./Card";
import axios from "axios";
import { getAccessToken } from "@/utils/auth";



export default function CardGrid() {
    const [cardsData, setCardsData] = useState([]);

    async function fetchData() {
        try {
            const accessToken = getAccessToken();
            const response = await axios.get(`${process.env.SERVER_API}/api/cardData`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            console.log(response.data);
            setCardsData(response.data);
        } catch (e) {
            console.error("Error fetching card data:", e);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div className="min-h-screen bg-webprojectoffwhite overflow-auto flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-flow-row gap-10 py-16">

                {
                    cardsData.map((card, index) => (
                        <Card key={index} heading={card.heading} details={card.details} id={card.id} />
                    ))
                }

            </div>
        </div>


    );
}