// 1. Definición de Elementos (¡Esto te faltaba!)
const chatTrigger = document.getElementById('chat-trigger');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

const API_KEY = "AIzaSyB3wwkLIVOfKwMCe4d-jcCPqz03W3Rb11c"; 

// 2. Funciones de Apertura y Cierre (¡Esto también te faltaba!)
chatTrigger.onclick = () => {
    chatWindow.style.display = 'flex';
};

closeChat.onclick = () => {
    chatWindow.style.display = 'none';
};

// 3. Función para añadir mensajes visualmente
function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.className = type === 'user' ? 'user-msg' : 'bot-msg';
    msg.innerText = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 4. Lógica de Gemini
async function getBotResponse(userInput) {
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
        return "Lo siento, mi conexión falló. Puedes contactar a Edwin al 3112023233.";
    }
}

// 5. Evento de Envío
sendBtn.onclick = async () => {
    const text = userInput.value;
    if (text) {
        addMessage(text, 'user');
        userInput.value = '';
        
        // Mensaje de espera
        addMessage("Escribiendo...", 'bot');
        
        const response = await getBotResponse(text);
        
        // Actualizar el último mensaje del bot con la respuesta de Gemini
        const lastMsg = chatMessages.lastElementChild;
        lastMsg.innerText = response;
    }
};