import { oauthSignIn } from "app/utils/db.client"
import { Facebook, Github, Google, Linkedin, Twitter } from "@icons-pack/react-simple-icons"

export default function AuthOAuth() {
    return (
        <div className="flex flex-row justify-between px-8">
            <button
                className="flex flex-row text-gray-50 opacity-70 hover:opacity-100"
                onClick={() => oauthSignIn({ provider: "google" })}
            >
                <Google width={18} />
            </button>
            <button
                className="flex flex-row text-gray-50 opacity-70 hover:opacity-100"
                onClick={() => oauthSignIn({ provider: "facebook" })}
            >
                <Facebook width={18} />
            </button>
            <button
                className="flex flex-row text-gray-50 opacity-70 hover:opacity-100"
                onClick={() => oauthSignIn({ provider: "twitter" })}
            >
                <Twitter width={18} />
            </button>
            <button
                className="flex flex-row text-gray-50 opacity-70 hover:opacity-100"
                onClick={() => oauthSignIn({ provider: "github" })}
            >
                <Github width={18} />
            </button>
            <button
                className="flex flex-row text-gray-50 opacity-70 hover:opacity-100"
                onClick={() => oauthSignIn({ provider: "linkedin" })}
            >
                <Linkedin width={18} />
            </button>
        </div>
    )
}
