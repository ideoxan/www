export default () => {
    if (global?.env?.WORKER_ENV === "production")
        throw new Response("WIP", {
            status: 404,
            statusText: "WIP",
        })
}
