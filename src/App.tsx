import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Shop from "./pages/Shop";
import { useEffect, useState } from "react";
import { TProduct } from "./interfaces/TProducts";
import Footer from "./components/Footer/Footer";
import ProductDetail from "./pages/ProductDetail";
import {
  createProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "./services/product";
import Dashboard from "./pages/admin/Dashboard";
import ProductAdd from "./pages/admin/ProductAdd";
import ProductEdit from "./pages/admin/ProductEdit";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<TProduct[]>([]);
  useEffect(() => {
    (async () => {
      const data = await getProducts();
      setProducts(data);
    })();
  }, []);

  const handleAddProduct = (product: TProduct) => {
    (async () => {
      const newProduct = await createProduct(product);
      setProducts([...products, newProduct]);
      navigate("/admin");
    })();
  };

  const handleEditProduct = (product: TProduct) => {
    (async () => {
      const p = await updateProduct(product);
      setProducts(products.map((i) => (i.id === p.id ? p : i)));
      navigate("/admin");
    })();
  };

  const handleDeleteProduct = (id: number | undefined) => {
    (async () => {
      const isConfirm = window.confirm("Are you sure?");
      if (isConfirm) {
        await removeProduct(`${id}`);
        setProducts(products.filter((i) => i.id !== id));
      }
    })();
  };
  return (
    <>
      <Header />
      <Routes>
        {/* client */}
        <Route path="/">
          <Route index element={<Shop products={products} />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Route>

        {/* admin */}
        <Route path="/admin">
          <Route
            path="/admin"
            element={
              <Dashboard products={products} onDel={handleDeleteProduct} />
            }
          />
          <Route
            path="/admin/add"
            element={<ProductAdd onAdd={handleAddProduct} />}
          />
          <Route
            path="/admin/edit/:id"
            element={<ProductEdit onEdit={handleEditProduct} />}
          />
        </Route>

        {/* 404 */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
