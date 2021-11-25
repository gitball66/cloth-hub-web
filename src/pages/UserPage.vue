<template>
  <q-page class="page">
    <div class="q-pt-md">
      <div class="row justify-between">
        <div class="row">
          <p class="text-h4 title q-mt-md">User's Profile</p>
          <q-spinner
            v-if="loading"
            class="q-mt-lg q-ml-md"
            color="orange"
            size="2em"
          />
        </div>
        <q-btn
          class="q-mr-md"
          color="orange-4"
          flat
          @click="userSettingModal = true"
          ><i class="far fa-edit"></i
        ></q-btn>
      </div>

      <q-separator color="orange-4" />
      <div class="row">
        <div class="col-3">
          <q-img
            class="q-mt-lg avatar"
            src="https://cdn.quasar.dev/img/avatar.png"
          />
        </div>
        <div class="col-9 q-pa-md user-description">
          <p>Firstname : {{ user.firstname ? user.firstname : "Not found" }}</p>
          <p>Lastname : {{ user.lastname ? user.lastname : "Not found" }}</p>
          <p>E-mail : {{ user.email ? user.email : "Not found" }}</p>
          <p>Address : {{ user.email ? user.email : "Not found" }}</p>
          <q-btn color="orange-5" standout label="Activate Merchant"></q-btn>
        </div>
      </div>
    </div>

    <div class="q-pt-md">
      <div class="row justify-between">
        <p class="text-h4 title q-mt-md">Subscription</p>
      </div>

      <q-separator color="orange-4" />
      <div class="row q-mt-md">
        <ShopsCard v-for="i in 7" :key="i"></ShopsCard>
      </div>
    </div>

    <UserSettingModal
      @closeModal="userSettingModal = false"
      :openModal="userSettingModal"
    ></UserSettingModal>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import UserSettingModal from "../components/UserSettingModal.vue";
import ShopsCard from "../components/ShopsCard.vue";
export default {
  name: "UserPage",
  components: { UserSettingModal, ShopsCard },
  data() {
    return {
      loading: false,
      userSettingModal: false,
    };
  },
  computed: {
    ...mapState({
      popularShops: (state) => state.auth.popularShops,
      user: (state) => state.auth.user,
    }),
  },
  async mounted() {
    this.loading = true;
    await this.$store.dispatch("getUserData", localStorage.getItem("uid"));
    this.loading = false;
  },
};
</script>

<style scoped>
p {
  color: white;
}
.title {
  letter-spacing: 2px;
}
.banner {
  padding-right: 40px;
}
.user-description {
  margin-top: 50px;
  font-size: 18px;
  font-weight: 300;
  /* line-height: 15px; */
}
.fav-card {
  background-color: #f7971e;
  width: 18%;
  margin-right: 2%;
  margin-bottom: 2%;
}
.avatar {
  border-radius: 125px;
  width: 250px;
}
</style>
