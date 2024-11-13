const express = require("express");
const app = express();

//1. Be Polite, Greet the User

//create a route
app.get("/greetings/:username", (req, res) => {
  const username = req.params.username;
  res.send(`Hello there, ${username}!`);
});

//2. Rolling the Dice

//set a function, make sure the user input number
function isNumericUrl(a) {
  const numericRegex = /^\d+$/;
  return numericRegex.test(a);
}

//create a route
app.get("/roll/:num", (req, res) => {
  const num = req.params.num;
  // if isNumerUrl() is number,res number,else you must specify a number
  if (isNumericUrl(num)) {
    res.send(`your rolles a ${num}`);
  } else {
    res.send("you must specify a number");
  }
});

//3. I Want THAT One!
// Task: Create a route for URLs like /collectibles/<index-parameter>.

// Examples: Matches routes such as /collectibles/2 or /collectibles/0.
const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

app.get("/collectibles/:itemId", (req, res) => {
  const index = req.params.itemId;
  const item = collectibles[index];
  if (index < collectibles.length) {
    res.send(
      `So, you want the ${item.name}? For ${item.price}, it can be yours!`
    );
  } else {
    res.send("This item is not yet in stock. Check back soon!");
  }
});

//4. Filter Shoes by Query Parameters
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.get("/shoes", (req, res) => {
  const filteredShoes = shoes.filter((shoe) => {
    if (
      req.query["min-price"] &&
      shoe.price < pareInt(req.query["min-price"])
    ) {
      return false;
    }
    if (
      req.query["max-price"] &&
      shoe.price > parseInt(req.query["max-price"])
    ) {
      return false;
    }
    if (req.query.type && shoe.type !== req.query.type) {
      return false;
    }
    return true;
  });
  res.json(filteredShoes);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
