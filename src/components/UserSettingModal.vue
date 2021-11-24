<template>
  <q-dialog persistent :value="openModal">
    <q-card class="card text-white">
      <q-card-section>
        <div class="text-h6">User Setting</div>
      </q-card-section>

      <q-card-section class="card-section">
        <q-input
          color="orange-4"
          standout
          v-model="firstname"
          label="Firstname"
          error-message=""
          :error="false"
        >
        </q-input>
        <q-input
          color="orange-4"
          standout
          v-model="lastname"
          label="Lastname"
          error-message=""
          :error="false"
        >
        </q-input>
        <q-input
          color="orange-4"
          standout
          v-model="address1"
          label="Address 1"
          error-message=""
          :error="false"
        >
        </q-input>
        <q-input
          color="orange-4"
          standout
          v-model="address2"
          label="Address 2"
          error-message=""
          :error="false"
        >
        </q-input>
        <div class="row justify-center">
          <q-btn color="orange-4" standout label="Activate Merchant"></q-btn>
        </div>
        <!-- <q-input
          color="orange-4"
          standout
          v-model="email"
          label="E-mail"
          error-message="The email is invalid."
          :error="isEmail"
        >
        </q-input>
        <q-input
          color="orange-4"
          standout
          v-model="password"
          type="password"
          label="Password"
          error-message="Please use minimum 6 characters."
          :error="isValid"
        >
        </q-input> -->
        <q-spinner class="spinner" v-if="isLoading" size="3em" :thickness="7" />
      </q-card-section>

      <q-card-actions class="card-section" align="right">
        <q-btn class="button" @click="login()" flat label="Save" />
        <q-btn
          @click="closeModal()"
          class="button"
          flat
          label="Cancel"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "UserSettingModal",
  props: ["openModal"],
  data() {
    return {
      email: "",
      firstname: "",
      lastname: "",
      address1: "",
      address2: "",
      password: "",
      registerCode: "",
      isLoading: false,
      alert: false,
    };
  },
  computed: {
    isValid() {
      if (this.password === "") {
        return false;
      } else {
        return this.password.length < 5;
      }
    },
    isEmail() {
      var n = this.email.indexOf("@");
      if ((this.email !== "") & (n === -1)) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    async login() {
      this.isLoading = true;
      try {
        if (this.password != "" && this.email != "") {
          let res = await this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
          console.log("res ", res);
          if (!res) {
            this.alert = true;
            this.registerCode = "Login Failed";
          }
        } else {
          this.alert = true;
          this.registerCode = "Please fill out all information.";
        }
      } catch {
        this.alert = true;
        this.registerCode = "Login Failed";
      }
      this.password = "";
      this.email = "";
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #f7971e;
  width: 30vw;
}

.alert-card {
  background-color: #f7971e;
  width: 25vw;
}

.card-section {
  background-color: white;
}
.button {
  background-color: white;
  color: #f7971e;
}
.register-code {
  text-align: center;
  font-size: 16px;
}
.spinner {
  margin-left: 12vw;
  color: #f7971e;
}

@media only screen and (max-width: 1400px) {
  .card {
    background-color: #f7971e;
    width: 80vw;
  }
  .alert-card {
    background-color: #f7971e;
    width: 75vw;
  }
  .spinner {
    margin-left: 30vw;
    color: #f7971e;
  }
}
</style>