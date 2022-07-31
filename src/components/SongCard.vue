<template>
  <div class="songCard">
    <b-card
      :title=data.title
      :header=date
      :img-src=data.imgUrl
      :img-alt=data.imgAlt
      img-top
      tag="article"
      style="max-width: 8rem"
      class="mb-2"
    >
      <b-card-text>
        {{data.artist}}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
  export default {
    props: ['data', 'date'],
  }
</script>

<style>
  .mb-2 {
    font-size: medium;
    color: black
  }
  .card-title{
    font-size: large;
  }
</style>