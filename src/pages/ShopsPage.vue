<template>
  <q-page class="page">
    <div class="row justify-center" v-if="loading">
      <q-spinner class="q-mt-xl spinner" size="4em" :thickness="7" />
    </div>
    <div class="page-banner row justify-center" v-else>
      <q-img
        class="banner"
        src="https://i.pinimg.com/originals/dd/e2/0e/dde20e55a7442f69c94eb2442d8586f1.jpg"
      />
      <p class="shopName">{{ shop ? shop.name : "Loading" }}</p>
    </div>
    <div>
      <div class="row justify-between">
        <div class="row">
          <p style="letter-spacing: 2px" class="text-h4 q-mt-md">Promotion</p>
        </div>
      </div>
      <q-separator color="orange-4" />
      <div class="q-mt-md row">
        <div v-for="pro in promodata" :key="pro.id">
          <PromotionCard :data="pro"></PromotionCard>
        </div>
      </div>
    </div>
    <div>
      <div class="row justify-between">
        <div class="row">
          <p style="letter-spacing: 2px" class="text-h4 q-mt-md">
            Hot Products
          </p>
        </div>
      </div>
      <q-separator color="orange-4" />
      <div
        class="
          q-mt-md q-pb-xl
          row
          justify-start
          items-center
          q-gutter-md
          no-wrap
        "
      >
        <div v-for="item in shopProducts" :key="item.id">
          <ProductCard :data="item"></ProductCard>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import PromotionCard from "../components/PromotionCard.vue";
import ProductCard from "../components/ProductCard.vue";
export default {
  name: "ShopsPage",
  components: { PromotionCard, ProductCard },
  data() {
    return {
      loading: false,
      userSettingModal: false,
      promodata: [
        { id: 1, price: 300, cloths: 3, range: "0-150", exp: "1 Month" },
        { id: 2, price: 1000, cloths: 7, range: "0-200", exp: "2 Month" },
      ],
    };
  },
  computed: {
    ...mapState({
      shop: (state) => state.auth.shop,
      shopProducts: (state) => state.auth.shopProducts,
    }),
  },
  async mounted() {
    let sid = this.$route.query.sid;
    this.loading = true;
    await this.$store.dispatch("getShopDataBySid", sid);
    await this.$store.dispatch("getProductsByShopId", sid);
    // console.log("this.shopProducts", this.shopProducts);
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
p {
  color: white;
}
.banner {
  object-fit: cover;
  height: 25vh;
}
.spinner {
  color: #f7971e;
}
.page-banner {
  position: relative;
}
.shopName {
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  font-size: 64px;
  top: 50px;
  position: absolute;
  letter-spacing: 5px;
}
</style>