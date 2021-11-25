<template>
  <div>
    <q-card class="fav-card">
      <q-card-section>
        <p class="title">Promotion Name</p>
        <div class="row">
          <div class="column col-3 items-center">
            <i class="fas fa-coins icon"></i>
            <p class="q-mt-md pro-desc">฿ {{ data.price }}</p>
            <q-tooltip
              transition-show="flip-right"
              transition-hide="flip-left"
              anchor="bottom middle"
              self="bottom middle"
            >
              Subscribe Price
            </q-tooltip>
          </div>
          <div class="column col-3 items-center">
            <i class="fas fa-tshirt icon"></i>
            <p class="q-mt-md pro-desc">{{ data.cloths }}</p>
            <q-tooltip
              transition-show="flip-right"
              transition-hide="flip-left"
              anchor="bottom middle"
              self="bottom middle"
            >
              Quantity
            </q-tooltip>
          </div>
          <div class="column col-3 items-center">
            <i class="fas fa-arrow-circle-down icon"></i>
            <p class="q-mt-md pro-desc">{{ data.range }}</p>
            <q-tooltip
              transition-show="flip-right"
              transition-hide="flip-left"
              anchor="bottom middle"
              self="bottom middle"
            >
              Price Range
            </q-tooltip>
          </div>
          <div class="column col-3 items-center">
            <i class="fas fa-clock icon"></i>
            <p class="q-mt-md pro-desc">{{ data.exp }}</p>
            <q-tooltip
              transition-show="flip-right"
              transition-hide="flip-left"
              anchor="bottom middle"
              self="bottom middle"
            >
              Expiry Date
            </q-tooltip>
          </div>
        </div>
        <!-- <div class="row">
          <p class="shop-desc-title">EXP</p>
          <p class="shop-desc">: 30/10/2022</p>
        </div> -->
      </q-card-section>

      <q-card-actions class="row justify-center">
        <q-btn flat class="btn">Subscribe</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    navigateShop() {
      this.$router.push(`/shop?sid=${this.data.shops.id}`);
    },
  },
};
</script>

<style scoped>
.fav-card {
  width: 38vw;
  margin-right: 20px;
  margin-bottom: 20px;
  /* background-color: #f7971e; */
  background-color: #1b1b1b;
}
.image {
  margin-left: -16px;
  width: 250px;
}
.title {
  font-weight: 500;
  text-align: left;
  font-size: 21px;
  letter-spacing: 2px;
  color: #f7971e;
}
.shop-desc-title {
  color: #f7971e;
  letter-spacing: 1px;
  font-size: 16px;
  font-weight: 500;
  line-height: 10px;
}
.shop-desc {
  color: white;
  line-height: 10px;
  font-size: 16px;
}
.btn {
  color: #f7971e;
}
.icon {
  font-size: 36px;
  color: white;
}
.pro-desc {
  font-weight: 300;
  font-size: 24px;
  color: #f7971e;
}
</style>