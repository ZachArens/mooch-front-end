import React from 'react';
import EditTitleDesc from "./editTitleDesc";
import SubmitButtons from './submitButtons';
// import firebase from "../utils/firebase";
import { AddRentalItem as AddToDB} from "../utils/firebaseFunctions";
import SimpleReactValidator from 'simple-react-validator';
import '../styles/addItem.scss';

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
            
            this.setState(AddToDB(this.state.title, this.state.description, this.state.itemRate));

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
            <form className="container" >

                <div className="row">
                    {/*//TODO - fix reference to add photo img*/}
                    {/* <div className="photo_frame col-md-4">
                        <img src="https://www.publicdomainpictures.net/pictures/370000/velka/2-seater-kayak-canoe.jpg" alt="kayak inflatable" />
                        <h1>+</h1>
                    </div> */}
                    <div className="col-md-5 center_column">
                        <div className="errorMessage">
                            <div>{this.validator.message('title', this.state.title, 'required|alpha_space')}</div>
                            <div>{this.validator.message('description', this.state.description, 'required|string|max:500')}</div>
                            <div>{this.validator.message('itemRate', this.state.itemRate, 'required|numeric|min:0,num')}</div>
                            <Message/>
                        </div>
                        <EditTitleDesc title={this.state.title} desc={this.state.description}
                                       itemRate={this.state.itemRate} updateFields={this.updateFields.bind(this)}/>
                    </div>
                    <SubmitButtons submitTitle="Add" cancelTitle="Clear"
                               submitFn={this.onSubmit.bind(this)}
                               cancelFn={this.clearForm.bind(this)}/>
                </div>
                
            </form>
        );
    }
}

export default AddItem;