import { CssThree, Html5, Javascript, Json, Typescript } from "@icons-pack/react-simple-icons"

// List of supported languages, associated file extensions, MIME types, and icons
export default {
    null: {
        name: "New Tab",
        icon: null,
        color: "#fff",
        extension: null,
        mime: null,
    },
    html: {
        name: "Hypertext Markup Language",
        icon: Html5,
        color: "#E34F26",
        extension: "html",
        mime: "text/html",
    },
    javascript: {
        name: "JavaScript",
        icon: Javascript,
        color: "#F7DF1E",
        extension: "js",
        mime: "application/javascript",
    },
    typescript: {
        name: "TypeScript",
        icon: Typescript,
        color: "#3178C6",
        extension: "ts",
        mime: "application/typescript",
    },
    json: {
        name: "JavaScript Object Notation",
        icon: Json,
        color: "#ffffff",
        extension: "json",
        mime: "application/json",
    },
    css: {
        name: "Cascading Style Sheets",
        icon: CssThree,
        color: "#3178C6",
        extension: "css",
        mime: "text/css",
    },
    plaintext: {
        name: "Plain Text",
        icon: null,
        color: "#fff",
        extension: "txt",
        mime: "text/plain",
    },
}
