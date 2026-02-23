import type { Route } from "./+types/home";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "RESTExplore" },
    { name: "Check out countries data!", content: "Welcome to Rest Explore!" },
  ];
}

export default function Home() {
  return <><div>home page</div></>;
}
