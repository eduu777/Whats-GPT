import { comunicationWithGpt } from "./chatgpt-api.js";
import { sessionsActive, createSession } from "../utils/sessions-manager.js";

export const handleIncomingMessage = async (msg, client) => {
  try {
    if (!msg.author && msg.type !== "e2e_notification") {
      const userId = msg.from;
      if (!(await sessionsActive(userId))) {
        await createSession(userId);
        const resGpt = await comunicationWithGpt(msg);
        console.log(resGpt);
        client.sendMessage(msg.from, resGpt);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
