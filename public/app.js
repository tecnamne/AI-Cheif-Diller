const state = {
  sessionId: null,
  tenantId: 'default',
};

const el = {
  stateBadge: document.getElementById('connectionState'),
  chatWindow: document.getElementById('chatWindow'),
  chatForm: document.getElementById('chatForm'),
  messageInput: document.getElementById('messageInput'),
  sendBtn: document.getElementById('sendBtn'),
  refreshStatusBtn: document.getElementById('refreshStatusBtn'),
  runScanBtn: document.getElementById('runScanBtn'),
  refreshAlertsBtn: document.getElementById('refreshAlertsBtn'),
  refreshTenantAlertsBtn: document.getElementById('refreshTenantAlertsBtn'),
  scannerStatus: document.getElementById('scannerStatus'),
  alertList: document.getElementById('alertList'),
  tenantAlertList: document.getElementById('tenantAlertList'),
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function appendMessage(role, text, meta = '') {
  const item = document.createElement('div');
  item.className = `msg ${role}`;
  const safeText = escapeHtml(text);
  const safeMeta = meta ? `<div class="meta">${escapeHtml(meta)}</div>` : '';
  item.innerHTML = `${safeText}${safeMeta}`;
  el.chatWindow.appendChild(item);
  el.chatWindow.scrollTop = el.chatWindow.scrollHeight;
}

function setConnectionState(text) {
  if (el.stateBadge) {
    el.stateBadge.textContent = text;
  }
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    let detail = '';
    try {
      const payload = await response.json();
      detail = payload?.error || payload?.message || response.statusText;
    } catch (error) {
      detail = response.statusText;
    }
    throw new Error(`${response.status} ${detail}`);
  }

  return response.json();
}

function renderStatus() {
  if (!el.scannerStatus) {
    return;
  }

  requestJson('/api/scanner/status')
    .then((payload) => {
      const lines = [
        `enabled: ${payload.enabled}`,
        `initialized: ${payload.initialized}`,
        `mode: ${payload.mode || 'unknown'}`,
        `tenants: ${(payload.configuredTenants || []).join(', ') || 'none'}`,
        `scan in progress: ${payload.scanInProgress}`,
      ];
      el.scannerStatus.innerHTML = lines.map((line) => `<div>${escapeHtml(line)}</div>`).join('');
    })
    .catch((error) => {
      el.scannerStatus.innerHTML = `<div class="alert-item">${escapeHtml(error.message)}</div>`;
    });
}

function renderAlert(items, target, titlePrefix = '') {
  if (!target) {
    return;
  }

  if (!Array.isArray(items) || items.length === 0) {
    target.innerHTML = `<div class="alert-item">${titlePrefix}No alerts yet</div>`;
    return;
  }

  const list = items
    .map((alert) => {
      const lines = [
        escapeHtml(alert.message || alert.text || 'Alert'),
        `Tenant: ${escapeHtml(alert.tenantId || 'default')}`,
        `Type: ${escapeHtml(alert.type || 'scanner_alert')}`,
      ];
      if (alert.timestamp) {
        lines.push(`At: ${escapeHtml(alert.timestamp)}`);
      }
      if (alert.data && typeof alert.data === 'object') {
        if (alert.data.triggerType) {
          lines.push(`Trigger: ${escapeHtml(alert.data.triggerType)}`);
        }
        if (alert.data.generatedInDemo) {
          lines.push('Demo data');
        }
      }
      return `<div class="alert-item"><div>${lines.join('</div><div>')}</div></div>`;
    })
    .join('');

  target.innerHTML = list;
}

async function loadGlobalAlerts() {
  try {
    const payload = await requestJson('/ai-chat-api/alerts/all');
    const alerts = payload?.alerts || [];
    renderAlert(alerts, el.alertList, '');
  } catch (error) {
    renderAlert([], el.alertList, '');
  }
}

async function loadTenantAlerts() {
  try {
    const payload = await requestJson(`/api/scanner/results?tenantId=${encodeURIComponent(state.tenantId)}`);
    const alerts = []
      .concat(Array.isArray(payload?.confirmed) ? payload.confirmed : [])
      .concat(Array.isArray(payload?.suspicious) ? payload.suspicious : [])
      .concat(Array.isArray(payload?.items) ? payload.items : [])
      .filter(Boolean);
    renderAlert(Array.isArray(alerts) ? alerts : [], el.tenantAlertList, '');
  } catch (error) {
    renderAlert([], el.tenantAlertList, '');
  }
}

async function runScan() {
  setConnectionState('Running scan…');
  try {
    const payload = await requestJson('/api/scanner/run', {
      method: 'POST',
      body: JSON.stringify({ tenantId: state.tenantId }),
    });
    appendMessage('assistant', `Scan triggered: ${payload.message || 'completed'}`);
    setConnectionState('Connected');
    await Promise.all([renderStatus(), loadGlobalAlerts(), loadTenantAlerts()]);
  } catch (error) {
    setConnectionState('Scan failed');
    appendMessage('assistant', `Scan failed: ${error.message}`);
  }
}

async function sendChatMessage(text) {
  const payload = await requestJson('/ai-chat-api/message', {
    method: 'POST',
    body: JSON.stringify({
      message: text,
      sessionId: state.sessionId,
      tenant: state.tenantId,
    }),
  });

  if (!state.sessionId && payload?.sessionId) {
    state.sessionId = payload.sessionId;
    localStorage.setItem('chat-demo-session-id', state.sessionId);
  }

  return payload;
}

el.chatForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const text = el.messageInput.value.trim();
  if (!text) {
    return;
  }

  appendMessage('user', text);
  el.messageInput.value = '';
  setConnectionState('Thinking…');

  try {
    let payload;
    try {
      payload = await sendChatMessage(text);
    } catch (error) {
      if (state.sessionId && String(error.message).includes('404')) {
        state.sessionId = null;
        localStorage.removeItem('chat-demo-session-id');
        payload = await sendChatMessage(text);
      } else {
        throw error;
      }
    }

    appendMessage('assistant', payload.response || '[No response from bot]');
    setConnectionState('Connected');

    await Promise.all([loadGlobalAlerts(), loadTenantAlerts()]);
  } catch (error) {
    appendMessage('assistant', `Error: ${error.message}`);
    setConnectionState('Error');
  }
});

el.refreshStatusBtn?.addEventListener('click', renderStatus);
el.runScanBtn?.addEventListener('click', runScan);
el.refreshAlertsBtn?.addEventListener('click', loadGlobalAlerts);
el.refreshTenantAlertsBtn?.addEventListener('click', loadTenantAlerts);

state.sessionId = localStorage.getItem('chat-demo-session-id');

Promise.all([
  renderStatus(),
  loadGlobalAlerts(),
  loadTenantAlerts(),
]).finally(() => {
  setConnectionState('Connected');
  appendMessage('assistant', 'Welcome! Ask me about scanner status, running scans, or pending alerts.');
});

setInterval(() => {
  renderStatus();
  loadGlobalAlerts();
}, 10000);
