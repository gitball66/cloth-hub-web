<template>
  <div>
    <q-dialog persistent :value="openModal">
      <q-card class="card text-white">
        <q-card-section>
          <div class="text-h6">Login</div>
        </q-card-section>

        <q-card-section class="card-section">
          <q-input
            color="orange-4"
            standout
            v-model="email"
            label="E-mail"
            error-message="The email is invalid."
            :error="isEmail"
          >
            <template v-slot:prepend>
              <i class="fas fa-envelope"></i>
            </template>
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
            <template v-slot:prepend>
              <i class="fas fa-key"></i>
            </template>
          </q-input>
          <q-spinner
            class="spinner"
            v-if="isLoading"
            size="3em"
            :thickness="7"
          />
        </q-card-section>

        <q-card-actions class="card-section" align="right">
          <q-btn class="button" @click="login()" flat label="Login" />
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
    <q-dialog persistent :value="alert">
      <q-card class="alert-card text-white">
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>
        <q-card-section class="card-section">
          <p class="q-mt-xl register-code text-black">{{ registerCode }}</p>
        </q-card-section>
        <q-card-actions class="card-section" align="right">
          <q-btn
            @click="
              alert = false;
              registerCode == '' ? closeModal() : 0;
            "
            class="button"
            flat
            label="OK"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "LoginModal",
  props: ["openModal"],
  data() {
    return {
      email: "",
      fullname: "",
      password: "",
      registerCode: "",
      isLoading: false,
      alert: false
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
    }
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
            password: this.password
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
    }
  }
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
