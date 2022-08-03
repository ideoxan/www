import { useLoaderData } from "@remix-run/react"

export const loader = async () => {
    throw new Response("Not Found", {
        status: 404,
        statusText: "WIP"
    })
}

export default function Courses() {
    const data = useLoaderData()

    return null
}