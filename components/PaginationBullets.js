import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";

SwiperCore.use([Pagination]);

export default function PaginationBullets() {
  return (
    <div>
      <Swiper pagination={true}>
        <SwiperSlide>
          <div>1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div>2</div>
        </SwiperSlide>
        <SwiperSlide>
          <div>3</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
