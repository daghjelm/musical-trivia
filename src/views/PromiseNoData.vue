<template>
  <div v-if="!promiseState.promise">
    No data
  </div>
  <div v-else-if="!(promiseState.data || promiseState.error)">
    <LoadingCard />
  </div>
  <div v-else-if="!promiseState.data && promiseState.error">
    {{promiseState.error}}
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script>
  import LoadingCard from '../components/LoadingCard'
  export default {
    props: ['promiseState'],
    components: {
      LoadingCard
    }
  }
</script>