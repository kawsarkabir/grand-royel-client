export const dataPromise = fetch(
  'https://jsonplaceholder.typicode.com/posts',
).then((res) => res.json());
