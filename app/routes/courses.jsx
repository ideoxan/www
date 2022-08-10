import { useLoaderData } from "@remix-run/react"

export const loader = async () => {
    throw new Response("WIP", {
        status: 404,
        statusText: "WIP",
    })
}

export default function Courses() {
    const data = useLoaderData()

    return null
}
