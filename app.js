const API_KEY = "API-Key";
const generateButton = document.getElementById("generateButton");
const promptInput = document.getElementById("promptInput");
const numImagesInput = document.getElementById("numImagesInput");
const imageContainer = document.getElementById("imageContainer");

generateButton.addEventListener("click", () => {
    generateImages();
});

async function generateImages() {
    const prompt = promptInput.value;
    const numImages = parseInt(numImagesInput.value);

    if (!prompt || isNaN(numImages) || numImages <= 0) {
        imageContainer.innerHTML = "Invalid input.";
        return;
    }

    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: prompt,
                n: numImages,
                size: "1024x1024",
            }),
        });

        const data = await response.json();

        if (data && data.data) {
            imageContainer.innerHTML = ""; // Clear previous images
            data.data.forEach((imageData) => {
                if (imageData.url) {
                    const imageUrl = imageData.url;
                    imageContainer.innerHTML += `<img src="${imageUrl}" alt="Generated Image" />`;
                }
            });
        } else {
            imageContainer.innerHTML = "Image generation failed.";
        }
    } catch (error) {
        console.error("Error generating images:", error);
        imageContainer.innerHTML = "An error occurred.";
    }
}
