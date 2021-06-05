import React from 'react';
import PropTypes from 'prop-types';

class EditTitleDesc extends React.Component {

    render() {
        const {exchangeOptions} = this.props;

        return(
            <div className="titleBox form-group">
                <label htmlFor="itemTitle">Title
                    <input type="text" id="itemTitle" defaultValue={this.props.title} name="title"
                        placeholder="Title" className="form-control" onChange={this.props.updateFields} />
                </label>
                <label htmlFor="itemDesc">Description
                    <input type="text" id="itemDesc" defaultValue={this.props.desc} name="description"
                        placeholder="Enter a description here" className="form-control" onChange={this.props.updateFields} />
                </label>
                <label htmlFor="itemRate">Hourly Rate
                    <input type="number" id="itemRate" data-testid="itemRate" defaultValue={this.props.itemRate} name="itemRate"
                        placeholder="rate ($/hr)" className="form-control" onChange={this.props.updateFields} />
                </label>
                <label htmlFor="deliveryCost">Delivery
                    <input type="text" id="deliveryCost" data-testid="deliveryCost" 
                        defaultValue={exchangeOptions.delivery}
                        onChange={(e) => {this.props.updateExchangeOptions("delivery", e.target.value)}}/>
                </label>
                <label htmlFor="meetupCost">Public Meetup
                    <input type="text" id="meetupCost" data-testid="meetupCost" 
                        defaultValue={exchangeOptions.meetup}
                        onChange={(e) => {this.props.updateExchangeOptions("meetup", e.target.value)}}/>
                </label>
                <label htmlFor="pickupCost">Pickup
                    <input type="text" id="pickupCost" data-testid="pickupCost" 
                        defaultValue={exchangeOptions.pickup}
                        onChange={(e) => {this.props.updateExchangeOptions("pickup", e.target.value)}}/>
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