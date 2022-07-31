<template>
  <div>
    <h1> Game Over! </h1>
    <h3> You got: {{oldScore}} points!</h3>
  </div>
</template>

<script>
  export default {
    props: ['oldScore']
  }
</script>

<style>
  .mb-2 {
    color: black
  }
</style>