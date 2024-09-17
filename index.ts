import axios from "axios";
import { env } from "bun";
import { AzureOpenAI } from "openai";
import * as bodies from "./modules/utils/bodies";
import { governmentFormat } from "./modules/utils/formatter";

const url = "https://octi.digiren.art/graphql";
const api_token = env.OPENCTI_API_TOKEN;

// GraphQL query body as a JavaScript object (not a string)
const body = bodies.governmentQuery()

// Use async/await to handle asynchronous axios requests
async function fetchThreatActors() {
    axios.post(url, body, {
        headers: {
            "Authorization": `Bearer ${api_token}`,
            "Content-Type": "application/json"
        }
    }).then(response => {
      const formatted = governmentFormat(JSON.stringify(response.data));
      console.log(formatted);
    }).catch(error => {
      console.log(`Error: ${error}`)
    })
}

fetchThreatActors();

async function OpenAITest(){
  const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
  const apiKey = process.env["AZURE_OPENAI_API_KEY"];
  const apiVersion = "2024-05-01-preview";
  const deployment = "gpt-35-turbo"; // This must match your deployment name

  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });

  const result = await client.chat.completions.create({
    model: deployment,
    response_format: {"type": "json_object"},
    messages: [
      { 
        role: "system", content: "You are an AI assistant that types pong if user asks ping."
      },
      { 
        role: "user", content: "ping?"
      }
    ],
    // past_messages: 10,
    max_tokens: 800,
    temperature: 0.7,
    top_p: 0.95,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: null
  });
  for (const choice of result.choices) {
    console.log(choice.message);
  }

}
OpenAITest();

console.log("Hello via Bun!");
