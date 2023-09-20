<script setup lang="ts">
</script>
<template>
    <div class="header">
        <h1 @click="$router.push('/')">AR1's Journal</h1>
        <p>Discussing everything Javascript</p>
    </div>
</template>
<style scoped>
.header {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px 0;
}
</style>