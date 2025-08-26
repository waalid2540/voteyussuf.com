// District 1 AI Assistant Chat System
class District1Assistant {
    constructor() {
        this.isOpen = false;
        this.systemPrompt = `You are a friendly and professional AI assistant for residents of Salt Lake City District 1. 
Your purpose is to provide accurate information and guidance about:

1. Voting and elections (registration, polling locations, ranked choice voting, ballot info)
2. Local resources (community centers, nonprofits, clinics, schools, events)
3. Candidate information (biography, priorities, vision for District 1)
4. Collecting resident feedback (issues, surveys, priorities)

Rules:
- Always respond politely, clearly, and concisely.
- Use a friendly, approachable tone.
- Avoid giving legal or financial advice.
- Provide links or references when possible.
- If a question is outside your knowledge, say: "I'm still learning about that, but here's a helpful resource."
- Support multiple languages if requested (English, Spanish, Somali, Arabic).

Your goal: Engage residents, answer their questions accurately, and guide them to helpful District 1 information.

Key District 1 Information:
- Candidate: Imam Yussuf Abdi - Spiritual leader, AI advocate, entrepreneur
- Key Issues: Homelessness, public safety, housing, technology innovation
- Vision: Transform District 1 into safer, cleaner, smarter community
- Website: VoteYussuf.com
- Voting Registration: vote.utah.gov
- District 1 includes neighborhoods in Salt Lake City`;

        this.commonQuestions = {
            'voting': {
                question: 'How do I register to vote in District 1?',
                answer: 'You can register to vote online at vote.utah.gov or visit any DMV office. You need to be 18+ and a Utah resident. For District 1 specific information, make sure your address is within the district boundaries.'
            },
            'candidate': {
                question: 'Tell me about Yussuf Abdi',
                answer: 'Imam Yussuf Abdi is running for Salt Lake City Council District 1. He\'s a spiritual leader, AI advocate, and entrepreneur focused on ending homelessness, improving public safety, and using technology to serve residents better.'
            },
            'issues': {
                question: 'What are the main issues in District 1?',
                answer: 'Key challenges include rising homelessness, street cleanliness and pest control, neglected public spaces, housing shortages, and weak communication between city leadership and residents.'
            },
            'resources': {
                question: 'What resources are available in District 1?',
                answer: 'District 1 has community centers, parks, schools, and various nonprofit organizations. For specific locations and services, I recommend contacting Salt Lake City services at slc.gov or calling 311.'
            }
        };

        this.init();
    }

    init() {
        this.createChatWidget();
        this.setupEventListeners();
        this.loadChatHistory();
    }

    createChatWidget() {
        const chatWidget = document.createElement('div');
        chatWidget.id = 'district1-chat-widget';
        chatWidget.innerHTML = `
            <div class="chat-toggle" id="chatToggle">
                <i class="fas fa-comments"></i>
                <span class="chat-badge" id="chatBadge">Ask me about District 1!</span>
            </div>
            
            <div class="chat-container" id="chatContainer">
                <div class="chat-header">
                    <div class="chat-header-info">
                        <h4>District 1 Assistant</h4>
                        <p>Ask me about voting, resources, or Yussuf Abdi's campaign</p>
                    </div>
                    <button class="chat-close" id="chatClose">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="chat-messages" id="chatMessages">
                    <div class="message bot-message">
                        <div class="message-content">
                            <p>Hi! I'm your District 1 assistant. I can help you with:</p>
                            <ul>
                                <li>🗳️ Voting information</li>
                                <li>🏢 Local resources</li>
                                <li>👤 Candidate information</li>
                                <li>📝 Community feedback</li>
                            </ul>
                            <p>What would you like to know?</p>
                        </div>
                    </div>
                </div>
                
                <div class="quick-questions">
                    <h5>Common Questions:</h5>
                    <div class="quick-buttons">
                        <button class="quick-btn" data-question="voting">How to vote?</button>
                        <button class="quick-btn" data-question="candidate">About Yussuf</button>
                        <button class="quick-btn" data-question="issues">District issues</button>
                        <button class="quick-btn" data-question="resources">Local resources</button>
                    </div>
                </div>
                
                <div class="chat-input-container">
                    <input type="text" id="chatInput" placeholder="Ask me anything about District 1..." />
                    <button id="chatSend">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
                
                <div class="chat-footer">
                    <p>🤖 Powered by AI • <a href="#contact">Need human help?</a></p>
                </div>
            </div>
        `;

        document.body.appendChild(chatWidget);
    }

