import React from "react";
import { StoriesContainer } from "../containers/StoriesContainer";
import { render, cleanup, waitForElement } from "@testing-library/react";
import { storyIds, singularStory } from "../fixtures/index";
import { getStory, getStoryIds } from "../services/hnApi";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { STORY_INCREMENT } from "../constants/index";

beforeEach(cleanup);

jest.mock("../hooks/useInfiniteScroll.js");

jest.mock("../services/hnApi", () => ({
  getStory: jest.fn(),
  getStoryIds: jest.fn()
}));

test("tests the storyContainer, although its the same as the App test", async () => {
  useInfiniteScroll.mockImplementation(() => ({
    count: STORY_INCREMENT
  }));
  getStory.mockImplementation(() => Promise.resolve(singularStory));
  getStoryIds.mockImplementation(() => Promise.resolve(storyIds));

  const { getByText, queryByTestId } = render(<StoriesContainer />);
  await waitForElement(() => [
    expect(getByText("Hacker News Stories")).toBeTruthy(),
    expect(getByText("Its alive: for testing")).toBeTruthy(),
    expect(queryByTestId("story-by").textContent).toEqual("By: Justin")
  ]);
});
