import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { addReview, fetchSingleProduct } from '../store';

const ReviewForm = () => {
  const { productId } = useParams();
  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, []);

  const { singleProduct, auth } = useSelector(state => state);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(addReview(rating, review, auth.id, singleProduct.Id));
  };

  return (
    <div>
      <h4>
        Leave a review for
        <Link to={`/products/${singleProduct.id}`}>{singleProduct.name}</Link>
      </h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor='review'></label>
        <input
          id='review'
          type='text'
          placeholder='leave a review...'
          value={review}
          onChange={event => setReview(event.target.value)}
          name='review'
        />
        <br />
        <br />

        <label htmlFor='rating'></label>
        <select
          id='rating'
          name='rating'
          onChange={event => setRating(Number(event.target.value))}
        >
          <option value=''>--</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <br />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default ReviewForm;
