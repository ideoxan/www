import { useLoaderData } from "@remix-run/react"

export const meta = () => {
    return {
        title: "Terms | Ideoxan",
    }
}

export const loader = async () => {
    throw new Response("Not Found", {
        status: 404,
        statusText: "WIP",
    })
}

export default function Privacy() {
    const data = useLoaderData()

    return null
}
