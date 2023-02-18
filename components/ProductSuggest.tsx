import { useLayoutEffect, useState } from "react";
import { Product } from "../types";
import axios from "axios";
import ProductLayout from "./ProductLayout";

interface ProductSuggestProps {
  productId: number;
}

const ProductSuggest = ({ productId }: ProductSuggestProps) => {
  const [productData, setProductData] = useState<Product[]>([]);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        if (productId) {
          const server_host = "http://localhost:8000/api";
          const res = await axios.get(
            `${server_host}/products-by-cate/${productId}`
          );
          const newProductData = res.data.data;
          setProductData(newProductData);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [productId]);
  return <ProductLayout productsData={productData} />;
};

export default ProductSuggest;
