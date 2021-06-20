import React from 'react';
import Firebase from '../utils/firebase';
import RentalSummary from "./rentalSummary";

class MyRentedOutList extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const card_data = [{key: 1, title: "kayak", desc: "this kayak is nice.", photoURL:"https://oldtowncanoe.johnsonoutdoors.com/sites/johnsonoutdoors-store/files/assets/images/10/1/1099627_primary/1099627_primary.jpg", altText: "kayak"},
            {key:2, title: "2nd kayak", desc: "this kayak is also nice.", photoURL: "https://oldtowncanoe.johnsonoutdoors.com/sites/johnsonoutdoors-store/files/assets/images/10/1/1099627_primary/1099627_primary.jpg", altText:"paddle"},
            {key:3, title: "paddle", desc: "paddle is great for kayaking", photoURL: "https://cdn.shopify.com/s/files/1/0086/9128/6076/products/Untitled-48.png?v=1563914213", altText: "lifejacket"},
            {key:4, title: "lifejacket", desc: "lifejacket necessary for watersports", photoURL: "https://cdni.llbean.net/is/image/wim/506404_3525_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbstage/A0211793_2", altText: "something else"},
            {key:5, title: "backpack", desc: "daypack for single day outings", photoURL: "https://www.rei.com/media/0fdebe35-6fae-416c-ac70-4272a14cbd1a", altText: "backpack"}];


        const rentedItems = card_data.map((card) =>
            <RentalSummary key={card.key} title={card.title} dueDate={card.dueDate} />
        );

        return(
            <div className="container">
                {/*{rentedItems}*/}
                <RentalSummary title="Backpack" dueDate="4/22"/>
            </div>
        );
    }
}

export default MyRentedOutList;