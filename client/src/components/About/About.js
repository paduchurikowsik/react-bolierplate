import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { GET_ABOUT } from '../../queries';

const About = ( ) => (

    <Query query={GET_ABOUT}>
        {({ data, loading, error }) => {
            if (loading) {
                return <div>Loading ...</div>
            }
            if (error) {
                return <div>Error</div>
            }
            return (
                <Fragment>
                    <h3>{data.getAbout.name}</h3>
                    <h4>{data.getAbout.about}</h4>
                </Fragment>
            )
        }}
    </Query>
)

export default About;