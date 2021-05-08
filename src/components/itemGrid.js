import React from 'react';
import ItemCard from "./itemCard";
import firebase from "../utils/firebase";

class ItemGrid extends React.Component {
    constructor(props) {
        super(props);

        //TODO - Add loader;
        this.state = {rentalItemsList: null, loading: true}

    }



    componentDidMount() {
        //TODO - need unsubscribe
        console.log('did mount');

        const rentalItems = firebase.firestore().collection("rentalItems");

        let rentalItemsList = [];
        rentalItems.get().then((querySnapshot) => {
            console.log("queried")
            const snapshot = querySnapshot.forEach((doc) => {
                const entry = {"id": doc.id, ...doc.data()};
                console.log(entry);
                rentalItemsList.push(entry);
                console.log(rentalItemsList);
            });
        }).catch((error) => {
            //TODO - security, do not publish error details to console
            console.log("Error getting documents:" + error);
        });

        this.setState({rentalItemsList, loading: false});


        console.log(this.state.rentalItemsList);
    }

    render() {
        // const card_data = [{key: 1, title: "kayak", desc: "this kayak is nice.", photoURL:"https://oldtowncanoe.johnsonoutdoors.com/sites/johnsonoutdoors-store/files/assets/images/10/1/1099627_primary/1099627_primary.jpg", altText: "kayak"},
        //     {key:2, title: "2nd kayak", desc: "this kayak is also nice.", photoURL: "https://oldtowncanoe.johnsonoutdoors.com/sites/johnsonoutdoors-store/files/assets/images/10/1/1099627_primary/1099627_primary.jpg", altText:"paddle"},
        //     {key:3, title: "paddle", desc: "paddle is great for kayaking", photoURL: "https://cdn.shopify.com/s/files/1/0086/9128/6076/products/Untitled-48.png?v=1563914213", altText: "lifejacket"},
        //     {key:4, title: "lifejacket", desc: "lifejacket necessary for watersports", photoURL: "https://cdni.llbean.net/is/image/wim/506404_3525_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbstage/A0211793_2", altText: "something else"},
        // {key:5, title: "backpack", desc: "daypack for single day outings", photoURL: "https://www.rei.com/media/0fdebe35-6fae-416c-ac70-4272a14cbd1a", altText: "backpack"}];

        const gridItems = async () => {
            try {
                this.state.rentalItemsList.map((card) =>
                    <ItemCard key={card.id}
                              url="/Users/zacharyarens/WebstormProjects/mooch-rental-app-front/src/img/sea-5621150_1920.jpg"
                              title={card.itemName} desc={card.itemDesc} altText="sea"/>
                );
            } catch (err) {
                //TODO - security - fix print to console
                console.error(err);
            }
        }



        return(
            <div className="row row-cols-lg-4 row-cols-md-3 row-cols-1 row-cols-sm-2">
                {/*{this.state.loading && <div className="loader"/>}*/}
                {!this.state.loading && this.state.rentalItemsList && (gridItems) }
            </div>
        );
    }
}

export default ItemGrid;