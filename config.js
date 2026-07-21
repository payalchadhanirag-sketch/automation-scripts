module.exports = {
  baseURL:
    process.env.TEST_ENV === "live"
      ? "https://www.direct-optic.fr"
      : "https://preprod.direct-optic.fr",

  httpCredentials:
    process.env.TEST_ENV === "live"
      ? undefined
      : {
          username: "nirag",
          password: "p6s+ec:xXtn6C7^VIpMl",
        },
};
