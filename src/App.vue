<template>
  <div id="app">
    <Header/>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search显示的，在登录、注册隐藏 -->
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Header from '@/components/Header/MyHeader.vue';
import Footer from '@/components/Footer/MyFooter.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
      // 通过Vuex发请求，获取数据，存储在仓库中
    this.$store.dispatch("categroyList");
  },
}
</script>