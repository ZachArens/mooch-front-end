import React from 'react';
import ItemCard from "./itemCard";
import { Route } from 'react-router-dom';
import { GetRentalItems } from '../utils/firebaseFunctions';

// import {GetRentalItems} from '../utils/firebaseFunctions'
let unsubscribe = null;

class ItemGrid extends React.Component {
    constructor(props) {
        super(props);

        //TODO - Add loader;
        this.state = {rentalItemsList: [], loading: true}

    }



    async componentDidMount() {
        
        try {
            await GetRentalItems().then(({unsubscribe, rentalItemsList}) => {
                unsubscribe = unsubscribe;
                this.setState({
                    rentalItemsList: rentalItemsList, loading: false
                });
            });
        } catch (e) {
            console.log(e);
        }

        //console.log(this.state.rentalItemsList);
        
        
    }

    onComponentDidUnmount() {
        unsubscribe();
    }

    render() {

        let gridItems;

        if (!this.state.loading) {
            // console.log(this.state.rentalItemsList);
            gridItems = this.state.rentalItemsList.map((card) =>
            
            <ItemCard  key={card.id} id={card.id} updateCurrentItem={this.props.updateCurrentItem} title={card.itemName} 
                description={card.itemDesc} itemRate={card.costHourly} />
            );
        } else {
            gridItems = <ItemCard />;
            // console.log('no rental items present');
        }

        return(
            <div className="container">
                <div className="row row-cols-lg-4 row-cols-md-3 row-cols-1 row-cols-sm-2">
                    { this.state.loading && <div className="loader">Loading...</div> }
                    { !this.state.loading && gridItems }
                </div>
            </div>
        );

    }
}

export default ItemGrid;