import React, { Component } from 'react'

export default class DisplayTitleDesc extends Component {
    
    render() {
        return (
            <>
                <h1 className='col-md-4'>{this.props.title}</h1>
                <h3 className='col-md-2'>${this.props.itemRate}</h3>
                <h5 className='col-md-6'>{this.props.desc}</h5>
            </>
        )
    }
}