    setupEventListeners() {
        const chatToggle = document.getElementById('chatToggle');
        const chatClose = document.getElementById('chatClose');
        const chatSend = document.getElementById('chatSend');
        const chatInput = document.getElementById('chatInput');
        const quickButtons = document.querySelectorAll('.quick-btn');

        chatToggle.addEventListener('click', () => this.toggleChat());
        chatClose.addEventListener('click', () => this.closeChat());
        chatSend.addEventListener('click', () => this.sendMessage());
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        quickButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const questionType = btn.getAttribute('data-question');
                this.handleQuickQuestion(questionType);
            });
        });

        // Auto-hide badge after showing for a while
        setTimeout(() => {
            const badge = document.getElementById('chatBadge');
            if (badge && !this.isOpen) {
                badge.style.display = 'none';
            }
        }, 5000);
    }

    toggleChat() {
        const container = document.getElementById('chatContainer');
        const toggle = document.getElementById('chatToggle');
        
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            container.style.display = 'flex';
            toggle.classList.add('active');
            document.getElementById('chatBadge').style.display = 'none';
            document.getElementById('chatInput').focus();
        } else {
            container.style.display = 'none';
            toggle.classList.remove('active');
        }
    }

    closeChat() {
        this.isOpen = false;
        document.getElementById('chatContainer').style.display = 'none';
        document.getElementById('chatToggle').classList.remove('active');
    }

    handleQuickQuestion(questionType) {
        const question = this.commonQuestions[questionType];
        if (question) {
            this.addMessage(question.question, 'user');
            setTimeout(() => {
                this.addMessage(question.answer, 'bot');
            }, 500);
        }
    }

    async sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;

        this.addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTyping();

        // Simulate AI response (in production, you'd call an actual AI API)
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }

    addMessage(content, type) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${content}</p>
                <span class="message-time">${new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})}</span>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Save to localStorage
        this.saveChatHistory();
    }

    showTyping() {
        const messagesContainer = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTyping() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Voting-related questions
        if (lowerMessage.includes('vote') || lowerMessage.includes('voting') || lowerMessage.includes('register')) {
            return "You can register to vote at vote.utah.gov! Make sure you're registered by the deadline. District 1 polling locations will be announced closer to election day. Need help with the process? I'm here to guide you! 🗳️";
        }

        // Candidate questions
        if (lowerMessage.includes('yussuf') || lowerMessage.includes('abdi') || lowerMessage.includes('candidate') || lowerMessage.includes('imam')) {
            return "Imam Yussuf Abdi is a visionary leader combining spiritual guidance with AI innovation! He's focused on ending homelessness, improving public safety, and using technology to better serve District 1. You can learn more about his platform on this website or contact the campaign directly. 👤";
        }

        // Issues and problems
        if (lowerMessage.includes('homeless') || lowerMessage.includes('housing') || lowerMessage.includes('rat') || lowerMessage.includes('mice') || lowerMessage.includes('problem')) {
            return "District 1 faces real challenges: rising homelessness, street cleanliness issues including pest control, neglected public spaces, and housing shortages. Yussuf Abdi has data-driven solutions to address these problems through technology, community engagement, and smart policy. What specific issue concerns you most? 🏠";
        }

        // Resources
        if (lowerMessage.includes('resource') || lowerMessage.includes('help') || lowerMessage.includes('service') || lowerMessage.includes('community center')) {
            return "District 1 has various community resources! For immediate help, call 311 or visit slc.gov. Community centers, nonprofits, and local services are available. If you're facing a specific challenge, I can help connect you to the right resource. What do you need help with? 🏢";
        }

        // Languages
        if (lowerMessage.includes('spanish') || lowerMessage.includes('somali') || lowerMessage.includes('arabic') || lowerMessage.includes('language')) {
            return "I'm designed to help in multiple languages! While I'm most fluent in English, I can try to assist in Spanish, Somali, or Arabic. For complex issues in other languages, I recommend contacting the campaign directly for a human translator. ¿Cómo puedo ayudarte? 🌍";
        }

        // Contact/campaign
        if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('campaign')) {
            return "You can reach the campaign at info@voteyussuf.com or (555) 123-4567. For immediate questions, I'm here to help! You can also visit the contact section of this website for more ways to get involved. 📞";
        }

        // Default response
        return "That's a great question! I'm still learning about that topic, but here are some helpful resources: visit vote.utah.gov for voting info, slc.gov for city services, or contact the campaign at info@voteyussuf.com. Is there something specific about District 1 I can help you with? 🤔";
    }

    saveChatHistory() {
        const messages = document.getElementById('chatMessages').innerHTML;
        localStorage.setItem('district1_chat_history', messages);
    }

    loadChatHistory() {
        const savedHistory = localStorage.getItem('district1_chat_history');
        if (savedHistory) {
            // Only load if it's from today (to keep chat relevant)
            const today = new Date().toDateString();
            const savedDate = localStorage.getItem('district1_chat_date');
            
            if (savedDate === today) {
                document.getElementById('chatMessages').innerHTML = savedHistory;
            } else {
                localStorage.removeItem('district1_chat_history');
                localStorage.setItem('district1_chat_date', today);
            }
        }
    }
}

