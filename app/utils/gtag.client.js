export const event = ({ name, parameters = {} }) => {
    if (!window.gtag) {
        console.warn("Google Analytics not loaded.")
        return
    }

    window.gtag("event", name, parameters)
}

export const pageView = (url, gaTrackingId) => {
    if (!window.gtag) {
        console.warn("Google Analytics not loaded.")
        return
    }

    window.gtag("config", gaTrackingId, {
        page_path: url,
    })
}
