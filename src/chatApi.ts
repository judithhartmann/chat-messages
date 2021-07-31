export interface IChatMessage {
  message: string;
  author: string;
  timestamp: string;
  _id: string;
}
export class ChatApi {
  apiToken: string;
  baseUrl = "https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0/";

  constructor(apiToken: string) {
    this.apiToken = apiToken;
  }

  async getMessages(since?: string): Promise<IChatMessage[]> {
    let requestUrl = `${this.baseUrl}?token=${this.apiToken}`;
    if (since) {
      requestUrl += `&since=${since}`;
    }
    const response = await fetch(requestUrl);
    return await response.json();
  }

  async sendMessage(author: string, message: string) {
    await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: this.apiToken,
      },
      body: JSON.stringify({ author, message }),
    });
  }
}

if (!process.env.REACT_APP_API_TOKEN) {
  throw new Error("API TOKEN MISSING, Please add it .env file");
}

const chatApi = new ChatApi(process.env.REACT_APP_API_TOKEN);

export default chatApi;
