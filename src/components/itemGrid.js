import React from 'react';
import ItemCard from "./itemCard";

class ItemGrid extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        const card_data = [{key: 1, title: "kayak", desc: "this kayak is nice.", photoURL:"https://oldtowncanoe.johnsonoutdoors.com/sites/johnsonoutdoors-store/files/assets/images/10/1/1099627_primary/1099627_primary.jpg", altText: "kayak"},
            {key:2, title: "2nd kayak", desc: "this kayak is also nice.", photoURL: "https://oldtowncanoe.johnsonoutdoors.com/sites/johnsonoutdoors-store/files/assets/images/10/1/1099627_primary/1099627_primary.jpg", altText:"paddle"},
            {key:3, title: "paddle", desc: "paddle is great for kayaking", photoURL: "https://cdn.shopify.com/s/files/1/0086/9128/6076/products/Untitled-48.png?v=1563914213", altText: "lifejacket"},
            {key:4, title: "lifejacket", desc: "lifejacket necessary for watersports", photoURL: "https://cdni.llbean.net/is/image/wim/506404_3525_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbstage/A0211793_2", altText: "something else"},
        {key:5, title: "backpack", desc: "daypack for single day outings", photoURL: "https://www.rei.com/media/0fdebe35-6fae-416c-ac70-4272a14cbd1a", altText: "backpack"}];

        const gridItems = card_data.map((card) =>
            <ItemCard key={card.key} url={card.photoURL} title={card.title} desc={card.desc} altText={card.altText}/>
        );


        return(
            <div className="row row-cols-lg-4 row-cols-md-3 row-cols-1 row-cols-sm-2">
                {gridItems}
            </div>
        );
    }
}

export default ItemGrid;