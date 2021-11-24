<template>
  <q-page class="page">
    <div class="q-pt-md">
      <p class="text-h4 q-mt-md">User's Profile</p>
      <q-separator color="orange-4" />
      <p>Firstname : {{}}</p>
    </div>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "UserPage",
  components: {},
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
  async beforeMount() {},
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
