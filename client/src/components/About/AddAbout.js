import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ADD_ABOUT, GET_ABOUT } from '../../queries';
import Error from '../Error';

const initalState = {
    name: '',
    about: ''
};

class AddAbout extends React.Component {
    state = { ...initalState };

    clearState = () => {
        this.setState({ ...initalState });
    };

    componentDidMount() {
        // console.log(this.props.session.getCurrentUser.email);
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    validateForm = () => {
        const { name, about } = this.state;
        const inInvalid = !name || !about;

        return inInvalid;
    };

    handleSubmit = (event, addAbout) => {
        event.preventDefault();
        addAbout().then(({ data }) => {
            // console.log(data);
            this.clearState();
            this.props.history.push('/');
        });
    };

    updateCache = (cache, { data }) => {
        const { getAbout } = cache.readQuery({ query: GET_ABOUT });
        const { addAbout } = data;
        cache.writeQuery({
            query: GET_ABOUT,
            data: {
                getAllPromotions: [addAbout, ...getAbout]
            }
        });
    };

    render() {
        const { name, about } = this.state;
        return (
            <Mutation mutation={ADD_ABOUT} variables={{ name, about }} update={this.updateCache}>
                {(addAbout, { data, loading, error }) => {
                    return (
                        <div className="App">
                            <h2 className="App"> Add About</h2>
                            <form className="form" onSubmit={(event) => this.handleSubmit(event, addAbout)}>
                                <input type="text" name="name" placeholder="Name" onChange={this.handleChange} value={name} />
                                <textarea type="text" name="about" placeholder="About" onChange={this.handleChange} value={about} />
                                <button disabled={loading || this.validateForm()} type="submit" className="button-primary">Add</button>
                                {error && <Error error={error} />}
                            </form>
                        </div>
                    )
                }}

            </Mutation>
        )
    }
}

export default withRouter(AddAbout);