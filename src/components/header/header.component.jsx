import React from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import { auth } from './../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink } from "./header.styles";

const Header = ({ currentUser, hidden }) => {
    console.log("----Header, currentUser", currentUser);
    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className="logo"></Logo>
            </LogoContainer>

            <OptionsContainer>
                <OptionLink to="/shop">
                    SHOP
                </OptionLink>
                <OptionLink to="/shop">
                    CONTACT
                </OptionLink>
                {
                    currentUser ?
                        <OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>
                        :
                        <OptionLink to="/signin">SIGN IN</OptionLink>
                }
                <CartIcon />
            </OptionsContainer>
            {
                hidden ? null : <CartDropdown />
            }

        </HeaderContainer>

    );
}

//const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => {
const mapStateToProps = (state) => createStructuredSelector({

    /**
     * because of the new destructure, we have currentUser and hidden
     * as separate variables, and since they have the same name
     * we use the property only instead of key value
     */
    /*return ({
        currentUser: currentUser,
        hidden: hidden
    });*/

    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);