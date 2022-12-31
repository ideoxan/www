export default function SchemaJSONLD() {
    let schema = {
        "@context": "https://schema.org",
        "@type": "Corporation",
        name: "Ideoxan",
        url: "https://ideoxan.com/",
        logo: "https://ideoxan.com/images/ix_logo_purple_1024_1024.png",
        sameAs: [
            "https://twitter.com/ideoxan",
            "https://www.linkedin.com/company/75633123",
            "https://github.com/ideoxan",
            "https://ideoxan.com",
        ],
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema),
            }}
        />
    )
}
