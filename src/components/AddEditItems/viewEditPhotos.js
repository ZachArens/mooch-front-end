import React, { Component } from 'react'

export default class ViewEditPhotos extends Component {
    render() {
        return (
            <div>
                <img height='auto' width='200px'
                    src={this.props.url} />
                <input type='button' value={`Delete`}
                onClick={() => this.props.deletePhoto(this.props.id)}
                />
            </div>
        )
    }
}
