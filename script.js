const chatTrigger = document.getElementById('chat-trigger');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

// Abrir/Cerrar chat
chatTrigger.onclick = () => chatWindow.style.display = 'flex';
closeChat.onclick = () => chatWindow.style.display = 'none';

function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.className = type === 'user' ? 'user-msg' : 'bot-msg';
    msg.innerText = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(input) {
    const query = input.toLowerCase();
    if (query.includes("experiencia") || query.includes("trabajo")) {
        return "Edwin ha liderado equipos de 60 personas en McDonald's y actualmente es Auditor de Control en Central Parking, manejando proyecciones de $600M.";
    }
    if (query.includes("java") || query.includes("python") || query.includes("programación")) {
        return "Domina Java (Spring Boot) y Python. Recientemente hizo un diplomado en Java y tiene proyectos de IA y gestión de inventarios.";
    }
    if (query.includes("contacto") || query.includes("teléfono")) {
        return "Puedes contactarlo al 3112023233 o al correo edwinfula12@gmail.com.";
    }
    return "Soy un bot en entrenamiento. ¿Quieres saber sobre la auditoría financiera de Edwin o sus habilidades en programación?";
}

sendBtn.onclick = () => {
    const text = userInput.value;
    if (text) {
        addMessage(text, 'user');
        userInput.value = '';
        setTimeout(() => addMessage(getBotResponse(text), 'bot'), 500);
    }
};