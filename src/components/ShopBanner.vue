<template>
  <div class="q-mb-lg banner-card row">
    <div
      v-if="data"
      class="col-9 row justify-start items-center q-gutter-md no-wrap"
    >
      <div v-for="item in data.products" :key="item.id">
        <ProductCard :data="item"></ProductCard>
      </div>
    </div>
    <!-- <q-separator class="q-ml-md" vertical size="3px" color="orange-4" inset /> -->
    <div class="col-3 column justify-between q-pa-lg shop-detail">
      <div>
        <p class="shop-name">{{ data ? data.shop.name : "" }}</p>
        <p class="description">{{ data ? data.shop.description : "" }}</p>
      </div>
      <q-btn @click="navigateShop(data.shop.id)" class="btn q-mb-md"
        >Visit Shop</q-btn
      >
    </div>
  </div>
</template>

<script>
import ProductCard from "../components/ProductCard.vue";
export default {
  props: ["data"],
  components: { ProductCard },
  data() {
    return {
      slide: 1,
    };
  },
  methods: {
    navigateShop(sid) {
      this.$router.push(`/shop?sid=${sid}`);
    },
    async getProductsInBanner(sid) {
      return this.$store.dispatch("getPopularShopProducts", sid);
    },
  },
  mounted() {
    console.log("banner", this.data);
  },
};
</script>

<style lang="scss" scoped>
p {
  color: white;
}
.banner-card {
  background-color: #000;
  border-bottom: 3px solid #424242;
}
.carousel {
  min-height: 300px;
  height: 36vh;
  width: 60vw;
}
.carousel-card {
  // width: 60vw;
  padding-top: 20px;
  padding-left: 0px;
}
.shop-name {
  font-size: 2rem;
  font-weight: bold;
  color: #f7971e;
}
.btn {
  background-color: #f7971e;
}
.description {
  font-size: 1.3em;
  font-weight: 400;
  line-height: 25px;
  color: white;
}
.shop-detail {
  z-index: 10;
}
.img {
  width: 13vw;
  //   max-width: 20px;
  min-width: 100px;
  border-radius: 5px 5px 0px 0px;
}
</style>