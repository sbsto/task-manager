<template>
  <div
    class="task"
    :class="{
        'task-completed': taskDetails.completed, 
        'task-incomplete': !taskDetails.completed, 
        }"
  >
    <input
      type="checkbox"
      class="checkbox"
      @click="toggleCompleted(taskDetails.id)"
      v-model="taskDetails.completed"
    />
    <div class="task-info" :class="{'task-info-completed': taskDetails.completed}">
      <div
        v-if="!taskDetails.editing"
        @dblclick="editTask(taskDetails.id)"
        class="task-label"
      >{{ taskDetails.description }}</div>
      <input
        v-else
        type="text"
        v-model="taskDetails.description"
        class="task-edit"
        @keyup.enter="doneEdit(taskDetails.id)"
        @blur="doneEdit(taskDetails.id)"
        @keyup.esc="cancelEdit(taskDetails.id)"
        v-focus
      />
    </div>
    <div class="remove-button" @click="removeTask(taskDetails.id)">&times;</div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["taskDetails"],
  methods: {
    editTask(id) {
      this.$store.dispatch("tasks/editTask", id);
    },
    doneEdit(id) {
      this.$store.dispatch("tasks/doneEdit", id).catch(e => console.log(e));
    },
    cancelEdit(id) {
      this.$store.dispatch("tasks/cancelEdit", id);
    },
    removeTask(id) {
      this.$store.dispatch("tasks/removeTask", id).catch(e => console.log(e));
    },
    toggleCompleted(id) {
      this.$store
        .dispatch("tasks/toggleCompleted", id)
        .catch(e => console.log(e));
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>

<style scoped>
.task {
  padding: 12px;
  border-bottom: 1px solid #bebebe;
  border-top: none;
  display: flex;
  justify-content: space-between;
  max-width: 350px;
  align-items: center;
}

.task-incomplete {
  background: rgb(255, 255, 255);
}

.task-completed {
  background: rgb(240, 240, 240);
}

.task-info {
  display: flex;
  width: 95%;
  text-align: left;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
}

.task-info-completed {
  font-size: 15px;
  text-decoration: line-through;
  color: rgb(134, 134, 134);
}

.task-label {
  padding: 10px;
}
.task-edit {
  font-size: 16px;
  width: 100%;
  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;
  border: none;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: rgb(245, 245, 245);
}

.task-edit:focus {
  outline: none;
}

.remove-button {
  cursor: pointer;
  font-size: 18px;
}

.checkbox {
  cursor: pointer;
}
</style>