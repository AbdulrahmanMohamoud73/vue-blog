<script setup lang="ts">
import { useEditor, EditorContent, Editor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { useRoute } from 'vue-router';
import { usePosts, Post } from '../composables/posts';
import { onMounted, Ref, ref, watch } from 'vue';
import dayjs from "dayjs";


const { fetchPost, updatePost } = usePosts();

const route = useRoute();
const postId = route.params.id;
const post = ref<Post | null>(null);

async function savePost() {
  if (!editor.value) return;

  const now = new Date().toISOString();

  if (!post.value) return;

  try {
    const updatedPost = {
      id: Number(postId),
      title: post.value.title,
      description: post.value.description,
      content: preserveEmptyParagraphs(editor.value.getHTML()),
      publishedAt: now
    };

    const response = await updatePost(Number(postId), updatedPost);

    if (response) alert('Post saved successfully!');

  } catch (error: any) {
    
    console.error('Error updating post:', error);
    alert('Failed to save post');
  }
}

function preserveEmptyParagraphs(html: string) {
  return html.replace(/<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/g, '<p><br></p>');
}

onMounted(async () => {
  try{
    post.value = await fetchPost(Number(postId));

    if (post.value && editor.value) {
      const preservedHtml = preserveEmptyParagraphs(post.value.content);
      editor.value.commands.setContent(preservedHtml);
    }
  } catch (error) {
    console.error('Error fetching post:', error);
  }

});

const editor: Ref<Editor | null> = useEditor({
  extensions: [
    StarterKit,
    Highlight,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ],
  content:'',
});

watch(() => post.value?.title, (newTitle) => {
  if (!editor.value) return;

  const html = editor.value.getHTML();
  const updatedHtml = html.replace(/^<h1>.*?<\/h1>/, `<h1>${newTitle}</h1>`);
  editor.value.commands.setContent(updatedHtml);
});


</script>

<template>
  <div v-if="editor && post" class="container">
      <div class="control-group">
        <div class="back-arrow"  @click="$router.push('/')" > Back </div>
        <div class="button-group">
          <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                  :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
            H₁
          </button>
          <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                  :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
            H₂
          </button>
          <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                  :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
            H₃
          </button>
          <button @click="editor.chain().focus().setParagraph().run()"
                  :class="{ 'is-active': editor.isActive('paragraph') }">
            Paragraph
          </button>
          <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
            Bold
          </button>
          <button @click="editor.chain().focus().toggleItalic().run()"
                  :class="{ 'is-active': editor.isActive('italic') }">
            Italic
          </button>
          <button @click="editor.chain().focus().toggleStrike().run()"
                  :class="{ 'is-active': editor.isActive('strike') }">
            Strike
          </button>
          <button @click="editor.chain().focus().toggleHighlight().run()"
                  :class="{ 'is-active': editor.isActive('highlight') }">
            Highlight
          </button>
          <button @click="editor.chain().focus().setTextAlign('left').run()"
                  :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
            Left
          </button>
          <button @click="editor.chain().focus().setTextAlign('center').run()"
                  :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
            Center
          </button>
          <button @click="editor.chain().focus().setTextAlign('right').run()"
                  :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
            Right
          </button>
        </div>
      </div>
    <input id="title" type="text" v-model="post.title">
    <input id="description" type="text" v-model="post.description">
    <EditorContent class="editor" :editor="editor" />
    <div class="save-button-date-wrapper">
      <div class="save-date">last saved at: {{ dayjs(post.publishedAt).format("D MMMM YYYY, H:mm") }}</div>
      <button class="save-button" @click="savePost">Save Post</button>
    </div>
  </div>
  <div v-else class="errorContainer">
    <div class="errorMessage">
      <h1>Not Found !</h1>
      <h2>We could not find what you were looking for</h2>
    </div>
  </div>

</template>

<style>
#title{
  font-size: 2.5rem;
  font-weight: bold;
  border: none;
  outline: none;
  width: 80%;
  margin: 10px;
}
#description{
  font-size: 1.2rem;
  color: #666;
  border: none;
  outline: none;
  width: 80%;
  margin: 10px;
}
.editor {
  width: 80%;
  min-height: 100vh;
  box-sizing: border-box;
  flex-grow: 1;
}

.control-group{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  margin: 15px;
  padding: 10px;
}

.button-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
  width: 700px;
}

.back-arrow{
  text-decoration: underline;
  cursor: pointer;
}

.save-button {
  margin: 10px;
  padding: 6px 12px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-button-date-wrapper {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0 15px;
}

.save-date {
  font-size: 0.9em;
  color: #616161;
  margin: 10px 10px;
}

.is-active {
  background-color: #000;
  color: #fff;
}

.ProseMirror {
  width: 80%;
  cursor: text;
  flex-grow: 1;
  overflow-y: auto;
  box-sizing: border-box;
}

.ProseMirror:focus {
  outline: none;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  overflow: auto;
}

.errorContainer{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  width: 100%;
}

.errorMessage{
  align-items: center;
  border: 2px solid black;
  border-radius: 4px;
  padding: 5px;
  width: 100%;
  max-width: 450px;
  text-align: center;
}
</style>

<!--  <div class="titleandDescriptionWrapper" v-if="post">-->
<!--&lt;!&ndash;    <div class="titleWrapper">&ndash;&gt;-->
<!--&lt;!&ndash;      <label for="title">Title</label>&ndash;&gt;-->
<!--&lt;!&ndash;      <input id="title"  type="text" v-model="post.title"&ndash;&gt;-->
<!--&lt;!&ndash;        style="width: 300px; margin: 5px 0; display: block; padding: 10px 2px; font-size: 1em; border: 1px solid #bebdbd; border-radius: 5px; background-color: whitesmoke;" />&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    <div class="descriptionWrapper">&ndash;&gt;-->
<!--&lt;!&ndash;      <label for="description">Description</label>&ndash;&gt;-->
<!--&lt;!&ndash;        <input id="description" type="text" v-model="post.description"&ndash;&gt;-->
<!--&lt;!&ndash;        style="width: 300px; margin: 5px 0; display: block; padding: 10px; font-size: 1em; border: 1px solid #bebdbd; border-radius: 5px; background-color: whitesmoke;" />&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--  </div>-->