export default () => ({
  app: {
    name: process.env.APP_NAME,
    env: process.env.NODE_ENV,
    port: parseInt(process.env.PORT || '3000', 10),
  },
  market: {
    tickInterval: parseInt(
      process.env.MARKET_TICK_INTERVAL_MS || '5000',
      10,
    ),
  },
});
