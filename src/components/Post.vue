<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { fetchPosts, allPosts, Post } from "../composables/posts";

const route = useRoute();
const postId = ref(route.params.id);
const post = ref<Post | null>(null);

onMounted(async () => {
  await fetchPosts();
});

watchEffect(() => {
  post.value = allPosts.value.map((p) => p).find((p) => String(p.id) === String(postId.value));
});
</script>

<template>
  <div class="wrapper" v-if="post">
    <h2>{{ post.title }}</h2>
    <h4>{{ post.description }}</h4>
    <p>{{ new Date(post.published_at).toLocaleDateString('en-GB', {
              day: 'numeric', month: 'short', year: 'numeric'
            })}}</p>
    <p>{{ post.text_content }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<style scoped></style>
