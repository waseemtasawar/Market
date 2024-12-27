import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Extract ID from slug
        const slugParts = id.split("-");
        const productId = slugParts[slugParts.length - 1]; // Get the last part of the slug (the ID)

        const response = await axios.get(`/api/products/${productId}`);
        setProduct(response.data?.data?.product || null);
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.loadingText}>Loading product details...</p>
      </div>
    );
  if (error)
    return (
      <div style={styles.errorContainer}>
        <p style={styles.errorText}>Error loading product details: {error}</p>
      </div>
    );

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Product Details</h1>
      {product && (
        <div style={styles.detailCard}>
          <h2 style={styles.productName}>{product.name}</h2>
          <p style={styles.detailItem}>
            <strong>Category:</strong> {product.category}
          </p>
          <p style={styles.detailItem}>
            <strong>Price:</strong> ${product.price}
          </p>
          <p style={styles.detailItem}>
            <strong>Quantity:</strong> {product.quantity} available
          </p>
          <p style={styles.detailItem}>
            <strong>Brand:</strong> {product.brand}
          </p>
          <p style={styles.detailItem}>
            <strong>Rating:</strong> ⭐ {product.rating}/5
          </p>
          <p style={styles.detailItem}>
            <strong>Warranty:</strong> {product.warranty} years
          </p>
        </div>
      )}
    </div>
  );
};

const styles = {
  pageContainer: {
    padding: "2rem",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    fontSize: "2.5rem",
    textAlign: "center",
    color: "#333",
    marginBottom: "2rem",
  },
  detailCard: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  productName: {
    fontSize: "2rem",
    color: "#ff4e72",
    marginBottom: "1rem",
  },
  detailItem: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "0.5rem",
    lineHeight: "1.5",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    fontSize: "1.5rem",
    color: "#888",
  },
  errorContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  errorText: {
    fontSize: "1.5rem",
    color: "red",
  },
};

export default ProductDetail;
