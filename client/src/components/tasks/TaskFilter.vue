<template>
  <div class="filter">
    <div
      class="option"
      :class="{'option-selected': this.$store.state.tasks.activeFilter===null}"
      @click="setActiveFilter({filter: null})"
    >all</div>
    <div
      class="option"
      :class="{'option-selected': this.$store.state.tasks.activeFilter===false}"
      @click="setActiveFilter({filter: false})"
    >incomplete</div>
    <div
      class="option"
      :class="{'option-selected': this.$store.state.tasks.activeFilter===true}"
      @click="setActiveFilter({filter: true})"
    >complete</div>
  </div>
</template>

<script>
export default {
  name: "TaskFilter",
  methods: {
    setActiveFilter(criteria) {
      this.$store.dispatch("tasks/setActiveFilter", criteria);
    }
  }
};
</script>

<style>
.filter {
  display: flex;
  justify-content: space-around;
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom: 0.5px solid #bebebe;
}

.option {
  padding: 5px;
  margin: 5px;
  border-radius: 2px;
  cursor: pointer;
  color: #aaaaaa;
}

.option-selected {
  color: #333333;
  font-weight: bold;
}
</style>