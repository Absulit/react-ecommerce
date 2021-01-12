import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
//import CollectionsOverview from '../../components/colletions-overview/collections-overview.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import Collection from '../collection/collection.component';
import { fetchCollectionsStartAsync } from './../../redux/shop/shop.actions';
import CollectionsOverviewContainer from './../../components/colletions-overview/collections-overview.container';
import CollectionsPageContainer from './../collection/collection.container';

//const CollectionsOverviewWithSpiner = WithSpinner(CollectionsOverview);
//const CollectionPageWithSpinner = WithSpinner(Collection);

class Shop extends React.Component {

    /*state = {
        loading: true
    }*/

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        console.log('---- Shop, componentDidMount');
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();

        //const { updateCollections } = this.props;
        //const collectionRef = firestore.collection('collections');

        // subscribe
        /*this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            console.log('---- Shop, componentDidMount, snapshot', snapshot);
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            console.log('---- Shop, componentDidMount, collectionsMap', collectionsMap);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });*/

        // promise
        /*collectionRef.get().then(snapshot => {
            console.log('---- Shop, componentDidMount, snapshot', snapshot);
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            console.log('---- Shop, componentDidMount, collectionsMap', collectionsMap);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });*/


        // fetch
        /*fetch('https://firestore.googleapis.com/v1/projects/react-ecommerce-absulit/databases/(default)/documents/collections')
            .then(response => response.json())
            .then(data => console.log(data));*/


    }

    render() {
        console.log('---- Shop, render');
        //const { match, isCollectionFetching, isCollectionsLoaded } = this.props;
        const { match } = this.props;
        //const { loading } = this.state;
        return (
            <div className="shop-page">
                {/* <Route exact path={`${match.path}`} component={CollectionsOverview} /> */}
                {/* <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpiner isLoading={!isCollectionsLoaded} {...props} />} /> */}
                <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
                {/* <Route path={`${match.path}/:collectionId`} component={Collection} /> */}
                {/* <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />} /> */}
                <Route path={`${match.path}/:collectionId`} component={CollectionsPageContainer} />
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector(
    {
        isCollectionFetching: selectIsCollectionFetching,
        isCollectionsLoaded: selectIsCollectionsLoaded
    }
)

/*const mapDispatchToProps = dispatch => (
    {
        updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
    }
);*/

const mapDispatchToProps = dispatch => (
    {
        fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
