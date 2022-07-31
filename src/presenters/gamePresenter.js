import GameView from "../views/GameView";
import { correctPosition } from "@/utils";

import { mapState } from 'vuex'
import { mapActions } from 'vuex'

const gamePresenter = {
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
      "cards",
      "score",
      "user", 
      "currentCard", 
      "lives", 
      "initCardPromiseState",
      "currentCardPromiseState",
    ])
  },
  methods: {
    ...mapActions([
      "addCard", 
      "setCurrentCard", 
      "addCurrentCard", 
      "removeCurrentCard",
      "getInitSong",
      "getCurrentSong",
      "sortAndSetCards",
      "removeLife",
      "addToScoreboard",
      "incrementScore",
      "newGame"
    ]),

    //called when a card is placed on the timeline
    cardAdded(obj) {

      let addedCard = obj.added.element
      let index = obj.added.newIndex
      //right guess
      if (correctPosition(addedCard.date, index, this.cards)) {
        this.sortAndSetCards()
        this.incrementScore()
        this.getCurrentSong()
      //wrong guess
      } else {
          //remove life and sort cards after wrong guess, if not lives, end the game
          this.removeLife()
          if(this.lives === 0) {
            this.newGame()
            this.$router.push({ path: '/gameover'})
          } else {
            this.sortAndSetCards()
            this.getCurrentSong()
          }
        }
      }
    },

  render() {
    return <div> 
      <GameView
        loggedIn={this.user.loggedIn} 
        userName={this.user.data.name}
        getCurrentSong={this.getCurrentSong} 
        score={this.score}
        cards={this.cards}
        currentCard={this.currentCard}
        addCurrentCard={this.addCurrentCard}
        lives={this.lives}
        initCardPromiseState={this.initCardPromiseState}
        currentCardPromiseState={this.currentCardPromiseState}
        cardAdded={this.cardAdded}
      />
    </div>;
  },
};

export default gamePresenter;