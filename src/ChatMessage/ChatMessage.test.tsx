import { cleanup, render, screen } from "@testing-library/react";
import { IChatMessage } from "../chatApi";
import ChatMessage from "./ChatMessage";

describe("ChatMessage", () => {
  const chatMessage: IChatMessage = {
    message: "Hello World!",
    author: "Jeff",
    timestamp: 1627822800000,
    _id: "1",
  };

  beforeEach(() => {
    render(<ChatMessage message={chatMessage} isOwnMessage={false} />);
  });

  it("dispays the message", () => {
    expect(screen.getByText("Hello World!")).toBeVisible();
  });

  it("dispays the formatted date", () => {
    expect(screen.getByText("Aug 1, 2021, 15:00:00")).toBeVisible();
  });

  it("dispays the authors name (if isOwnMessage is false)", () => {
    expect(screen.getByText("Jeff")).toBeVisible();
  });

  it("does not display authors name is isOwnMessage is true", () => {
    cleanup();
    render(<ChatMessage message={chatMessage} isOwnMessage={true} />);
    expect(screen.queryByText("Jeff")).toBeNull();
  });
});
