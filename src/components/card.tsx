import { Rating, ScrollArea } from "@mantine/core";
import { TypographyStylesProvider, Text } from "@mantine/core";
import { Sort, ShoppingBag, Like } from "iconsax-react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { CiFilter } from "react-icons/ci";
import { z } from "zod";
import { ResponseOfProduct } from "../responseType.tsx/productResponse";
import { imageUrl } from "../network/api";
const productTypeResponse = z.object({
  id: z.number(),
  name: z.string(),
  itemsName: z.string(),
  itemsId: z.number(),
});

export type ProductTypeResponseSchema = z.infer<typeof productTypeResponse>;

const Card = ({
  product,
  productDetails,
}: {
  product: ProductTypeResponseSchema[];
  productDetails: ResponseOfProduct;
}) => {
  return (
    <div className="flex flex-col relative top-20 sm:top-24 md:top-28 lg:top-24 w-full">
      <div className="snap-x flex flex-row space-x-4 p-2.5">
        <ScrollArea
          h={25}
          style={{ overflowX: "auto", whiteSpace: "nowrap" }}
          type="never"
        >
          {product &&
            product?.map((e: ProductTypeResponseSchema, index: number) => (
              <div
                key={index}
                className="inline-block ml-2 mt-1 md:mt-0 border-b-2 border-r-2 border-t-2 border-l-2 rounded-xl border-gray-200 xl:justify-center"
              >
                <div className="ml-4 mr-4 text-xs font-light lg:text-sm">
                  {e.itemsName}
                </div>
              </div>
            ))}
        </ScrollArea>
      </div>
      <div className="flex flex-row w-full">
        <div className="lg:w-1/5 flex flex-col max-sm:hidden sm:w-1/6 h-full relative top-1.5 p-2 space-y-4 justify-center lg:justify-start">
          <div className="border-2 lg:p-1 sm:text-xs lg:text-xl">
            Total count- 200000
          </div>
          <div className="border-2 lg:p-1">Filters</div>
        </div>

        <div className="flex flex-wrap relative top-3 max-sm:w-full sm:w-3/4 sm:space-x-2">
          {productDetails.data.map((ele, index) => (
            <div
              key={index}
              className="max-sm:w-1/2 sm:w-1/3 lg:w-1/3 xl:w-1/4 2xl:w-1/5 border-2"
            >
              <div className="">
                {ele.images.map((img, index) => (
                  <div>
                    <img
                      src={imageUrl + img.imageUrl}
                      alt={`image-${index}`}
                      className="object-contain w-full h-40"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 space-y-1">
                <div
                  key={index}
                  className={`flex space-x-2 overflow-x-auto no-scrollbar p-1 ${
                    ele.colors.length < 5 ? "justify-center" : ""
                  } ${ele.colors.length < 10 ? "md:justify-center" : ""} ${
                    ele.colors.length < 15 ? "lg:justify-center" : ""
                  }`}
                >
                  {ele.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="p-1.5 rounded-full hover-lighten"
                      style={{ backgroundColor: color.colors }}
                    ></div>
                  ))}
                </div>
                <div className="flex flex-col -space-y-0.5">
                  <div className="text-center max-sm:text-sm font-bold p-1">
                    {ele.brandName}
                  </div>
                  <div>
                    <Text
                      lineClamp={1}
                      component="div"
                      className="max-sm:text-sm ml-1"
                    >
                      <TypographyStylesProvider>
                        <p>{ele.productDescription}</p>
                      </TypographyStylesProvider>
                    </Text>
                  </div>
                  <div className="text-center  max-sm:text-sm">
                    {ele.materail}
                  </div>
                  <div className="flex justify-center p-1">
                    <Rating value={+5} size={12} />
                  </div>
                  <div className="flex flex-col text-sm space-x-0.5 max-sm:text-xs p-1">
                    <div className="flex flex-row">
                      <div className="max-sm:text-xs flex flex-row">
                        Offer:{" "}
                        <div className="max-sm:-mt-0.5">
                          <LiaRupeeSignSolid size={12} className="mt-1.5" />
                        </div>
                      </div>
                      <div className="max-sm:text-xs mt-0.5 sm:text-lg sm:-mt-1 sm:font-bold">
                        {ele.offerPrice}
                      </div>
                    </div>
                    <div className="max-sm:text-xs flex flex-row space-x-0.5 pb-3 max-sm:flex-wrap">
                      <div className="flex flex-row">M.R.P:{ele.price}</div>
                      <div className="max-sm:text-xs">
                        ({ele.offerPercntage})
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className=" flex flex-row fixed bg-slate-100 bottom-0 w-full p-2 justify-between sm:hidden md:hidden lg:hidden xl:hidden shadow-inner">
          <div>
            <div className="ml-1.5">
              <CiFilter />
            </div>
            <div className="active:text-red-950">Filter</div>
          </div>
          <div>
            <div className="ml-1.5">
              <Sort size="18" color="#697689" />
            </div>
            <div>Sort</div>
          </div>
          <div>
            <div className="ml-1.5">
              <ShoppingBag size="18" color="#697689" />
            </div>
            <div className="text-sm"> Cart</div>
          </div>
          <div>
            <div className="ml-2.5">
              <Like size="18" color="#697689" />
            </div>
            <div className="text-sm"> Wishlist </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
