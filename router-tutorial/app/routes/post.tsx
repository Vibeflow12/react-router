import { Form, Link, redirect, useFetcher, useNavigation } from "react-router";
import type { Route } from "./+types/post";

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

    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location)

    const isDeleting = Fetcher.state !== "idle";

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

            {isDeleting && <p>post is deleting...</p>}

            <Link to="/about">About</Link>
        </div >
    )
}