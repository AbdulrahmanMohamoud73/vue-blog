<script setup lang="ts">
import { allPosts, postsLoaded, fetchPosts } from "../composables/posts";

fetchPosts();

</script>

<template>
    <div class="wrapper" v-if="postsLoaded">
        <div class="articleDiv" v-for="(post, id) in allPosts" :key="id" @click="$router.push({ name: 'Post', params: { id: post.id } })">
          <div class="title">
            <h2>{{ post.title }}</h2>
        </div> 
          <div><p>{{post.description}}</p></div>
          <div class="timeanddate">
            <div class="date">{{ new Date(post.published_at).toLocaleDateString('en-GB', {
              day: 'numeric', month: 'short', year: 'numeric'
            })}}</div>
            <div>1 minute read</div>
          </div>
        </div>
        
    </div>
  </template>

<style scoped>
h1{
  font-size: 2em;
}
h2 {
  font-size: 1.5em;
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