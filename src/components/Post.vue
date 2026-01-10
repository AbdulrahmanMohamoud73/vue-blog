<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { usePosts, Post } from "../composables/posts";

const { allPosts, fetchPosts } = usePosts();
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
    <p class="back" @click="$router.push('/')">Back</p>
    <div id="title">{{post.title}}</div>
    <div id="description">{{post.description}}</div>
    <div v-html="post.content"></div>
  </div>
  <div v-else class="errorContainer">
    <div class="errorMessage">
      <h1>Not Found !</h1>
      <h2>We could not find what you were looking for</h2>
    </div>
  </div>
</template>

<style scoped>
.back {
  cursor: pointer;
  text-decoration: underline;
  width: fit-content;
  position: relative;
  margin: 10px;
}
</style>