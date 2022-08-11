import formatDate from "app/utils/formatDate"
import trimStringToWord from "app/utils/trimStringToWord"

export default function BlogCard({ post, ...props }) {
    return (
        <div
            className="flex h-full min-h-full w-96 flex-1 cursor-pointer flex-col rounded-md bg-gray-700 ring-1 ring-gray-500 ring-opacity-30 hover:translate-y-px hover:scale-105"
            onClick={() => {
                window.location = "/blog/post/" + post.attributes.slug
            }}
            {...props}>
            <img
                src={post.attributes.thumbnail}
                className="h-48 w-full rounded-t-md object-cover"
                alt={post.attributes.title + "'s thumbnail"}
            />
            <div className="flex h-full w-full flex-col px-6 py-6">
                <div className="font-sans text-2xs font-bold uppercase text-secondary">
                    {post.attributes.type}
                </div>
                <h3 className="mt-3 text-left font-sans text-lg font-semibold tracking-tight text-gray-50">
                    {post.attributes.title}
                </h3>
                <p className="mt-3 text-left font-sans text-sm font-normal text-gray-50 opacity-80">
                    {trimStringToWord(post.attributes.description, 128) + "..."}
                </p>
                <div className="mt-auto flex flex-row pt-8">
                    <img
                        src="/images/ix_logo_purple_1024_1024.png"
                        alt={post.attributes.author + "'s Profile Picture"}
                        className="my-auto h-8 w-8 rounded-full"
                    />
                    <div className="ml-4 flex flex-col">
                        <p className="text-left font-sans text-sm font-medium text-gray-50 opacity-80">
                            Posted by{" "}
                            <a
                                href={post.attributes.author.replace("@", "/user/")}
                                className="hover:underline">
                                {post.attributes.author}
                            </a>
                        </p>
                        <p className="mt-0.5 text-left font-sans text-2xs font-bold text-gray-100 opacity-80">
                            {formatDate(post.attributes.date)}
                            <span className="mx-2">•</span>
                            {post.readingTime.text}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
