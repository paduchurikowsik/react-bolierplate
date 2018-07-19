import React from 'react';
import { Query } from 'react-apollo';
import { GET_ALL_PROMOTIONS } from '../../queries';
import PromotionItem from './PromotionItem';

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
                    <ul>
                        {data.getAllPromotions.map(promotion => (
                            <PromotionItem key={promotion._id} {...promotion} />
                        ))}
                    </ul>
                )
            }}
        </Query>
    )
}

export default Promotion;