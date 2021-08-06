import React, { Component } from 'react';
import ViewEditPhotos from './viewEditPhotos';

export default class AddPhoto extends Component {

    render() {        
        let images;
        console.log('title: ', this.props.title);
        // console.log(this.props.photos.length);
        if (this.props.photos.length > 0) {
            
            images = this.props.photos.map((image) => 
                <ViewEditPhotos 
                    key={image.id} 
                    id={image.id}
                    url={image.url}
                    title={this.props.title}
                    deletePhoto={this.props.deletePhoto}
                />

            )
        } else {
            images = '';
        }
        

        return (
            <div>
                <label htmlFor="photoUpload">Add a photo here
                    <input type='file' name="photoUpload" 
                    onChange={(e) => this.props.uploadPhoto(e)} />
                </label>
                {/* <p>{this.props.photos.length > 0 ? `state of photos: ${this.props.photos[0].id}` : ""}</p> */}
                {images}
                {this.props.loading ? <h5>Loading...</h5> : ''}
            </div>
        )
    }
}
