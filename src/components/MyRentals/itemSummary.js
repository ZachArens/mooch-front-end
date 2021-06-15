import React from 'react'

export default function ItemSummary(props) {
    return (
        <div className="row" >
            <img className="col-md-2" width='auto' src={props.photo ? props.photo.url : ''} />
            <h5 className="col-md-2">{props.title ? props.title: ""}</h5>
            <h5 className="col-md-4">{props.description ? props.description : ""}</h5>
            <h5 className="col-md-1">{props.costHourly ? props.costHourly: 0}</h5>
            <h5 className="col-md-2">{props.rentalStatus ? props.rentalStatus : ""}</h5>
            <h5 className="col-md-1">&#62;</h5>

        </div>
    )
}
