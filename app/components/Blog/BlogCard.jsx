import formatDate from "app/utils/formatDate"
import trimStringToWord from "app/utils/trimStringToWord"

export default function BlogCard({ post, ...props }) {
    return (
        <div
            className="flex flex-col flex-1 rounded-md ring-1 ring-opacity-30 ring-gray-500 bg-gray-700 w-full h-full hover:scale-105 hover:translate-y-px cursor-pointer"
            onClick={() => {
                window.location = "/blog/post/" + post.attributes.slug
            }}
            {...props}
        >
            <img
                src={post.attributes.thumbnail}
                className="w-full h-48 object-cover rounded-t-md"
                alt={post.attributes.title + "'s thumbnail"}
            />
            <div className="flex flex-col px-6 py-6 h-full w-full">
                <div className="text-secondary font-sans font-bold text-2xs uppercase">
                    {post.attributes.type}
                </div>
                <h3 className="mt-3 font-sans font-semibold tracking-tight text-left text-lg text-gray-50">
                    {post.attributes.title}
                </h3>
                <p className="mt-3 font-sans font-normal text-left text-sm text-gray-50 opacity-80">
                    {trimStringToWord(post.attributes.description, 128) + "..."}
                </p>
                <div className="mt-auto pt-8 flex flex-row">
                    <img
                        src="/images/ix_logo_purple_1024_1024.png"
                        alt={post.attributes.author + "'s Profile Picture"}
                        className="w-8 h-8 my-auto rounded-full"
                    />
                    <div className="flex flex-col ml-4">
                        <p className="font-sans font-medium text-left text-sm text-gray-50 opacity-80">
                            Posted by{" "}
                            <a
                                href={post.attributes.author.replace("@", "/user/")}
                                className="hover:underline"
                            >
                                {post.attributes.author}
                            </a>
                        </p>
                        <p className="mt-0.5 font-sans font-bold text-left text-2xs text-gray-100 opacity-80">
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
