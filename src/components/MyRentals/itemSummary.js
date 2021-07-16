import React from 'react'

export default function ItemSummary(props) {
    return (
        <div className="row itemCard justify-items-start" >
            <img className="col-md-2" width='auto' 
                src={props.photo ? props.photo.url : ''} 
                alt={props.title ? props.title : 'rental item'}
                />
            <h5 data-testid='itemName' className="col-md-2">{props.title ? props.title: ""}</h5>
            <h5 className="col-md-4">{props.description ? props.description : ""}</h5>
            <h5 className="col-md-1">{props.costHourly ? props.costHourly: 0}</h5>
            <h5 className="col-md-1">{props.rentalStatus ? props.rentalStatus : ""}</h5>
            <div className="col-md-2">
                <button className="secondary itemButton" onClick={(e) => {props.updateSelectedId(props.id)}}>Edit</button>
                <button className="danger itemButton" onClick={(e) => {props.deleteSelected(props.id)}}>Delete</button>
            </div>

        </div>
    )
}
