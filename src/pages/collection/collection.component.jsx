import React from 'react';
import CollectionItem from '../../components/collection-item/collection-item.component';
import './collection.styles.scss';
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";
import { createStructuredSelector } from "reselect";


const Collection = ({ collection }) => {
    const { title, items } = collection;
    return (
        <div className="collection">
            <h2 className="title">{title}</h2>
            <div className="items">
                {
                    items.map(item => <CollectionItem key={item.id} item={item} />)

                }
            </div>
        </div>
    )
};

// why are we not using `createStructuredSelector` here? it blows my mind
// so it's not necessary at all?
/*const mapStateToProps = createStructuredSelector(
    {
        collection: selectCollection
    }
)*/
// own props are the same props from Collection
const mapStateToProps = (state, ownProps) => (
    {
        collection: selectCollection(ownProps.match.params.collectionId)(state)
    }
)

export default connect(mapStateToProps)(Collection);