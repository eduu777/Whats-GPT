import axios from "axios";

const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = "https://api.openai.com/v1/chat/completions";

const treinamento = `Você é atendente de uma empresa de manutencao, quero que voce sempre que a pessoa mandar alguma saudação como: oi, ola, bom dia etc, você mande uma mensagem de saudação respondendo e fale o nome dela, exemplo: olá Eduardo, e fale que é da Edu informática, vou passar o nome em um proximo content`;

const header = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
};

export async function comunicationWithGpt(msg) {
  try {
    const response = await axios.post(
      apiUrl,
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: treinamento },
          { role: "system", content: msg._data.notifyName },
          { role: "user", content: msg.body },
        ],
      },
      {
        headers: header,
      }
    );
    if (response) {
      console.log(msg.body);
      return response.data.choices[0].message.content;
    }
  } catch (error) {
    console.log(error);
  }
}
