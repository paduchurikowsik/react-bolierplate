import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries';

import Error from '../Error';

const initalState = {
    email: "",
    password: ""
};

class Signin extends React.Component {
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

    handleSubmit = (event, signinUser) => {
        event.preventDefault();
        signinUser().then(async ({ data }) => {
            // console.log(data);
            localStorage.setItem('token', data.signinUser.token);
            await this.props.refetch();
            this.clearState();
            this.props.history.push('/');
        });
    };

    validateForm = () => {
        const { email, password } = this.state;
        const isInvalid = !email || !password;

        return isInvalid;
    };

    render() {
        const { email, password } = this.state;
        return (
            <div className="App">
                <h2 className="App">Signin</h2>
                <Mutation mutation={SIGNIN_USER} variables={{ email, password }}>
                    {(signinUser, { data, loading, error }) => {
                        return (
                            <form className="form" onSubmit={event => this.handleSubmit(event, signinUser)}>
                                <input type="email" name="email" placeholder="Email" onChange={this.handleChange} value={email} />
                                <input type="password" name="password" placeholder="Password" onChange={this.handleChange} value={password} />
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

export default withRouter(Signin);