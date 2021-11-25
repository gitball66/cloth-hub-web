import firebase from "firebase";
import 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const config = {
  apiKey: "AIzaSyDEHEAVuLRBQ2v06F3EVozR8SvqllLvUTk",
  authDomain: "cloth-hub.firebaseapp.com",
  databaseURL: "https://cloth-hub.firebaseio.com",
  projectId: "cloth-hub",
  storageBucket: "cloth-hub.appspot.com",
  messagingSenderId: "93374105239"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const storage = firebase.storage();

const state = {
  user: "",
  popularShops: [],
  shop: null,
  shopProducts: []
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
        console.log(userCredential.user.uid);
        if (!!userCredential.user.uid) {
          db.collection("users").doc(userCredential.user.uid).set({
            id: userCredential.user.uid,
            email: payload.email,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            firstname: "",
            lastname: "",
            address: "",
            type: 0,
            isMerchant: false,
            isActive: true
          })
        }
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
  },
  getUserData: async ({ commit }, payload) => {
    console.log("payload", payload)
    await db.collection("users").where("id", "==", payload)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          let data = doc.data();
          let user = {
            uid: data.id,
            email: data.email,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            firstname: data.firstname,
            lastname: data.lastname,
            address: data.address,
            type: data.type,
            isMerchant: data.isMerchant,
            isActive: data.isActive,
            sid: data.sid
          };
          commit("SET_USER", user);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  },
  addProduct: async ({ state, commit }, payload) => {
    console.log(state.shop);
    const docId = await db.collection("products").add({
      id: uuidv4(),
      uid: localStorage.getItem("uid"),
      sid: state.shop.id,
      name: payload.name,
      description: payload.description,
      price: payload.price,
      stock: payload.stock,
      sold: 0,
      showBanner: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
      .then((docRef) => {
        console.log(docRef.id);
        return docRef.id;
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    const index = await payload.images.map(image => {
      const ref = storage.ref().child(uuidv4() + "_" + localStorage.getItem("uid"));
      ref.put(image).then((snapshot) => {
        snapshot.ref.getDownloadURL().then(res => {
          db.collection("products").doc(docId).update({
            images: firebase.firestore.FieldValue.arrayUnion(res)
          })
        })
      });
    })
  },
  getShopPopulars: async ({ commit }) => {
    commit("CLEAR_POPULAR_SHOP");
    let shops = []
    await db.collection("shops").where("rating", ">", 4)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let products = [];
          let shopData = doc.data();
          db.collection("products").where("sid", "==", shopData.id)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                if (products.length < 4 && doc.data().showBanner) {
                  products.push(doc.data());
                }
              });
              let shop = {
                shop: shopData,
                products: products
              }
              commit("SET_POPULAR_SHOP", shop);
            });
        });
      });
  },
  getShopDataBySid: async ({ commit }, sid) => {
    console.log("add");
    await db.collection("shops").where("id", "==", sid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          commit("SET_SHOP", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  },
  getProductsByShopId: async ({ commit }, sid) => {
    let products = []
    await db.collection("products").where("sid", "==", sid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          products.push(doc.data());
        });
        commit("SET_SHOP_PRODUCT", products);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  },
};

const mutations = {
  SET_USER: async (state, user) => {
    localStorage.setItem("email", user.email);
    localStorage.setItem("uid", user.uid);
    state.user = user;
  },
  CLEAR_POPULAR_SHOP: async (state) => {
    state.popularShops.splice(0, state.popularShops.length)
  },
  SET_POPULAR_SHOP: async (state, popularShops) => {
    state.popularShops.push(popularShops);
  },
  SET_SHOP: async (state, shop) => {
    state.shop = shop
  },
  SET_SHOP_PRODUCT: async (state, products) => {
    state.shopProducts = products;
  },

};

export default {
  state,
  getters,
  actions,
  mutations
};
