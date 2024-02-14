// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = '';
const endpoint = 'https://api.openai.com/v1/engines/davinci/completions';

// Function to send prompt to GPT API
//return the response from GPT
 export const askGPT = (prompt) => {
  return sendToGPT(prompt);

// Function to send prompt to GPT API
async function sendToGPT(prompt) {
  console.log("sendToGPT");
  const requestBody = {
    prompt: prompt, 
    max_tokens: 100 // Adjust token limit as needed
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.choices);
      const promptAns = Object.prototype.toString.call(data.choices[0].text); 
      console.log(promptAns);
      return data.choices[0].text
    } else {
      console.error('Error:', response);
      return response.statusText;
    }
  } catch (error) {
    console.error('Error:', error);
    return error;
  }
}

}

