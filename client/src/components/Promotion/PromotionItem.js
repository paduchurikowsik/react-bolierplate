import React from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { DELETE_PROMOTION, GET_ALL_PROMOTIONS } from '../../queries';

const handleDelete = deletePromotion => {
    const confirmDelete = window.confirm('Are you sure?');

    if (confirmDelete) {
        deletePromotion().then(({ data }) => {
            // console.log(data);
        })
    }
}

const PromotionItem = ({ _id, name, description, startDate, endDate }) => {
    return (
        <div>
            <Link to={`/promotions/${_id}`}>
                <li>
                    <h4>{name}</h4>
                    <p>{description}</p>
                    <p>{startDate}</p>
                    <p>{endDate}</p>
                </li>
            </Link>
            <Mutation
                mutation={DELETE_PROMOTION}
                variables={{ _id }} update={(cache, { data: { deletePromotion } }) => {
                    const { getAllPromotions } = cache.readQuery({
                        query: GET_ALL_PROMOTIONS
                    });
                    cache.writeQuery({
                        query: GET_ALL_PROMOTIONS,
                        data: {
                            getAllPromotions: getAllPromotions.filter(promotion => promotion._id !== deletePromotion._id)
                        }
                    })
                }}>
                {(deletePromotion, attrs = {}) => (

                    <p className="delete-button" onClick={() => handleDelete(deletePromotion)}>{attrs.loading ? "deleteing.." : "x"}</p>

                )}

            </Mutation>
        </div>
    )
};


export default PromotionItem;