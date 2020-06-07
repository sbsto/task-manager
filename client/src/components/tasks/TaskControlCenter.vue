<template>
  <div class="control-center">
    <div v-if="controlButtonShown === 'allDone'" class="btn" @click="completeAll">all done</div>
    <div class="btn" v-if="controlButtonShown === 'clear'" @click="removeCompleted">clear</div>
    <div>{{taskNumberString}}</div>
  </div>
</template>

<script>
export default {
  name: "TaskControlCenter",
  methods: {
    completeAll() {
      this.$store.dispatch("tasks/completeAll");
    },
    removeCompleted() {
      this.$store.dispatch("tasks/removeCompleted");
    }
  },
  computed: {
    taskNumberString() {
      return this.$store.getters["tasks/taskNumberString"];
    },
    controlButtonShown() {
      return this.$store.getters["tasks/controlButtonShown"];
    }
  }
};
</script>

<style>
.btn {
  padding: 8px;
  cursor: pointer;
  background-color: #333333;
  border-radius: 2px;
  color: white;
  width: 25%;
}

.control-center {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 0.5px solid #bebebe;
}
</style>