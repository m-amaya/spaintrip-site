module.exports = {
  title: "Spain 2019",
  themeConfig: {
    logo: "/spain-icon-button.png",
    nav: [
      { text: "Overview", link: "/overview/itinerary" },
      { text: "Cities", link: "/cities/barcelona" },
      { text: "GitHub", link: "https://github.com/m-amaya/spaintrip-site" }
    ],
    sidebar: {
      '/overview/': [{
        title: 'Overview',
        collapsable: false,
        children: [
          'itinerary',
          'flights',
          'transportation',
          'cost'
        ]
      }], '/cities/': [{
        title: 'Cities',
        collapsable: false,
        children: [
          'barcelona',
          'madrid',
          'cordoba',
          'seville',
          'granada',
          'valencia',
          'palma',
          'london'
        ]
      }]
    },
    sidebarDepth: 1,
    lastUpdated: true
  }
}