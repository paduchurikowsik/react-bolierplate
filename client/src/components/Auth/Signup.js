import React from 'react';

class Signup extends React.Component {
    state = {
        fullname: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    };

    handleChange = () => {

    };

    render() {
        return (
            <div className="App">
                <h2 className="App">Signup</h2>
                <form className="form">
                    <input type="text" name="fullname" placeholder="Fullname" onChange={this.handleChange} />
                    <input type="email" name="email" placeholder="Email" onChange={this.handleChange} />
                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                    <input type="password" name="passwordConfirmation" placeholder="Confirm Password" onChange={this.handleChange} />
                    <button type="submit" className="button-primary">Submit</button>
                </form>
            </div>
        )
    };
}

export default Signup;