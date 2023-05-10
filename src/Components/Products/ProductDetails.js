import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleProduct, addToCart } from '../../store';
import { useParams, Link } from 'react-router-dom';
import { createNewWish, fetchWishes } from '../../store';
import {
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  cardHeader: {
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: 'linear-gradient(rgb(87, 87, 87), rgb(19, 19, 19))',
    borderLeft: '5pt solid #ff6709',
    fontFamily: 'Orbitron, sans-serif',
    color: 'white',
    textDecoration: 'none',
  },
  cardMedia: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  form: {
    // width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  addToCart: {
    display: 'flex',
    width: '35%',
  },
  quantity: {
    maxWidth: '50px',
  },
  quantityButtons: {
    backgroundColor: '#ff6709',
    margin: 'auto',
    color: 'white',
    maxHeight: '30px',
    maxWidth: '80px',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    backgroundImage: 'linear-gradient(rgb(87, 87, 87), rgb(19, 19, 19))',
    maxWidth: '200px',
    marginTop: 10,
  },
  description: {
    border: '2pt solid rgb(246, 246, 246)',
    padding: 10,
    textAlign: 'center',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
  },
});

const ProductDetails = () => {
  const classes = useStyles();
  // enable dispatch
  const dispatch = useDispatch();
  // useParams to grab the product id - which is params.id
  const { id } = useParams();
  // set auth var.
  const { auth } = useSelector(state => state);
  // set the logged in user's id var
  const userId = auth.id;

  // fetch the product
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, []);

  // desctruct single product from state
  const { singleProduct } = useSelector(state => state);

  // create a quantity state - call 'setQuantity' 'onClick'
  const [quantity, setQuantity] = useState(1);

  // add item - dispatch AddToCart and reset quantity
  const add = () => {
    dispatch(addToCart(singleProduct, quantity));
    setQuantity(1);
  };

  const addToWishlist = () => {
    dispatch(createNewWish({ game: singleProduct.name }));
  };

  return (
    <Container alignItems="center">
      <Card elevation={3}>
        <CardHeader
          className={classes.cardHeader}
          title={singleProduct.name}
        ></CardHeader>
        <CardMedia className={classes.cardMedia}>
          <img src={`static/${singleProduct.imageURL}`}></img>
        </CardMedia>
        <CardContent>
          {auth.id ? (
            <>
              <form className={classes.form}>
                <Grid className={classes.addToCart}>
                  <button
                    className={classes.quantityButtons}
                    onClick={() => setQuantity(quantity - 1)}
                  >
                    -
                  </button>

                  <input
                    className={classes.quantity}
                    type="text"
                    placeholder={quantity}
                  />
                  <button
                    className={classes.quantityButtons}
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </Grid>
              </form>

              <Grid className={classes.buttons}>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={add}
                >
                  Add To Cart
                </Button>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={addToWishlist}
                >
                  Add To WishList
                </Button>
              </Grid>
              <Grid className={classes.description}>
                <Typography variant="h6">
                  {singleProduct.description}
                </Typography>
              </Grid>
            </>
          ) : (
            <div className="CreateAccount">
              <br></br>
              <Link to="/sign-in">
                Please Sign In to create a cart with your account.
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </Container>

    // <div className="GameName">
    // <h2>{singleProduct.name}</h2>
    // </div>
    // <img src={`static/${singleProduct.imageURL}`}></img>

    // {auth.id ? (
    // <>
    //   <div className="ItemQuantity">
    //     <form>
    //       <button onClick={() => setQuantity(quantity - 1)}> - </button>
    //       <input className="Quantity" type="text" placeholder={quantity} />
    //       <button onClick={() => setQuantity(quantity + 1)}> + </button>
    //     </form>
    //   </div>
    //   <div className="AddCart">
    //     <button onClick={add}>Add To Cart</button>
    //   </div>
    //   <div className="AddWishCart">
    //     <button onClick={addToWishlist}>Add to Wishlist</button>
    //   </div>
    // </>
    // ) : (
    // <div className="CreateAccount">
    //   <br></br>
    //   <Link to="/sign-in">
    //     Please Sign In to create a cart with your account.
    //   </Link>
    // </div>
    // )}

    // <div className="Description">
    // <p>{singleProduct.description}</p>
    // </div>
  );
};

export default ProductDetails;
