// config.ts
export const config = {
  terms_date_confirm: new Date("2025-08-18"),
  privacy_date_confirm: new Date("2025-08-18"),

  metadata: {
    title: "Locora - Your Travel Companion",
    description:
      "Discover the world with Locora, your ultimate travel companion. Explore cities, find local tips, and make every trip effortless.",
    keywords: [
      "Locora",
      "travel",
      "city guide",
      "travel app",
      "trip planner",
      "local tips",
    ],
    applicationName: "Locora",
    authors: [{ name: "Locora Team", url: "https://locora.app" }],
    creator: "Locora",
    publisher: "Locora",
    robots: {
      index: true,
      follow: true,
    },
    themeColor: "#0f172a",
    openGraph: {
      title: "Locora - Your Travel Companion",
      description:
        "Plan smarter, travel better. Locora helps you explore cities with personalized tips, prices, and guides.",
      url: "https://locora.app",
      siteName: "Locora",
      images: [
        {
          url: "https://locora.app/images/banner.png",
          width: 1200,
          height: 630,
          alt: "Locora travel app",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    category: "travel",
    icons: {
      icon: [{ url: "/plane.png" }],
    },
  },
};
