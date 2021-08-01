import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "../App";
import chatApi, { IChatMessage } from "../chatApi";

const message1: IChatMessage = {
  _id: "1",
  author: "Tom",
  message: "Message 1",
  timestamp: 0,
};

const message2: IChatMessage = {
  _id: "2",
  author: "Jerry",
  message: "Message 2",
  timestamp: 1,
};

describe("App", () => {
  beforeEach(async () => {
    jest.useFakeTimers();

    process.env.REACT_APP_USERNAME = "Jerry";
    chatApi.getMessages = jest
      .fn()
      .mockImplementationOnce(async () => [message1, message2])
      .mockImplementation(async () => []);
    chatApi.sendMessage = jest.fn().mockImplementation(async () => {});

    render(<App />);
    await waitFor(() =>
      expect(screen.getByText(message1.message)).toBeVisible()
    );
  });

  afterEach(() => {
    cleanup();
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it("fetches messages and renders fetchted messages", () => {
    expect(chatApi.getMessages).toHaveBeenCalledTimes(1);
    expect(screen.getByText(message1.message)).toBeVisible();
    expect(screen.getByText(message2.message)).toBeVisible();
  });

  it("sends request for inserted message and calls getMessages after", async () => {
    const inputField = screen.getByLabelText("Message");
    const sendButton = screen.getByText("Send");

    fireEvent.change(inputField, { target: { value: "Hi!" } });
    fireEvent.click(sendButton);

    await waitFor(() =>
      expect(chatApi.sendMessage).toHaveBeenCalledWith("Jerry", "Hi!")
    );
    expect(chatApi.getMessages).toHaveBeenNthCalledWith(2, 1);
  });

  it("polls messages after 5 seconds", async () => {
    expect(chatApi.getMessages).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(5000);

    await waitFor(() => expect(chatApi.getMessages).toHaveBeenCalledTimes(2));
    expect(chatApi.getMessages).toHaveBeenCalledTimes(2);
    expect(chatApi.getMessages).toHaveBeenNthCalledWith(2, 1);

    jest.advanceTimersByTime(5000);

    await waitFor(() => expect(chatApi.getMessages).toHaveBeenCalledTimes(3));
    expect(chatApi.getMessages).toHaveBeenCalledTimes(3);
  });
});
