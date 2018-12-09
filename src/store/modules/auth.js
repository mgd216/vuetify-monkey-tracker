import fb from "@/firebaseConfig.js";

const state = {
  currentUser: null,
  userProfile: {}
};

const getters = {
  currentUser: state => state.currentUser,
  userProfile: state => state.userProfile
};

const actions = {
  clearData({ commit }) {
    commit("SET_CURRENT_USER", null);
    commit("SET_USER_PROFILE", {});
  },
  fetchUserProfile({ commit, state }) {
    fb.usersCollection
      .doc(state.currentUser.uid)
      .get()
      .then(res => {
        commit("SET_USER_PROFILE", res.data());
      })
      .catch(err => {
        console.log(err);
      });
  },
  updateProfile({ commit, state }, data) {
    let name = data.name;
    let title = data.title;

    fb.usersCollection
      .doc(state.currentUser.uid)
      .update({ name, title })
      .then(user => {
        // update all posts by user to reflect new name
        fb.postsCollection
          .where("userId", "==", state.currentUser.uid)
          .get()
          .then(docs => {
            docs.forEach(doc => {
              fb.postsCollection.doc(doc.id).update({
                userName: name
              });
            });
          });
        // update all comments by user to reflect new name
        fb.commentsCollection
          .where("userId", "==", state.currentUser.uid)
          .get()
          .then(docs => {
            docs.forEach(doc => {
              fb.commentsCollection.doc(doc.id).update({
                userName: name
              });
            });
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const mutations = {
  SET_CURRENT_USER(state, val) {
    state.currentUser = val;
  },
  SET_USER_PROFILE(state, val) {
    state.userProfile = val;
  }
};

export { state, getters, actions, mutations };
