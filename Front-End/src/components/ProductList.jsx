import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    brand: "",
    rating: "",
    warranty: "",
  });

  const fetchProducts = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products?page=${page}&limit=8`);
      setProducts(response.data?.data?.products || []);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage); // Fetch products for the current page
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage); // Update the current page
    }
  };

  const handleAddProduct = async () => {
    try {
      await axios.post("/api/products", newProduct);
      setProducts((prev) => [...prev, newProduct]);
      alert("Product added successfully!");
      setIsModalOpen(false);
      setNewProduct({
        name: "",
        category: "",
        price: "",
        quantity: "",
        brand: "",
        rating: "",
        warranty: "",
      });
    } catch (err) {
      alert("Error adding product: " + err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  if (loading)
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.loadingText}>Loading products...</p>
      </div>
    );
  if (error)
    return (
      <div style={styles.errorContainer}>
        <p style={styles.errorText}>Error loading products: {error}</p>
      </div>
    );

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Our Products</h1>

      <button onClick={() => setIsModalOpen(true)} style={styles.addButton}>
        Add New Product
      </button>

      <div style={styles.gridContainer}>
        {products.map((product, index) => {
          const slug = `${product.name.toLowerCase().replace(/\s+/g, "-")}-${
            product.id || product._id
          }`;

          return (
            <Link
              to={`/products/${slug}`} // Use the slug in the URL
              style={styles.card}
              key={index}
            >
              <h2 style={styles.cardTitle}>{product.name}</h2>
              <p style={styles.cardDescription}>Price: ${product.price}</p>
            </Link>
          );
        })}
      </div>

      {/* Just for paginationButton */}
      {/* Pagination Controls */}
      <div style={styles.paginationContainer}>
        <button
          style={styles.paginationButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={styles.paginationInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          style={styles.paginationButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Add New Product Modal */}
      {isModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Add New Product</h2>
            <form style={styles.form}>
              <input
                style={styles.input}
                type="text"
                name="name"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={handleInputChange}
              />
              <input
                style={styles.input}
                type="text"
                name="category"
                placeholder="Category"
                value={newProduct.category}
                onChange={handleInputChange}
              />
              <input
                style={styles.input}
                type="number"
                name="price"
                placeholder="Price"
                value={newProduct.price}
                onChange={handleInputChange}
              />
              <input
                style={styles.input}
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={newProduct.quantity}
                onChange={handleInputChange}
              />
              <input
                style={styles.input}
                type="text"
                name="brand"
                placeholder="Brand"
                value={newProduct.brand}
                onChange={handleInputChange}
              />
              <input
                style={styles.input}
                type="number"
                name="rating"
                placeholder="Rating"
                value={newProduct.rating}
                onChange={handleInputChange}
              />
              <input
                style={styles.input}
                type="number"
                name="warranty"
                placeholder="Warranty (Years)"
                value={newProduct.warranty}
                onChange={handleInputChange}
              />
              <div style={styles.buttonGroup}>
                <button
                  type="button"
                  style={styles.saveButton}
                  onClick={handleAddProduct}
                >
                  Save
                </button>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={() => setIsModalOpen(false)}
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
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    fontSize: "2.5rem",
    textAlign: "center",
    color: "#333",
    marginBottom: "1rem",
  },
  addButton: {
    display: "block",
    margin: "1rem auto",
    padding: "0.8rem 1.5rem",
    fontSize: "1rem",
    color: "#ffffff",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
    padding: "1rem",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "1.5rem",
    textDecoration: "none",
    color: "inherit",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  cardTitle: {
    fontSize: "1.5rem",
    color: "#007BFF",
    marginBottom: "0.5rem",
  },
  cardDescription: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "0.5rem",
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
    backgroundColor: "#dc3545",
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
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1.5rem",
  },
  paginationButton: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "0.8rem 1.5rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "0 0.5rem",
  },
  paginationInfo: {
    fontSize: "1.2rem",
    color: "#333",
  },
};

export default ProductList;
