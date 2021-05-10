import firebase from '../utils/firebase';

import React from "react"; 
import ReactDOM from "react-dom";   
import {render} from '@testing-library/react';

import ItemGrid from "../components/ItemGrid";

beforeAll(async() => {
    
    const rentalItems = await firebase.firestore().collection("rentalItems");

    const allItems = [{itemName: "Kayak", zip: "49464", costHourly: 13,
            itemStatus: "available", itemDesc: "beginner river kayak", ownerId: "15a" }, 
            {itemName: "Life Jacket", zip: "49505", costHourly: 4,
            itemStatus: "draft", itemDesc: "coast guard approved for test example", ownerId: "16b" },
            {itemName: "Backpack", zip: "49417", costHourly: 10,
            itemStatus: "available", itemDesc: "40L 4.4lbs unisex", ownerId: "17c" },
            {itemName: "Tent", zip: "49525", costHourly: 7.99,
            itemStatus: "rented", itemDesc: "2 person 8lbs, sticky zipper", ownerId: "18d"  },
            {itemName: "paddle board", zip: "49426", costHourly: 5,
            itemStatus: "available", itemDesc: "stand up paddle board, good for flat water and minor waves, good learner", ownerId: "19e"  }
        ]
        
        for (let i=0; i<allItems.length; i++) {
            await rentalItems.add(allItems[i]);
        }
    
});

describe("<ItemGrid />", () => {
    test("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<ItemGrid />, div);
    });

    test("displays rental items correctly", async() => {
        const ItemGrid = await render( <ItemGrid /> );
        expect(ItemGrid.getByDisplayValue("Kayak")).toBeTruthy;
        expect(ItemGrid.getByDisplayValue("Life Jacket")).toBeTruthy;
        expect(ItemGrid.getByDisplayValue("Tent")).toBeTruthy;
        expect(ItemGrid.getByDisplayValue("paddle board")).toBeTruthy;

        expect(ItemGrid.getByDisplayValue("beginner river kayak")).toBeTruthy;
        expect(ItemGrid.getByDisplayValue("coast guard approved for test example")).toBeTruthy;
    });
});



