import React from "react";
import ReactDOM from "react-dom";
import CatalogDetails from "./CatalogDetails";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CatalogDetails />, div);
});
