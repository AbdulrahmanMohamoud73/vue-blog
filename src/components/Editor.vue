<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { useRoute } from 'vue-router';
import { fetchPosts, allPosts, Post } from '../composables/posts';
import { onMounted, ref, watchEffect } from 'vue';

const route = useRoute();
const postId = route.params.id;
const post = ref<Post | null>(null);

onMounted(async () => {
  await fetchPosts();
  post.value = allPosts.value.find(p => String(p.id) === String(postId)) || null;
});

const editor = useEditor({
    extensions: [
        StarterKit,
        Highlight,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
    ],
    content: '', 
});

watchEffect(() => {
  if (post.value && editor) {
    editor.value.commands.setContent(post.value.text_content);
  }
});

</script>

<template>
  <div v-if="editor && post" class="container">
    <div class="control-group">
      <div class="button-group">
        <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          H1
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          H2
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
          H3
        </button>
        <button
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
        >
          Paragraph
        </button>
        <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
          Bold
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          Italic
        </button>
        <button
          @click="editor.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          Strike
        </button>
        <button
          @click="editor.chain().focus().toggleHighlight().run()"
          :class="{ 'is-active': editor.isActive('highlight') }"
        >
          Highlight
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('left').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        >
          Left
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('center').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        >
          Center
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('right').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        >
          Right
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('justify').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
        >
          Justify
        </button>
      </div>
    </div>
    <EditorContent class="editor" :editor="editor" />
  </div>
  <div v-else>
    <p>Error: Post with id {{ postId }} not found</p>
  </div>
</template>

<style>
.editor {
  width: 700px;
  min-height: 350px;
  margin: 0 auto;
  padding: 10px;
  background-color: whitesmoke;
  border: 1px solid #bebdbd;
  border-radius: 5px;
}

button {
  background-color: white;
  border: 1px solid #bebdbd;
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
}

.ProseMirror {
  min-height: 350px;
  cursor: text;
}

.is-active {
  background-color: #000;
  color: #fff;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 0;
}
.button-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 700px;
  margin-bottom: 10px;
}
.ProseMirror:focus { 
    outline: none; 
}

</style>