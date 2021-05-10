import React from 'react';

class ItemCard extends React.Component {
    constructor(props) {
        super(props);

        
    }

    render() {
        return(
            <div className="card col-sm-3">
                <img src={this.props.url} className="card-img-top" alt={this.props.altText}/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{this.props.description}</p>
                </div>
            </div>
        );
    }
}

export default ItemCard;