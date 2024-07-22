import { Profile } from "iconsax-react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import productStore from "../pages/main/mens/mensStore";
import SearchInput from "./search";
import productTypeStroe from "../pages/main/commonStore.tsx/productTypeStore";

export default function NavBarTwo() {
  const { productData, getProduct } = productStore();
  const { setProductId, productType } = productTypeStroe();
  const onClikId = async (id: number) => {
    setProductId(id);
    productType();
  };
  console.log("data of the Category", productData?.data);

  useEffect(() => {
    getProduct();
    productType();
  }, []);

  return (
    <div className="flex flex-col fixed z-10 w-full lg:h-20 bg-slate-300">
      <div className="text-2xl font-bold flex flex-col w-full lg:flex-row lg:p-3 lg:justify-between">
        <div className="flex flex-row justify-between p-2 lg:p-0 md:p-4 shadow-sm lg:shadow-none ">
          <div className="text-lg sm:text-2xl lg:text-2xl lg:p-2 max-sm:text-sm">
            Tags
          </div>
          <div className="lg:hidden flex flex-row space-x-8 items-center">
            <div className="w-36">
              <SearchInput />
            </div>
            <div className="p-1 rounded-full bg-white">
              <Profile size="23" color="#555555" variant="TwoTone" />
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between max-sm:text-xs max-sm:space-x-2.5 max-sm:pt-2.5 max-sm:font-light p-2 relative sm:justify-start sm:space-x-5 sm:p-3 shadow-sm overflow-x-auto max-w-full no-scrollbar">
          {productData?.data?.map((ele, index) => (
            <NavLink
              to={`/${ele.name.replace(/\s+/g, "")}`}
              key={index}
              className={({ isActive }) =>
                isActive ? "border-b-4 border-b-red-950 text-red-950" : ""
              }
            >
              <div
                className="relative text-xs text-center max-sm:space-x-2 lg:text-xl lg:font-sans lg:font-extralight sm:left-3 lg:left-0 hover:border-b-4 hover:border-b-red-950 hover:text-red-950 "
                onClick={() => {
                  onClikId(ele.id);
                }}
              >
                {ele.name}
              </div>
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:block relative right-3">
          <div className="flex flex-row space-x-8 lg:p-2">
            <div>
              <SearchInput />
            </div>
            <div className="p-1 rounded-full bg-white">
              <Profile size="23" color="#555555" variant="TwoTone" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

