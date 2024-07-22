/* eslint-disable @typescript-eslint/no-explicit-any */

export default function CarouselItem({ imgUrl }: any) {
  return (
    <div className="carousel-card">
      <img src={imgUrl}></img>
    </div>
  );
}
