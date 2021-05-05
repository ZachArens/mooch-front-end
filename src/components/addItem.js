import React from 'react';
import EditTitleDesc from "./editTitleDesc";
import SubmitButtons from './submitButtons';
import firebase from "../utils/firebase";
import SimpleReactValidator from 'simple-react-validator';

function Message(props) {
    if (props.message === 'success') {
        return <p>Item added!</p>;
    } else if (props.message === 'cleared') {
        return <p>Data cleared.</p>;
    } else if (props.message === 'fbIssue') {
        return <p>There was an issue with adding your item to our system. Please try again.</p>
    } else {
        return <p hidden>This is where messages will display</p>;
    }
}

class AddItem extends React.Component {
    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator();

        this.state = {title: "", description: "", itemRate: "", message: ""};
    }

    updateFields = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({[name]: value, message: ""});
    }

    onSubmit = async (e) => {
        e.preventDefault();

        if (this.validator.allValid()) {
            await firebase
                .firestore()
                .collection('rentalItems')
                .add({
                    itemName: this.state.title, itemDesc: this.state.description, costHourly: this.state.itemRate
                })
                .then((docRef) => {
                    console.log("success writing document:", docRef.id);
                    this.setState({title: "", description: "", itemRate: "", message: "success"});
                })
                .catch((error) => {
                    //TODO - Security - don't print error to console
                    this.setState({message: "fbIssue"})
                });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }

    }

    clearForm = (e) => {
        this.setState({title: "", description: "", itemRate: "", message: "cleared"} )
    }

    render() {
        return(
            <form className="container" onSubmit={this.onSubmit}>
                <div className="row errorMessage">
                    {this.validator.message('title', this.state.title, 'required|alpha_space')}
                    {this.validator.message('description', this.state.description, 'required|string|max:500')}
                    {this.validator.message('itemRate', this.state.itemRate, 'required|numeric|min:0,num')}
                    <Message/>
                </div>
                <div className="row">
                    {/*//TODO - fix reference to add photo img*/}
                    <div className="photo_frame col-md-5">
                        <img src="../img/missing-photo-icon-14.jpg" alt="photo needed"/>
                        <h1>+</h1>
                    </div>
                    <div className="col-md-5 center_column">
                        <EditTitleDesc title={this.state.title} desc={this.state.description}
                                       itemRate={this.state.itemRate} updateFields={this.updateFields.bind(this)}/>
                    </div>
                    <div>
                        <p>test</p>
                        <p>title: {this.state.title}</p>
                        <p>description: {this.state.description}</p>
                        <p>itemRate: {this.state.itemRate}</p>
                    </div>
                </div>
                <SubmitButtons submitTitle="Add" cancelTitle="Clear"
                               submitFn={this.onSubmit.bind(this)}
                               cancelFn={this.clearForm.bind(this)}/>
            </form>
        );
    }
}

export default AddItem;