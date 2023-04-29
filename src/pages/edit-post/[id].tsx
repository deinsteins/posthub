import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Heading, Spinner } from '@chakra-ui/react';
import Post from '@/types/Post';
import { fetchPost } from '@/utils/api/post';
import { EditPostForm } from '@/components/EditPostForm';

const EditPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const postData = await fetchPost(Number(id));
        setPost(postData);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      getPost();
    }
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error fetching post data</div>;
  }

  return (
    <Container p={4}>
      <Heading mb={8}>Edit Post</Heading>
      {post && <EditPostForm post={post} />}
    </Container>
  );
};

export default EditPost;
