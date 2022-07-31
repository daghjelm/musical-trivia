<template>
  <div class="homePage">
    <br>
    <br>
    <img src="../assets/logo.png" height="86">
    <br>  
    <br>
    <h2>How to play?</h2>
    <br>
    <h4>Drag and drop the card above the line to the timeline below!<br>
    Place it in relation to the other cards when you think that song was released.<br>
    You have three lives: make the best of them.</h4>
    <br>
    <table class="center">
      <td><b-button to="/game">Start the game</b-button></td>
    <tr>
      <b-link to="/scoreboard">Check the scoreboard</b-link>
    </tr>
    </table>
    <br>
    <b-button to=/register>Register</b-button>
    <br>
    <br>
    <p v-if="loggedIn === false"> <LoginModal @login='signInUser'/> </p>
    <b-button v-else @click='signOutUser'>Log out</b-button>
    <br>
    <h3 v-if="loggedIn !== false">Logged in as: {{ name }}</h3>  
  </div>
</template>

<script>
import LoginModal from '../components/LoginModal.vue';
export default{
  components:{
    LoginModal,
  },
  props: ['name','signOutUser','signInUser', 'loggedIn'],
}

</script>

<style>
  .homePage {
    margin-top: 2em;
  } 

  .center {
    margin-left: auto; 
    margin-right: auto;
  }
</style>
