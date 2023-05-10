import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  makeStyles,
  Box,
  TextField,
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
});

const ProductCard = ({ product }) => {
  const classes = useStyles();

  return (
    <Link to={`/products/${product.id}`}>
      <Card elevation={3}>
        <CardHeader
          className={classes.cardHeader}
          title={product.name}
        ></CardHeader>
        <CardMedia className={classes.cardMedia}>
          <img src={`static/${product.imageURL}`} sizes="200px"></img>
        </CardMedia>
      </Card>
    </Link>

    // <Link to={`/products/${product.id}`}>
    //   <div className="CardContainer">
    //     <div className="CardHeader">
    //       <h3>{product.name}</h3>
    //     </div>
    //     <div className="ImageBox">
    //       <img src={`static/${product.imageURL}`} sizes="200px"></img>
    //     </div>
    //   </div>
    // </Link>
  );
};

export default ProductCard;
