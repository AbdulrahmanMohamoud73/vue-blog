<script setup lang="ts">
</script>
<template>
    <div class="header">
        <h1 @click="$router.push('/')">Javascript Blog</h1>
        <p>Discussing everything Javascript</p>
    </div>
</template>
<style scoped>
.header{
  text-align: center;
  margin: 10px auto;
  cursor: pointer;
}
</style>