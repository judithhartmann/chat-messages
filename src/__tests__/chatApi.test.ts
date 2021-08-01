import { ChatApi, IChatMessage } from "../chatApi";

describe("ChatApi", () => {
  const token = "TEST_TOKEN";
  const chatApi = new ChatApi(token);

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

  describe("getMessages", () => {
    const mockSuccessResponse = [message1, message2];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    let globalRef: any = global;
    beforeEach(() => {
      globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    });

    afterAll(() => jest.resetAllMocks());

    it("calls the baseUrl with the api token in query", async () => {
      await chatApi.getMessages();
      expect(globalRef.fetch).toHaveBeenCalledWith(
        "https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0/?token=TEST_TOKEN"
      );
    });

    it("returns messages", async () => {
      const response = await chatApi.getMessages();
      expect(response).toEqual(mockSuccessResponse);
    });

    it("adds since to the query if given", async () => {
      await chatApi.getMessages(12345678);
      expect(globalRef.fetch).toHaveBeenCalledWith(
        "https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0/?token=TEST_TOKEN&since=12345678"
      );
    });
  });

  describe("sendMessage", () => {
    let globalRef: any = global;
    const message = "Hello";
    const author = "Mike";
    beforeEach(() => {
      globalRef.fetch = jest.fn().mockImplementation(() => {});
    });

    afterAll(() => jest.resetAllMocks());

    it("sends the request with the correct header + body", async () => {
      await chatApi.sendMessage(author, message);
      expect(globalRef.fetch).toHaveBeenCalledWith(
        "https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify({ author, message }),
        }
      );
    });
  });
});
