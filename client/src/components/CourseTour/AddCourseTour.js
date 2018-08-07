import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ADD_COURSETOUR, GET_ALL_COURSETOURS } from '../../queries';
import Error from '../Error';
import withAuth from '../withAuth';

const initalState = {
    name: '',
    description: ''
};

class AddCourseTour extends React.Component {
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
        const { name, description } = this.state;
        const inInvalid = !name || !description;

        return inInvalid;
    };

    handleSubmit = (event, addCourseTour) => {
        event.preventDefault();
        addCourseTour().then(({ data }) => {
            // console.log(data);
            this.clearState();
            this.props.history.push('/CourseTours');
        });
    };

    updateCache = (cache, { data }) => {
        const { getAllCourseTours } = cache.readQuery({ query: GET_ALL_CourseTourS });
        const { addCourseTour } = data;
        cache.writeQuery({
            query: GET_ALL_CourseTourS,
            data: {
                getAllCourseTours: [addCourseTour, ...getAllCourseTours]
            }
        });
    };

    render() {
        const { name, description } = this.state;
        return (
            <Mutation mutation={ADD_CourseTour} variables={{ name, description }} update={this.updateCache}>
                {(addCourseTour, { data, loading, error }) => {
                    return (
                        <div className="App">
                            <h2 className="App"> Add CourseTour</h2>
                            <form className="form" onSubmit={(event) => this.handleSubmit(event, addCourseTour)}>
                                <input type="text" name="name" placeholder="Name" onChange={this.handleChange} value={name} />
                                <textarea type="text" name="description" placeholder="Description" onChange={this.handleChange} value={description} />
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

export default withAuth(session => session && session.getCurrentUser)( withRouter(AddCourseTour));