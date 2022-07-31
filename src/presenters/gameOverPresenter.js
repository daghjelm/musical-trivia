import ScoreboardView from "../views/ScoreboardView";
import { mapState } from "vuex";

const gameOverPresenter = {
  data() {
    return {};
  },
  computed: {
    ...mapState(["scoreboard", "oldScore"]),
  },
  render() {
    return (
      <div>
        <ScoreboardView scoreboard={this.scoreboard} oldScore={this.oldScore} />
      </div>
    );
  },
};

export default gameOverPresenter;
