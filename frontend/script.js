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

        const response = await fetch(
            "http://localhost:8000/analyze",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({ text })
            }
        );

        const data = await response.json();

        loading.style.display = "none";

        resultCard.style.display = "block";

        const prediction =
            data.prediction[0];

        document.getElementById("emotionResult")
            .innerText =
            prediction.label.toUpperCase();

        document.getElementById("confidenceResult")
            .innerText =
            "Confidence Score: "
            + (prediction.score * 100).toFixed(2)
            + "%";

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