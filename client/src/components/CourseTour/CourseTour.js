import React from 'react';
import { Query } from 'react-apollo';
import { GET_ALL_PROMOTIONS } from '../../queries';
import PromotionItem from './PromotionItem';
import { Link } from 'react-router-dom';
import withAuth from '../withAuth';

const Promotion = () => {
    return (
        <Query query={GET_ALL_PROMOTIONS}>
            {({ data, loading, error }) => {
                if (loading) {
                    return <div>Loading ...</div>
                }
                if (error) {
                    return <div>Error</div>
                }
                return (
                    <div className="App">
                        <ul>
                            <li><Link to="/promotions/add"><button >Add Promotion</button></Link></li>
                            {data.getAllPromotions.map(promotion => (
                                <PromotionItem key={promotion._id} {...promotion} />
                            ))}
                        </ul>
                    </div>
                )
            }}
        </Query>
    )
}

export default withAuth(session => session && session.getCurrentUser)(Promotion);