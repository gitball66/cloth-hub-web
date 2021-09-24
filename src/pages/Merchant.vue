<template>
  <q-page class="page column q-pt-md items-center">
    <div>
      <p class="title-1">Merchant Back Office</p>
    </div>
    <div class="row menu-card justify-between">
      <q-btn flat class="button-1" @click="addProductDialog = true"
        >Add Product</q-btn
      >
      <q-btn @click="getShopData()" flat class="button-1">My Products</q-btn>
      <q-btn flat class="button-1">My shop</q-btn>
    </div>
    <AddProductModal
      :addProductDialog="addProductDialog"
      @closeModal="addProductDialog = false"
    ></AddProductModal>
  </q-page>
</template>

<script>
import AddProductModal from "../components/AddProductModal.vue";
export default {
  components: { AddProductModal },
  data() {
    return {
      addProductDialog: false,
    };
  },
  methods: {
    getShopData() {
      // this.$store.dispatch("getShopPopulars");
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-card {
  width: 32vw;
}
</style>