import React from 'react';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries';

import Error from '../Error';

const initalState = {
    fullname: "",
    email: "",
    password: "",
    passwordConfirmation: ""
};

class Signup extends React.Component {
    state = { ...initalState };

    clearState = () => {
        this.setState({ ...initalState });
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event, signupUser) => {
        event.preventDefault();
        signupUser().then((data => {
            // console.log(data);
            this.clearState();
        }));
    };

    validateForm = () => {
        const { fullname, email, password, passwordConfirmation } = this.state;
        const isInvalid = !fullname || !email || !password || password !== passwordConfirmation;

        return isInvalid;
    };

    render() {
        const { fullname, email, password, passwordConfirmation } = this.state;
        return (
            <div className="App">
                <h2 className="App">Signup</h2>
                <Mutation mutation={SIGNUP_USER} variables={{ fullname, email, password }}>
                    {(signupUser, { data, loading, error }) => {
                        return (
                            <form className="form" onSubmit={event => this.handleSubmit(event, signupUser)}>
                                <input type="text" name="fullname" placeholder="Fullname" onChange={this.handleChange} value={fullname} />
                                <input type="email" name="email" placeholder="Email" onChange={this.handleChange} value={email} />
                                <input type="password" name="password" placeholder="Password" onChange={this.handleChange} value={password} />
                                <input type="password" name="passwordConfirmation" placeholder="Confirm Password" onChange={this.handleChange} value={passwordConfirmation} />
                                <button type="submit" disabled={loading || this.validateForm()} className="button-primary">Submit</button>

                                {error && <Error error={error} />}
                            </form>
                        )
                    }}
                </Mutation>
            </div>
        )
    };
}

export default Signup;