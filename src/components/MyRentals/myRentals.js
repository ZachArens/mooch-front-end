import React from 'react';
import MyRentedOutList from "./myRentedOutList";
import { getMyReservations } from "../../utils/firebaseFunctions";
import { withRouter } from 'react-router-dom';

let unsubscribe = null;

class MyRentals extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myReservations : [],
            reservationsLoading: true
        };

        this.goAddItem = this.goAddItem.bind(this);
    }

    goAddItem = () => {
        const { history } = this.props;
        if (history) history.push('/addItems');
    }

    async componentDidMount() {
        try {
            await getMyReservations('aQqcGAeDGafhOSQWeXDFA2klpuH2').then(({unsubscribe, reservationList}) => {
                // console.log('running getMyReservations');
                unsubscribe = unsubscribe;
                // console.log("returned with: " + reservationList);
                this.setState({
                    myReservations: [...reservationList], 
                    reservationsLoading: false
                });
            });
        } catch (e) {
            console.log('componentDid...Catch');
            console.log(e);
        }
    }

    componentWillUnmount() {
        unsubscribe();
    }

    render() {
        return(
            <div>
                <h1>Things I've Rented Out</h1>
                <MyRentedOutList myReservations={this.state.myReservations} 
                    loading={this.state.reservationsLoading} />

                <h1>My Items</h1>
                <button onClick={this.goAddItem}>+</button>
                {/*<MyItemsList/>*/}
            </div>
        );
    }
}

export default withRouter(MyRentals);