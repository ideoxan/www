import FadeInSection from "app/components/FadeInSection"
import Icon from "app/components/Icon"
import { Discord, Github, Twitter } from "@icons-pack/react-simple-icons"

export default function ContactSection({ session }) {
    return (
        <FadeInSection>
            <section id="contact" className="flex w-full flex-col overflow-hidden py-12 md:py-24">
                <div className="mx-auto flex w-full max-w-7xl flex-col space-x-6 md:flex-row">
                    <div className="my-auto flex w-full flex-col p-6">
                        <h2 className="section-header">Get in touch</h2>
                        <div className="flex flex-col md:flex-row">
                            <div className="flex flex-col pr-6 pb-6 md:w-1/3">
                                <h3 className="bg-gradient-white mt-6 bg-clip-text pb-2 text-left font-sans text-lg font-bold tracking-tight text-gray-50 text-transparent md:text-xl">
                                    General Inquires
                                </h3>
                                <p className="font-style-paragraph mb-4 md:mb-6">
                                    Have any questions or concerns? Get in touch with us. For the
                                    fastest response, join our{" "}
                                    <a
                                        href="https://discord.gg/jxqKy6r"
                                        className="underline hover:no-underline">
                                        Discord
                                    </a>{" "}
                                    server and send us a message.
                                </p>
                                <div className="mt-auto flex flex-row opacity-70">
                                    <Icon
                                        name="Phone"
                                        width={4}
                                        height={4}
                                        color="gray-50 my-auto"
                                        strokeThickness={2}
                                    />
                                    <div className="ml-4 flex flex-col">
                                        <p className="font-sans text-xs font-normal leading-5 text-gray-50 md:text-sm">
                                            +1 (929) 262 1699
                                        </p>
                                        <p className="font-sans text-xs font-normal leading-5 text-gray-50 md:text-sm">
                                            Mon - Fri, 9am to 5pm EST
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-row opacity-70">
                                    <Icon
                                        name="Mail"
                                        width={4}
                                        height={4}
                                        color="gray-50 my-auto"
                                        strokeThickness={2}
                                    />
                                    <div className="ml-4 flex flex-col">
                                        <p className="font-sans text-xs font-normal leading-5 text-gray-50 md:text-sm">
                                            hello@ideoxan.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col pr-6 pb-6 md:w-1/3">
                                <h3 className="bg-gradient-white mt-6 bg-clip-text pb-2 text-left font-sans text-lg font-bold tracking-tight text-gray-50 text-transparent md:text-xl">
                                    Technical Support Line
                                </h3>
                                <p className="font-style-paragraph mb-4 md:mb-6">
                                    Are you experiencing a technical problem with the website? Is
                                    something broken? Need help?
                                </p>
                                <div className="mt-auto flex flex-row opacity-70">
                                    <Icon
                                        name="Phone"
                                        width={4}
                                        height={4}
                                        color="gray-50 my-auto"
                                        strokeThickness={2}
                                    />
                                    <div className="ml-4 flex flex-col">
                                        <p className="font-sans text-xs font-normal leading-5 text-gray-50 md:text-sm">
                                            +1 (929) 262 1699
                                        </p>
                                        <p className="font-sans text-xs font-normal leading-5 text-gray-50 md:text-sm">
                                            Mon - Fri, 9am to 5pm EST
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-row opacity-70">
                                    <Icon
                                        name="Mail"
                                        width={4}
                                        height={4}
                                        color="gray-50 my-auto"
                                        strokeThickness={2}
                                    />
                                    <div className="ml-4 flex flex-col">
                                        <p className="font-sans text-xs font-normal leading-5 text-gray-50 md:text-sm">
                                            support@ideoxan.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col pr-6 pb-6 md:w-1/3">
                                <h3 className="bg-gradient-white mt-6 bg-clip-text pb-2 text-left font-sans text-lg font-bold tracking-tight text-gray-50 text-transparent md:text-xl">
                                    Socials
                                </h3>
                                <p className="font-style-paragraph mb-4 md:mb-6">
                                    Check out our social media profiles to stay up to date with the
                                    latest news.
                                </p>
                                <div className="mt-auto flex flex-row opacity-70">
                                    <Github width={16} className="my-auto text-gray-50" />
                                    <div className="ml-4 flex flex-col">
                                        <a
                                            href="https://github.com/ideoxan"
                                            className="font-sans text-xs font-normal leading-5 text-gray-50 underline hover:no-underline md:text-sm">
                                            GitHub
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-auto flex flex-row opacity-70">
                                    <Twitter width={16} className="my-auto text-gray-50" />
                                    <div className="ml-4 flex flex-col">
                                        <a
                                            href="https://twitter.com/ideoxan"
                                            className="font-sans text-xs font-normal leading-5 text-gray-50 underline hover:no-underline md:text-sm">
                                            Twitter
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-auto flex flex-row opacity-70">
                                    <Discord width={16} className="my-auto text-gray-50" />
                                    <div className="ml-4 flex flex-col">
                                        <a
                                            href="https://discord.gg/jxqKy6r"
                                            className="font-sans text-xs font-normal leading-5 text-gray-50 underline hover:no-underline md:text-sm">
                                            Discord
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </FadeInSection>
    )
}
