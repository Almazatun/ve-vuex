<template>
  <div>
    <div v-for="(value) in items.map(t => t)" v-bind:key="value.id" id="#items">
      <span>{{value.name}}</span>
    </div>
  </div>
</template>

<script>


export default {
  name: "TodoItem",
  props: ['items'],
  setup() {

    return {

    }
  },
}
</script>

<style scoped>


</style>