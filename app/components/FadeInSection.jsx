import { useEffect, useRef, useState } from "react"

export default function FadeInSection({ children }) {
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

    return (
        <div ref={ref} className={"opacity-0" + (isVisible ? " animate-fade-in-up" : "")}>
            {children}
        </div>
    )
}
