import api from '../lib/axios';
import { GetStaticProps } from 'next';

interface Post {
  id: number;
  name: string;
}

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  console.log("sssssssssssssssssssss"+posts)
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.name}</li>
      ))}
    </ul>
  );
}

export const getStaticProps: GetStaticProps<PostsProps> = async () => {
  const response = await api.get('/api/hello');
  const posts = response.data;
  return {
    props: {
      posts,
    }
  };
}