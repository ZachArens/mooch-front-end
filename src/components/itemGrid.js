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
                // console.log(entry);
                rentalItemsList.push(entry);
                // console.log(rentalItemsList);
            });
        }).then(()=> {
            this.setState({rentalItemsList, loading: false});
            console.log(`post setState is ${this.state.rentalItemsList}`);
        })
        .catch((error) => {
            //TODO - security, do not publish error details to console
            console.log("Error getting documents:" + error);
        });
    }

    render() {

        console.log(`render state is ${this.state.rentalItemsList}`)

        let gridItems;

        if (!this.state.loading) {
            gridItems = this.state.rentalItemsList.map((card) =>
                <ItemCard key={card.id}
                          url="/Users/zacharyarens/WebstormProjects/mooch-rental-app-front/src/img/sea-5621150_1920.jpg"
                          title={card.itemName} desc={card.itemDesc} altText="sea"/>
            );
        } else {
            gridItems = <ItemCard />;
        }

        return(
            <div className="container">
                <div className="row row-cols-lg-4 row-cols-md-3 row-cols-1 row-cols-sm-2">
                    {/*{this.state.loading && <div className="loader"/>}*/}
                    { !this.state.loading && gridItems }
                </div>
            </div>

            
        );

    }
}

export default ItemGrid;