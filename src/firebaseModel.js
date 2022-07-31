import { onValue, ref, set } from 'firebase/database'

const REF = 'userData'

function onUpdate(mutation, database, state) {
  let type = mutation.type;
  let payload = mutation.payload;
  let userId;

  try {
    userId = state.user.data.id;
  } catch (e) {
    console.error(e)
  }
  switch (type) {
    //updates number of lives in database
    case 'removeLife':
      set(ref(database, `${REF}/${userId}/lives`), state.lives);
      break;
    case 'setLives':
      set(ref(database, `${REF}/${userId}/lives`), state.lives);
      break;
    case 'setScore':
      set(ref(database, `${REF}/${userId}/score`), state.score);
      break;
    //updates current card in database
    case 'setCurrentCard':
      set(ref(database, `${REF}/${userId}/currentCard`), payload);
      break;
    //updates cards placed on timeline in database  
    case 'setCards':
      set(ref(database, `${REF}/${userId}/cards`), payload);
      break;
    case 'addInitCard':
      set(ref(database, `${REF}/${userId}/cards`), [payload]);
      break;
    case 'addCard':
      set(ref(database, `${REF}/${userId}/cards`), payload);
    break;
    case 'incrementScore':
      set(ref(database, `${REF}/${userId}/score`), state.score);
      break;
    case 'addToScoreboard':
      set(ref(database, `${REF}/scoreboard`), state.scoreboard);
      break;
  }

}

//function for getting the data from the db and setting it in the store, called in main under onAuthStateChanged
function updateUserData(database, userId, store) {
  const lifeValueRef = ref(database, `${REF}/${userId}/lives`);
  onValue(lifeValueRef, (snapshot) => {
    if (snapshot.val() === null) {
      store.dispatch("setLives", 3)
    }
    else {
      store.dispatch("setLives", snapshot.val())
    }
  })

  const currentCardRef = ref(database, `${REF}/${userId}/currentCard`);
  onValue(currentCardRef, (snapshot) => {
    store.dispatch("setCurrentCardFromDb", snapshot.val())
    if (!snapshot.val()) {
      store.dispatch('getCurrentSong')
    }
  })

  const cardsRef = ref(database, `${REF}/${userId}/cards`);
  onValue(cardsRef, (snapshot) => {
    store.dispatch('setCardsFromDb', snapshot.val())
    if (!snapshot.val()) {
      store.dispatch('getInitSong')
    }
  })

  getScoreboardFromDb(database, store)
  
}

function getScoreboardFromDb(database, store){
  const scoreboardRef = ref(database, `${REF}/scoreboard`)
  onValue(scoreboardRef, (snapshot) => {
    store.dispatch('setScoreboardFromDb', snapshot.val())
  })
}  

export { onUpdate, updateUserData, getScoreboardFromDb}