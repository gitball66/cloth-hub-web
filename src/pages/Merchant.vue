<template>
  <q-page class="page column q-pt-md">
    <div v-if="!loading">
      <div class="row justify-between">
        <p class="text-h4 title q-mt-md">Shop's Details</p>
        <div class="q-mt-md q-mr-lg">
          <q-btn
            class="q-mr-sm"
            color="orange-5"
            @click="addProductDialog = true"
            >Add Product</q-btn
          >
          <!-- <q-btn class="q-mr-sm" @click="getShopData()" color="orange-5"
          >My Products</q-btn
        > -->
          <!-- <q-btn class="q-mr-sm" color="orange-5">My shop</q-btn> -->
        </div>
      </div>
      <q-separator color="orange-4" />

      <div class="col-9 q-pa-md shop-description">
        <div class="row">
          <p style="font-weight: 500; color: #f7971e">Shop's name :</p>
          <p class="q-ml-sm">{{ shop.name ? shop.name : "Not found" }}</p>
        </div>
        <div class="row">
          <p style="font-weight: 500; color: #f7971e">Description :</p>
          <p class="q-ml-sm shopdesc">
            {{ shop.description ? shop.description : "Not found" }}
          </p>
        </div>
        <div class="row">
          <p style="font-weight: 500; color: #f7971e">Type:</p>
          <p v-for="(item, index) in shop.type" :key="index" class="q-ml-sm">
            {{ item ? item : "Not found" }}
          </p>
        </div>
        <div class="row">
          <p style="font-weight: 500; color: #f7971e">Rating:</p>
          <p class="q-ml-sm shopdesc">
            {{ shop.rating ? shop.rating : "Not found" }}
            <i class="fas fa-star"></i>
          </p>
        </div>
        <div class="column">
          <p style="font-weight: 500; color: #f7971e">Shop's Image:</p>
          <q-img
            class="q-mt-sm shop-image"
            src="https://i.pinimg.com/originals/dd/e2/0e/dde20e55a7442f69c94eb2442d8586f1.jpg"
          />
        </div>
        <div class="q-mt-md column">
          <p style="font-weight: 500; color: #f7971e">Shop's Banner Image :</p>
          <q-img
            class="q-mt-sm shop-image-banner"
            src="https://i.pinimg.com/originals/dd/e2/0e/dde20e55a7442f69c94eb2442d8586f1.jpg"
          />
        </div>
        <!-- <q-btn color="orange-5" standout label="Activate Merchant"></q-btn> -->
      </div>

      <div class="row justify-between">
        <p class="text-h4 title q-mt-md">Shop's Product</p>
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
    <div class="row justify-center" v-else>
      <q-spinner class="q-mt-lg" color="orange" size="4em" :thickness="8" />
    </div>
    <AddProductModal
      :addProductDialog="addProductDialog"
      @closeModal="addProductDialog = false"
    ></AddProductModal>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import AddProductModal from "../components/AddProductModal.vue";
import ProductCard from "../components/ProductCard.vue";
export default {
  components: { AddProductModal, ProductCard },
  data() {
    return {
      loading: false,
      addProductDialog: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      shop: (state) => state.auth.shop,
      shopProducts: (state) => state.auth.shopProducts,
    }),
  },
  methods: {
    getShopData() {
      this.$store.dispatch("getShopPopulars");
    },
  },
  async mounted() {
    this.loading = true;
    await this.$store.dispatch("getUserData", localStorage.getItem("uid"));
    await this.$store.dispatch("getShopDataBySid", this.user.sid);
    await this.$store.dispatch("getProductsByShopId", this.user.sid);
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
p {
  color: white;
}
.menu-card {
  width: 32vw;
}
.title {
  letter-spacing: 2px;
}
.shop-description {
  // margin-top: 50px;
  font-size: 18px;
  font-weight: 300;
  /* line-height: 15px; */
}
.shopdesc {
  word-wrap: break-word;
}
.shop-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
.shop-image-banner {
  height: 200px;
  object-fit: cover;
}
</style>