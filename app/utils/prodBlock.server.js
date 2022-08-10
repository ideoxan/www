export default () => {
    if (process?.env.NODE_ENV === "production")
        throw new Response("WIP", {
            status: 404,
            statusText: "WIP",
        })
}
