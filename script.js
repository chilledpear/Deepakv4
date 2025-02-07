// Function to send user input to the serverless function and get the chatbot's response
async function fetchChatGPTResponse(userInput) {
    try {
        // Make a POST request to the serverless function
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Inform the server about the data type
            },
            body: JSON.stringify({ message: userInput }), // Send the user input
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to fetch response");
        }

        // Parse the JSON response
        const data = await response.json();
        return data.choices[0].message.content; // Extract the chatbot's response
    } catch (error) {
        console.error("Error fetching response:", error);
        return "Sorry, something went wrong. Please try again.";
    }
}

// Function to display messages in the chat interface
function displayMessage(sender, message) {
    const chatDisplay = document.getElementById("chat-display");
    const messageElement = document.createElement("div");

    // Format the sender's name and message
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatDisplay.appendChild(messageElement);

    // Auto-scroll to the bottom of the chat display
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// Event listener for the "Send" button
document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value.trim(); // Get the user input
    if (userInput) {
        // Display the user's message
        displayMessage("User", userInput);

        // Clear the input field
        document.getElementById("user-input").value = "";

        // Fetch and display the chatbot's response
        const botResponse = await fetchChatGPTResponse(userInput);
        displayMessage("Bot", botResponse);
    }
});

// Optional: Allow pressing Enter to send a message
document.getElementById("user-input").addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        document.getElementById("send-btn").click(); // Trigger the send button
    }
});

async function fetchChatGPTResponse(userInput) {
    // Replace 'your-chatgpt-api-url' and 'your-api-key' with actual API details
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const apiKey = "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";

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${"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"}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userInput }],
        }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
}
