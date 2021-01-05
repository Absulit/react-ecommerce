import React from 'react';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { Link } from 'react-router-dom';
import { auth } from './../../firebase/firebase.utils';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header = ({ currentUser, hidden }) => {
    console.log("----Header, currentUser", currentUser);
    return (
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo"></Logo>
            </Link>

            <div className="options">
                <Link className="option" to="/shop">
                    SHOP
                </Link>
                <Link className="option" to="/shop">
                    CONTACT
                </Link>
                {
                    currentUser ?
                        <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
                        :
                        <Link className="option" to="/signin">SIGN IN</Link>
                }
                <CartIcon />
            </div>
            {
                hidden ? null : <CartDropdown />

            }

        </div>

    );
}

const mapStateToProps = ({ user: {currentUser}, cart: { hidden } }) => {

    /**
     * because of the new destructure, we have currentUser and hidden 
     * as separate variables, and since they have the same name
     * we use the property only instead of key value
     */
    /*return ({
        currentUser: currentUser,
        hidden: hidden
    });*/

    return ({
        currentUser,
        hidden
    });
}

export default connect(mapStateToProps)(Header);