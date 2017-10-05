import React from "react";
import ReactDOM from "react-dom";
import CatalogTable from "./CatalogTable";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CatalogTable />, div);
});
