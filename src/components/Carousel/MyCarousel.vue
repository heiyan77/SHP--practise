<template>
  <div class="swiper" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入Swiper
import { Swiper } from "swiper";

export default {
  name: "MyCarousel",
  props: ["list"],
  watch: {
    list: {
      immediate: true, // 立即监听
      handler() {
        // 如果hadler执行，代表bannerList已经获取到了数据
        // 但是，只有v-for执行完毕，才有结构，[watch无法保证v-for的执行]
        // nextTick:将回调推迟到下一个 DOM 更新周期之后执行。在更改了一些数据以等待 DOM 更新后立即使用它。
        this.$nextTick(() => {
          // 但执行这个回调的时候：保证服务器的数据回来了，v-for执行完毕了
          new Swiper(this.$refs.mySwiper, {
            loop: true, // 循环模式选项

            // // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // // // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>