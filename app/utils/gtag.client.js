export const event = ({ action, category, label, value }) => {
    if (!window.gtag) {
        console.warn("Google Analytics not loaded.")
        return
    }

    window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
    })
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
