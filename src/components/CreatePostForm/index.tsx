import { FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { createPost } from "@/utils/api/post";
import Post from "@/types/Post";
import { useState } from "react";
import { CreateAlert } from "../CreateAlert";

type FormData = {
  title: string;
  body: string;
};

export default function CreatePostForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const post: Post = {
        id: "",
        title: data.title,
        body: data.body,
        userId: 1,
    };

    await createPost(post);

    setIsLoading(false);
    setIsSubmitting(true);
    setTimeout(() => {
      router.push('/');
    }, 1000); 
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb={4} isInvalid={!!errors.title}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          {...register("title", { required: true })}
          id="title"
          placeholder="Enter title"
        />
        {errors.title && <span role="alert">Title is required</span>}
      </FormControl>
      <FormControl mb={4} isInvalid={!!errors.body}>
        <FormLabel htmlFor="body">Body</FormLabel>
        <Textarea
          {...register("body", { required: true })}
          id="body"
          placeholder="Enter body"
        />
        {errors.body && <span role="alert">Body is required</span>}
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit" isLoading={isLoading}>
        Create Post
      </Button>
    </form>
    {isSubmitting && (
      <CreateAlert message="Post uploaded successfully" />
    )}
  </>
  );
}
