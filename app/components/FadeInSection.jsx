import { useEffect, useRef, useState } from "react"

export default function FadeInSection({ disable = false, children }) {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setIsVisible(true)

                observer.unobserve(ref.current)
            }
        })

        observer.observe(ref.current)

        return () => observer.unobserve(ref.current)
    }, [])

    if (disable) {
        return (
            <div ref={ref} className="opacity-100">
                {children}
            </div>
        )
    } else {
        return (
            <div ref={ref} className={"opacity-0" + (isVisible ? " animate-fade-in-up" : "")}>
                {children}
            </div>
        )
    }
}
