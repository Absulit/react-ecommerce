import React from 'react';
import FormInput from '../form-input/form-input.component';
import './signin.styles.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({email: '', password: ''});
    }

    handleChange = e => {
        const {value, name } = e.target;

        this.setState({[name]: value});
    }

    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in for your email and password</span>

                <form onSubmit={this.handleSubmit} required>
                    <FormInput handleChange={this.handleChange} label="email" name="email" type="email" value={this.state.email} />

                    <FormInput handleChange={this.handleChange} label="password" name="password" type="password" value={this.state.password} required />

                    <input type="submit" value="Submit Form"/>
                </form>
            </div>
        );
    }
}

export default SignIn;