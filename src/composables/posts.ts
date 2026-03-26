import { ref } from "vue";
import axios from "axios";


export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token && token !== 'undefined') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Post {
  id: number;
  title: string;
  description: string;
  publishedAt: string;
  content: string;
}

export function usePosts() {
  const allPosts = ref([] as any[]);
  const postsLoaded = ref(false);
  const error = ref<string | null>(null);
  const fetchPosts = async () => {
    postsLoaded.value = false;
    error.value = null;
    try {
      const response = await api.get<Post[]>('/posts');
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
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (e: any) {
      error.value = e.message || 'An error occurred while fetching post.';
    }
  };

  const createPost = async (data: Post) => {
    error.value = null;
    try {
      const response = await api.post<Post>('/posts', data);
      return response.data;
    } catch (e: any) {
      error.value = e.message || 'An error occurred while creating post.';
    }
  };

  const updatePost = async (id: number, data: Post) => {
    error.value = null;
    try {
      const response = await api.put<Post>(`/posts/${id}`, data);
      return response.data;
    } catch (e: any) {
      error.value = e.message || 'An error occurred while updating post.';
    }
  };

  const deletePost = async (id: number) => {
    error.value = null;
    try {
      await api.delete(`/posts/${id}`);
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