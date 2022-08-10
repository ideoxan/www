export default function CourseCard({
    title = null,
    description = null,
    comingSoon = false,
    infoURL = null,
    startURL = null,
    className = "",
}) {
    if (title == null || description == null) {
        throw new Error("Expected title and description to be defined.")
    }

    return (
        <div
            className={
                "group flex h-full w-full flex-col rounded-lg bg-gray-700 px-4 py-3 ring-0 ring-gray-500 ring-opacity-50 hover:translate-y-px hover:scale-105 " +
                className
            }>
            <h3 className="bg-gradient-white bg-clip-text text-left font-sans text-xl font-bold tracking-tight text-transparent">
                {title}
            </h3>
            {/* {comingSoon ? (
                <div className="mt-1 bg-secondary bg-opacity-25 text-secondary font-sans font-bold text-2xs rounded-full px-2 py-1 w-max uppercase">
                    Coming Soon
                </div>
            ) : null} */}
            <p className="paragraph my-2 h-full truncate text-left text-sm text-gray-50">
                {description}
            </p>
            <div className="flex w-full flex-row">
                <a
                    href={infoURL}
                    className="inline-block text-sm font-medium tracking-tight text-gray-50 opacity-50 hover:opacity-100">
                    Learn More
                </a>
                <a
                    href={startURL}
                    className="ml-auto inline-block text-sm font-extrabold tracking-tight text-secondary opacity-100 hover:opacity-80">
                    Start --&gt;
                </a>
            </div>
        </div>
    )
}
