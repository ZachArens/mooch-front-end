import React, { Component } from 'react'
import '../styles/bannerTitle.scss';

export default class bannerTitle extends Component {
    render() {
        return (
            <div className="title-banner">
                

                <div className="input-group">
                    <h1>Mooch</h1>
                    <input type="text" placeholder="Search"/>
                </div>

                <div hidden>
                    Image by <a href="https://pixabay.com/users/seaq68-4191072/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5621150">Sven Lachmann</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5621150">Pixabay</a>
                </div>
            </div>
        )
    }
}



