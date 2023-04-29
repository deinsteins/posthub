import { Box, Heading, Stack, Text, Link, Input, Card, CardBody, Spinner, Grid } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { useState } from "react";
import { useQuery } from "react-query";
import Post from "@/types/Post";
import { fetchPosts } from "@/utils/api/post";

interface Props {
  posts: Post[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await fetchPosts();
  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
};

export default function Posts({ posts }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: filteredPosts, isLoading } = useQuery(
    ["posts", searchTerm],
    () =>
      fetchPosts().then((data) =>
        data.filter(
          (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.body.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ),
    { enabled: !!searchTerm }
  );

  const displayedPosts = searchTerm ? filteredPosts : posts;

  return (
    <Stack spacing={8} p={8}>
      <Box p={4}>
        <Input
          variant="outline"
          type="text"
          placeholder="Search posts"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Grid templateColumns='repeat(4, 1fr)' gap={6}>
      {isLoading ? (
        <Spinner />
      ) : (
        displayedPosts?.map((post) => (
              <Link key={post.id} href={`/posts/${post.id}`}>
                <Card h="fit-content" _hover={{
                  bg: "gray.100",
                  boxShadow: "lg",
                  transform: "translateY(-4px)",
                }}>
                  <CardBody>
                    <Heading as="h2" size="md">
                    {post.title}
                    </Heading>
                    <Text>{post.body}</Text>
                  </CardBody>
                </Card>
              </Link>
        ))
      )}
      </Grid>
    </Stack>
  );
}
