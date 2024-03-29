import Icon from "app/components/Icon"
import { Link } from "@remix-run/react"

export default function LearnAppNavigationBar({ metadata }) {
    let navIcons = {
        size: 4,
        stroke: 2,
        color: "gray-50",
    }

    return (
        <nav className="flex w-full flex-shrink-0 flex-row border-b border-b-gray-500 border-opacity-20 bg-gray-700 py-3 px-4">
            {/* Ideoxan Logo */}
            <Link to="/" className="my-auto flex w-1/4">
                <img
                    src="/images/ix_logo_white_trans_253x50.png"
                    alt="Ideoxan"
                    className="h-3 opacity-50"
                />
            </Link>

            {/* Lesson Header */}
            <h1 className="my-auto w-1/2 text-center font-sans text-xs font-bold text-gray-50">
                Lesson {metadata.lesson.index + 1}: {metadata.lesson.name} (Chapter{" "}
                {metadata.chapter.index + 1}) &mdash; {metadata.course.name}
            </h1>

            {/* Navigation Buttons */}
            <div className="my-auto flex w-1/4 flex-row justify-end space-x-4">
                {/* Previous Lesson */}
                {metadata.lesson.previous && (
                    <a href={"/learn/" + metadata.lesson.previous}>
                        <Icon
                            name="ArrowLeft"
                            width={navIcons.size}
                            height={navIcons.size}
                            color={navIcons.color}
                            strokeThickness={navIcons.stroke}
                            className="my-auto opacity-50 hover:opacity-100"
                        />
                    </a>
                )}

                {/* Courses Page */}
                <a href={"/courses/#" + metadata.course.id}>
                    <Icon
                        name="Library"
                        width={navIcons.size}
                        height={navIcons.size}
                        color={navIcons.color}
                        strokeThickness={navIcons.stroke}
                        className="my-auto opacity-50 hover:opacity-100"
                    />
                </a>

                {/* Next Lesson */}
                {metadata.lesson.next && (
                    <a href={"/learn/" + metadata.lesson.next}>
                        <Icon
                            name="ArrowRight"
                            width={navIcons.size}
                            height={navIcons.size}
                            color={navIcons.color}
                            strokeThickness={navIcons.stroke}
                            className="my-auto opacity-50 hover:opacity-100"
                        />
                    </a>
                )}
            </div>
        </nav>
    )
}
