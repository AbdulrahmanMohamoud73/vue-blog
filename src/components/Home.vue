<script setup lang="ts">
import { ref } from "vue";
import supabase from "../supabase.js";

let allPosts: any[]| null = null;
const postsLoaded = ref(false)

async function fetchPosts() {
  let { data: posts, error } = await supabase
    .from('posts')
    .select();

  if (error) throw new Error();

  allPosts = posts
  postsLoaded.value = true

}

fetchPosts()

</script>

<template>
    <div class="wrapper" v-if="postsLoaded">
        <div class="articleDiv" v-for="(post, id) in allPosts" :key="id" @click="$router.push(`Newpost/${id}`)">
          <div class="title">
            <h2>{{ post.title }}</h2>
        </div> 
          <div>{{post.Description}}</div>
          <div class="timeanddate">
            <div class="date">{{ new Date(post.created_at).toLocaleDateString('en-GB', {
              day: 'numeric', month: 'short', year: 'numeric'
            })}}</div>
            <div> 1 minute read</div>
          </div>
        </div>
        
    </div>
  </template>

<style scoped>
h2 {
 color: #0d82e9
}

.date{
  font-weight: bold;
}

.timeanddate{
  display: flex;
  flex-direction: row;
  width: 40%;
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
    height: 65vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}
.articleDiv {
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 45%;
    border: 2px solid;
    border-radius: 5px;
    padding: 15px 15px;
    margin: 10px 0;
}
</style>