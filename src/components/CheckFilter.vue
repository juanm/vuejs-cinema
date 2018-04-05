<template>
  <div v-bind:class="{ 'check-filter': true, active: checked }" v-on:click="checkFilter">
    <span class="checkbox"></span>
    <span clas="check-filter-title">{{ title }}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: false
      }
    },
    props: ['title', 'category'],
    methods: {
      checkFilter() {
        this.checked = !this.checked;
        //event name, following arguments is arbitrary number of payload (type of filter, title, state checked or not)
        this.$emit('check-filter', this.category , this.title, this.checked);
      }
    }
  }
</script>
