<template>
  <q-page class="page column q-pt-md items-center">
    <div v-if="!loading">
      <div class="banner" v-for="item in popularShops" :key="item.shop.id">
        <ShopBanner :data="item"></ShopBanner>
      </div>
    </div>
    <div v-else>
      <q-spinner class="q-mt-lg" color="orange" size="4em" :thickness="8" />
    </div>
  </q-page>
</template>

<script>
import ShopBanner from "../components/ShopBanner.vue";
import { mapState } from "vuex";
export default {
  name: "PageIndex",
  components: { ShopBanner },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState({
      popularShops: (state) => state.auth.popularShops,
    }),
  },
  async beforeMount() {
    this.loading = true;
    await this.$store.dispatch("getShopPopulars");
    console.log("this.popularShops", this.popularShops);
    this.loading = false;
  },
};
</script>

<style scoped>
p {
  color: white;
}
.banner {
  padding-right: 40px;
}
</style>
