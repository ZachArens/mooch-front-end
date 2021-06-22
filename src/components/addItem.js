// import React from 'react';
// import { withRouter } from 'react-router-dom';
// import EditTitleDesc from "./editTitleDesc";
// import SubmitButtons from './submitButtons';
// // import firebase from "../utils/firebase";
// import { AddRentalItem as AddToDB} from "../utils/firebaseFunctions";
// import SimpleReactValidator from 'simple-react-validator';
// import '../styles/addItem.scss';

// //TEMPLATE from SimpleReactValidator documentation
// function Message(props) {
//     if (props.message === 'success') {
//         return <p>Item added!</p>;
//     } else if (props.message === 'cleared') {
//         return <p>Data cleared.</p>;
//     } else if (props.message === 'fbIssue') {
//         //FIXME - need to refactor this error message after AddToDB was updated.
//         return <p>There was an issue with adding your item to our system. Please try again.</p>
//     } else {
//         return <p hidden>This is where messages will display</p>;
//     }
// }

// class AddItem extends React.Component {
//     constructor(props) {
//         super(props);

//         this.validator = new SimpleReactValidator();

//         this.state = {
//             title: "", 
//             description: "", 
//             itemRate: 0,
//             exchangeOptions: {delivery: 0, meetup: 0, pickup: 0}, 
//             message: ""};

//         this.updateExchangeOptions = this.updateExchangeOptions.bind(this)
//     }

//     updateFields = (e) => {
//         const value = e.target.value;
//         const name = e.target.name;
//         this.setState({[name]: value, message: ""});
//     }

//     updateExchangeOptions = (option, cost) => {
//         if (option === "delivery") {
//             this.setState((prevState) => ({exchangeOptions: {...prevState.exchangeOptions, delivery: cost }}));
//         } else if (option === "meetup") {
//             this.setState((prevState) => ({exchangeOptions: {...prevState.exchangeOptions, meetup: cost }}));
//         } else if (option === "pickup") {
//             this.setState((prevState) => ({exchangeOptions: {...prevState.exchangeOptions, pickup: cost }}));
//         }

//     }

//     onSubmit = async (e) => {
//         e.preventDefault();

//         if (this.validator.allValid()) {

//             //FIXME - need test to display correct error message
//             AddToDB(this.state.title, this.state.description, this.state.itemRate, this.state.exchangeOptions);
//             this.setState({title: "", description: "", itemRate: "", exchangeOptions: {delivery: 0, meetup: 0, pickup: 0}, message: ""});
//         } else {
//             this.validator.showMessages();
//             this.forceUpdate();
//         }

//         // this.props.history.push('/myRentals');

//         // this.props.history.push('/myRentals');

//     }

//     clearForm = (e) => {
//         this.setState({title: "", description: "", itemRate: "", exchangeOptions: {delivery: 0, meetup: 0, pickup: 0}, message: "cleared"} );
//         // withRouter.props.history.push('/myRentals');
//     }

//     render() {
//         return(
//             <form className="container" >

//                 <div className="row">
//                     {/*//TODO - fix reference to add photo img*/}
//                     {/* <div className="photo_frame col-md-4">
//                         <img src="https://www.publicdomainpictures.net/pictures/370000/velka/2-seater-kayak-canoe.jpg" alt="kayak inflatable" />
//                         <h1>+</h1>
//                     </div> */}
//                     <div className="col-md-5 center_column">
//                         <div className="errorMessage">
//                             <div>{this.validator.message('title', this.state.title, 'required|alpha_space')}</div>
//                             <div>{this.validator.message('description', this.state.description, 'required|string|max:500')}</div>
//                             <div>{this.validator.message('itemRate', this.state.itemRate, 'required|numeric|min:0,num')}</div>
//                             <Message/>
//                         </div>
//                         <EditTitleDesc 
//                             title={this.state.title} 
//                             desc={this.state.description}
//                             itemRate={this.state.itemRate}
//                             exchangeOptions={this.state.exchangeOptions}
//                             updateFields={this.updateFields.bind(this)}
//                             updateExchangeOptions={this.updateExchangeOptions}/>
//                     </div>
//                     <SubmitButtons submitTitle="Add" cancelTitle="Clear"
//                                submitFn={this.onSubmit.bind(this)}
//                                cancelFn={this.clearForm.bind(this)}/>
//                 </div>
                
//             </form>
//         );
//     }
// }

// export default AddItem;