import React from 'react';
import TitlePhotoDesc from "./titlePhotoDesc";
// import Firebase from '../firebase';

class RentItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <TitlePhotoDesc description="lorum ipsum data data data" title="Item for Rent" />
                <div className="actionButtons">
                    <input type="Submit" data-testId="Rent"/>
                    <input type="button" data-testId="cancelRent" value="Cancel" />
                </div>
                <h2>{`\$${this.props.costPerUnit}\/ ${this.props.timeUnitType}`}</h2>

                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Exchange Method
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>

            </div>
        );
    }
}

export default RentItem;