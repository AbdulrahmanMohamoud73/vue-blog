import { ref } from "vue";
import * as api from './api';

export interface Post {
  id: number;
  title: string;
  description: string;
  text_content: string;
  published_at: string;
}

export function usePosts() {
  
  const allPosts = ref([] as any[]);
  const postsLoaded = ref(false);
  const error = ref<string | null>(null);
  const fetchPosts = async () => {
    postsLoaded.value = false;
    error.value = null;
    try {
      const response = await api.getPosts();
      allPosts.value = response.data;
    } catch (e: any) {
      error.value = e.message || 'An error occurred while fetching posts.';
    } finally {
      postsLoaded.value = true;
    }
  };

  const fetchPost = async (id: number) => {
    error.value = null;
    try {
      const response = await api.getPost(id);
      return response.data;
    } catch (e: any) {
      error.value = e.message || 'An error occurred while fetching post.';
    }
  };

  const createPost = async (data: Post) => {
    error.value = null;
    try {
      const response = await api.createPost(data);
      return response.data;
    } catch (e: any) {
      error.value = e.message || 'An error occurred while creating post.';
    }
  };

  const updatePost = async (id: number, data: Post) => {
    error.value = null;
    try {
      const response = await api.updatePost(id, data);
      return response.data;
    } catch (e: any) {
      error.value = e.message || 'An error occurred while updating post.';
    }
  };

  const deletePost = async (id: number) => {
    error.value = null;
    try {
      await api.deletePost(id);
    } catch (e: any) {
      error.value = e.message || 'An error occurred while deleting post.';
    }
  };

  return {
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    allPosts,
    postsLoaded,
    error,
}

}