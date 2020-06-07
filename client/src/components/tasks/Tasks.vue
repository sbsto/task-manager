<template>
  <div class="container">
    <h2 id="title">Tasks</h2>
    <TaskFilter @setActiveFilter="setActiveFilter($event)" />
    <TaskControlCenter />
    <Task v-for="task in filteredTasks" :key="task.id" :task-details="task" />
    <TaskAdd />
  </div>
</template>

<script>
import Task from "./Task";
import TaskFilter from "./TaskFilter";
import TaskControlCenter from "./TaskControlCenter";
import TaskAdd from "./TaskAdd";
export default {
  name: "Tasks",
  components: {
    Task,
    TaskFilter,
    TaskControlCenter,
    TaskAdd
  },
  data() {
    return {
      newTask: "",
      idForTask: 3
    };
  },
  computed: {
    incompletedTasksLength() {
      return this.$store.getters["tasks/incompletedTasksLength"];
    },
    completedTasksLength() {
      return this.$store.getters["tasks/completedTasksLength"];
    },
    filteredTasks() {
      return this.$store.getters["tasks/filteredTasks"];
    },
    taskString() {
      return this.$store.getters["tasks/taskString"];
    }
  },
  created() {
    this.$store
      .dispatch("tasks/fetchTasks")
      .then(res => console.log(res))
      .catch(e => console.log(e));
  }
};
</script>

<style scoped>
.container {
  width: 300px;
  border-bottom: 1px solid #bebebe;
}

#title {
  text-align: left;
}
</style>