import React from 'react';
import PhotoCarousel from "./photoCarousel.js";
import TotalBox from "./totalBox"
import TitleDesc from "./titleDesc.js";

class RentItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {exchangeMethod: ''};

        this.setExchangeMethod = this.setExchangeMethod.bind(this);

    }

    setExchangeMethod = (e) => {
        const value = e.target.value;
        this.setState({"exchangeMethod": value});
    }

    render() {
        // const photos = [{key: 1, active: "active", photoURL:"https://oldtowncanoe.johnsonoutdoors.com/sites/johnsonoutdoors-store/files/assets/images/10/1/1099627_primary/1099627_primary.jpg", altText: "kayak"},
        //     {key:2, photoURL: "https://oldtowncanoe.johnsonoutdoors.com/sites/johnsonoutdoors-store/files/assets/images/10/1/1099627_primary/1099627_primary.jpg", altText:"paddle"},
        //     {key:3, photoURL: "https://cdn.shopify.com/s/files/1/0086/9128/6076/products/Untitled-48.png?v=1563914213", altText: "lifejacket"},
        //     {key:4, photoURL: "https://cdni.llbean.net/is/image/wim/506404_3525_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbstage/A0211793_2", altText: "something else"}];
        const numbers = [1,2,3,4];
        return(
            <div className="container">
                <div className="row">
                    <div className="photo_frame col-md-5">
                        <PhotoCarousel numbers={numbers}/>
                    </div>


                    <div className="col-md-5 center_column">
                        <TitleDesc description="lorum ipsum data data data" title="Item for Rent" />
                        <h2>{`\$${this.props.costPerUnit}\/ ${this.props.timeUnitType}`}</h2>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Exchange Method
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button id="delivery" className="dropdown-item" value="delivery" onClick={(e) => this.setExchangeMethod(e)}>Delivery</button>
                                <button id="pickup" className="dropdown-item" value="pickup" onClick={(e) => this.setExchangeMethod(e)}>Pick-up</button>
                                <button id="meetup" className="dropdown-item" value="meetup" onClick={(e) => this.setExchangeMethod(e)}>Public Meet-up</button>
                            </div>
                        </div>
                        <div className="scheduler">
                            <label htmlFor="startDate">Start Date</label>
                            <input type="date" id="startDate"/>
                            <label htmlFor="endDate">End Date</label>
                            <input type="date" id="endDate"/>
                        </div>
                    </div>

                    <div className="col-md">
                        <TotalBox total_cost="40" delivery_cost="10" rental_time={36*60*60*1000} unit_cost="30"/>
                        <div className="actionButtons">
                            <input type="Submit" id="Rent"/>
                            <input type="button" id="cancelRent" value="Cancel" />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default RentItem;