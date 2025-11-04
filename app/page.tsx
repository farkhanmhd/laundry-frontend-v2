import { getProducts } from "./products";

export default async function Home() {
  const data = await getProducts();
  return <div>{JSON.stringify(data)}</div>;
}
