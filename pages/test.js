import api from '../lib/axios';

export default function Posts({ posts }) {
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.name}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await api.get('/hello');
  const posts = response.data;
  console.log(posts)
  return {
    props: {
      posts,
    }
  };
}