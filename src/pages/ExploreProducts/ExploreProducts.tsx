import React, { useEffect, useState } from "react";
import styles from "./ExploreProducts.module.css";
import { AiOutlineArrowLeft, AiFillStar } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  img: string;
  popularity: number;
  reviews: { rating: number }[];
}

const ExploreProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/258d9c98-0dfc-4d69-b17d-37e64019a64e"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (!products.length) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <AiOutlineArrowLeft
          className={styles.backButton}
          onClick={() => navigate("/home")}
        />
        <BsCart className={styles.cartIcon} />
      </header>

      <div className={styles.content}>
        <h1 className={styles.title}>All Products</h1>
      </div>

      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img
              src={product.img}
              alt={product.name}
              className={styles.productImage}
            />
            <div>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productPrice}>USD {product.price}</p>
              <p className={styles.productReviews}>
                <AiFillStar className={styles.starIcon} /> {product.reviews.length} Reviews
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreProducts;
