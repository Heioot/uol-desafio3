import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  img: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/258d9c98-0dfc-4d69-b17d-37e64019a64e"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const renderCategoryCarousel = (category: string) => {
    const filteredProducts = products.filter((product) => product.category === category);

    return (
      <Carousel responsive={responsive} infinite={true}>
        {filteredProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.img} alt={product.name} className={styles.productImage} />
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
          </div>
        ))}
      </Carousel>
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>Audio</h1>
        <p className={styles.greeting}>Hi, Andrea</p>
        <h2 className={styles.title}>What are you looking for today?</h2>
        <input
          type="text"
          placeholder="Search headphone"
          className={styles.searchInput}
          onClick={() => navigate("/search")}
        />
      </header>

      <section className={styles.categorySection}>
        <div className={styles.categoryHeader}>
          <h2>Headphones</h2>
        </div>
        {renderCategoryCarousel("headphones")}
      </section>

      <section className={styles.categorySection}>
        <div className={styles.categoryHeader}>
          <h2>Headsets</h2>
        </div>
        {renderCategoryCarousel("headsets")}
      </section>
    </div>
  );
};

export default Home;
