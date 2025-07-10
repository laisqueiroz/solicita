<template>
    <div class="card">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    description: String
})
</script>

<style scoped>
.card {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin: 10px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  transition: 0.5s;
}

.card:hover {
    background-color: #F6C457;
    cursor: pointer;
}

h2 {
  font-size: 1em;
  font-weight: bold;
  text-align: left;
}

p {
  font-size: 0.7em;
  text-align: left;
}
</style>