<template>
  <div class="q-mb-lg banner-card row">
    <div class="col-9 carousel-card">
      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        control-color="orange-4"
        padding
        arrows
        class="bg-black carousel"
      >
        <q-carousel-slide
          :name="1"
          style="padding-left: 30px"
          class="column no-wrap"
        >
          <div
            v-if="data.products.length > 0"
            class="row justify-start items-center q-gutter-md no-wrap"
          >
            <div v-for="item in data.products" :key="item.id">
              <ProductCard :data="item"></ProductCard>
            </div>
          </div>
          <div v-else class="row justify-center q-mt-lg">
            <h5 class="text-white">Products Not Available</h5>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <!-- <q-separator class="q-ml-md" vertical size="3px" color="orange-4" inset /> -->
    <div class="col-3 column justify-between q-pa-lg shop-detail">
      <div>
        <p class="shop-name">{{ data.shops.name }}</p>
        <p class="description">{{ data.shops.description }}</p>
      </div>
      <q-btn class="btn q-mb-md">Visit Shop</q-btn>
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
};
</script>

<style lang="scss" scoped>
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
</style>