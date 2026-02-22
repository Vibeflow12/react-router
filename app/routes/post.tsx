import { Form, Link, redirect, useFetcher } from "react-router";
import type { Route } from "./+types/post";
import about from "./about";

export async function clientLoader({ params }: Route.LoaderArgs) {
    const postId = params.postId;
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    return await res.json()
}
export async function clientAction({ params }: Route.ClientActionArgs) {
    try {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`, {
            method: "DELETE"
        });
        return { isDeleted: true }
    } catch (err) {
        return { isDeleted: false }
    }
}

export default function Post({ loaderData }: Route.ComponentProps) {

    const Fetcher = useFetcher();
    const isDeleted = Fetcher.data?.isDeleted

    return (
        <div>
            {!isDeleted && (
                <>
                    <p>Title: {loaderData.title}</p>
                    <p>Body : {loaderData.body}</p>
                    <p>Id: {loaderData.id}</p>
                </>
            )}

            <Fetcher.Form method="delete">
                <button type="submit">Delete</button>
            </Fetcher.Form>

            <Link to="/about">About</Link>
        </div >
    )
}