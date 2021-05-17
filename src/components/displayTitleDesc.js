import React, { Component } from 'react'

export default class DisplayTitleDesc extends Component {
    
    render() {
        return (
            <div className="form-group col-md-4" >
                <div className="row">
                    <h1>{this.props.title}</h1>
                    <h3>{this.props.itemRate}</h3>
                </div>
                <div className="row">
                    <h5>{this.props.desc}</h5>
                </div>
            </div>
        )
    }
}
