import React from 'react';
import { Route } from 'react-router-dom';
import CollectionsOverview from '../../components/colletions-overview/collections-overview.component';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import Collection from '../collection/collection.component';



class Shop extends React.Component {
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        console.log('---- Shop, componentDidMount');
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async snapshot => {
            console.log('---- Shop, componentDidMount, snapshot', snapshot);
            convertCollectionsSnapshotToMap(snapshot);
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

export default Shop;