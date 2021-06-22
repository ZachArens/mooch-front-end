import React, { Component } from 'react'
import AddItem from '../AddEditItems/addItem';
import ItemSummary from './itemSummary';

export default class MyItemsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedId : '',
        }

        this.updateSelectedId = this.updateSelectedId.bind(this);
    }

    updateSelectedId = (selectedId) => {
        console.log('selectedId', selectedId);
        if (this.state.selectedId !== selectedId) {
            this.setState({selectedId});
            console.log(this.state.selectedId);
        } else {
            this.setState({selectedId: ''});
            console.log(this.state.selectedId);

        }
        
    }

    render() {
        

        let itemSummaries;

        if (!this.props.loading && this.props.myItems) {
            itemSummaries = this.props.myItems.map((summary) => {
                if (summary.id === this.state.selectedId) {
                    return <AddItem key={summary.id} currentUser={this.props.currentUser} 
                    currentItem={summary} updateSelectedId={this.updateSelectedId}/>
                } else {
                    return <ItemSummary key={summary.id} id={summary.id}
                photo={summary.photos ? summary.photos[0] : undefined} 
                title={summary.itemName} description={summary.itemDesc}
                exchangeMethod={summary.exchangeMethod} costHourly={summary.costHourly} 
                updateSelectedId={this.updateSelectedId}/>
                }
            });
                
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