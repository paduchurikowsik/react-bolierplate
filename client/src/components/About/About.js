import React from 'react';
import { Query } from 'react-apollo';
import { GET_ABOUT } from '../../queries';
import { Link } from 'react-router-dom';

const About = () => (

    <Query query={GET_ABOUT}>
        {({ data, loading, error }) => {
            if (loading) {
                return <div>Loading ...</div>
            }
            if (error) {
                return <div>Error</div>
            }
            return (
                <div className="App">
                    <Link to="/about/add"><button >Add About</button></Link>
                    <h3>{data.getAbout.name}</h3>
                    <h4>{data.getAbout.about}</h4>
                </div>
            )
        }}
    </Query>
)

export default About;