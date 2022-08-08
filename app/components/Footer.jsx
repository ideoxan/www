import Icon from "app/components/Icon"

export default function Footer() {
    return (
        <footer
            id="footer"
            className="overflow-hidden flex w-full py-8 md:py-12 flex-col bg-gray-900"
        >
            {/* Features */}
            <div className="section-container flex-col px-8">
                {/* Made with */}
                <h2 className="font-sans font-extrabold text-base group mx-auto text-center text-gray-50 opacity-20 hover:opacity-50">
                    Made with <span className="group-hover:text-red-500">❤</span> by ideoxan
                </h2>
                <p className="text-gray-50 mt-2 text-2xs opacity-20 text-center text-medium">
                    All content is available under either the MIT License, Mozilla Public License
                    2.0, or by CC-BY-SA 4.0 Intl., except where otherwise noted.
                </p>
                <p className="text-gray-50 text-2xs opacity-20 text-center text-medium">
                    All trademarks and rights, including the Ideoxan logo, wordmark, and brand are
                    property of their respective owners.
                </p>
                <p className="text-gray-50 text-2xs opacity-20 text-center text-medium">
                    (C) 2020-2022 Ampersand Interactive (LLC). Ampersand Interactive (LLC) is the
                    parent company of Ideoxan. All rights reserved.
                </p>
                <div className="flex flex-row mt-6 mx-auto">
                    <a
                        href="https://discord.gg/jxqKy6r"
                        className="opacity-20 hover:opacity-50 px-6"
                    >
                        <Icon
                            name="MessageSquare"
                            width="6"
                            height="6"
                            color="gray-50"
                            strokeThickness="2"
                        />
                    </a>
                    <a
                        href="https://twitter.com/ideoxan"
                        className="opacity-20 hover:opacity-50 px-6"
                    >
                        <Icon
                            name="Twitter"
                            width="6"
                            height="6"
                            color="gray-50"
                            strokeThickness="2"
                        />
                    </a>
                    <a
                        href="https://github.com/ideoxan"
                        className="opacity-20 hover:opacity-50 px-6"
                    >
                        <Icon
                            name="Github"
                            width="6"
                            height="6"
                            color="gray-50"
                            strokeThickness="2"
                        />
                    </a>
                </div>
                <div className="flex flex-row mt-6 mx-auto">
                    <a
                        href="/privacy"
                        className="font-sans font-bold text-xs text-center text-gray-50 opacity-20 hover:opacity-50 px-4 pt-px"
                    >
                        Privacy
                    </a>
                    <div className="font-sans font-normal text-sm text-center text-gray-50 opacity-20">
                        |
                    </div>
                    <a
                        href="/terms"
                        className="font-sans font-bold text-xs text-center text-gray-50 opacity-20 hover:opacity-50 px-4 pt-px"
                    >
                        Terms
                    </a>
                </div>
            </div>
        </footer>
    )
}
