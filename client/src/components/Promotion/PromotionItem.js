import React from 'react';
import { Link } from 'react-router-dom';

const PromotionItem = ({ _id, name, description, startDate, endDate }) => {
    return (
        <Link to={`/promotions/${_id}`}><li>
            <h4>{name}</h4>
            <p>{description}</p>
            <p>{startDate}</p>
            <p>{endDate}</p>
        </li>
        </Link>
    )
};


export default PromotionItem;