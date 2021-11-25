<template>
  <div>
    <q-card class="fav-card">
      <q-card-section>
        <p class="title">Shop Name</p>
        <q-img
          class="image"
          src="https://i.pinimg.com/originals/dd/e2/0e/dde20e55a7442f69c94eb2442d8586f1.jpg"
        />
        <div class="row q-mt-md">
          <p class="shop-desc-title">Promotion :</p>
          <p class="shop-desc">300 Baht 3 Cloths</p>
        </div>
        <div class="row">
          <p class="shop-desc-title">EXP</p>
          <p class="shop-desc">: 30/10/2022</p>
        </div>
      </q-card-section>

      <q-card-actions class="row justify-center">
        <q-btn flat class="btn">Detials</q-btn>
        <q-btn flat class="btn">Shop</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  methods: {
    navigateShop() {
      this.$router.push(`/shop?sid=${this.data.shops.id}`);
    },
  },
};
</script>

<style scoped>
.fav-card {
  width: 250px;
  margin-right: 20px;
  margin-bottom: 20px;
  /* background-color: #f7971e; */
  background-color: #1b1b1b;
}
.image {
  margin-left: -16px;
  width: 250px;
  height: 250px;
  object-fit: cover;
}
.title {
  font-weight: 500;
  text-align: center;
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
</style>