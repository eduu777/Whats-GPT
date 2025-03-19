import { Client } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { sessionsActive, createSession } from "../utils/sessions-manager.js";
import { handleIncomingMessage } from "./message-handler.js";

export const connectWhatsAppFromClient = async () => {
  const client = new Client();

  client.on("qr", (qr) => {
    console.log("QR CODE: ");
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("Cliente conectado");
  });

  client.on("message", async (msg) => {
    await handleIncomingMessage(msg, client);
  });

  client.initialize();
};
