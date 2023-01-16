import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductBox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faExchangeAlt,
  faShoppingBasket,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar, faHeart } from '@fortawesome/free-regular-svg-icons';
import Button from '../Button/Button';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { toggleFavourite } from '../../../redux/productsRedux';

const ProductBox = ({
  name,
  price,
  promo,
  stars,
  photo,
  isFavourite,
  isComparable,
  oldPrice,
  id,
  addProductCompare,
  removeProductCompare,
  countProductsCompare,
}) => {
  const dispatch = useDispatch();
  const productId = id;
  const handleClick = e => {
    e.preventDefault();
    dispatch(toggleFavourite(productId));
  };

  return (
    <div className={styles.root}>
      <div className={styles.photo}>
        {photo}
        {promo && <div className={styles.sale}>{promo}</div>}
        <div className={styles.buttons}>
          <Button variant='small'>Quick View</Button>
          <Button variant='small'>
            <FontAwesomeIcon icon={faShoppingBasket}></FontAwesomeIcon> ADD TO CART
          </Button>
        </div>
      </div>
      <div className={styles.content}>
        <h5>{name}</h5>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map(i => (
            <a key={i} href='#'>
              {i <= stars ? (
                <FontAwesomeIcon icon={faStar}>{i} stars</FontAwesomeIcon>
              ) : (
                <FontAwesomeIcon icon={farStar}>{i} stars</FontAwesomeIcon>
              )}
            </a>
          ))}
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.actions}>
        <div className={styles.outlines}>
          <Button
            variant='outline'
            onClick={handleClick}
            className={clsx(styles.buttonHover, isFavourite && styles.isActive)}
          >
            <FontAwesomeIcon icon={faHeart}>Favorite</FontAwesomeIcon>
          </Button>
          <Button
            onClick={e => {
              e.preventDefault();
              if (isComparable === false && countProductsCompare() < 4) {
                addProductCompare(id);
              } else {
                removeProductCompare(id);
              }
            }}
            variant='outline'
            className={`${isComparable === true ? `${styles.isComparable}` : ''}`}
          >
            <FontAwesomeIcon icon={faExchangeAlt}>Add to compare</FontAwesomeIcon>
          </Button>
        </div>
        {oldPrice && <div className={styles.oldPrice}>$ {oldPrice}</div>}
        <div className={styles.price}>
          <Button noHover variant='small'>
          $ {price}
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductBox.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  price: PropTypes.number,
  promo: PropTypes.string,
  stars: PropTypes.number,
  photo: PropTypes.object,
  isFavourite: PropTypes.bool,
  isComparable: PropTypes.bool,
  oldPrice: PropTypes.number,
  id: PropTypes.string,
  addProductCompare: PropTypes.func,
  removeProductCompare: PropTypes.func,
  countProductsCompare: PropTypes.func,
};

export default ProductBox;
