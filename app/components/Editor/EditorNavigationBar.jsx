import Icon from 'app/components/Icon'
import { Link } from "@remix-run/react"

export default function EditorNavigationBar({
    courseUUID,
    lessonIndex,
    lessonName,
    chapterIndex,
    courseName,
    navigationNext,
    navigationPrevious
}) {

    let navIcons = {
        size: 4,
        stroke: 2,
        color: 'gray-50'
    }

    return (
        <nav className="w-full bg-gray-700 flex flex-row py-3 px-4 border-b border-b-gray-500 border-opacity-20">

            {/* Ideoxan Logo */}
            <Link to="/" className="flex my-auto w-1/4">
                <img src="/images/ix_logo_white_trans_253x50.png" alt="Ideoxan" className="h-3 opacity-50" />
            </Link>

            {/* Lesson Header */}
            <h1 className="font-sans font-bold text-xs text-center w-1/2 text-gray-50 my-auto">Lesson {lessonIndex + 1}: {lessonName} (Chapter {chapterIndex + 1}) &mdash; {courseName}</h1>

            {/* Navigation Buttons */}
            <div className="flex flex-row w-1/4 space-x-4 justify-end my-auto">

                {/* Previous Lesson */}
                {navigationPrevious && (
                    <a href={"/learn/" + courseUUID + "/" + navigationPrevious[0] + "/" + navigationPrevious[1]}>
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
                <a href={"/courses/#" + courseUUID}>
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
                {navigationNext && (
                    <a href={"/learn/" + courseUUID + "/" + navigationNext[0] + "/" + navigationNext[1]}>
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
