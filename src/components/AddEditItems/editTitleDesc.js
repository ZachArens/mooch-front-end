import React from 'react';
import PropTypes from 'prop-types';

class EditTitleDesc extends React.Component {

    render() {
        const {exchangeOptions} = this.props;

        return(
            <div className="titleBox form-group">
                <label htmlFor="itemTitle">Title
                    <input type="text" id="itemTitle" value={this.props.title} name="title"
                        placeholder="Title" className="form-control" 
                        onClick={(e) => e.target.setSelectionRange(0, e.target.value.length)} 
                        onChange={(e) => {this.props.updateFields(e)}} />
                </label>
                <label htmlFor="itemDesc">Description
                    <input type="text" id="itemDesc" value={this.props.desc} name="description"
                        placeholder="Enter a description here" className="form-control" 
                        onClick={(e) => e.target.setSelectionRange(0, e.target.value.length)} 
                        onChange={(e) => {this.props.updateFields(e)}} />
                </label>
                <label htmlFor="itemRate">Hourly Rate $
                    <input type="text" id="itemRate" data-testid="itemRate" 
                        value={this.props.itemRate} name="itemRate"
                        placeholder="rate ($/hr)" className="form-control" 
                        onClick={(e) => e.target.setSelectionRange(0, e.target.value.length)} 
                        onChange={(e) => {this.props.updateFields(e)}} />
                </label>
                <label htmlFor="deliveryCost">Delivery
                    <input type="text" id="deliveryCost" data-testid="deliveryCost" 
                        value={exchangeOptions.delivery} name="delivery"
                        onClick={(e) => e.target.setSelectionRange(0, e.target.value.length)}                         
                        onChange={(e) => {this.props.updateFields(e)}}/>
                </label>
                <label htmlFor="meetupCost">Public Meetup
                    <input type="text" id="meetupCost" data-testid="meetupCost" 
                        value={exchangeOptions.meetup} name="meetup"
                        onClick={(e) => e.target.setSelectionRange(0, e.target.value.length)}                         
                        onChange={(e) => {this.props.updateFields(e)}}/>
                </label>
                <label htmlFor="pickupCost">Pickup
                    <input type="text" id="pickupCost" data-testid="pickupCost" 
                        value={exchangeOptions.pickup} name="pickup"
                        onClick={(e) => e.target.setSelectionRange(0, e.target.value.length)}                         
                        onChange={(e) => {this.props.updateFields(e)}}/>
                </label>
            </div>
        );
    }
}

EditTitleDesc.propTypes = {
    exchangeOptions: PropTypes.object.isRequired,
    updateExchangeOptions: PropTypes.func,
    title: PropTypes.string,
    desc: PropTypes.string,
    // itemRate: PropTypes.number
}

export default EditTitleDesc;