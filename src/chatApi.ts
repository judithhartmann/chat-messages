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

  async getMessages(): Promise<IChatMessage[]> {
    const response = await fetch(`${this.baseUrl}?token=${this.apiToken}`);
    return await response.json();
  }
}

if (!process.env.REACT_APP_API_TOKEN) {
  throw new Error("API TOKEN MISSING, Please add it .env file");
}

const chatApi = new ChatApi(process.env.REACT_APP_API_TOKEN);

export default chatApi;
