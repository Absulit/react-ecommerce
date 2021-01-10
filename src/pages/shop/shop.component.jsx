import React from 'react';
import { createStructuredSelector } from 'reselect';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';

import { connect } from "react-redux";

import { selectCollections } from "../../redux/shop/shop.selectors.js";

const Shop = ({ collections }) => (
    <div className="shop-page">
        {
            collections.map(({ id, ...otherCollectionProps }) => {
                return <CollectionPreview key={id} {...otherCollectionProps}></CollectionPreview>
            })

        }
    </div>
);


const mapStateToProps = createStructuredSelector({
    collections: selectCollections
});

export default connect(mapStateToProps)(Shop);