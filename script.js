const API_KEY = "AIzaSyB3wwkLIVOfKwMCe4d-jcCPqz03W3Rb11c"; // 

async function getBotResponse(userInput) {
    // Definimos la personalidad de tu bot para que sepa quién eres
    const promptContext = `
        Eres EdwinBot, el asistente inteligente de Edwin Pérez Fula. 
        Tu misión es responder preguntas de reclutadores basándote en su perfil:
        - Edwin es Auditor de Control en Central Parking y Administrador Financiero.
        - Tiene experiencia liderando más de 60 personas en Arcos Dorados.
        - Es Desarrollador de Software Jr con proyectos en Java (Spring Boot) y Python (IA).
        - Su valor agregado es la mezcla de Finanzas + Programación.
        Responde de forma profesional, amable y breve. Si no sabes algo, invita a contactarlo al 3112023233.
    `;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: promptContext + "\nUsuario pregunta: " + userInput }]
                }]
            })
        });

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Error con Gemini:", error);
        return "Lo siento, mi conexión con la red neuronal de Edwin falló. Por favor, contáctalo directamente.";
    }
}

// Actualiza tu evento de envío para manejar la promesa (async)
sendBtn.onclick = async () => {
    const text = userInput.value;
    if (text) {
        addMessage(text, 'user');
        userInput.value = '';
        
        // Indicador de "Escribiendo..."
        const loadingMsg = "Escribiendo...";
        addMessage(loadingMsg, 'bot');
        
        const response = await getBotResponse(text);
        
        // Reemplazar el mensaje de carga con la respuesta real
        chatMessages.lastElementChild.innerText = response;
    }
};