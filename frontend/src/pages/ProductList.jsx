import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔍 SEARCH STATE
  const [search, setSearch] = useState("");

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  // 📦 FETCH PRODUCTS
  useEffect(() => {
    fetch(`${BASEURL}/api/products/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // 🔎 LISTEN TO SEARCH FROM NAVBAR
  useEffect(() => {
    const handler = (e) => setSearch(e.detail);
    window.addEventListener("product-search", handler);

    return () => window.removeEventListener("product-search", handler);
  }, []);

  if (loading) {
    return <div className="pt-24 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="pt-24 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-blue-50 pt-24">
      <h1 className="text-3xl font-bold text-center py-5 bg-white shadow-md">
        Product List
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products
          .filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        {products.length > 0 &&
          products.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
          ).length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No matching products found.
            </p>
          )}
      </div>
    </div>
  );
}

export default ProductList;
