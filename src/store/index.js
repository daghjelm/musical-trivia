import Vue from "vue";
import Vuex from "vuex";
import { getRandomSong } from "@/services/musicService";
import { sortCards, correctPosition } from "../utils";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentCard: [],
    cards: [],
    score: 0,
    lives: 3,
    oldScore: 0,
    scoreboard: {},
    user: {
      loggedIn: false,
      data: {
        id: "",
        name: "",
        email: "",
      },
    },
    initCardPromiseState: {
      promise: null,
      data: null,
      error: null,
    },
    currentCardPromiseState: {
      promise: null,
      data: null,
      error: null,
    },
  },

  mutations: {
    removeLife(state) {
      state.lives--;
    },

    incrementScore(state) {
      state.score++;
    },

    removeCurrentCard(state) {
      state.currentCard = [];
    },

    //change for currentCard-list
    setCurrentCard(state, card) {
      state.currentCard = [{ ...card }];
    },

    addCard(state, card) {
      state.cards = [...state.cards, card];
    },

    addInitCard(state, card) {
      state.cards = [card];
    },

    setCards(state, cards) {
      state.cards = [...cards];
    },

    setLives(state, lives) {
      state.lives = lives;
    },

    setOldScore(state) {
      state.oldScore = state.score;
    },

    setScore(state, score) {
      state.score = score;
    },

    setScoreboardFromDb(state, scoreboard) {
      state.scoreboard = scoreboard;
    },

    addToScoreboard(state) {
      if (state.user.loggedIn === false) {
        return;
      }

      let id = state.user.data.id;

      let lastScore = state.scoreboard.items.find((elem) => elem.id === id);
      let scoreItem = { ...state.user, score: state.score };

      //if the user already has a score
      //compare it to the new one and update only if the new score
      //is higher than the old one
      if (lastScore) {
        if (lastScore.score >= state.score) {
          return;
        } else {
          let filtered = state.scoreboard.items.filter(
            (elem) => elem.id !== id
          );
          state.scoreboard.items = [
            ...filtered,
            {
              name: scoreItem.data.name,
              id: scoreItem.data.id,
              score: state.score,
            },
          ].sort((a, b) => b.score - a.score);
        }
      } else {
        state.scoreboard.items = [
          ...state.scoreboard.items,
          {
            name: scoreItem.data.name,
            id: scoreItem.data.id,
            score: state.score,
          },
        ].sort((a, b) => b.score - a.score);
      }
    },
    setInitCardPromiseState(state, promiseState) {
      state.initCardPromiseState = { ...promiseState };
    },

    setCurrentCardPromiseState(state, promiseState) {
      state.currentCardPromiseState = { ...promiseState };
    },

    setInitData(state, data) {
      state.initCardPromiseState = { ...state.initCardPromiseState, data };
    },

    setCurrentData(state, data) {
      state.currentCardPromiseState = {
        ...state.currentCardPromiseState,
        data,
      };
    },

    setError(state, error) {
      state.promiseState = { ...state.promiseState, error };
    },

    setLoggedIn(state, value) {
      state.user.loggedIn = value;
    },

    setUser(state, data) {
      state.user.data = data;
    },

    setLoggedOut(state) {
      state.user = {
        loggedIn: false,
        data: {
          name: "",
          email: "",
        },
      };
    },
  },
  actions: {
    addCard({ commit }, card) {
      commit("addCard", card);
    },

    setCurrentCardFromDb({ commit }, card) {
      let promiseState = {
        promise: true,
        data: card,
        error: null,
      };

      commit("setCurrentCardPromiseState", promiseState);
      commit("setCurrentCard", card);
    },

    setCardsFromDb({ commit }, cards) {
      let promiseState = {
        promise: true,
        data: cards,
        error: null,
      };

      commit("setInitCardPromiseState", promiseState);

      if (Array.isArray(cards)) {
        commit("setCards", cards);
      } else {
        commit("addCard", cards);
      }
    },

    setCurrentCard({ commit }, card) {
      commit("setCurrentCard", card);
    },

    addCurrentCard({ commit }) {
      commit("addCurrentCard");
    },

    updateScoreboard({ commit }) {
      commit("addToScoreboard");
    },

    removeCurrentCard({ commit }) {
      commit("removeCurrentCard");
    },

    removeLife({ commit }) {
      commit("removeLife");
    },

    sortAndSetCards({ commit, state }) {
      commit("setCards", sortCards(state.cards));
    },

    setCards({ commit }, cards) {
      commit("setCards", cards);
    },

    newGame({ commit }) {
      commit("addToScoreboard");
      commit("setLives", 3);
      commit("setOldScore");
      commit("setScore", 0);
      store.dispatch("getCurrentSong");
      store.dispatch("getInitSong");
    },

    setLives({ commit }, lives) {
      commit("setLives", lives);
    },

    incrementScore({ commit }) {
      commit("incrementScore");
    },

    setScore({ commit }, score) {
      commit("setScore", score);
    },

    setScoreboardFromDb({ commit }, scoreboard) {
      commit("setScoreboardFromDb", scoreboard);
    },

    setLoggedOut({ commit }) {
      commit("setLoggedOut");
    },

    //get a song for current card
    getCurrentSong({ commit }) {
      let promise = getRandomSong();

      let promiseState = {
        promise,
        data: null,
        error: null,
      };

      commit("setCurrentCardPromiseState", promiseState);

      promise
        .then((data) => {
          commit("setCurrentCard", data);
          commit("setCurrentData", data);
        })
        .catch((error) => {
          commit("setError", error);
        });
    },

    //get the first song for timeline
    getInitSong({ commit }) {
      let promise = getRandomSong();

      let promiseState = {
        promise,
        data: null,
        error: null,
      };

      commit("setInitCardPromiseState", promiseState);

      promise
        .then((data) => {
          commit("addInitCard", data);
          commit("setInitData", data);
        })
        .catch((error) => {
          commit("setError", error);
        });
    },

    onCorrectPosition({ commit, state }) {
      commit("setCards", sortCards(state.cards));
      commit("incrementScore");
      store.dispatch("getCurrentSong");
    },

    onWrongPosition({ commit, state }) {
      commit("removeLife");
      if (state.lives === 0) {
        store.dispatch("newGame");
        this.$router.push({ path: "/gameover" });
      } else {
        commit("setCards", sortCards(state.cards));
        store.dispatch("getCurrentSong");
      }
    },

    onCardAdded({ commit, state }, addedCard, index) {
      if (correctPosition(addedCard.date, index, state.cards)) {
        commit("setCards", sortCards(state.cards));
        commit("incrementScore");
        store.dispatch("getCurrentSong");
      } else {
        commit("removeLife");
        if (state.lives === 0) {
          store.dispatch("newGame");
          this.$router.push({ path: "/gameover" });
        } else {
          commit("setCards", sortCards(state.cards));
          store.dispatch("getCurrentSong");
        }
      }
    },

    //updates state.user with data garthered from the firebase authentication, called on login
    fetchUser({ commit }, user) {
      commit("setLoggedIn", user !== null);
      if (user) {
        commit("setUser", {
          id: user.uid,
          name: user.displayName,
          email: user.email,
        });
      } else {
        commit("setUser", null);
      }
    },
  },
});

export default store;
