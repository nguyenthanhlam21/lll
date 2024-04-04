import { useEffect, useState } from "react";
import { TProduct } from "../interfaces/TProducts";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/product";

const ProductDetail = () => {
  const [product, setProduct] = useState<TProduct | null>(null);
  const { id } = useParams();

  useEffect(() => {
    // IIFE: Immediately Invoked Function Expression
    (async () => {
      const data = await getProduct(+id!);
      setProduct(data);
    })();
  }, []);
  return (
    <div className="container">
      {product ? (
        <>
          <h1>{product.title}</h1>
          <img src={product.thumbnail} alt={product.title} />
          <p>{product.description}</p>
          <p>{product.price}</p>
        </>
      ) : (
        <div>San pham ko ton tai!...</div>
      )}
    </div>
  );
};

export default ProductDetail;
