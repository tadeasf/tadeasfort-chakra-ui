// react-snap.config.js
module.exports = {
  preProcess: (routes) => {
    const customRoutes = [
      "/",
      "/about", // Add more URLs of the routes you want to pre-render
      // "/data", // You can exclude "/data" from pre-rendering
    ];

    const filteredRoutes = routes.filter((route) =>
      customRoutes.includes(route.url)
    );

    return filteredRoutes;
  },
};
