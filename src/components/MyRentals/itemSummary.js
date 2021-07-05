import React from 'react'

export default function ItemSummary(props) {
    return (
        <div className="row" >
            <img className="col-md-2" width='auto' 
                src={props.photo ? props.photo.url : ''} 
                alt={props.title ? props.title : 'rental item'}
                />
            <h5 data-testid='itemName' className="col-md-2">{props.title ? props.title: ""}</h5>
            <h5 className="col-md-4">{props.description ? props.description : ""}</h5>
            <h5 className="col-md-1">{props.costHourly ? props.costHourly: 0}</h5>
            <h5 className="col-md-2">{props.rentalStatus ? props.rentalStatus : ""}</h5>
            <div className="col-md-1">
                <button className="secondary" onClick={(e) => {props.updateSelectedId(props.id)}}>Edit</button>
                <button className="danger" onClick={(e) => {props.deleteSelected(props.id)}}>Delete</button>
            </div>

        </div>
    )
}
