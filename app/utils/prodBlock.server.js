export default ctx => {
    if (ctx?.WORKER_ENV === "production")
        throw new Response("WIP", {
            status: 404,
            statusText: "WIP",
        })
}
