<script setup lang="ts">
import { useRoute } from 'vue-router'
import allPosts from './Home.vue';

const route = useRoute()
const postId = route.params.id
const post = allPosts.find((p: any) => p.id === postId)

</script>
<template>
    <div class="wrapper">
        <h2>{{ post?.title }}</h2>
        <h4>{{ post?.description }}</h4>
        <p>{{ post?.created_at }}</p>
    </div>
</template>
<style scoped>
.wrapper {
    text-align: center;
}
</style>
