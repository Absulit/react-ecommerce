import React from 'react';
import './header.styles.scss';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import { Link } from 'react-router-dom';
import { auth } from './../../firebase/firebase.utils';

const Header = ({currentUser}) => {
    console.log("----",currentUser);
    return(
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo"></Logo>
            </Link>

            <div className="options">
                <Link className="option" to="/shop">
                    SHOP
                </Link>
            </div>
            <div className="options">
                <Link className="option" to="/shop">
                    CONTACT
                </Link>
            </div>
            {
                currentUser?
                    <div className="options" onClick={()=> auth.signOut()}>SIGN OUT</div>
                    :
                    <Link className="options" to="/signin">SIGN IN</Link>
            }

        </div>

    );
}


export default Header;