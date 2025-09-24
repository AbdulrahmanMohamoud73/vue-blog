<script setup lang="ts">
import { allPosts, postsLoaded, fetchPosts } from "../composables/posts";

fetchPosts();

</script>

<template>
  <div class="articles" v-if="postsLoaded">
    
    <div class="edit-wrapper">
      <div class="articleDiv" v-for="(post, id) in allPosts" :key="id"
        @click="$router.push({ name: 'Post', params: { id: post.id } })">
        <div class="title">
          <h2>{{ post.title }}</h2>
        </div>
        <div>
          <p>{{ post.description }}</p>
        </div>
        <div class="timeanddate">
          <div class="date">{{ new Date(post.published_at).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
          }) }}</div>
          <div>1 minute read</div>
        </div>
      </div>
      <p class="edit" v-for="(post) in allPosts" @click="$router.push({ name: 'Editor', params: { id: post.id } })">Edit</p>
    </div>

  </div>
</template>

<style scoped>
h1 {
  font-size: 2em;
}

h2 {
  font-size: 1.5em;
}

.date {
  font-weight: bold;
}

.timeanddate {
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: space-evenly;
}

.title {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.articles {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.edit-wrapper {
  width: 100%;
  border: 2px solid;
  border-radius: 5px;
  max-width: 600px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.articleDiv {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 85%;
  height: 120px;
  font: 1em;
  padding: 10px;
}

.edit{
  cursor: pointer;
  margin: 10px;
  text-decoration: underline;
  /* color: #0d82e9; */
  color: black;
}
</style>


<!-- h2 {
  color: #0d82e9
 }
 
 .date {
   font-weight: bold;
 }
 
 .timeanddate {
   display: flex;
   flex-direction: row;
   width: 80%;
   justify-content: space-evenly;
 }
 
 .title {
   width: 100%;
   display: flex;
   flex-direction: row;
   justify-content: space-around;
   align-items: center;
 }
 
 .wrapper {
   width: 90vw;
   margin: 0 auto;
   display: flex;
   flex-direction: column;
   justify-content: space-evenly;
   align-items: center;
 }
 
 .articleDiv {
   height: 10vh;
   display: flex;
   flex-direction: column;
   justify-content: space-evenly;
   align-items: center;
   width: 85%;
   border: 2px solid;
   font: 1em;
   border-radius: 5px;
   padding: 10px;
   margin: 10px 0;
 } -->