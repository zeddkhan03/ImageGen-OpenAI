const API_KEY = "OpenAI_API_KEY"

async function fetchImages() {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: "football match in rain and a rainbow",
            n: 2,
            size: "1024x1024"
        })
    })
    const data = await response.json()
    console.log(data)
}

fetchImages()
