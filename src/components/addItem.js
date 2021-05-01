import React from 'react';
import EditTitleDesc from "./editTitleDesc";
import firebase from "../utils/firebase";



class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: "", description: "", itemRate: ""};
    }

    // componentDidMount() {
    //     firebase
    //         .firestore()
    //         .collection('rental')
    //         .onSnapshot((snapshot) => {
    //             const newItems=snapshot.docs.map((doc) => ({
    //                 id: doc.id,
    //                 ...doc.data()
    //             }))
    //         });
    //
    //     this.setState({newItems});
    // }



    updateFields = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({[name]: value});
    }

    onSubmit = (e) => {
        e.preventDefault();

        firebase
            .firestore()
            .collection('rentalItems')
            .add({
                itemName: this.state.title, itemDesc: this.state.description, costHourly: this.state.itemRate
            })
            .then((docRef) => {
                console.log("success writing document:", docRef.id);
                this.setState({title: "", description: "", itemRate: ""});
            })
            .catch((error) => {
                console.log("failed to add: ", error);
            });
    }

    render() {
        return(
            <form className="container" onSubmit={this.onSubmit}>
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
                <div>
                    <div className="actionButtons">
                        <input type="submit" id="addItemButton" value="Add" />
                        <input type="reset" id="cancelAddItem" value="Cancel"/>
                    </div>
                </div>
            </form>
        );
    }
}

export default AddItem;