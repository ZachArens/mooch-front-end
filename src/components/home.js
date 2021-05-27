import React from 'react';
import ItemGrid from "./itemGrid";
import BannerTitle from './bannerTitle';
import '../styles/home.scss';

class Home extends React.Component {


    render() {
        return(
            <div>
                <BannerTitle />
                <ItemGrid updateCurrentItem={this.props.updateCurrentItem} />
                
            </div>

        );
    }
}

export default Home;