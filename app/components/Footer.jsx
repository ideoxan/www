import Icon from "app/components/Icon"

export default function Footer() {
    return (
        <footer
            id="footer"
            className="flex w-full flex-col overflow-hidden bg-gray-900 py-8 md:py-12"
        >
            {/* Features */}
            <div className="section-container flex-col px-8">
                {/* Made with */}
                <h2 className="group mx-auto text-center font-sans text-base font-extrabold text-gray-50 opacity-20 hover:opacity-50">
                    Made with <span className="group-hover:text-red-500">❤</span> by ideoxan
                </h2>
                <p className="text-medium mt-2 text-center text-2xs text-gray-50 opacity-20">
                    All content is available under either the MIT License, Mozilla Public License
                    2.0, or by CC-BY-SA 4.0 Intl., except where otherwise noted.
                </p>
                <p className="text-medium text-center text-2xs text-gray-50 opacity-20">
                    All trademarks and rights, including the Ideoxan logo, wordmark, and brand are
                    property of their respective owners.
                </p>
                <p className="text-medium text-center text-2xs text-gray-50 opacity-20">
                    (C) 2020-2022 Ampersand Interactive (LLC). Ampersand Interactive (LLC) is the
                    parent company of Ideoxan. All rights reserved.
                </p>
                <div className="mx-auto mt-6 flex flex-row">
                    <a
                        href="https://discord.gg/jxqKy6r"
                        className="px-6 opacity-20 hover:opacity-50"
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
                        className="px-6 opacity-20 hover:opacity-50"
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
                        className="px-6 opacity-20 hover:opacity-50"
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
                <div className="mx-auto mt-6 flex flex-row">
                    <a
                        href="/privacy"
                        className="px-4 pt-px text-center font-sans text-xs font-bold text-gray-50 opacity-20 hover:opacity-50"
                    >
                        Privacy
                    </a>
                    <div className="text-center font-sans text-sm font-normal text-gray-50 opacity-20">
                        |
                    </div>
                    <a
                        href="/terms"
                        className="px-4 pt-px text-center font-sans text-xs font-bold text-gray-50 opacity-20 hover:opacity-50"
                    >
                        Terms
                    </a>
                </div>
            </div>
        </footer>
    )
}
