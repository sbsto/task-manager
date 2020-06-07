<template>
  <footer>
    <p>an sbsto production.</p>
    <p>sbsto &copy; {{year}}</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return { year: new Date().getFullYear() };
  }
};
</script>

<style scoped>
footer {
  color: #888888;
  border-top: 1px solid #dddddd;
  margin: auto;
  padding: 12px;
  width: 80vw;
  height: 100px;
  text-align: center;
}
</style>