import React from 'react';
import ItemCard from "./itemCard";
import firebase from "../utils/firebase";
import {Link} from 'react-router-dom';
// import {GetRentalItems} from '../utils/firebaseFunctions'

class ItemGrid extends React.Component {
    constructor(props) {
        super(props);

        //TODO - Add loader;
        this.state = {rentalItemsList: [], loading: true}

    }



    componentDidMount() {
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

        // return GetRentalItems().then(() => {
        //     this.setState({
        //         rentalItemsList: rentalItemsList, loading: false
        //     })
        // })
        
    }

    render() {

        let gridItems;

        if (!this.state.loading) {
            console.log(this.state.rentalItemsList);
            gridItems = this.state.rentalItemsList.map((card) =>
            <Link to="/reserveItems" >
                <ItemCard key={card.id} title={card.itemName} 
                description={card.itemDesc} itemRate={card.costHourly} />
            </Link>
            );
        } else {
            gridItems = <ItemCard />;
            console.log('no rental items present');
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