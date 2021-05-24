import React from 'react';
import { Link } from 'react-router-dom';
import { textAbbreviator } from '../utils/rentalFunctions';


class ItemCard extends React.Component {
    constructor(props) {
        super(props);

        
    }

    render() {
      
        return(
            <Link to={`/reserveItem/${this.props.url}`} className="card col-sm-3">

                {/* <img src={this.props.url} className="card-img-top" alt={this.props.altText}/> */}
                <div className="card-body" data-testid="rentalItemCard">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{textAbbreviator(this.props.description)}</p>
                    <p className="card-rate">{`$${this.props.itemRate}`}</p>
                </div>
            </Link>
        );
    }
}

export default ItemCard;