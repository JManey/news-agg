import React from "react";
import { Story } from "../components/Story";
import { singularStory } from "../fixtures/index";
import { getStory } from "../services/hnApi";
import { cleanup, render, waitForElement } from "@testing-library/react";

beforeEach(() => {
  cleanup();
  jest.resetAllMocks();
});

jest.mock("../services/hnApi", () => ({
  getStory: jest.fn()
}));

test("renders the story component with content", async () => {
  getStory.mockImplementation(() => Promise.resolve(singularStory));

  const { getByText, queryByTestId } = render(<Story storyId="1" />);
  await waitForElement(() => [
    queryByTestId("story"),
    expect(getByText("Its alive: for testing")).toBeTruthy(),
    expect(queryByTestId("story-by").textContent).toEqual("By: Justin")
  ]);
});
