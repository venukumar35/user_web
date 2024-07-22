import { useEffect } from "react";
import Card from "../../../components/card";
import productTypeStroe from "../commonStore.tsx/productTypeStore";
import { Loader } from "@mantine/core";

export default function Top() {
  const { productTypeData, productDetails, productData, isLoading } =
    productTypeStroe();

  useEffect(() => {
    productDetails();
  }, []);
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loader size={50} />
        </div>
      ) : (
        productData && (
          <Card product={productTypeData ?? []} productDetails={productData} />
        )
      )}
    </div>
  );
}
