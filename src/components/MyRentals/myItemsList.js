import React, { Component } from 'react'
import ItemSummary from './itemSummary';

export default class MyItemsList extends Component {
    render() {
        

        let itemSummaries;

        if (!this.props.loading && this.props.myItems) {
            itemSummaries = this.props.myItems.map((summary) => 
                <ItemSummary key={summary.id} photo={summary.photos ? summary.photos[0] : undefined} 
                title={summary.itemName} description={summary.itemDesc}
                exchangeMethod={summary.exchangeMethod} costHourly={summary.costHourly} />);
        } else {
            itemSummaries = <ItemSummary />
        }

        //Reference - this structure derived from LevelUpTutorials React and Firebase tutorial

        return (
            <div className="container" data-testid="myItemsContainer">
                { this.props.loading && <div className="loader">Loading...</div>}
                { !this.props.loading && itemSummaries }
            </div>
        )
    }
}
