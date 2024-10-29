import React from "react";
import { createRoot } from "react-dom/client";

const Pizza = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("p", {}, props.description),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Padre Gino's"),
    React.createElement(Pizza, {
      name: "The Pepperoni Pizza",
      description: "some dope pizza yo",
    }),
    React.createElement(Pizza, {
      name: "Americano Pizza",
      description: "some dope pizza yo",
    }),
    React.createElement(Pizza, {
      name: "The Hawaiian Pizza",
      description: "pineapple and ham, wtf America",
    }),
    React.createElement(Pizza, {
      name: "Chicken Pizza",
      description: "chicken nuggies on our pizza, wtf UK",
    }),
    React.createElement(Pizza, {
      name: "The Big Meat Pizza",
      description: "Bean",
    }),
  ]);
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
