import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { getPosts } from '../../models/post.server';

type Post = {
  slug: string;
  title: string;
};

type LoaderData = {
  // Posts is whatever type getPosts resolves to.
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader = async () => {
  return json<LoaderData>({
    posts: await getPosts(),
  });
};

export default function Posts() {
  const { posts } = useLoaderData<LoaderData>();

  console.log(posts);
  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              className="text-blue-600 underline"
              to={post.slug}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}