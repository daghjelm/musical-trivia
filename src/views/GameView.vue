<template>
  <div class="game">
    
    <div style="position: absolute; top: 20px; left: 0; width: 200px; text-align:right;">
      <b-link to="/"> 
        <img src="../assets/logo.png" height="86">
      </b-link>
    </div>
    <div style="position: absolute; top: 20px; right: 30px; width: 250px; text-align:right;">
    <h3 v-if="loggedIn !== false">Logged in as {{ userName }}</h3>
    <h3>Lives left:</h3>
    <span class="life" v-for="index in lives" :key="index">
      <img src="https://www.picng.com/upload/heart/png_heart_31847.png" height="20">
    </span>
    </div>
  <br>
  <br>
  <br>
    <!-- loop card array -->
    <draggable :list="currentCard" :group="{name: 'cardGroup', put: false}">
    
      <PromiseNoData :promiseState="currentCardPromiseState" class="cards d-inline-flex">
        <div v-if="currentCard[0]" class="cards d-inline-flex">
          <SongCard v-if="currentCard[0]" :data="currentCard[0]" :date="'guess the date!'" />
        </div>
      </PromiseNoData>

    </draggable> 
    <hr>
    <PromiseNoData :promiseState="initCardPromiseState" class="cards-d-inline-flex">
      <draggable class="draggable" :list="cards" group="cardGroup" @change="cardAdded">
        <div class="cards d-inline-flex" v-for="card in cards" :key='card.title'>
          <SongCard :data="card" :date="card.date"/>
        </div>
      </draggable>
    </PromiseNoData>
  </div>
</template>

<script>
  import SongCard from '../components/SongCard.vue';
  import draggable from "vuedraggable";
  import PromiseNoData from './PromiseNoData.vue'
  export default {
    props: [
      'loggedIn',
      'userName',
      'cards', 
      'getSong',
      'getCurrentSong', 
      'currentCard', 
      'addCurrentCard', 
      'lives',
      'cardAdded',
      'currentCardPromiseState',
      'initCardPromiseState',
    ],
    components: {
      SongCard,
      draggable,
      PromiseNoData
    },
  }

</script>

<style>
  .cards {
    margin: 1em;
  }
  .cards:hover{
  -ms-transform: scale(1.1); 
  -webkit-transform: scale(1.1); 
  transform: scale(1.1);
  }
  .mb-2 {
    color: black
  }
  .life {
    margin: 0.1em;
  }

</style>