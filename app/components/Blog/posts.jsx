let posts = []

export default posts.sort((a, b) => b.attributes.date - a.attributes.date).reduce((a, e) => {
    a[e.attributes.slug] ??= e
    return a
}, {})
