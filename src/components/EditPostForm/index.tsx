import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { updatePost } from "@/utils/api/post";
import Post from "@/types/Post";
import { AxiosError } from "axios";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { CreateAlert } from "../CreateAlert";

type EditPostFormProps = {
  post: Post;
};

type EditPostFormInputs = {
  title: string;
  body: string;
};

export const EditPostForm = ({ post }: EditPostFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } = {} } = useForm<EditPostFormInputs>({
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  });

  const { mutateAsync, isError, error } = useMutation(updatePost);

  const onSubmit = async (data: EditPostFormInputs) => {
    setIsLoading(true);
    await mutateAsync({
      id: post.id, 
      ...data,
      userId: 1
    });
    setIsLoading(false);
    setIsSubmitting(true);
    setTimeout(() => {
      router.push(`/posts/${post.id}`);
    }, 1000); 
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors?.title !== undefined}>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            {...register("title", { required: true })}
            id="title"
            name="title"
            placeholder="Enter a title"
            defaultValue={post.title}
          />
          {errors?.title && (
            <FormErrorMessage>Title is required</FormErrorMessage>
          )}
        </FormControl>

        <FormControl mt={4} isInvalid={errors?.body !== undefined}>
          <FormLabel htmlFor="body">Body</FormLabel>
          <Textarea
            {...register("body", { required: true })}
            id="body"
            name="body"
            placeholder="Enter the post body"
            defaultValue={post.body}
          />
          {errors?.body && (
            <FormErrorMessage>Body is required</FormErrorMessage>
          )}
        </FormControl>

        <Button mt={4} isLoading={isLoading} type="submit">
          Save Changes
        </Button>
      </form>

      {isError && (
        <FormControl mt={4} isInvalid={true}>
          <FormErrorMessage>{(error as AxiosError).message}</FormErrorMessage>
        </FormControl>
      )}
      { isSubmitting && (
        <CreateAlert message="Data changed successfully" />
      )}
    </>
  );
};
