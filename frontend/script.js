async function analyzeText() {

    const text =
        document.getElementById("textInput").value;

    const loading =
        document.getElementById("loading");

    const resultCard =
        document.getElementById("resultCard");

    if (text.trim() === "") {

        alert("Please enter some text.");

        return;
    }

    loading.style.display = "block";

    resultCard.style.display = "none";

    try {
        const endpoints = [
            "http://localhost:8081/analyze",
            "http://localhost:8080/analyze",
            "http://localhost:8000/analyze"
        ];

        let data = null;

        for (const url of endpoints) {
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ text })
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                data = await response.json();
                break;
            }
            catch (error) {
                console.warn(`Backend request failed at ${url}:`, error);
            }
        }

        if (!data) {
            throw new Error("Unable to reach backend on localhost:8080 or localhost:8000");
        }

        loading.style.display = "none";
        resultCard.style.display = "block";

        const prediction = data.prediction[0];

        document.getElementById("emotionResult").innerText = prediction.label.toUpperCase();
        document.getElementById("confidenceResult").innerText =
            "Confidence Score: " + (prediction.score * 100).toFixed(2) + "%";
    }
    catch (error) {
        loading.style.display = "none";
        alert("Backend connection failed.");
        console.error(error);
    }
}

function clearText() {

    document.getElementById("textInput").value = "";

    document.getElementById("resultCard").style.display = "none";
}