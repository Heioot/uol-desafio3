import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import styles from "./Home.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiMenu } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  img: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("headphones");
  const [userName, setUserName] = useState<string | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
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

    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName);
      setUserPhoto(user.photoURL);
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product-detail/${productId}`);
  };

  const renderHighlightedProduct = () => {
    const highlightedProduct = products.find(
      (product) => product.category === activeCategory
    );

    if (!highlightedProduct) {
      return <p>No product available</p>;
    }

    return (
      <div
        className={styles.highlightedProduct}
        onClick={() => handleProductClick(highlightedProduct.id)}
      >
        <img
          src={highlightedProduct.img}
          alt={highlightedProduct.name}
          className={styles.highlightedImage}
        />
        <div>
          <h3>{highlightedProduct.name}</h3>
          <a href="#shop" className={styles.shopLink}>
            Shop now <FiArrowRight />
          </a>
        </div>
      </div>
    );
  };

  const renderCategoryCarousel = () => {
    const filteredProducts = products.filter(
      (product) => product.category === activeCategory
    );

    return (
      <Carousel
        responsive={responsive}
        infinite={true}
        arrows={true}
        showDots={false}
      >
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
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>USD {product.price.toFixed(2)}</p>
          </div>
        ))}
      </Carousel>
    );
  };

  const renderFeaturedProductsCarousel = () => {
    const featuredProducts = products.slice(0, 5);

    return (
      <Carousel
        responsive={responsive}
        infinite={true}
        arrows={true}
        showDots={false}
      >
        {featuredProducts.map((product) => (
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
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>USD {product.price.toFixed(2)}</p>
          </div>
        ))}
      </Carousel>
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.navbar}>
          <FiMenu className={styles.menuIcon} onClick={toggleMenu} />
          <h1 className={styles.logo}>Audio</h1>
          <div className={styles.userSection}>
            {userPhoto ? (
              <img
                src={userPhoto}
                alt={userName || "User"}
                className={styles.userAvatar}
              />
            ) : (
              <div className={styles.userPlaceholder}>?</div>
            )}
            {userName && <span className={styles.userName}>{userName}</span>}
          </div>
        </div>
      </header>

      <div
        className={`${styles.menuDrawer} ${
          isMenuOpen ? styles.menuDrawerOpen : ""
        }`}
      >
        <IoClose className={styles.closeMenuIcon} onClick={toggleMenu} />
        <ul className={styles.menuList}>
          <li onClick={() => handleNavigation("/")}>Auth</li>
          <li onClick={() => handleNavigation("/signup")}>Sign Up</li>
          <li onClick={() => handleNavigation("/home")}>Home</li>
          <li onClick={() => handleNavigation("/search")}>Search</li>
          <li onClick={() => handleNavigation("/explore-products")}>
            Explore Products
          </li>
        </ul>
      </div>

      <p className={styles.greeting}>Hi, {userName || "User"}</p>
      <h2 className={styles.title}>What are you looking for today?</h2>
      <input
        type="text"
        placeholder="Search headphone"
        className={styles.searchInput}
        onClick={() => navigate("/search")}
      />

      <section className={styles.categorySection}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeCategory === "headphones" ? styles.active : ""
            }`}
            onClick={() => setActiveCategory("headphones")}
          >
            Headphone
          </button>
          <button
            className={`${styles.tab} ${
              activeCategory === "headsets" ? styles.active : ""
            }`}
            onClick={() => setActiveCategory("headsets")}
          >
            Headset
          </button>
        </div>
        {renderHighlightedProduct()}
      </section>

      <section className={styles.featuredSection}>
        <div className={styles.sectionHeader}>
          <h2>Featured Products</h2>
        </div>
        {renderFeaturedProductsCarousel()}
      </section>

      <section className={styles.featuredSection}>
        <div className={styles.sectionHeader}>
          <h2>Products by Category</h2>
        </div>
        {renderCategoryCarousel()}
      </section>
    </div>
  );
};

export default Home;
