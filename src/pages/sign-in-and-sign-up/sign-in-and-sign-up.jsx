import React from 'react';
import SignUp from '../../components/sign-up/sign-up.component';
import SignIn from '../../components/signin/signin.component';
import './sign-in-and-sign-up.styles.scss';

const SignInAndSignUp = () => {
    return (
        <div className="sign-in-and-sign-up">
            <SignIn/>
            <SignUp/>
        </div>
    );
}


export default SignInAndSignUp;