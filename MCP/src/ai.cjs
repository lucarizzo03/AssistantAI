const OpenAI = require("openai")

export const client = new OpenAI({
    apiKey: ''
})

const systemPrompt = ''

async function getAction(parsedMessage) {

    const response = await client.responses.create({
        model: "gpt-5.1",
        input: 
        [
            {role: "user", message},
            {role: "system", systemPrompt}
        ],
        ...(context || []).map(c => ({ role: "assistant", content: c })),
        format: {
            type: "json",
            schema: {
                type: "object",
                properties: {
                action_plan: { type: "array" },
                assumptions: { type: "array" }
                },
                required: ["action_plan"]
            }
        }
    });

    return response.output[0].content[0].json;




    
}