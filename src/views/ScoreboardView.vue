<template>
  <div>
    <br />
    <br />
    <b-link to="/"> 
      <img src="../assets/logo.png" height="86">
    </b-link>
    <br />
    <br />
    <div v-if="oldScore || oldScore == 0">
      <GameOver :oldScore="oldScore"/>
      <br />
      <br />
    </div>
    <h1>Scoreboard</h1>
    <br />
    <b-container class="scoreboard">
      <div>
        <b-table striped dark hover :items="scoreboard.items" :fields="scoreboard.fields"></b-table>
      </div>
      <b-button class="playButton" to="/game">Play again</b-button>
    </b-container>
  </div>
</template>

<script>
  import GameOver from '../components/GameOver.vue';
  
  export default {
    props: ["scoreboard", "oldScore"],
    components: {
      GameOver
    }
  };
</script>

<style>
  .scoreboard {
    width: 758px;
    height: 588px;
    top: 3em;
  }
  .playButton {
    background: #b0c0bd;
    border-radius: 10px;
  }
</style>