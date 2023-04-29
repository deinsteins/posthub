import { Box, Heading, Stack, Text, Button, Spinner, Flex } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Post from "../../types/Post";
import { fetchPost, fetchPosts, fetchComments } from "@/utils/api/post";

interface Props {
  post: Post;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchPosts();
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params?.id;
  if (!id) {
    return {
      notFound: true,
    };
  }

  const post = await fetchPost(id);
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

export default function PostDetail({ post }: Props) {
  const router = useRouter();
  const id = router.query?.id;
  const { data: comments, isLoading } = useQuery(["comments", post.id], () =>
    fetchComments(post.id)
  );

  if (router.isFallback) {
    return <Text>Loading post...</Text>;
  }

  
  const handleEditClick = () => {
    router.push(`/edit-post/${id}`);
  };

  return (
    <Stack p={8} spacing={8}>
      <Heading as="h1" size="xl">
        {post.title}
      </Heading>
      <Flex borderWidth="1px" p={4} rounded="md" gap={6} justifyContent="space-between">
        <Text>{post.body}</Text>
        <Button p={6} colorScheme="blue" onClick={handleEditClick}>
          Edit Post
        </Button>
      </Flex>
      <Box>
        <Heading as="h2" size="md">
          Comments
        </Heading>
        {isLoading ? (
          <Spinner />
        ) : (
          comments?.map((comment) => (
            <Box key={comment.id} borderWidth="1px" p={4} rounded="md">
              <Text fontWeight="bold">{comment.name}</Text>
              <Text>{comment.body}</Text>
            </Box>
          ))
        )}
      </Box>
    </Stack>
  );
}
