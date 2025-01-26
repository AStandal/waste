import type { Proposition } from './scraper';

export async function classify(proposition: Proposition) {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Bun.env['API_KEY']}`
        },
        body: JSON.stringify({
            "model": "deepseek-chat",
            "messages": [
                { role: "system", content: "You are a helpful assistant"}, 
                { role: "user", content: "Please classify the following proposition: " + proposition }
            ]
        })
    })
    console.log(response);
}