import React from 'react'

export default function ItemSummary(props) {
    return (
        <div className="row" >
            <h5 className="col-md-2">{props.title ? props.title: ""}</h5>
            <h5 className="col-md-4">{props.description ? props.description : ""}</h5>
            <h5 className="col-md-2">{props.costHourly ? props.costHourly: 0}</h5>
            <h5 className="col-md-3">{props.rentalStatus ? props.rentalStatus : ""}</h5>
            <h5 className="col-md-1">&#62;</h5>

        </div>
    )
}
