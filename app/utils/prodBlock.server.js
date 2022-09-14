export default ctx => {
    if (ctx?.NODE_ENV === "production")
        throw new Response("WIP", {
            status: 404,
            statusText: "WIP",
        })
}
