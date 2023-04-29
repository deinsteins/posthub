import Comment from "@/types/Comment";
import axiosInstance from "../api";
import Post from "@/types/Post";

export const fetchPost = async (postId: string | string[] | number): Promise<Post> => {
  const response = await axiosInstance.get(`/posts/${postId}`);
  return response.data;
};

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axiosInstance.get("/posts");
  return response.data;
};

export const createPost = async (post: Post): Promise<Post> => {
  const response = await axiosInstance.post("/posts", post);
  return response.data;
};

export const updatePost = async (post: Post): Promise<Post> => {
  const response = await axiosInstance.put(`/posts/${post.id}`, post);
  return response.data;
};

export const fetchComments = async (postId: string): Promise<Comment[]> => {
    const response = await axiosInstance.get(`/posts/${postId}/comments`);
    return response.data;
  };