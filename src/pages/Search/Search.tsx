import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Search.module.css";

// Importação dos ícones
import { AiFillStar } from "react-icons/ai";
import { FiArrowLeft, FiShoppingCart } from "react-icons/fi";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  img: string;
  popularity: number;
  reviews: { rating: number }[];
}

const Search = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from API
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

  useEffect(() => {
    // Filter products by search query
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const popularProducts = products
    .sort((a, b) => b.popularity - a.popularity) // Sort by popularity
    .slice(0, 3); // Take the top 3

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <FiArrowLeft
          className={styles.backButton}
          onClick={() => navigate("/home")} // Direciona para a página Home
        />
        <h1 className={styles.title}>Search</h1>
        <FiShoppingCart className={styles.cartIcon} />
      </header>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search headphone"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {searchQuery && (
        <div className={styles.searchResults}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img
                src={product.img}
                alt={product.name}
                className={styles.productImage}
              />
              <div>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>USD {product.price.toFixed(2)}</p>
                <p className={styles.productReviews}>
                  <AiFillStar className={styles.starIcon} />{" "}
                  {product.reviews.length} Reviews
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className={styles.sectionTitle}>Popular Products</h2>
      <div className={styles.popularProducts}>
        {popularProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img
              src={product.img}
              alt={product.name}
              className={styles.productImage}
            />
            <div>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productPrice}>USD {product.price.toFixed(2)}</p>
              <p className={styles.productReviews}>
                <AiFillStar className={styles.starIcon} />{" "}
                {product.reviews.length} Reviews
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
