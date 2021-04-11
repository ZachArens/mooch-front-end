import React, {useState} from 'react';

const CarouselIndicators = (props) => {
    return <li data-target="#rentalCarousel" />;
}

const CarouselItems = (props) => {
    //TODO-add alt text
    return(
            <div className={`carousel-item ${props.active ? props.active : ""}`} >
                <img className="d-block w-100" src={props.photoURL} alt={props.altText}/>
            </div>
        );
}

const PhotoCarousel = (props) => {

    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
    <CarouselIndicators key={number.toString()} data-slide-to={number.toString()} />
    );

    const photos = [{key: 1, active: "active", photoURL:"https://oldtowncanoe.johnsonoutdoors.com/sites/johnsonoutdoors-store/files/assets/images/10/1/1099627_primary/1099627_primary.jpg", altText: "kayak"},
        {key:2, photoURL: "https://oldtowncanoe.johnsonoutdoors.com/sites/johnsonoutdoors-store/files/assets/images/10/1/1099627_primary/1099627_primary.jpg", altText:"paddle"},
        {key:3, photoURL: "https://cdn.shopify.com/s/files/1/0086/9128/6076/products/Untitled-48.png?v=1563914213", altText: "lifejacket"},
        {key:4, photoURL: "https://cdni.llbean.net/is/image/wim/506404_3525_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbstage/A0211793_2", altText: "something else"}]
    const listPhotos = photos.map((photo) =>
        <CarouselItems key={photo.key} active={photo.active} photoURL={photo.photoURL} altText={photo.altText} />
    );

    return(
        <div id="rentalCarousel" className="carousel slide" data-ride="carousel" data-interval="false">

            <ol className="carousel-indicators">
                {listItems}
            </ol>
            <div className="carousel-inner">
                {listPhotos}
            </div>

            <a className="carousel-control-prev" href="#rentalCarousel" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#rentalCarousel" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="sr-only">Next</span>
            </a>
        </div>
    );
}

export default PhotoCarousel;