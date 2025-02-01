import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { IoArrowBack } from "react-icons/io5";
import { BsCart } from "react-icons/bs";
import styles from "./ProductDetail.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Review {
  id: string;
  rating: number;
  comment: string;
  user: string;
}

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  img: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  reviews: Review[];
  category: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/258d9c98-0dfc-4d69-b17d-37e64019a64e"
        );
        const data: Product[] = await response.json();

        const selectedProduct = data.find((item) => item.id === id);
        if (selectedProduct) {
          setProduct(selectedProduct);

          const related = data.filter(
            (item) => item.category === selectedProduct.category && item.id !== id
          );
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const addToCart = () => {
    console.log(`Product ${product?.id} added to cart`);
  };

  if (loading) {
    return <div className={styles.loading}>Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className={styles.error}>
        <p>Product not found</p>
        <button onClick={() => navigate("/explore-products")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <IoArrowBack
          className={styles.backButton}
          onClick={() => navigate(-1)}
        />
        <BsCart
          className={styles.cartIcon}
          onClick={() => navigate("/cart")}
        />
      </header>

      <div className={styles.productInfo}>
        <p className={styles.productPrice}>USD {product.price}</p>
        <h2 className={styles.productName}>{product.name}</h2>
        <div className={styles.tabContainer}>
          <button className={`${styles.tab} ${styles.active}`}>Overview</button>
          <button className={styles.tab}>Features</button>
        </div>
        <img src={product.img} alt={product.name} className={styles.productImage} />
      </div>

      <div className={styles.reviewsSection}>
        <h3 className={styles.reviewsTitle}>Reviews ({product.reviews.length})</h3>
        {product.reviews.map((review) => (
          <div key={review.id} className={styles.review}>
            <img
              src="https://via.placeholder.com/40"
              alt={review.user}
              className={styles.reviewAvatar}
            />
            <div className={styles.reviewContent}>
              <p className={styles.reviewName}>{review.user}</p>
              <p className={styles.reviewText}>{review.comment}</p>
              <div className={styles.starRating}>
                {Array.from({ length: 5 }, (_, i) => (
                  <AiFillStar
                    key={i}
                    className={
                      i < review.rating ? styles.starFilled : styles.starEmpty
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.anotherProductSection}>
        <div className={styles.anotherProductHeader}>
          <h3>Another Product</h3>
          <button
            className={styles.seeAllButton}
            onClick={() => navigate("/explore-products")}
          >
            See All
          </button>
        </div>
        <div className={styles.carouselWrapper}>
          <Carousel responsive={responsive} infinite arrows>
            {relatedProducts.map((related) => (
              <div
                key={related.id}
                className={styles.productCard}
                onClick={() => navigate(`/product-detail/${related.id}`)}
              >
                <img
                  src={related.img}
                  alt={related.name}
                  className={styles.productCardImage}
                />
                <h4 className={styles.productCardName}>{related.name}</h4>
                <p className={styles.productCardPrice}>USD {related.price}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      <button className={styles.addToCartButton} onClick={addToCart}>
        Add To Cart
      </button>
    </div>
  );
};

export default ProductDetail;
