import Card from "../../../components/card";
import productTypeStroe from "../commonStore.tsx/productTypeStore";

export default function FootWear() {
  const { productTypeData } = productTypeStroe();

  return (
    <div>
      <Card product={productTypeData ?? []} />
    </div>
  );
}
