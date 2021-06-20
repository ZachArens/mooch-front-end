import React from 'react';
import { withRouter } from 'react-router-dom';
import EditTitleDesc from "./editTitleDesc";
import SubmitButtons from '../submitButtons';
import {storage} from "../../utils/firebase";
import { AddRentalItem as AddToDB, addPhotosToFB, getItemFromDB} from "../../utils/firebaseFunctions";
import {formatCurrency, finalFormatCurrency} from '../../utils/rentalFunctions';
import SimpleReactValidator from 'simple-react-validator';
import '../../styles/addItem.scss';

import AddPhoto from './addPhoto';



//TEMPLATE from SimpleReactValidator documentation
function Message(props) {
    if (props.message === 'success') {
        return <p>Item added!</p>;
    } else if (props.message === 'cleared') {
        return <p>Data cleared.</p>;
    } else if (props.message === 'fbIssue') {
        //FIXME - need to refactor this error message after AddToDB was updated.
        return <p>There was an issue with adding your item to our system. Please try again.</p>
    } else {
        return <p hidden>This is where messages will display</p>;
    }
}

class AddItem extends React.Component {
    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator();

        this.state = {
            title: "", 
            description: "", 
            itemRate: 0,
            exchangeOptions: {delivery: 0, meetup: 0, pickup: 0}, 
            photos: [],
            loading: false,
            message: ""};

        this.updateFields = this.updateFields.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this);
        this.deletePhoto = this.deletePhoto.bind(this);
    }

    updateFields = (e) => {
        let value = e.target.value;
        const name = e.target.name;

        if (name === "itemRate") {
            try {
                console.log('trying')
                value = formatCurrency(value);
                this.setState({[name]: value, message: ""});
            } catch (e) {
                console.log('caught')
                this.setState({message: `${name} e.message`});
            }
        } else if (name === "delivery" || name === "meetup" || name === "pickup") {
            try {
                console.log('trying')
                value = formatCurrency(value);
                this.setState((prevState) => ({exchangeOptions: {...prevState.exchangeOptions, [name]: value }, message: ""}));
            } catch (e) {
                console.log('caught')
                this.setState({message: `${name} e.message`});
            }
        } else {
            this.setState({[name]: value, message: ""});
        }       

    }

    

    updatePhotoState = (photo) => {
        console.log('setting photo to state: ', photo);

        this.setState(prevState => ({
            photos: [...prevState.photos, photo], loading: false
            }));
        // this.forceUpdate();
    }

    uploadPhoto = async (e) => {
        //firebase storage upload tutorial - https://www.youtube.com/watch?v=zXpssTn-4Y0
        this.setState({loading: true});
        const photoFile = e.target.files[0];
        // console.log(photoInput.files ? photoInput.files : 'no files available');
        
        await addPhotosToFB(this.props.currentUser, photoFile, this.updatePhotoState);
        
        // this.forceUpdate();
    }

    deletePhoto = (imageId) => {
        const deletePhotoRef = storage.ref(this.props.currentUser).child(imageId);
        deletePhotoRef.delete().then(() => {
            console.log('deleted photo successfully', imageId);
        }).catch((error) => {
            console.log('issue deleting photo', error);
        });
        // TODO - adjust state after deleting
        //https://stackoverflow.com/questions/36326612/delete-item-from-state-array-in-react
        // console.log('deleting photo...')
        const array = this.state.photos;
        const newArray = array.filter(photo => (photo.id !== imageId));
        // console.log(newArray);
        this.setState({photos: [...newArray]});
        // this.forceUpdate();
    }

    finalizeCurrencies = () => {
        this.setState((prevState) => ({itemRate: finalFormatCurrency(prevState.itemRate), exchangeOptions: 
                {delivery: finalFormatCurrency(prevState.exchangeOptions.delivery),
                    meetup: finalFormatCurrency(prevState.exchangeOptions.meetup),
                    pickup: finalFormatCurrency(prevState.exchangeOptions.pickup)}}));

    }

    onSubmit = async (e) => {
        e.preventDefault();

        if (this.validator.allValid()) {
            //FIXME - need test to display correct error message
            AddToDB(this.props.currentUser, 
                this.state.title, 
                this.state.description, 
                this.state.itemRate, 
                this.state.exchangeOptions,
                this.state.photos,
                this.props.currentItem
                );
            this.setState({title: "", description: "", itemRate: "", exchangeOptions: {delivery: 0, meetup: 0, pickup: 0}, message: ""});

            const { history } = this.props;
            if (history) history.push('/myRentals');
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }

        this.props.updateSelectedId('');

    }

    clearForm = (e) => {
        let photos = this.state.photos;
        for(let i in photos) {
            this.deletePhoto(photos[i].id);
        }
        
        this.setState({title: "", description: "", itemRate: "", 
        exchangeOptions: {delivery: 0, meetup: 0, pickup: 0}, 
        message: "cleared",
        photos: []
        } );

        this.props.updateSelectedId('');

        const { history } = this.props;
        if (history) history.push('/myRentals');
    }

    async componentDidMount() {
        if (this.props.currentItem) {
            const itemDetails = await getItemFromDB(this.props.currentItem);

            console.log(itemDetails);
            let photos = [];

            if (itemDetails.photos) {
                photos = [...itemDetails.photos]
            }

            this.setState({
                ownerId: itemDetails.ownerId,
                title: itemDetails.itemName,
                description: itemDetails.itemDesc,
                itemRate: itemDetails.costHourly,
                exchangeOptions: itemDetails.exchangeOptions,
                photos: photos
            })
        }
    }

    render() {
        return(
            <form className="container" >

                <div className="row">
                    {/*//TODO - fix reference to add photo img*/}
                    {/* <div className="photo_frame col-md-4">
                        <img src="https://www.publicdomainpictures.net/pictures/370000/velka/2-seater-kayak-canoe.jpg" alt="kayak inflatable" />
                        <h1>+</h1>
                    </div> */}
                    <div className="col-md-5 center_column">
                        <div className="errorMessage" data-testid='messageBox'>
                            <div>{this.validator.message('title', this.state.title, 'required|string|max: 25')}</div>
                            <div>{this.validator.message('description', this.state.description, 'required|string|max:500')}</div>
                            <div>{this.validator.message('itemRate', this.state.itemRate, 'required|numeric|min:0,num')}</div>
                            <Message/>
                        </div>
                        <EditTitleDesc 
                            title={this.state.title} 
                            desc={this.state.description}
                            itemRate={this.state.itemRate}
                            exchangeOptions={this.state.exchangeOptions}
                            updateFields={this.updateFields.bind(this)}
                            updateExchangeOptions={this.updateExchangeOptions}/>
                    </div>
                    <AddPhoto currentUser={this.props.currentUser}
                        loading={this.state.loading}
                        photos={this.state.photos}
                        uploadPhoto={this.uploadPhoto}
                        deletePhoto={this.deletePhoto}
                    />
                    <SubmitButtons submitTitle={!this.props.currentItem ? "Add" : "Edit"}
                        cancelTitle="Cancel"
                        submitFn={this.onSubmit.bind(this)}
                        cancelFn={this.clearForm.bind(this)}
                    />
                </div>
                
            </form>
        );
    }
}

export default withRouter(AddItem);