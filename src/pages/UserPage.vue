<template>
  <q-page class="page">
    <div class="q-pt-md">
      <div class="row justify-between">
        <p class="text-h4 q-mt-md">User's Profile</p>
        <q-btn
          class="q-mr-md"
          color="orange-4"
          flat
          @click="userSettingModal = true"
          ><i class="far fa-edit"></i
        ></q-btn>
      </div>

      <q-separator color="orange-4" />
      <div class="q-pa-md user-description">
        <p>Firstname : {{ user.firstname ? user.firstname : "Not found" }}</p>
        <p>Lastname : {{ user.lastname ? user.lastname : "Not found" }}</p>
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
export default {
  name: "UserPage",
  components: { UserSettingModal },
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
    this.$store.dispatch("getUserData", localStorage.getItem("uid"));
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
.user-description {
  line-height: 10px;
}
</style>
