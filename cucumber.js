module.exports = {
  default: {
    require: ["features/step-definitions/*.js", "features/support/*.js"],
    format: ["progress"],
    publishQuiet: true,
  },
};
