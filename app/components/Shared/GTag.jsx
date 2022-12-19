import { useLocation } from "@remix-run/react"
import { useEffect } from "react"
import { pageView } from "app/utils/gtag.client"

export default function GTag() {
    const location = useLocation()
    const gaTrackingId = (global || window).env.GA_TRACKING_ID

    useEffect(() => {
        // Record page view (since react router doesn't do it for us)
        if (gaTrackingId?.length) pageView(location.pathname, gaTrackingId)
    }, [location, gaTrackingId])

    if (!gaTrackingId?.length) return null // No GA tracking ID
    if ((global || window).env.WORKER_ENV === "development") return null // Allow staging and prod

    return (
        <>
            <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}></script>
            <script
                async
                id="gtag-init"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){window.dataLayer.push(arguments)};
                        gtag('js', new Date());
                        gtag('config','${gaTrackingId}', {
                            page_path: window.location.pathname
                        })`,
                }}
            />
        </>
    )
}
