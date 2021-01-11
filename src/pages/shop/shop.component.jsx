import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CollectionsOverview from '../../components/colletions-overview/collections-overview.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import Collection from '../collection/collection.component';
import { updateCollections } from './../../redux/shop/shop.actions';

const CollectionsOverviewWithSpiner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(Collection);

class Shop extends React.Component {

    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        console.log('---- Shop, componentDidMount');
        const collectionRef = firestore.collection('collections');

        // subscribe
        /*this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            console.log('---- Shop, componentDidMount, snapshot', snapshot);
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            console.log('---- Shop, componentDidMount, collectionsMap', collectionsMap);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });*/

        // promise
        collectionRef.get().then(snapshot => {
            console.log('---- Shop, componentDidMount, snapshot', snapshot);
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            console.log('---- Shop, componentDidMount, collectionsMap', collectionsMap);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });


        // fetch
        /*fetch('https://firestore.googleapis.com/v1/projects/react-ecommerce-absulit/databases/(default)/documents/collections')
            .then(response => response.json())
            .then(data => console.log(data));*/


    }

    render() {
        console.log('---- Shop, render');
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className="shop-page">
                {/* <Route exact path={`${match.path}`} component={CollectionsOverview} /> */}
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpiner isLoading={loading} {...props} />} />
                {/* <Route path={`${match.path}/:collectionId`} component={Collection} /> */}
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} />
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
