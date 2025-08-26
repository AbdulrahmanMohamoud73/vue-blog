import { ref } from "vue";
import supabase from "../supabase";

export interface Post {
  id: number;
  title: string;
  description: string;
  text_content: string;
  published_at: string;
}
export const allPosts = ref([] as any[]);
export const postsLoaded = ref(false);

export async function fetchPosts() {
 let { data: posts, error } = await supabase
  .from('blog_data')
  .select('*')

  if (error) throw new Error();

  allPosts.value = posts || [];
  postsLoaded.value = true;
}