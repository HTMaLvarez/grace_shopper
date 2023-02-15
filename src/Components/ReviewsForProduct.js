import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchAllReviewsByProduct, fetchSingleProduct } from '../store';

const ReviewsForProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productReviews, singleProduct } = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchAllReviewsByProduct(id));
    dispatch(fetchSingleProduct(id));
  }, []);

  return (
    <div>
      <h2>
        Reviews for <Link to={`/products/${id}`}>{singleProduct.name}</Link>
      </h2>

      <div>
        {productReviews.allReviews.map(review => {
          return (
            <div key={review.id}>
              <div>Rating:{review.rating} Stars</div>
              <p>Comments:{review.review ? review.review : '(no comments)'}</p>
              <div>by @{review.user.username}</div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewsForProduct;
