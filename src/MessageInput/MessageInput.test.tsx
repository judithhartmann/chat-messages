import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MessageInput from ".";

describe("MessageInput", () => {
  const sendMessage = jest.fn();
  let inputField: HTMLElement;
  let sendButton: HTMLElement;

  beforeEach(() => {
    render(<MessageInput sendMessage={sendMessage} />);
    inputField = screen.getByLabelText("Message");
    sendButton = screen.getByText("Send");
    sendMessage.mockClear();
  });

  it("displays a message input field", () => {
    expect(inputField).toBeVisible();
  });

  it("displays a disabled send button", () => {
    expect(sendButton).toBeVisible();
    expect(sendButton).toBeDisabled();
  });

  it("does not call sendMessage on button click if message is empty", () => {
    fireEvent.click(sendButton);
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it("calls sendMessage on button click if message is not empty", async () => {
    fireEvent.change(inputField, { target: { value: "Hi!" } });
    expect(inputField).toHaveValue("Hi!");
    expect(sendButton).not.toBeDisabled();

    fireEvent.click(sendButton);
    await waitFor(() => expect(inputField).toHaveValue(""));

    expect(sendMessage).toHaveBeenCalledWith("Hi!");
  });
});