// CSS Styles for the chat widget
const chatStyles = `
    #district1-chat-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .chat-toggle {
        background: linear-gradient(135deg, #1e40af 0%, #f59e0b 100%);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 15px 20px;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.3s ease;
        position: relative;
    }

    .chat-toggle:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 25px rgba(0, 0, 0, 0.25);
    }

    .chat-toggle.active {
        border-radius: 50%;
        padding: 15px;
        background: #dc2626;
    }

    .chat-toggle.active .chat-badge {
        display: none;
    }

    .chat-badge {
        background: rgba(255, 255, 255, 0.2);
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 12px;
        white-space: nowrap;
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }

    .chat-container {
        display: none;
        flex-direction: column;
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 350px;
        height: 500px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        overflow: hidden;
    }

    .chat-header {
        background: linear-gradient(135deg, #1e40af 0%, #f59e0b 100%);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .chat-header h4 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
    }

    .chat-header p {
        margin: 2px 0 0 0;
        font-size: 12px;
        opacity: 0.9;
    }

    .chat-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        transition: background 0.2s ease;
    }

    .chat-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 15px;
        background: #f8fafc;
    }

    .message {
        margin-bottom: 15px;
        display: flex;
    }

    .bot-message {
        justify-content: flex-start;
    }

    .user-message {
        justify-content: flex-end;
    }

    .message-content {
        max-width: 80%;
        padding: 12px 16px;
        border-radius: 18px;
        position: relative;
    }

    .bot-message .message-content {
        background: white;
        border-bottom-left-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .user-message .message-content {
        background: #1e40af;
        color: white;
        border-bottom-right-radius: 4px;
    }

    .message-content p {
        margin: 0;
        line-height: 1.4;
        font-size: 14px;
    }

    .message-content ul {
        margin: 8px 0;
        padding-left: 20px;
    }

    .message-content li {
        margin: 4px 0;
        font-size: 14px;
    }

    .message-time {
        font-size: 11px;
        opacity: 0.6;
        margin-top: 5px;
        display: block;
    }

    .quick-questions {
        padding: 10px 15px;
        border-top: 1px solid #e5e7eb;
        background: white;
    }

    .quick-questions h5 {
        margin: 0 0 8px 0;
        font-size: 12px;
        color: #6b7280;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .quick-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
    }

    .quick-btn {
        background: #f3f4f6;
        border: 1px solid #d1d5db;
        border-radius: 15px;
        padding: 5px 10px;
        font-size: 11px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .quick-btn:hover {
        background: #1e40af;
        color: white;
        border-color: #1e40af;
    }

    .chat-input-container {
        display: flex;
        padding: 15px;
        background: white;
        border-top: 1px solid #e5e7eb;
        gap: 10px;
    }

    #chatInput {
        flex: 1;
        border: 1px solid #d1d5db;
        border-radius: 20px;
        padding: 10px 15px;
        outline: none;
        font-size: 14px;
    }

    #chatInput:focus {
        border-color: #1e40af;
        box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
    }

    #chatSend {
        background: #1e40af;
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        transition: background 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #chatSend:hover {
        background: #1d4ed8;
    }

    .chat-footer {
        padding: 8px 15px;
        background: #f9fafb;
        border-top: 1px solid #e5e7eb;
        text-align: center;
    }

    .chat-footer p {
        margin: 0;
        font-size: 11px;
        color: #6b7280;
    }

    .chat-footer a {
        color: #1e40af;
        text-decoration: none;
    }

    .typing-indicator .typing-dots {
        display: flex;
        gap: 4px;
        align-items: center;
    }

    .typing-dots span {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #6b7280;
        animation: typingBounce 1.4s infinite;
    }

    .typing-dots span:nth-child(2) {
        animation-delay: 0.2s;
    }

    .typing-dots span:nth-child(3) {
        animation-delay: 0.4s;
    }

    @keyframes typingBounce {
        0%, 60%, 100% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(-10px);
        }
    }

    @media (max-width: 480px) {
        .chat-container {
            width: calc(100vw - 40px);
            height: 400px;
            bottom: 70px;
        }

        .chat-toggle {
            padding: 12px 15px;
        }

        .chat-badge {
            font-size: 11px;
            padding: 4px 8px;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = chatStyles;
document.head.appendChild(styleSheet);

// Initialize the assistant when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.district1Assistant = new District1Assistant();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = District1Assistant;
}