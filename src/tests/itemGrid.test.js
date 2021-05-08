import firebase from '../utils/firebase';
import ReactDOM from "react-dom";
import ItemGrid from "../components/ItemGrid";
import React from "react";

beforeAll(async () => {
    const rentalItems = await firebase.firestore().collection("rentalItems");

    await rentalItems.add({
        itemName: "Kayak", zip: "49464", costHourly: 13,
        itemStatus: "available", itemDesc: "beginner river kayak", ownerId: "15a" });
    await rentalItems.add({
        itemName: "Life Jacket", zip: "49505", costHourly: 4,
        itemStatus: "draft", itemDesc: "coast guard approved for test example", ownerId: "16b"  });
    await rentalItems.add({
        itemName: "Backpack", zip: "49417", costHourly: 10,
        itemStatus: "available", itemDesc: "40L 4.4lbs unisex", ownerId: "17c" });
    await rentalItems.add({
        itemName: "Tent", zip: "49525", costHourly: 7.99,
        itemStatus: "rented", itemDesc: "2 person 8lbs, sticky zipper", ownerId: "18d"  });
    await rentalItems.add({
        itemName: "paddle board", zip: "49426", costHourly: 5,
        itemStatus: "available", itemDesc: "stand up paddle board, good for flat water and minor waves, good learner", ownerId: "19e"  });
});



it ("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ItemGrid />, div);
});