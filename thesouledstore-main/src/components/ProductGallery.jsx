import { useState } from 'react';

const ProductGallery = ({ product }) => {
  const image =
    product.images?.length > 0
      ? product.images[0]
      : product.image;

  return (
    <div className="product-gallery">
      <div className="product-gallery-main">
        <img src={image} alt={product.name} />
      </div>
    </div>
  );
};

export default ProductGallery;