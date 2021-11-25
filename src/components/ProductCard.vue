<template>
  <div class="col-3 full-height product-card-1">
    <q-img class="img" :src="data.images[0]" />
    <div class="q-px-xs">
      <p class="product-name-1">
        {{ data.name }}
      </p>
      <div class="row justify-between">
        <p class="product-price-1">฿{{ data.price }}</p>
        <p class="sale-quantity-1">{{ data.sold }} Sold</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["data"],
  computed: {
    ...mapState({
      popularShops: (state) => state.auth.popularShops,
    }),
  },
  mounted() {
    // console.log("dataaaa", this.data);
  },
};
</script>
<style lang="scss" scoped>
.img {
  width: 13vw;
  //   max-width: 20px;
  min-width: 100px;
  border-radius: 5px 5px 0px 0px;
}
</style>