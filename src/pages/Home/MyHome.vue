<template>
  <div>
      <!-- 是全局组件直接引用 -->
      <TypeNav/>
      <ListContainer/>
      <TodayRecommend/>
      <ProductRank/>
      <YouLike/>
      <ProductFloor v-for="floor in floorList" :key="floor.id" :list="floor"/>
      <ProductBrand/>
  </div>
</template>

<script>
// 引入其他组件
import ListContainer from '@/pages/Home/ListContainer/ListContainer.vue';
import TodayRecommend from '@/pages/Home/TodayRecommend/TodayRecommend.vue';
import ProductRank from '@/pages/Home/ProductRank/ProductRank.vue';
import YouLike from '@/pages/Home/YouLike/YouLike.vue';
import ProductFloor from '@/pages/Home/ProductFloor/ProductFloor.vue';
import ProductBrand from '@/pages/Home/ProductBrand/ProductBrand.vue';
import { mapState } from "vuex";

export default {
  name:"MyHome",
  components:{
    ListContainer,
    TodayRecommend,
    ProductRank,
    YouLike,
    ProductFloor,
    ProductBrand
  },
  mounted(){
    this.$store.dispatch("getFloorList");
  },
  computed:{
    ...mapState({
      floorList:(state) =>state.home.floorList,
    })
  }
}
</script>

<style>

</style>