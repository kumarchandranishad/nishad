async function generateImage() {
  const prompt = document.getElementById("prompt").value;
  const resultDiv = document.getElementById("result");
  const loading = document.getElementById("loading");

  if (!prompt.trim()) {
    alert("Please enter a prompt!");
    return;
  }

  loading.classList.remove("hidden");
  resultDiv.innerHTML = "";

  try {
    const response = await fetch("https://nishad-backend.onrender.com/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt,
        model: "img3",
        size: "1024x1024"
      })
    });

    const data = await response.json();

    if (data.images && data.images.length > 0) {
      const img = document.createElement("img");
      img.src = data.images[0];
      resultDiv.appendChild(img);
    } else {
      resultDiv.innerHTML = "<p>❌ Image generation failed.</p>";
    }
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = "<p>⚠️ Error generating image.</p>";
  }

  loading.classList.add("hidden");
}
