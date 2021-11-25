<template>
  <q-layout view="hHh LpR fFf">
    <q-header bordered class="page text-white header-border">
      <q-toolbar>
        <!-- <q-btn dense flat round icon="menu" @click="left = !left" /> -->

        <q-toolbar-title>
          <img
            @click="backHome()"
            v-if="!$q.platform.is.mobile"
            class="logo"
            src="~assets/ClothHubLogo.png"
          />
          <img
            v-else
            @click="backHome()"
            class="logo-mobile"
            src="~assets/ClothHubLogo.png"
          />
        </q-toolbar-title>
        <q-avatar v-if="isLogined && !$q.platform.is.mobile">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>

        <div v-if="!$q.platform.is.mobile">
          <q-btn v-if="isLogined" @click="navigateUserPage()">{{
            loginEmail
          }}</q-btn>
          <q-btn v-if="isLogined && user.isMerchant" @click="navigateMerchant()"
            >Merchant</q-btn
          >
          <q-btn v-if="isLogined" @click="logout()">Logout</q-btn>
          <q-btn v-if="!isLogined" @click="loginModal = true">Login</q-btn>
          <q-btn v-if="!isLogined" @click="registerModal = true"
            >Register</q-btn
          >
          <q-btn><i class="fas fa-shopping-cart fa-lg"></i></q-btn>
        </div>
        <div v-else>
          <q-btn><i class="fas fa-shopping-cart fa-lg"></i></q-btn>
          <q-btn @click="rightMenu = !rightMenu"
            ><i class="fas fa-bars fa-lg"></i
          ></q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="!$q.platform.is.mobile"
      content-class="bg-black text-white"
      show-if-above
      side="left"
    >
      <div class="q-mt-lg row">
        <p class="main-btn">Popular Shop</p>
        <p class="main-btn">Children Cloth</p>
        <p class="main-btn">Men Cloth</p>
        <p class="main-btn">Women Cloth</p>
        <p class="main-btn">Shoes</p>
        <p class="main-btn">Watches</p>
        <p class="main-btn">Dressing</p>
        <p class="main-btn">Swimwear</p>
      </div>
    </q-drawer>

    <!-- MOBILE -->

    <q-drawer
      v-else
      :value="rightMenu"
      content-class="bg-black text-white"
      show-if-above
      side="right"
      :width="250"
    >
      <div class="q-ml-md row q-mt-sm q-mb-sm">
        <q-avatar v-if="isLogined">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        <p class="q-mt-md q-ml-sm">{{ loginEmail }}</p>
      </div>
      <q-separator v-if="isLogined" color="orange" inset />
      <div>
        <p class="main-btn">Popular Shop</p>
        <p class="main-btn">Children Cloth</p>
        <p class="main-btn">Men Cloth</p>
        <p class="main-btn">Women Cloth</p>
        <p class="main-btn">Shoes</p>
        <p class="main-btn">Watches</p>
        <p class="main-btn">Dressing</p>
        <p class="main-btn">Swimwear</p>
      </div>
      <q-separator color="orange" inset />
      <div>
        <p v-if="!isLogined" @click="loginModal = true" class="main-btn">
          Login
        </p>
        <p v-if="!isLogined" @click="registerModal = true" class="main-btn">
          Register
        </p>
        <p v-if="isLogined" @click="logout()" class="main-btn">Logout</p>
      </div>
      <q-separator color="orange" inset />
      <div class="q-mt-lg row">
        <p @click="rightMenu = !rightMenu" class="back-btn">
          <i class="fas fa-chevron-circle-right"></i>
        </p>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <RegisterModal
      @closeModal="registerModal = false"
      :openModal="registerModal"
    ></RegisterModal>
    <LoginModal
      @closeModal="loginModal = false"
      :openModal="loginModal"
    ></LoginModal>
  </q-layout>
</template>

<script>
import { Platform } from "quasar";
import RegisterModal from "../components/RegisterModal";
import LoginModal from "../components/LoginModal";
import UserSettingModal from "../components/UserSettingModal";
import { mapState } from "vuex";
export default {
  name: "MainLayout",
  components: { Platform, RegisterModal, LoginModal, UserSettingModal },
  data() {
    return {
      left: false,
      registerModal: false,
      loginModal: false,
      userSettingModal: false,
      rightMenu: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
    isLogined() {
      if (localStorage.getItem("email") === null) {
        return false;
      } else {
        return true;
      }
    },
    loginEmail() {
      if (localStorage.getItem("email") === null) {
        return "";
      } else {
        return localStorage.getItem("email");
      }
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      window.location.replace(this.$route.path);
    },
    backHome() {
      window.location.replace("/");
    },
    navigateMerchant() {
      window.location.replace("/merchant");
    },
    navigateUserPage() {
      window.location.replace("/userprofile");
    },
  },
  async mounted() {
    let email = localStorage.getItem("email");
    let uid = localStorage.getItem("uid");
    await this.$store.dispatch("getUserData", localStorage.getItem("uid"));
    // console.log("USER >> " + email + " : " + uid);
  },
};
</script>

<style scoped>
.page {
  background-color: black;
}

.header-border {
  border-bottom: 3px solid #424242;
}
.logo-mobile {
  width: 50vw;
  cursor: pointer;
}

.logo {
  width: 250px;
  cursor: pointer;
}
.drawer {
  background-color: black;
}
.main-btn {
  letter-spacing: 3px;
  font-size: 16px;
  width: 200px;
  padding: 10px 0px 10px 30px;
  margin-bottom: 0px;
}

.back-btn {
  padding: 10px 0px 10px 30px;
  font-size: 24px;
  margin-bottom: 0px;
}
.main-btn:hover {
  background-color: #303030;
  color: white;
  letter-spacing: 3px;
  font-size: 16px;
  width: 200px;
  padding: 10px 0px 10px 30px;
  margin-bottom: 0px;
  cursor: pointer;
}
</style>
