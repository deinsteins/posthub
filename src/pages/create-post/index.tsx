import CreatePostForm from "@/components/CreatePostForm";
import { Container, Heading } from "@chakra-ui/react";

const CreatePost = () => {
  return (
    <Container p={4}>
      <Heading mb={8}>Create Post</Heading>
      <CreatePostForm />
    </Container>
  );
};

export default CreatePost;
