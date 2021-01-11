import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CollectionsOverview from '../../components/colletions-overview/collections-overview.component';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import Collection from '../collection/collection.component';
import { updateCollections } from './../../redux/shop/shop.actions';



class Shop extends React.Component {
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        console.log('---- Shop, componentDidMount');
        const collectionRef = firestore.collection('collections');

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            console.log('---- Shop, componentDidMount, snapshot', snapshot);
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            console.log('---- Shop, componentDidMount, collectionsMap', collectionsMap);
            updateCollections(collectionsMap);
        });
    }

    render() {
        console.log('---- Shop, render');
        const { match } = this.props;
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={Collection} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => (
    {
        updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
    }
);

export default connect(null, mapDispatchToProps)(Shop);
