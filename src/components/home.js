import React from 'react';
import ItemGrid from "./itemGrid";

class Home extends React.Component {


    render() {
        return(
            <div>
                <div className="title-banner">
                    <h1>Mooch</h1>

                    <div className="input-group">
                        <input type="text" placeholder="Search"/>
                    </div>

                    <div hidden>
                        Image by <a href="https://pixabay.com/users/seaq68-4191072/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5621150">Sven Lachmann</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5621150">Pixabay</a>
                    </div>
                </div>
                <div className="container">
                    <ItemGrid/>
                </div>
            </div>

        );
    }
}

export default Home;