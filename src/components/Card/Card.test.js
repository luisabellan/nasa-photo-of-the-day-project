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
/* 
The test fails because there is a expected change between snapshots: the date for the articles changes because even tho it's finally shown in a this format: January 13th 2020, it is taken from the API in UTC format, and that includes hours, minutes and seconds, and those change from snapshot to snapshot.
As no unexpected changes occur we can consider the test valid and update the snapshot by pressing 'u' after yarn test produces de output. (The date syntax is managed by moment.js).

Accroding to the docs at https://jestjs.io/docs/en/snapshot-testing :

Snapshot Testing

Snapshot tests are a very useful tool whenever you want to make sure your UI does not change unexpectedly.

A typical snapshot test case for a mobile app renders a UI component, takes a snapshot, then compares it to a reference snapshot file stored alongside the test. The test will fail if the two snapshots do not match: either the change is unexpected, or the reference snapshot needs to be updated to the new version of the UI component.
 */