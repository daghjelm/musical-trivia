import GameView from "../views/GameView";

import { mapState } from "vuex";
import { mapActions } from "vuex";

const gamePresenter = {
  data() {
    return {};
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
    ]),
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
      "onCardAdded",
    ]),

    //called when a card is placed on the timeline
    cardAdded(obj) {
      let addedCard = obj.added.element;
      let index = obj.added.newIndex;
      this.onCardAdded(addedCard, index);
    },
  },

  render() {
    return (
      <div>
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
      </div>
    );
  },
};

export default gamePresenter;
