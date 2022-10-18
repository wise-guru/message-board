var express = require("express");
var router = express.Router();

const today = new Date();

//Convert date to MM/DD/YY
const date =
  (today.getMonth().toString().length >= 1
    ? today.getMonth() + 1
    : "0" + (today.getMonth() + 1)) +
  "/" +
  (today.getDate().toString().length >= 1
    ? today.getDate()
    : "0" + today.getDate()) +
  "/" +
  today.getFullYear();
console.log(date);

const messages = [
  {
    text: "Hi there!",
    user: "Rick",
    added: date,
  },
  {
    text: "Hello World!",
    user: "Brian",
    added: date,
  },
];

function newMessageForm(req, res) {
  router.get("/", function (req, res, next) {
    res.render("form", { title: "New Message" });
  });
}

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Mini Message Board",
    messages: messages,
    newMessageForm: newMessageForm,
  });
});

router.post("/new-message", function (req, res) {
  const messageText = req.body.messageText;
  const messageUser = req.body.messageUser;
  messages.push({ text: messageText, user: messageUser, added: date });
  res.redirect("/");
});

module.exports = router;
