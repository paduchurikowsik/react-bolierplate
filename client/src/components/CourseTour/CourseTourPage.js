import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import Error from '../Error';
import withAuth from '../withAuth';


import { GET_PROMOTION } from '../../queries'

const PromotionPage = ({ match }) => {
    const { _id } = match.params;
    return (
        <Query query={GET_PROMOTION} variables={{ _id }}>
            {({ data, loading, error }) => {
                if (loading) return <div>Loading</div>
                if (error) return <Error error={error} />
                return (
                    <div className="App">
                        <h2>{data.getPromotion.name}</h2>
                        <p>{data.getPromotion.description}</p>
                        <p>{data.getPromotion.startDate}</p>
                        <p>{data.getPromotion.endDate}</p>
                    </div>
                )
            }}
        </Query>
    )
}

// export default withRouter(PromotionPage);
export default withAuth(session => session && session.getCurrentUser)( withRouter(PromotionPage));