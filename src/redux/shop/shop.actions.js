import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import ShopActionTypes from "./shop.types";

// unused (replaced by fetchCollectionsStart)
export const updateCollections = (collectionsMap) => (
    {
        type: ShopActionTypes.UPDATE_COLLECTIONS,
        payload: collectionsMap
    }
);

export const fetchCollectionsStart = () => (
    {
        type: ShopActionTypes.FETCH_COLLECTIONS_START,
    }
);

export const fetchCollectionsSuccess = collectionsMap => (
    {
        type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
        payload: collectionsMap
    }
)

export const fetchCollectionsFailure = (errorMessage) => (
    {
        type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
        payload: errorMessage
    }
)

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart())

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            console.log('---- Shop, fetchCollectionsStartAsync, snapshot', snapshot);
            console.log('---- Shop, fetchCollectionsStartAsync, collectionsMap', collectionsMap);
            dispatch(fetchCollectionsSuccess(collectionsMap));
            //this.setState({ loading: false });
        }).catch(error => dispatch(fetchCollectionsFailure(error.errorMessage)));
    }
}

