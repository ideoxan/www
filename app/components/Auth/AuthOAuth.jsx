import { oauthSignIn } from "app/utils/db.client"
import { Facebook, Github, Google, Linkedin, Twitter } from "@icons-pack/react-simple-icons"

export default function AuthOAuth() {
    return (
        <div className="flex flex-row justify-between px-8">

            <button className="text-gray-50 opacity-70 hover:opacity-100 flex flex-row">
                <Google width={18} />
            </button>
            <button className="text-gray-50 opacity-70 hover:opacity-100 flex flex-row">
                <Facebook width={18} />
            </button>
            <button className="text-gray-50 opacity-70 hover:opacity-100 flex flex-row">
                <Twitter width={18} />
            </button>
            <button
                className="text-gray-50 opacity-70 hover:opacity-100 flex flex-row"
                onClick={() => oauthSignIn({ provider: "github" })}
            >
                <Github width={18} />
            </button>
            <button className="text-gray-50 opacity-70 hover:opacity-100 flex flex-row">
                <Linkedin width={18} />
            </button>

        </div>
    )
}
