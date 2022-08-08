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
                "group flex flex-col px-4 py-3 bg-gray-700 rounded-lg ring-0 ring-gray-500 ring-opacity-50 w-full h-full hover:scale-105 hover:translate-y-px " +
                className
            }
        >
            <h3 className="font-sans text-transparent bg-gradient-white bg-clip-text text-left tracking-tight text-xl font-bold">
                {title}
            </h3>
            {/* {comingSoon ? (
                <div className="mt-1 bg-secondary bg-opacity-25 text-secondary font-sans font-bold text-2xs rounded-full px-2 py-1 w-max uppercase">
                    Coming Soon
                </div>
            ) : null} */}
            <p className="paragraph h-full text-sm my-2 text-gray-50 text-left truncate">
                {description}
            </p>
            <div className="flex flex-row w-full">
                <a
                    href={infoURL}
                    className="inline-block text-gray-50 opacity-50 hover:opacity-100 text-sm font-medium tracking-tight"
                >
                    Learn More
                </a>
                <a
                    href={startURL}
                    className="ml-auto inline-block text-secondary opacity-100 hover:opacity-80 text-sm font-extrabold tracking-tight"
                >
                    Start --&gt;
                </a>
            </div>
        </div>
    )
}
