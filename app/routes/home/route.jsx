import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Home } from './home';

export const loader = async () => {
  return json({});
};

export default function HomeRoute() {
  const data = useLoaderData();
  return <Home />;
}