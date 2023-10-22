const router = require("express").Router();

const userManager = require("../managers/userManager");
const { TOKEN_KEY } = require("../config/constants");
const { getErrorMessage } = require("../utils/errorHelpers");

router.get("/login", (req, res) => {
  // equivalent of /users/login
  res.render("users/login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await userManager.login(username, password);

    res.cookie(TOKEN_KEY, token); // create cookie named token and add token info

    res.redirect("/");
  } catch (err) {
    res.render("users/login", { error: getErrorMessage(err) });
  }
});

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post("/register", async (req, res, next) => {
  const { username, email, password, repeatPassword } = req.body;

  try {
    const token = await userManager.register({ username, email, password, repeatPassword });

    //res.send('Registered')
    res.cookie(TOKEN_KEY, token)
    res.redirect("/"); // automated redirect to login page after registration
  } catch (err) {
    res.render("users/register", { error: getErrorMessage(err), username, email, }); // second parameters for pre-fill form 
    //next(err)
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie(TOKEN_KEY);

  res.redirect("/");
});

module.exports = router;
