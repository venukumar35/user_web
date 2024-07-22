import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";

export default function HomePage() {
  const home = [
    {
      title: "OFFERS",
      images: [
        { im: "../../../images/boys1.jpg" },
        { im: "../../../images/theboys2.jpg" },
        { im: "../../../images/theboys4.jpg" },
        { im: "../../../images/theboys5.jpg" },
        { im: "../../../images/theboys6.jpg" },
        { im: "../../../images/theboys7.jpg" },
        { im: "../../../images/theboys8.jpg" },
        { im: "../../../images/theboys9.jpg" },
        { im: "../../../images/theboys10.jpg" },
        { im: "../../../images/theboys12.jpg" },
      ],
      delay: "2000",
    },
    {
      title: "SEASONS",
      images: [
        { im: "../../../images/boys1.jpg" },
        { im: "../../../images/theboys2.jpg" },
        { im: "../../../images/theboys4.jpg" },
        { im: "../../../images/theboys5.jpg" },
        { im: "../../../images/theboys6.jpg" },
        { im: "../../../images/theboys7.jpg" },
        { im: "../../../images/theboys8.jpg" },
        { im: "../../../images/theboys9.jpg" },
        { im: "../../../images/theboys10.jpg" },
        { im: "../../../images/theboys12.jpg" },
      ],
      delay: "4000",
    },
    {
      title: "TRENDS",
      images: [
        { im: "../../../images/boys1.jpg" },
        { im: "../../../images/theboys2.jpg" },
        { im: "../../../images/theboys4.jpg" },
        { im: "../../../images/theboys5.jpg" },
        { im: "../../../images/theboys6.jpg" },
        { im: "../../../images/theboys7.jpg" },
        { im: "../../../images/theboys8.jpg" },
        { im: "../../../images/theboys9.jpg" },
        { im: "../../../images/theboys10.jpg" },
        { im: "../../../images/theboys12.jpg" },
      ],
      delay: "6000",
    },
  ];
  const autoplay = useRef(home.map(() => Autoplay({ delay: 2000 })));

  return (
    <div className="flex flex-col space-y-5">
      {home.map((e, index) => (
        <div className="flex flex-col">
          <div
            className="flex justify-center text-xl p-5 font-black"
            key={index}
          >
            {e.title}
          </div>
          <div className="">
            <Carousel
              withIndicators={true}
              height={200}
              slideSize={{ base: "100%", sm: "40%", md: "33.333333%" }}
              plugins={[autoplay.current[index]]}
              onMouseEnter={() => autoplay.current[index].stop()}
              onMouseLeave={() => autoplay.current[index].reset()}
              align="start"
              loop
              className="carousel-indicators"
            >
              {e.images.map((ele, index) => (
                <Carousel.Slide key={index}>
                  <img src={ele.im} className="object-contain w-full h-full" />
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
        </div>
      ))}
    </div>
  );
}
