<template>
  <div
    v-if="this.$store.state.tasks.activeFilter === null || this.$store.state.tasks.activeFilter === false"
    class="add"
  >
    <form @submit.prevent="addTask">
      <input type="text" v-model="newTask" placeholder="add a new task" class="text-input" />
    </form>
  </div>
</template>

<script>
export default {
  name: "TaskAdd",
  data() {
    return {
      newTask: ""
    };
  },
  methods: {
    addTask() {
      this.$store
        .dispatch("tasks/addTask", {
          id: 0,
          description: this.newTask,
          completed: false,
          editing: false
        })
        .then()
        .catch(e => console.log(e));
      this.newTask = "";
    }
  }
};
</script>

<style>
#title {
  text-align: left;
}
.text-input {
  font-size: 16px;
  border: none;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  width: 100%;
  padding-left: 40px;
}

.text-input:focus {
  outline: none;
}
</style>