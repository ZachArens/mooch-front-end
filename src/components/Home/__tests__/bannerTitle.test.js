import React from 'react'
import renderer from 'react-test-renderer'
import BannerTitle from '../bannerTitle';

test('<BannerTitle />', () => {
    const tree = renderer.create(<BannerTitle />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});