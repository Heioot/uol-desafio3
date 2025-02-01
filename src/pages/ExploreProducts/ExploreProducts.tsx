import React, { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import styles from "./ExploreProducts.module.css";
import { AiOutlineArrowLeft, AiFillStar } from "react-icons/ai";
import { BsCart, BsSliders } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("popularity");
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
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const applyFilter = () => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (sortOption === "popularity") {
      filtered.sort((a, b) => b.popularity - a.popularity);
    } else if (sortOption === "newest") {
      filtered.sort((a, b) => b.id.localeCompare(a.id));
    } else if (sortOption === "oldest") {
      filtered.sort((a, b) => a.id.localeCompare(b.id));
    } else if (sortOption === "highPrice") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "lowPrice") {
      filtered.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(filtered);
    toggleDrawer();
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product-detail/${productId}`);
  };

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
        <button className={styles.filterButton} onClick={toggleDrawer}>
          <BsSliders className={styles.filterIcon} />
          <span>Filter</span>
        </button>
      </div>

      <div className={styles.productsGrid}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={styles.productCard}
            onClick={() => handleProductClick(product.id)}
          >
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

      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        direction="bottom"
        className={styles.drawer}
        size={400}
      >
        <div className={styles.drawerContent}>
          <IoClose className={styles.closeButton} onClick={toggleDrawer} />
          <h2 className={styles.drawerTitle}>Filter</h2>

          <div className={styles.filterSection}>
            <h3 className={styles.filterLabel}>Category</h3>
            <div className={styles.filterButtonsRow}>
              <button
                className={`${styles.filterButton} ${
                  selectedCategory === "headphones" ? styles.active : ""
                }`}
                onClick={() => setSelectedCategory("headphones")}
              >
                Headphone
              </button>
              <button
                className={`${styles.filterButton} ${
                  selectedCategory === "headsets" ? styles.active : ""
                }`}
                onClick={() => setSelectedCategory("headsets")}
              >
                Headset
              </button>
            </div>
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterLabel}>Sort By</h3>
            <div className={styles.filterButtonsRow}>
              <button
                className={`${styles.filterButton} ${
                  sortOption === "popularity" ? styles.active : ""
                }`}
                onClick={() => setSortOption("popularity")}
              >
                Popularity
              </button>
              <button
                className={`${styles.filterButton} ${
                  sortOption === "newest" ? styles.active : ""
                }`}
                onClick={() => setSortOption("newest")}
              >
                Newest
              </button>
              <button
                className={`${styles.filterButton} ${
                  sortOption === "oldest" ? styles.active : ""
                }`}
                onClick={() => setSortOption("oldest")}
              >
                Oldest
              </button>
              <button
                className={`${styles.filterButton} ${
                  sortOption === "highPrice" ? styles.active : ""
                }`}
                onClick={() => setSortOption("highPrice")}
              >
                High Price
              </button>
              <button
                className={`${styles.filterButton} ${
                  sortOption === "lowPrice" ? styles.active : ""
                }`}
                onClick={() => setSortOption("lowPrice")}
              >
                Low Price
              </button>
            </div>
          </div>

          <button className={styles.applyButton} onClick={applyFilter}>
            Apply Filter
          </button>
        </div>
      </Drawer>
    </div>
  );
};

export default ExploreProducts;
