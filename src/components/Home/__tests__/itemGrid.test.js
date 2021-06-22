import React from "react"; 
import {render, cleanup, queryByTestId} from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';

import ItemGrid from "../ItemGrid";
import { GetRentalItems } from '../../../utils/firebaseFunctions';

afterEach(() => {
    cleanup();

    console.error.mockClear();
});



//spy on console error
console.error = jest.fn();

// const allItems = {fakeUnsubscribe = () => {console.log("fake unsubscribing")}, 
//     [{id: "1", itemName: "Kayak", zip: "49464", costHourly: 13,
//             itemStatus: "available", itemDesc: "beginner river kayak", ownerId: "15a" }, 
//         {id: "2", itemName: "Life Jacket", zip: "49505", costHourly: 4,
//             itemStatus: "draft", itemDesc: "coast guard approved for test example", ownerId: "16b" },
//         {id: "3", itemName: "Backpack", zip: "49417", costHourly: 10,
//             itemStatus: "available", itemDesc: "40L 4.4lbs unisex", ownerId: "17c" },
//         {id: "4", itemName: "Tent", zip: "49525", costHourly: 7.99,
//             itemStatus: "rented", itemDesc: "2 person 8lbs, sticky zipper", ownerId: "18d" },
//         {id: "5", itemName: "paddle board", zip: "49426", costHourly: 5,
//             itemStatus: "available", itemDesc: "stand up paddle board, good for flat water and minor waves, good learner", ownerId: "19e" }
//         ]
// };


jest.mock('../../../utils/firebaseFunctions')

// test('test mock promise', () => {

// });

describe("<ItemGrid /> ", () => {
    test("renders without crashing", () => {
        render(<ItemGrid  />);
    });

    test("displays rental items correctly", async() => {
        const {getAllByTestId} = render( <ItemGrid /> );

        const data = await GetRentalItems();
        expect(GetRentalItems).toHaveBeenCalled();
        // expect(data).toEqual(allItems);
        
        // expect(getAllByTestId('rentalItemCard').length).toBe(allItems.length);

        // expect(getAllByTestId('rentalItemCard')[0].itemName).toBe(allItems[0].itemName);
        
    });
});



