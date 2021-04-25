import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDEHEAVuLRBQ2v06F3EVozR8SvqllLvUTk",
  authDomain: "cloth-hub.firebaseapp.com",
  databaseURL: "https://cloth-hub.firebaseio.com",
  projectId: "cloth-hub",
  storageBucket: "cloth-hub.appspot.com",
  messagingSenderId: "93374105239"
};
firebase.initializeApp(config);

const state = {
  user: ""
};

const getters = {};

const actions = {
  register: async ({ commit }, payload) => {
    console.log(payload);
    let response;
    await firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(userCredential => {
        console.log(userCredential);
        response = true;
      })
      .catch(error => {
        console.log(error);
        response = false;
      });
    return response;
  },
  login: async ({ commit }, payload) => {
    console.log(payload);
    let response;
    await firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        let user = {
          uid: res.user.uid,
          email: res.user.email
        };
        commit("SET_USER", user);
        response = true;
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
        response = false;
      });
    return response;
  },
  logout: async ({ commit }, payload) => {
    localStorage.removeItem("email");
    localStorage.removeItem("uid");
  }
};

const mutations = {
  SET_USER(state, user) {
    console.log(user);
    localStorage.setItem("email", user.email);
    localStorage.setItem("uid", user.uid);
    state.user = user;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
