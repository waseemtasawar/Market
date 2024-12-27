import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const slugParts = id.split("-");
        const productId = slugParts[slugParts.length - 1]; // Extract ID from slug

        const response = await axios.get(`/api/products/${productId}`); // Fetch product details
        setProduct(response.data?.data?.product || null);
        setUpdatedProduct(response.data?.data?.product || {});
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdateProduct = async () => {
    try {
      const slugParts = id.split("-");
      const productId = slugParts[slugParts.length - 1]; // Extract ID from slug

      await axios.patch(`/api/products/${productId}`, updatedProduct); // Send updated product data
      alert("Product updated successfully!");
      setIsEditModalOpen(false);
    } catch (err) {
      alert("Error updating product: " + err.message);
    }
  };
  const handleDeleteProduct = async () => {
    try {
      const slugParts = id.split("-");
      const productId = slugParts[slugParts.length - 1];

      await axios.delete(`/api/products/${productId}`);
      alert("Product deleted successfully!");
      navigate("/products"); // Redirect to product list after deletion
    } catch (err) {
      alert("Error deleting product: " + err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

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

          <button
            style={styles.editButton}
            onClick={() => setIsEditModalOpen(true)}
          >
            Update Product
          </button>
          <button style={styles.deleteButton} onClick={handleDeleteProduct}>
            Delete Product
          </button>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Edit Product</h2>
            <form style={styles.form}>
              <input
                style={styles.input}
                type="text"
                name="name"
                placeholder="Product Name"
                value={updatedProduct.name}
                onChange={handleInputChange}
              />
              <input
                style={styles.input}
                type="text"
                name="category"
                placeholder="Category"
                value={updatedProduct.category}
                onChange={handleInputChange}
              />
              <input
                style={styles.input}
                type="number"
                name="price"
                placeholder="Price"
                value={updatedProduct.price}
                onChange={handleInputChange}
              />
              <input
                style={styles.input}
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={updatedProduct.quantity}
                onChange={handleInputChange}
              />
              <input
                style={styles.input}
                type="text"
                name="brand"
                placeholder="Brand"
                value={updatedProduct.brand}
                onChange={handleInputChange}
              />
              <input
                style={styles.input}
                type="number"
                name="rating"
                placeholder="Rating"
                value={updatedProduct.rating}
                onChange={handleInputChange}
              />
              <input
                style={styles.input}
                type="number"
                name="warranty"
                placeholder="Warranty (Years)"
                value={updatedProduct.warranty}
                onChange={handleInputChange}
              />
              <div style={styles.buttonGroup}>
                <button
                  type="button"
                  style={styles.saveButton}
                  onClick={handleUpdateProduct}
                >
                  Save
                </button>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
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
  editButton: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "0.8rem 1.5rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "1rem",
    marginRight: "1rem",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "0.8rem 1.5rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "1rem",
  },
  modal: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "400px",
  },
  modalTitle: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
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
