import ScoreboardView from "../views/ScoreboardView";
import { mapState } from 'vuex'

const scoreboardPresenter = {
  data() {
    return {
    };
  },
  computed: {
    ...mapState(["scoreboard"])
  },
  render() {
    return (
      <div>
        <ScoreboardView scoreboard={this.scoreboard} />
      </div>
    );
  },
};

export default scoreboardPresenter;
