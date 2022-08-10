export default () => {
    if (process?.env.NODE_ENV === "production")
        throw new Response("Not Found", {
            status: 404,
            statusText: "WIP",
        })
}
