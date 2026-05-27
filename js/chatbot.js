/* chatbot.js – lightweight frontend chatbot (no backend) */
(function () {
  const root = document.getElementById('chatbot-root');
  if (!root) return;

  const panel = document.getElementById('chatbot-panel');
  const toggleBtn = document.getElementById('chatbot-toggle');
  const closeBtn = document.getElementById('chatbot-close');
  const messagesEl = document.getElementById('chatbot-messages');
  const inputEl = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');
  const chipsEl = document.getElementById('chatbot-chips');

  const STORAGE_KEY = 'eduhubvit_chat_history_v1';

  const escapeHTML = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '<', '>': '>', '"': '"', "'": '&#039;' }[c]));

  const createMsg = (role, text) => {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${role}`;
    msg.setAttribute('role', 'listitem');

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';

    bubble.innerHTML = escapeHTML(text).replace(/\n/g, '<br/>');

    const meta = document.createElement('div');
    meta.className = 'chat-meta';
    const ts = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    meta.textContent = ts;

    msg.appendChild(bubble);
    msg.appendChild(meta);
    return msg;
  };

  const scrollToBottom = () => {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  };

  const cannedHelp = [
    'Try: "How to calculate CGPA?"',
    'Try: "Required GPA planner?"',
    'Try: "NPTEL courses?"',
    'Try: "FFCS timetable planner?"',
    'Try: "MessIt menu?"'
  ];

  function normalize(s) {
    return String(s || '').toLowerCase().trim();
  }

  function matchIntent(query) {
    const q = normalize(query);

    const has = (...words) => words.some((w) => q.includes(w));
    if (!q) return { type: 'empty' };

    if (has('cgpa', 'instant cgpa', 'calculate cgpa')) return { type: 'cgpa' };
    if (has('required', 'planner', 'target', 'remaining', 'this sem', 'this sem credits')) return { type: 'required' };
    if (has('converter', 'percentage', 'gpa to', 'gpa↔', 'gpa to %', 'pct')) return { type: 'converter' };
    if (has('nptel', 'iit', 'iisc', 'free courses', 'courses free')) return { type: 'nptel' };
    if (has('ffcs', 'planner', 'timetable', 'schedule', 'search & add')) return { type: 'ffcs' };
    if (has('messit', 'mess', 'hostel', 'menu', 'mess menu', 'today')) return { type: 'messit' };
    if (has('reviews', 'testimonials', 'what learners say')) return { type: 'reviews' };

    if (has('help', 'how', 'what can you do', 'commands')) return { type: 'help' };

    return { type: 'fallback' };
  }

  function botReply(query) {
    const intent = matchIntent(query);

    switch (intent.type) {
      case 'cgpa':
        return [
          'Instant CGPA Calculator:',
          '1) Click “+ Add Subject”',
          '2) Enter Subject name, Credits, and Grade',
          '3) Press “Calculate CGPA”',
          'Tip: You can remove a subject using the ✕ button.'
        ].join('\n');

      case 'required':
        return [
          'Required GPA Planner:',
          'Enter:',
          '- Current CGPA',
          '- Credits Completed',
          '- Target CGPA',
          '- This Sem Credits',
          'Then the tool computes the Required GPA for your remaining credits.'
        ].join('\n');

      case 'converter':
        return [
          'GPA ↔ Percentage Converter:',
          '- Use “GPA → %” to convert CGPA/GPA to percentage',
          '- Use “% → GPA” to convert percentage back to GPA',
          'The output updates as you type.'
        ].join('\n');

      case 'nptel':
        return [
          'NPTEL Courses section:',
          'Filter by category (All / Computer Science / Mathematics / Electrical / Mechanical).',
          'Cards will appear below once filtered.'
        ].join('\n');

      case 'ffcs':
        return [
          'FFCS Course Planner:',
          '1) Search courses in the left panel',
          '2) Click results to add them to your timetable',
          '3) View your timetable grid on the right',
          '4) Selected credits update automatically'
        ].join('\n');

      case 'messit':
        return [
          'MessIt:',
          'Select your Hostel and Mess Type.',
          'Then the “Today’s Menu” section updates with menu cards.'
        ].join('\n');

      case 'reviews':
        return [
          'Reviews slider:',
          'Use the dots to switch between learner reviews.'
        ].join('\n');

      case 'help':
        return [
          'I can guide you through the EduHubvit tools.',
          ...cannedHelp
        ].join('\n');

      case 'empty':
        return 'Type a question to get help.';

      default:
        return [
          "I didn’t catch that—try one of these:",
          ...cannedHelp
        ].join('\n');
    }
  }

  function saveHistory(messages) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (_) {}
  }

  function loadHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (_) {
      return null;
    }
  }

  function renderHistory(history) {
    messagesEl.innerHTML = '';
    if (!history || !Array.isArray(history) || history.length === 0) {
      messagesEl.appendChild(createMsg('bot',
        'Hi! I’m EduHubvit Assistant. Ask me about CGPA, GPA planning, NPTEL, FFCS, or MessIt.'));
      messagesEl.appendChild(createMsg('bot', cannedHelp.join('\n')));
      scrollToBottom();
      return;
    }

    history.forEach((m) => {
      messagesEl.appendChild(createMsg(m.role, m.text));
    });
    scrollToBottom();
  }

  function getCurrentHistory() {
    const items = Array.from(messagesEl.querySelectorAll('.chat-msg'));
    return items.map((node) => {
      const role = node.classList.contains('user') ? 'user' : 'bot';
      const bubble = node.querySelector('.chat-bubble');
      const text = bubble ? bubble.innerText : '';
      return { role, text };
    });
  }

  function sendMessage(text) {
    const trimmed = String(text || '').trim();
    if (!trimmed) return;

    const userMsg = createMsg('user', trimmed);
    messagesEl.appendChild(userMsg);

    const replyText = botReply(trimmed);
    // small delay for “human” feel
    window.setTimeout(() => {
      const botMsg = createMsg('bot', replyText);
      messagesEl.appendChild(botMsg);

      const history = getCurrentHistory();
      saveHistory(history);

      scrollToBottom();
    }, 220);

    // Persist immediately with placeholder? Keep simple: after reply.
    scrollToBottom();
  }

  function setChipsActive() {
    if (!chipsEl) return;
    chipsEl.querySelectorAll('button[data-chip]').forEach((b) => {
      b.addEventListener('click', () => {
        const text = b.getAttribute('data-chip');
        inputEl.value = text;
        inputEl.focus();
        inputEl.dispatchEvent(new Event('input', { bubbles: true }));
      });
    });
  }

  // Toggle
  const openPanel = () => {
    panel.classList.add('open');
    toggleBtn.classList.add('hidden');
    inputEl.focus({ preventScroll: true });
  };

  const closePanel = () => {
    panel.classList.remove('open');
    toggleBtn.classList.remove('hidden');
    toggleBtn.focus({ preventScroll: true });
  };

  toggleBtn && toggleBtn.addEventListener('click', openPanel);
  closeBtn && closeBtn.addEventListener('click', closePanel);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel && panel.classList.contains('open')) closePanel();
  });

  // Send
  const attemptSend = () => {
    const val = inputEl.value;
    if (!val || !val.trim()) return;
    inputEl.value = '';
    sendMessage(val);
  };

  sendBtn && sendBtn.addEventListener('click', attemptSend);
  inputEl && inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      attemptSend();
    }
  });

  // Init
  renderHistory(loadHistory());
  setChipsActive();

  // Expose quick actions
  window.__eduhubvitChatReset = function () {
    try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
    renderHistory(null);
  };
})();
