import axios from 'axios';
import type { Post } from './posts';

const api = axios.create({
  baseURL: '/api',
});

export const getPosts = () => api.get<Post[]>('/posts');
export const getPost = (id: number) => api.get<Post>(`/posts/${id}`);
export const createPost = (data: Post) => api.post<Post>('/editor', data);
export const updatePost = (id: number, data: Post) => api.put<Post>(`/editor/${id}`, data);
export const deletePost = (id: number) => api.delete(`/editor/${id}`);