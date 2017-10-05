import React from "react";
import ReactDOM from "react-dom";
import FormButtonClose from "./FormButtonClose";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FormButtonClose />, div);
});
