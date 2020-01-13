import React from "react";
import Card from "../Card/Card";
import renderer from "react-test-renderer";

test("Card changes date of article", () => {
  const card = renderer.create(
    <Card />
  );
  let tree = card.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onClick();

  // re-rendering
  tree = card.toJSON();
  expect(tree).toMatchSnapshot();
});
