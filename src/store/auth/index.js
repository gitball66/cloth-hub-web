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
  popularShops: []
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
            address: "",
            createdAt: Date.now(),
            updatedAt: Date.now(),
            type: 0,
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
  addProduct: async ({ commit }, payload) => {
    console.log(payload);
    const docId = await db.collection("products").add({
      id: uuidv4(),
      uid: localStorage.getItem("uid"),
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
    let shops = []
    let products = []
    let popularShop = []
    await db.collection("shops").where("rating", ">", 4)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          shops.push(doc.data())
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    await shops.forEach((shop) => {
      db.collection("products").where("uid", "==", shop.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (products.length < 4 && doc.data().showBanner) {
              products.push(doc.data())
            }
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      popularShop.push({
        shops: shop,
        products: products
      })
    })
    commit("SET_POPULAR", popularShop);
  },
  getProductsByShopId: async ({ }, payload) => {
    await db.collection("products").where("uid", "==", payload)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
};

const mutations = {
  SET_USER: async (state, user) => {
    localStorage.setItem("email", user.email);
    localStorage.setItem("uid", user.uid);
    state.user = user;
  },
  SET_POPULAR: async (state, popularShops) => {
    // data.forEach((shop) => {
    //   state.popularShops.push(shop)
    // })
    state.popularShops = [...popularShops]
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
