import { defineConfig } from "vitepress";

const siteCopyright = "Copyright © 2024-present Garrett Flynn and Contributors";

export default defineConfig({
  lang: "en-US",
  title: "Brains@Play",
  description: "Brain-Computer Interfaces with Everyone",

  head: [["link", { rel: "icon", href: "/favicon.ico" }]],

  themeConfig: {
    sidebar: {
      "/projects": [
        {
          text: "The Brains@Play Initiative",
          items: [
            {
              text: "International Competition",
              link: "/projects/initiative/brains-and-games-competition",
            },
            {
              text: "High School Course",
              link: "/projects/initiative/brains-at-play-course",
            },
            {
              text: "Public Engagement Event",
              link: "/projects/initiative/livewire",
            },
          ],
        },
      ],
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/neuralinterfaces/brainsatplay",
      },
    ],

    aside: false,
    footer: {
      message: "Built with 🧠 by Garrett Flynn",
      copyright: siteCopyright,
    },
  },
});
