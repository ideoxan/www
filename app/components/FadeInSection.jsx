import { useEffect, useRef, useState } from "react"

export default function FadeInSection({
    disable = false,
    children,
    direction = "up",
    threshold = 0.4,
    className = "",
    ...props
}) {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true)

                    observer.unobserve(ref.current)
                }
            },
            {
                threshold: threshold,
            }
        )

        observer.observe(ref.current)

        return () => observer.unobserve(ref.current)
    }, [])

    let animationToUse = ""
    switch (direction) {
        case "down":
            animationToUse = "animate-fade-in-down"
            break
        case "left":
            animationToUse = "animate-fade-in-left"
            break
        case "right":
            animationToUse = "animate-fade-in-right"
            break
        default:
            animationToUse = "animate-fade-in-up"
            break
    }

    if (disable) {
        return (
            <div ref={ref} className={"opacity-100 " + className} {...props}>
                {children}
            </div>
        )
    } else {
        return (
            <div
                ref={ref}
                className={"opacity-0 " + (isVisible ? animationToUse : "") + " " + className}
                {...props}
            >
                {children}
            </div>
        )
    }
}
