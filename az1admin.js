/* ============================================
   ADMIN PANEL - MIRABOLANDO CONFEITARIA
   JavaScript - Supabase Integration (CORRIGIDO)
   ============================================ */

console.log('🚀🚀🚀 ADMIN JS CARREGADO - VERSÃO 20260207175100 🚀🚀🚀');

// Supabase Configuration
// Nota: As constantes SUPABASE_URL e SUPABASE_ANON_KEY já estão definidas no HTML
// O client supabaseClient também já foi inicializado no HTML


// Global State
let currentSection = 'dashboard';
let orders = [];
let menuItems = [];
let prontaEntregaItems = [];
let customers = [];

// ============================================
// INITIALIZATION
// ============================================

async function initAdmin() {
    console.log('Initializing admin panel...');
    initNavigation();
    updateDateTime();
    setInterval(updateDateTime, 60000);
    initLoadingStates();

    // Importante: Aguardar verificar se o supabaseClient do HTML está pronto
    if (typeof supabaseClient === 'undefined') {
        console.error('Supabase Client não encontrado no HTML');
        hideFullscreenLoader();
        return;
    }

    try {
        // CORREÇÃO: Carrega dados PRIMEIRO, depois atualiza dashboard
        console.log('🔄 Carregando dados...');

        await Promise.all([
            loadOrders(),
            loadMenuItems(),
            loadProntaEntrega(),
            loadCustomers()
        ]);

        console.log('✅ Dados carregados. Orders:', orders ? orders.length : 0);

        // Atualiza dashboard DEPOIS que os dados já foram carregados
        updateStats();
        renderRecentOrders();

        console.log('✅ Dashboard atualizado com sucesso');
    } catch (e) {
        console.error('❌ Erro ao carregar dados iniciais:', e);
        // Mesmo com erro, tenta atualizar o dashboard com dados vazios
        updateStats();
        renderRecentOrders();
    }

    hideFullscreenLoader();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdmin);
} else {
    initAdmin();
}

// ============================================
// SUPABASE API HELPERS (CORRIGIDO)
// ============================================

async function supabaseRequest(endpoint, options = {}) {
    const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
    const method = options.method || 'GET';
    const body = options.body || null;

    console.log(`🌐 supabaseRequest: ${method} ${endpoint}`);
    if (method === 'DELETE') {
        console.log('  🔴 DELETE REQUEST - Details:');
        console.log('    - Endpoint completo:', url);
        console.log('    - Options:', options);
    }

    // CORREÇÃO PRINCIPAL: Pega o token da sessão atual
    let token = SUPABASE_ANON_KEY;
    try {
        const { data } = await supabaseClient.auth.getSession();
        if (data?.session?.access_token) {
            token = data.session.access_token;
        }
    } catch (e) {
        console.warn('Não foi possível obter sessão do usuário, usando anon key');
    }

    const headers = {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${token}`, // Usa o token do usuário logado
        'Content-Type': 'application/json',
        'Prefer': options.prefer || 'return=representation'
    };

    try {
        const response = await fetch(url, {
            method,
            headers: { ...headers, ...options.headers },
            body: body ? JSON.stringify(body) : undefined, // Stringify body for non-GET requests
            ...options // Spread other options like cache, mode, etc.
        });

        console.log(`  📡 Response status: ${response.status} ${response.statusText}`);

        if (method === 'DELETE') {
            const responseText = await response.text();
            console.log('  🔴 DELETE Response body:', responseText);
            console.log('  🔴 Response headers:', Object.fromEntries(response.headers.entries()));

            if (!response.ok) {
                throw new Error(`API Error ${response.status}: ${responseText}`);
            }
            // For DELETE, data might be empty or a simple success message
            return { success: true, data: responseText ? JSON.parse(responseText) : {}, error: null };
        }

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`API Error ${response.status}: ${errText}`);
        }

        const data = await response.json();
        return { success: true, data, error: null };
    } catch (error) {
        console.error('Supabase request error:', error);
        showToast('Erro de conexão: ' + error.message, 'error');
        return { success: false, error: error.message };
    }
}

// ============================================
// LOADING & UI STATES
// ============================================

function initLoadingStates() {
    document.body.classList.add('loading');
}

function hideFullscreenLoader() {
    const loader = document.getElementById('fullscreenLoader');
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 700);
    }
}

// Fallback de segurança
setTimeout(() => hideFullscreenLoader(), 5000);

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            switchSection(section);
            if (window.innerWidth <= 1024 && sidebar) {
                sidebar.classList.remove('open');
            }
        });
    });

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }
}

function switchSection(section) {
    currentSection = section;
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-section="${section}"]`)?.classList.add('active');

    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(`${section}-section`)?.classList.add('active');

    const titles = {
        dashboard: 'Dashboard',
        orders: 'Encomendas',
        menu: 'Cardápio',
        'pronta-entrega': 'Pronta Entrega',
        'manage-items': 'Gerenciar Itens',
        customers: 'Clientes'
    };
    const titleEl = document.getElementById('page-title');
    if (titleEl) titleEl.textContent = titles[section] || section;

    // Load data for specific sections
    if (section === 'manage-items') loadAllItems();
}

function updateDateTime() {
    const el = document.getElementById('datetime');
    if (el) {
        const now = new Date();
        el.textContent = now.toLocaleDateString('pt-BR', {
            weekday: 'long', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
        });
    }
}

// ============================================
// DASHBOARD LOGIC
// ============================================

// Dashboard é atualizado via updateStats() e renderRecentOrders()
// que são chamadas após os dados serem carregados no initAdmin()


function updateStats() {
    console.log('📊 updateStats: Atualizando estatísticas...');

    // Garante que orders é um array válido
    if (!orders || !Array.isArray(orders)) {
        console.warn('⚠️ updateStats: Array orders inválido, inicializando vazio');
        orders = [];
    }

    console.log('📊 updateStats: Total de pedidos:', orders.length);

    const pending = orders.filter(o => o.status === 'pending').length;
    const preparing = orders.filter(o => o.status === 'preparing').length;
    const ready = orders.filter(o => o.status === 'ready').length;

    const today = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(o => o.created_at?.startsWith(today));
    const todayTotal = todayOrders.reduce((sum, o) => sum + parseFloat(o.total || 0), 0);

    console.log('📊 Estatísticas:', { pending, preparing, ready, todayOrders: todayOrders.length, todayTotal });

    setText('stat-pending', pending);
    setText('stat-preparing', preparing);
    setText('stat-ready', ready);
    setText('stat-total', `R$ ${todayTotal.toFixed(2).replace('.', ',')}`);
    setText('pending-count', pending);

    renderRecentOrders();

    console.log('✅ updateStats: Estatísticas atualizadas');
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function renderRecentOrders() {
    console.log('📋 renderRecentOrders: Renderizando pedidos recentes...');
    const container = document.getElementById('recent-orders-list');
    if (!container) {
        console.warn('⚠️ renderRecentOrders: Container "recent-orders-list" não encontrado');
        return;
    }

    // Validação robusta do array orders
    if (!orders || !Array.isArray(orders)) {
        console.warn('⚠️ renderRecentOrders: Array orders inválido:', orders);
        container.innerHTML = '<p class="empty-state">Nenhuma encomenda ainda</p>';
        return;
    }

    const recent = orders.slice(0, 5);
    console.log('📋 renderRecentOrders:', recent.length, 'pedidos recentes');

    if (recent.length === 0) {
        container.innerHTML = '<p class="empty-state">Nenhuma encomenda ainda</p>';
        return;
    }

    container.innerHTML = recent.map(order => `
        <div class="order-item" onclick="viewOrder('${order.id}')">
            <div class="order-info">
                <div class="order-customer">${order.customer_name || 'Cliente'}</div>
                <div class="order-details">${formatItems(order.items)}</div>
            </div>
            <span class="status-badge status-${order.status}">${translateStatus(order.status)}</span>
            <span class="order-total">R$ ${parseFloat(order.total).toFixed(2).replace('.', ',')}</span>
        </div>
    `).join('');

    console.log('✅ renderRecentOrders: Renderização concluída');
}

// ============================================
// ORDERS LOGIC
// ============================================

async function loadOrders() {
    console.log('📦 loadOrders: Iniciando carregamento...');
    const statusFilter = document.getElementById('status-filter')?.value;
    let endpoint = 'orders?order=created_at.desc';
    if (statusFilter) endpoint += `&status=eq.${statusFilter}`;

    console.log('📦 loadOrders: Endpoint:', endpoint);

    const result = await supabaseRequest(endpoint);

    if (result.success) {
        orders = result.data || [];
        console.log('✅ loadOrders: Sucesso!', orders.length, 'pedidos carregados');
        renderOrdersTable();
        updateStats(); // Atualiza stats com novos dados
    } else {
        console.error('❌ loadOrders: Erro ao carregar pedidos:', result.error);
        orders = []; // Garante que orders sempre seja um array
        renderOrdersTable();
        updateStats();
    }
}

function renderOrdersTable() {
    const tbody = document.getElementById('orders-table-body');
    if (!tbody) return;

    if (!orders || orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="empty-state">Nenhuma encomenda encontrada</td></tr>';
        return;
    }

    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>
                <strong>${order.customer_name}</strong><br>
                <small style="color: var(--text-muted)">${order.customer_phone}</small>
            </td>
            <td>${formatItems(order.items)}</td>
            <td><strong>R$ ${parseFloat(order.total).toFixed(2).replace('.', ',')}</strong></td>
            <td>
                <select class="status-select" onchange="updateOrderStatus('${order.id}', this.value)">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pendente</option>
                    <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Confirmado</option>
                    <option value="preparing" ${order.status === 'preparing' ? 'selected' : ''}>Preparando</option>
                    <option value="ready" ${order.status === 'ready' ? 'selected' : ''}>Pronto</option>
                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Entregue</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelado</option>
                </select>
            </td>
            <td>${formatDate(order.created_at)}</td>
            <td>
                <div class="order-actions-inline">
                    <button class="btn-whatsapp ${order.whatsapp_sent ? 'sent' : ''}" 
                            onclick="sendWhatsAppMessage('${order.id}')" 
                            title="${order.whatsapp_sent ? 'WhatsApp já enviado' : 'Enviar WhatsApp'}">
                        ${order.whatsapp_sent ? '✅' : '📲'}
                    </button>
                    <button class="action-btn view" onclick="viewOrder('${order.id}')">👁️</button>
                    <button class="btn-delete-order" onclick="event.stopPropagation(); deleteOrder('${order.id}');" title="Excluir">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
}

async function updateOrderStatus(orderId, newStatus) {
    const result = await supabaseRequest(`orders?id=eq.${orderId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus, updated_at: new Date().toISOString() })
    });

    if (result.success) {
        showToast(`Status atualizado para: ${translateStatus(newStatus)}`);
        // Atualiza array local para refletir mudança sem recarregar tudo
        const order = orders.find(o => o.id === orderId);
        if (order) order.status = newStatus;
        updateStats();
    } else {
        showToast('Erro ao atualizar status', 'error');
    }
}

function viewOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const modalBody = document.getElementById('order-modal-body');
    const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;

    modalBody.innerHTML = `
        <div class="modal-row"><span class="modal-label">Cliente</span><span class="modal-value">${order.customer_name}</span></div>
        <div class="modal-row"><span class="modal-label">WhatsApp</span><span class="modal-value">${order.customer_phone}</span></div>
        <div class="modal-row"><span class="modal-label">Endereço</span><span class="modal-value">${order.delivery_address || 'Retirada'}</span></div>
        <div class="modal-row">
             <span class="modal-label">Status</span>
             <span class="modal-value"><span class="status-badge status-${order.status}">${translateStatus(order.status)}</span></span>
        </div>
        ${order.notes ? `<div class="modal-row"><span class="modal-label">Obs</span><span class="modal-value">${order.notes}</span></div>` : ''}
        <div class="modal-items">
            <h4>Itens do Pedido</h4>
            ${items.map(item => `
                <div class="modal-item">
                    <span>${item.quantity}x ${item.name} <small>${item.option || ''}</small></span>
                    <span>${item.price}</span>
                </div>
            `).join('')}
             <div class="modal-row" style="margin-top:10px; border-top:1px solid #eee; padding-top:10px;">
                <span class="modal-label"><strong>Total</strong></span>
                <span class="modal-value" style="color:var(--accent-gold)"><strong>R$ ${parseFloat(order.total).toFixed(2).replace('.', ',')}</strong></span>
            </div>
        </div>
    `;
    document.getElementById('order-modal').classList.add('active');
}

// ============================================
// MENU ITEMS LOGIC
// ============================================

async function loadMenuItems() {
    const result = await supabaseRequest('menu_items?menu_type=eq.cardapio&order=category,name');
    if (result.success) {
        menuItems = result.data;
        renderMenuGrid();
        populateCategoryFilter();
    }
}

function populateCategoryFilter() {
    const filter = document.getElementById('category-filter');
    if (!filter) return;
    const categories = [...new Set(menuItems.map(item => item.category))];

    let html = '<option value="">Todas Categorias</option>';
    categories.forEach(cat => html += `<option value="${cat}">${cat}</option>`);
    filter.innerHTML = html;

    // Evita adicionar múltiplos listeners se a função for chamada novamente
    filter.onchange = () => renderMenuGrid(filter.value);
}

// Flag para prevenir renderizações múltiplas simultâneas
let isRenderingMenu = false;

function renderMenuGrid(categoryFilter = '') {
    // Proteção contra loop infinito
    if (isRenderingMenu) {
        console.warn('⚠️ renderMenuGrid já está renderizando, ignorando chamada duplicada');
        return;
    }

    const container = document.getElementById('menu-grid');
    if (!container) return;

    isRenderingMenu = true;
    console.log('📋 renderMenuGrid: Renderizando grid de menu...');

    let items = menuItems;
    if (categoryFilter) items = items.filter(item => item.category === categoryFilter);

    if (items.length === 0) {
        container.innerHTML = '<p class="empty-state">Nenhum item encontrado</p>';
        isRenderingMenu = false;
        return;
    }

    container.innerHTML = items.map(item => `
        <div class="menu-item ${item.active ? '' : 'inactive'}">
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <span class="menu-item-name">${item.name}</span>
                    <span class="menu-item-price">${item.price}</span>
                </div>
                <div class="menu-item-controls">
                    <label class="toggle">
                        <input type="checkbox" ${item.active ? 'checked' : ''} onchange="toggleMenuItem('${item.id}', this.checked)">
                        <span class="toggle-slider"></span>
                    </label>
                </div>
            </div>
        </div>
    `).join('');

    isRenderingMenu = false;
    console.log('✅ renderMenuGrid: Renderização concluída');
}

async function toggleMenuItem(itemId, active) {
    const result = await supabaseRequest(`menu_items?id=eq.${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify({ active, updated_at: new Date().toISOString() })
    });
    if (result.success) {
        showToast(`Item ${active ? 'ativado' : 'desativado'}`);
        // Atualiza local
        const item = menuItems.find(i => i.id === itemId);
        if (item) item.active = active;
        renderMenuGrid(document.getElementById('category-filter')?.value);
    }
}

// ============================================
// PRONTA ENTREGA LOGIC
// ============================================

async function loadProntaEntrega() {
    const result = await supabaseRequest('menu_items?menu_type=eq.pronta_entrega&order=name');
    if (result.success) {
        prontaEntregaItems = result.data;
        renderProntaGrid();
        updateStockCount();
    }
}

function updateStockCount() {
    const totalStock = prontaEntregaItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
    setText('stock-count', totalStock);
    setText('total-stock', totalStock);
}

function renderProntaGrid() {
    const container = document.getElementById('pronta-grid');
    if (!container) return;

    if (prontaEntregaItems.length === 0) {
        container.innerHTML = '<p class="empty-state">Nenhum item encontrado</p>';
        return;
    }

    container.innerHTML = prontaEntregaItems.map(item => `
        <div class="pronta-item ${item.active ? '' : 'inactive'} ${(item.quantity || 0) === 0 ? 'out-of-stock' : ''}">
            <div class="pronta-item-content">
                <div class="pronta-item-header">
                    <span class="pronta-item-name">${item.name}</span>
                    <span class="pronta-item-price">${item.price}</span>
                </div>
                <div class="pronta-item-stock">
                    Estoque: <strong>${item.quantity || 0}</strong>
                </div>
                <div class="pronta-item-controls">
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateProntaQuantity('${item.id}', ${(item.quantity || 0) - 1})">−</button>
                        <input type="number" class="quantity-input" value="${item.quantity || 0}" readonly>
                        <button class="qty-btn" onclick="updateProntaQuantity('${item.id}', ${(item.quantity || 0) + 1})">+</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

async function updateProntaQuantity(itemId, quantity) {
    const newQty = Math.max(0, parseInt(quantity) || 0);
    const result = await supabaseRequest(`menu_items?id=eq.${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity: newQty, updated_at: new Date().toISOString() })
    });

    if (result.success) {
        showToast('Estoque atualizado');
        // Atualiza localmente e re-renderiza para ser rápido
        const item = prontaEntregaItems.find(i => i.id === itemId);
        if (item) item.quantity = newQty;
        renderProntaGrid();
        updateStockCount();
    }
}

// ============================================
// CUSTOMERS LOGIC
// ============================================

async function loadCustomers() {
    const result = await supabaseRequest('customers?order=created_at.desc');
    if (result.success) {
        customers = result.data;
        renderCustomersTable();
    }
}

function renderCustomersTable() {
    const tbody = document.getElementById('customers-table-body');
    if (!tbody) return;

    if (customers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">Nenhum cliente</td></tr>';
        return;
    }

    tbody.innerHTML = customers.map(customer => `
        <tr>
            <td><strong>${customer.full_name}</strong></td>
            <td>${formatCPF(customer.cpf)}</td>
            <td>${customer.whatsapp}</td>
            <td class="truncate">${customer.address}</td>
            <td>${formatDate(customer.created_at)}</td>
        </tr>
    `).join('');
}

// ============================================
// UTILS
// ============================================

function formatItems(items) {
    if (!items) return '-';
    try {
        const parsedItems = typeof items === 'string' ? JSON.parse(items) : items;
        const count = parsedItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
        return `${count} item${count !== 1 ? 's' : ''}`;
    } catch (e) { return 'Erro itens'; }
}

function formatDate(dateString) {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
    });
}

function formatCPF(cpf) {
    if (!cpf) return '-';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function translateStatus(status) {
    const map = {
        pending: 'Pendente', confirmed: 'Confirmado', preparing: 'Preparando',
        ready: 'Pronto', delivered: 'Entregue', cancelled: 'Cancelado'
    };
    return map[status] || status;
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const msgEl = document.getElementById('toast-message') || toast; // Fallback se não tiver filho

    if (msgEl !== toast) msgEl.textContent = message;
    else toast.textContent = message;

    toast.className = `toast show ${type}`;
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function closeModal() {
    document.getElementById('order-modal')?.classList.remove('active');
}

// Event Listeners globais
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
document.getElementById('order-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'order-modal') closeModal();
});
document.getElementById('status-filter')?.addEventListener('change', loadOrders);

// ============================================
// WHATSAPP INTEGRATION
// ============================================

/**
 * Gera mensagem template para WhatsApp
 */
function generateWhatsAppMessage(order) {
    const deliveryDate = new Date(order.delivery_date).toLocaleDateString('pt-BR');
    const itemsList = Array.isArray(order.items)
        ? order.items.map(item => `• ${item.quantity}x ${item.name}`).join('\n')
        : '• Pedido personalizado';
    const totalPrice = parseFloat(order.total_price || 0).toFixed(2).replace('.', ',');

    return `🎂 *Mirabolando Confeitaria*

Olá ${order.customer_name || 'Cliente'}! 👋

Seu pedido foi confirmado com sucesso! ✅

*Detalhes do Pedido:*
${itemsList}

*Valor Total:* R$ ${totalPrice}
📅 *Data de Retirada:* ${deliveryDate}

Estamos preparando tudo com muito carinho! 💕

Qualquer dúvida, estamos à disposição.

_Mirabolando Confeitaria - Adoçando seus momentos especiais_ 🍰`;
}

async function sendWhatsAppMessage(orderId) {
    try {
        const order = orders.find(o => o.id === orderId);
        if (!order) {
            showToast('Pedido não encontrado', 'error');
            return;
        }

        const message = generateWhatsAppMessage(order);
        const phone = (order.customer_phone || order.customer_whatsapp || '').replace(/\D/g, '');

        if (!phone || phone.length < 10) {
            showToast('Número de WhatsApp inválido', 'error');
            return;
        }

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/55${phone}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');

        await markWhatsAppSent(orderId);
        showToast('WhatsApp aberto! Clique em "Enviar"', 'success');
        await loadOrders();
    } catch (error) {
        console.error('Erro ao enviar WhatsApp:', error);
        showToast('Erro ao abrir WhatsApp', 'error');
    }
}

async function markWhatsAppSent(orderId) {
    const result = await supabaseRequest(`orders?id=eq.${orderId}`, {
        method: 'PATCH',
        body: JSON.stringify({ whatsapp_sent: true, updated_at: new Date().toISOString() })
    });
    if (result.success) {
        const order = orders.find(o => o.id === orderId);
        if (order) order.whatsapp_sent = true;
    }
    return result.success;
}

// Versão DEBUG da função deleteorder - COPIAR para az1admin.js linha 712

async function deleteOrder(orderId) {
    console.log('🗑️🗑️🗑️ deleteOrder v180930 CHAMADO! ID:', orderId);
    console.log('  📋 Tipo:', typeof orderId, '| Total pedidos:', orders.length);

    const order = orders.find(o => o.id === orderId);
    console.log('  🔍 Pedido encontrado:', order ? `SIM - ${order.customer_name}` : 'NÃO');

    if (!order) {
        console.error('❌ PEDIDO NÃO ENCONTRADO!');
        showToast('Pedido não encontrado', 'error');
        return;
    }

    if (!confirm(`⚠️ Excluir encomenda de ${order.customer_name}?\n\nEsta ação não pode ser desfeita.`)) {
        console.log('⚪ Cancelado pelo usuário');
        return;
    }

    try {
        console.log('🔄 Usando Supabase Client DELETE...');

        // Usar Supabase Client em vez de REST API direto
        const { data, error, count } = await supabaseClient
            .from('orders')
            .delete()
            .eq('id', orderId)
            .select();  // Retorna os registros deletados

        console.log('📡 Supabase Client Response:');
        console.log('  - data:', data);
        console.log('  - error:', error);
        console.log('  - count:', count);

        if (error) {
            console.error('❌ Erro Supabase:', error);

            // Mensagens de erro específicas
            if (error.code === 'PGRST301' || error.message.includes('RLS')) {
                showToast('⚠️ Sem permissão para excluir. Verifique RLS no Supabase.', 'error');
            } else {
                showToast(`Erro: ${error.message}`, 'error');
            }
            return;
        }

        if (!data || data.length === 0) {
            console.warn('⚠️ DELETE executado mas 0 registros afetados (RLS?)');
            showToast('⚠️ Nenhum registro foi excluído. Verifique permissões.', 'error');
            return;
        }

        console.log('✅ SUCESSO! Registro deletado:', data);
        showToast('Encomenda excluída!', 'success');

        // Remover do array local
        orders = orders.filter(o => o.id !== orderId);
        console.log('📊 Restantes:', orders.length);

        // Atualizar UI
        await loadOrders();
        updateStats();

    } catch (error) {
        console.error('❌ Exceção:', error);
        showToast('Erro ao excluir', 'error');
    }
}


async function generateDailyReport() {
    try {
        if (typeof XLSX === 'undefined') {
            showToast('Biblioteca de Excel não carregada', 'error');
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        const todayOrders = orders.filter(o => o.created_at && new Date(o.created_at).toISOString().split('T')[0] === today);

        if (todayOrders.length === 0) {
            showToast('Nenhuma encomenda registrada hoje', 'info');
            return;
        }

        const excelData = todayOrders.map(order => ({
            'ID': (order.id || '').substring(0, 8),
            'Cliente': order.customer_name || 'N/A',
            'WhatsApp': order.customer_phone || 'N/A',
            'Itens': Array.isArray(order.items) ? order.items.map(i => `${i.quantity}x ${i.name}`).join(', ') : 'Pedido personalizado',
            'Valor Total': `R$ ${parseFloat(order.total_price || 0).toFixed(2).replace('.', ',')}`,
            'Data de Retirada': order.delivery_date ? new Date(order.delivery_date).toLocaleDateString('pt-BR') : 'N/A',
            'Status': translateStatus(order.status || 'pending'),
            'WhatsApp Enviado': order.whatsapp_sent ? 'Sim' : 'Não',
            'Criado em': order.created_at ? new Date(order.created_at).toLocaleString('pt-BR') : 'N/A'
        }));

        const ws = XLSX.utils.json_to_sheet(excelData);
        ws['!cols'] = [{ wch: 10 }, { wch: 20 }, { wch: 15 }, { wch: 40 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 15 }, { wch: 18 }];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Encomendas');

        const filename = `Mirabolando_Encomendas_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.xlsx`;
        XLSX.writeFile(wb, filename);
        showToast(`✅ Relatório gerado: ${filename}`, 'success');
    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        showToast('Erro ao gerar relatório Excel', 'error');
    }
}

// ============================================
// ITEM MANAGEMENT (CRUD)
// ============================================

let allItems = []; // Array para armazenar todos os itens

/**
 * Load all items from database
 */
async function loadAllItems() {
    console.log('📦 loadAllItems: Carregando todos os itens...');
    const result = await supabaseRequest('menu_items?order=menu_type,name');
    if (result.success) {
        allItems = result.data || [];
        console.log('✅ loadAllItems: Sucesso!', allItems.length, 'itens carregados');
        console.log('📊 Exemplo de item:', allItems[0]); // DEBUG: Ver estrutura dos dados
        filterItems(); // Usar filtro em vez de renderizar diretamente
    } else {
        console.error('❌ loadAllItems: Erro:', result.error);
        showToast('Erro ao carregar itens', 'error');
    }
}

/**
 * Map legacy category names to menu_type
 */
function getCategoryFromItem(item) {
    // Se tem menu_type válido, usar ele
    if (item.menu_type && item.menu_type !== 'undefined' && item.menu_type !== '') {
        return item.menu_type;
    }

    // Mapear category antiga para menu_type novo  
    const categoryMap = {
        'Bolos': 'cardapio',
        'Tortas': 'cardapio',
        'Fatias': 'cardapio',
        'bolos': 'cardapio',
        'tortas': 'cardapio',
        'fatias': 'cardapio',
        'Pronta Entrega': 'pronta_entrega',
        'pronta_entrega': 'pronta_entrega',
        'ProntaEntrega': 'pronta_entrega',
        'Encomenda': 'encomenda',
        'encomenda': 'encomenda',
        'cardapio': 'cardapio',
        'cardápio': 'cardapio'
    };

    return categoryMap[item.category] || item.category || 'cardapio';
}

/**
 * Filter items by category
 */
function filterItems() {
    const selectElement = document.getElementById('manage-items-filter');

    if (!selectElement) {
        console.error('❌ Elemento manage-items-filter não encontrado!');
        return;
    }

    // Log detalhado do estado do select
    // Log simplificado
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const categoryFilter = selectedOption ? selectedOption.value : '';

    // console.log(`🔍 Filtro selecionado: "${categoryFilter}"`);

    let filtered = [...allItems];

    // Se não há filtro, mostrar todos
    if (!categoryFilter || categoryFilter === '') {
        renderItemsManagement(filtered);
        return;
    }

    // Filtrar por menu_type (cardapio, pronta_entrega, encomenda)
    filtered = filtered.filter(item => {
        const itemMenuType = getCategoryFromItem(item);
        return itemMenuType === categoryFilter;
    });

    console.log(`✅ Filtro "${categoryFilter}": ${filtered.length} itens encontrados`);
    renderItemsManagement(filtered);
}


/**
 * Render items management grid
 */
function renderItemsManagement(itemsToRender = null) {
    const container = document.getElementById('items-management-grid');
    if (!container) {
        console.error('❌ Container items-management-grid não encontrado');
        return;
    }

    const items = itemsToRender || allItems;
    console.log(`📋 Renderizando ${items.length} itens...`);

    if (items.length === 0) {
        container.innerHTML = '<p class="empty-state">Nenhum item encontrado com os filtros selecionados.</p>';
        return;
    }

    container.innerHTML = items.map(item => {
        // Parse price correctly - handle Brazilian format "R$ 22,00"
        let price = item.price;
        if (typeof price === 'string') {
            price = price.replace(/R\$\s*/g, '').trim().replace(',', '.');
        }
        price = parseFloat(price);
        const priceFormatted = !isNaN(price) && price > 0 ? price.toFixed(2).replace('.', ',') : '0,00';

        const categoryBadge = item.menu_type || 'cardapio';
        const categoryLabel = {
            'cardapio': 'Cardápio',
            'pronta_entrega': 'Pronta Entrega',
            'encomenda': 'Encomenda'
        }[categoryBadge] || 'Cardápio';

        const stockInfo = item.menu_type === 'pronta_entrega'
            ? `<span class="item-stock">Estoque: ${item.quantity || 0}</span>`
            : '';

        const activeStatus = item.active !== false ? 'active' : 'inactive';
        const activeLabel = item.active !== false ? 'Ativo' : 'Inativo';

        return `
            <div class="item-card">
                <div class="item-card-header">
                    <h4>${item.name}</h4>
                    <span class="item-badge ${categoryBadge}">${categoryLabel}</span>
                </div>
                <div class="item-card-body">
                    <div class="item-info">
                        <span class="item-price">R$ ${priceFormatted}</span>
                        ${stockInfo}
                        <span class="item-status ${activeStatus}">${activeLabel}</span>
                    </div>
                    ${item.description ? `<p class="item-description">${item.description}</p>` : ''}
                </div>
                <div class="item-card-actions">
                    <button class="btn-icon btn-edit" onclick="showItemModal('${item.id}')" title="Editar">
                        ✏️
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteItem('${item.id}')" title="Excluir">
                        🗑️
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Get category label
 */
function getCategoryLabel(category) {
    const labels = {
        'cardapio': 'Cardápio',
        'pronta_entrega': 'Pronta Entrega',
        'encomenda': 'Encomenda'
    };
    return labels[category] || category;
}

/**
 * Show item modal for create or edit
 */
function showItemModal(itemId = null) {
    console.log('📝 showItemModal:', itemId ? 'Editar' : 'Criar novo');
    const modal = document.getElementById('item-modal');
    const title = document.getElementById('item-modal-title');
    const form = document.getElementById('item-form');

    // Reset form
    form.reset();
    document.getElementById('item-id').value = '';
    document.getElementById('item-active').checked = true;
    document.getElementById('subcategory-group').style.display = 'none';

    if (itemId) {
        // Edit mode
        const item = allItems.find(i => i.id === itemId);
        if (item) {
            title.textContent = 'Editar Item';
            document.getElementById('item-id').value = item.id;
            document.getElementById('item-name').value = item.name || '';
            document.getElementById('item-price').value = item.price || '';
            document.getElementById('item-category').value = item.menu_type || '';
            document.getElementById('item-subcategory').value = item.category || '';
            document.getElementById('item-image').value = item.image || '';
            document.getElementById('item-short-desc').value = item.short_desc || '';
            document.getElementById('item-full-desc').value = item.full_desc || '';
            document.getElementById('item-stock').value = item.quantity || 0;
            document.getElementById('item-active').checked = item.active !== false;

            // Load translations if available
            if (item.translations) {
                // English
                const en = item.translations["en"] || item.translations["en-US"];
                if (en) {
                    document.getElementById('item-short-desc-en').value = en.shortDesc || '';
                    document.getElementById('item-full-desc-en').value = en.fullDesc || '';
                }

                // Spanish
                const es = item.translations["es"] || item.translations["es-ES"];
                if (es) {
                    document.getElementById('item-short-desc-es').value = es.shortDesc || '';
                    document.getElementById('item-full-desc-es').value = es.fullDesc || '';
                }
            } else {
                // Clear translation fields if no translations exist
                document.getElementById('item-short-desc-en').value = '';
                document.getElementById('item-full-desc-en').value = '';
                document.getElementById('item-short-desc-es').value = '';
                document.getElementById('item-full-desc-es').value = '';
            }

            // Show subcategory if needed
            toggleSubcategory();
        }
    } else {
        // Create mode
        title.textContent = 'Adicionar Novo Item';
    }

    modal.classList.add('active');
}

/**
 * Close item modal
 */
function closeItemModal() {
    const modal = document.getElementById('item-modal');
    modal.classList.remove('active');
}

/**
 * Save item (create or update)
 */
async function saveItem(event) {
    event.preventDefault();

    const itemId = document.getElementById('item-id').value;
    const name = document.getElementById('item-name').value.trim();
    const price = document.getElementById('item-price').value.trim();
    const menuType = document.getElementById('item-category').value;
    const subcategory = document.getElementById('item-subcategory')?.value || '';
    const image = document.getElementById('item-image').value.trim();
    const shortDesc = document.getElementById('item-short-desc')?.value?.trim() || '';
    const fullDesc = document.getElementById('item-full-desc')?.value?.trim() || '';
    const stock = parseInt(document.getElementById('item-stock').value) || 0;
    const active = document.getElementById('item-active').checked;

    // Validation
    if (!name || !price || !menuType) {
        showToast('Preencha todos os campos obrigatórios', 'error');
        return;
    }

    if ((menuType === 'cardapio' || menuType === 'encomenda') && !subcategory) {
        showToast('Selecione uma subcategoria', 'error');
        return;
    }

    // Capturar traduções
    const shortDescEN = document.getElementById('item-short-desc-en')?.value?.trim() || shortDesc;
    const fullDescEN = document.getElementById('item-full-desc-en')?.value?.trim() || fullDesc || shortDescEN;
    const shortDescES = document.getElementById('item-short-desc-es')?.value?.trim() || shortDesc;
    const fullDescES = document.getElementById('item-full-desc-es')?.value?.trim() || fullDesc || shortDescES;

    const translations = {
        "pt-BR": {
            name: name,
            shortDesc: shortDesc,
            fullDesc: fullDesc || shortDesc
        },
        "en": {
            name: name,
            shortDesc: shortDescEN,
            fullDesc: fullDescEN
        },
        "es": {
            name: name,
            shortDesc: shortDescES,
            fullDesc: fullDescES
        }
    };

    const itemData = {
        name,
        price,
        category: subcategory || menuType,
        menu_type: menuType,
        image: image || null,
        short_desc: shortDesc || null,
        full_desc: fullDesc || null,
        quantity: (menuType === 'pronta_entrega' || menuType === 'cardapio') ? stock : null,
        active,
        translations: translations, // Salvar objeto translations
        updated_at: new Date().toISOString()
    };

    let result;
    if (itemId) {
        // Update existing item
        console.log('🔄 Atualizando item:', itemId);
        result = await supabaseRequest(`menu_items?id=eq.${itemId}`, {
            method: 'PATCH',
            body: JSON.stringify(itemData)
        });
    } else {
        // Create new item
        console.log('➕ Criando novo item');
        // Gerar ID único (timestamp + random)
        itemData.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
        itemData.created_at = new Date().toISOString();
        result = await supabaseRequest('menu_items', {
            method: 'POST',
            body: JSON.stringify(itemData)
        });
    }

    if (result.success) {
        showToast(itemId ? 'Item atualizado com sucesso!' : 'Item criado com sucesso!', 'success');
        closeItemModal();

        // Reload all data
        await Promise.all([
            loadAllItems(),
            loadMenuItems(),
            loadProntaEntrega()
        ]);
    } else {
        showToast('Erro ao salvar item: ' + result.error, 'error');
    }
}

/**
 * Confirm before deleting item
 */
function deleteItemConfirm(itemId) {
    const item = allItems.find(i => i.id === itemId);
    if (!item) return;

    if (confirm(`Tem certeza que deseja deletar "${item.name}"?\n\nEsta ação não pode ser desfeita.`)) {
        deleteItem(itemId);
    }
}

/**
 * Delete item
 */
async function deleteItem(itemId) {
    console.log('🗑️ Deletando item:', itemId);

    const result = await supabaseRequest(`menu_items?id=eq.${itemId}`, {
        method: 'DELETE'
    });

    if (result.success) {
        showToast('Item deletado com sucesso!', 'success');

        // Reload all data
        await Promise.all([
            loadAllItems(),
            loadMenuItems(),
            loadProntaEntrega()
        ]);
    } else {
        showToast('Erro ao deletar item: ' + result.error, 'error');
    }
}

// ============================================
// SUBCATEGORY TOGGLE & JS CODE GENERATOR
// ============================================

/**
 * Toggle subcategory visibility based on menu type
 */
function toggleSubcategory() {
    const menuType = document.getElementById('item-category').value;
    const subcategoryGroup = document.getElementById('subcategory-group');

    // Show subcategory for cardapio and encomenda
    if (menuType === 'cardapio' || menuType === 'encomenda') {
        subcategoryGroup.style.display = 'block';
        document.getElementById('item-subcategory').required = true;
    } else {
        subcategoryGroup.style.display = 'none';
        document.getElementById('item-subcategory').required = false;
    }
}

/**
 * Translate text using MyMemory API (free, no API key required)
 * @param {string} text - Text to translate
 * @param {string} sourceLang - Source language code (e.g., 'pt')
 * @param {string} targetLang - Target language code (e.g., 'en', 'es')
 * @returns {Promise<string>} - Translated text
 */
async function translateText(text, sourceLang, targetLang) {
    if (!text || text.trim() === '') return '';

    try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.responseStatus === 200 && data.responseData?.translatedText) {
            return data.responseData.translatedText;
        }
        return text; // Fallback to original text
    } catch (error) {
        console.error('Translation error:', error);
        return text; // Fallback to original text
    }
}

/**
 * Auto-translate descriptions from Portuguese to English and Spanish
 */
async function autoTranslateDescriptions() {
    const shortDescPT = document.getElementById('item-short-desc').value.trim();
    const fullDescPT = document.getElementById('item-full-desc').value.trim();

    if (!shortDescPT) {
        showToast('Preencha a descrição curta em Português primeiro', 'error');
        return;
    }

    // Show loading state
    const translateBtn = document.querySelector('button[onclick="autoTranslateDescriptions()"]');
    const originalText = translateBtn?.innerHTML;
    if (translateBtn) {
        translateBtn.innerHTML = '⏳ Traduzindo...';
        translateBtn.disabled = true;
    }

    try {
        showToast('Traduzindo para Inglês e Espanhol...', 'info');

        // Translate to English
        const [shortDescEN, fullDescEN] = await Promise.all([
            translateText(shortDescPT, 'pt', 'en'),
            fullDescPT ? translateText(fullDescPT, 'pt', 'en') : ''
        ]);

        // Translate to Spanish
        const [shortDescES, fullDescES] = await Promise.all([
            translateText(shortDescPT, 'pt', 'es'),
            fullDescPT ? translateText(fullDescPT, 'pt', 'es') : ''
        ]);

        // Fill the fields
        document.getElementById('item-short-desc-en').value = shortDescEN;
        document.getElementById('item-full-desc-en').value = fullDescEN;
        document.getElementById('item-short-desc-es').value = shortDescES;
        document.getElementById('item-full-desc-es').value = fullDescES;

        showToast('Traduções concluídas! ✅', 'success');
    } catch (error) {
        console.error('Auto-translate error:', error);
        showToast('Erro na tradução automática', 'error');
    } finally {
        // Restore button
        if (translateBtn) {
            translateBtn.innerHTML = originalText || '🌐 Traduzir Automaticamente';
            translateBtn.disabled = false;
        }
    }
}

/**
 * Generate JS code for the item in the format expected by data files
 */
function generateJSCode() {
    const name = document.getElementById('item-name').value.trim();
    const price = document.getElementById('item-price').value.trim();
    const menuType = document.getElementById('item-category').value;
    const subcategory = document.getElementById('item-subcategory').value || 'Outros';
    const image = document.getElementById('item-image').value.trim() || 'assets/placeholder.png';

    // Portuguese (required)
    const shortDesc = document.getElementById('item-short-desc').value.trim();
    const fullDesc = document.getElementById('item-full-desc').value.trim();

    // English (optional - falls back to Portuguese)
    const shortDescEN = document.getElementById('item-short-desc-en')?.value?.trim() || shortDesc;
    const fullDescEN = document.getElementById('item-full-desc-en')?.value?.trim() || fullDesc || shortDescEN;

    // Spanish (optional - falls back to Portuguese)
    const shortDescES = document.getElementById('item-short-desc-es')?.value?.trim() || shortDesc;
    const fullDescES = document.getElementById('item-full-desc-es')?.value?.trim() || fullDesc || shortDescES;

    const stock = parseInt(document.getElementById('item-stock').value) || 0;

    if (!name || !price || !menuType) {
        showToast('Preencha Nome, Preço e Tipo de Menu', 'error');
        return;
    }

    if ((menuType === 'cardapio' || menuType === 'encomenda') && !subcategory) {
        showToast('Selecione uma subcategoria', 'error');
        return;
    }

    // Generate ID from name
    const id = name.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/(^_|_$)/g, '');

    let code = '';
    let targetFile = '';

    if (menuType === 'cardapio') {
        targetFile = 'data-cardapio.js';
        code = `    {
        id: '${id}',
        name: "${name}",
        category: '${subcategory}',
        translations: {
            "pt-BR": {
                name: "${name}",
                shortDesc: "${shortDesc}",
                fullDesc: "${fullDesc || shortDesc}"
            },
            "en-US": {
                name: "${name}",
                shortDesc: "${shortDescEN}",
                fullDesc: "${fullDescEN}"
            },
            "es-ES": {
                name: "${name}",
                shortDesc: "${shortDescES}",
                fullDesc: "${fullDescES}"
            }
        },
        price: "${price}",
        image: "${image}",
        quantity: ${stock}
    },`;
    } else if (menuType === 'encomenda') {
        targetFile = 'data-encomenda.js';
        code = `    {
        id: '${id}',
        name: "${name}",
        category: '${subcategory}',
        tags: [],
        shortDesc: "${shortDesc}",
        fullDesc: "${fullDesc || shortDesc}",
        price: "${price}",
        image: "${image}",
        options: [
            { size: "PP - 15cm (Até 10 fatias)", price: "${price}" },
            { size: "P - 20cm (Até 20 fatias)", price: "R$ XXX,00" }
        ]
    },`;
    } else if (menuType === 'pronta_entrega') {
        targetFile = 'data-pronta-entrega.js (ou Supabase)';
        code = `    {
        id: '${id}',
        name: "${name}",
        category: '${subcategory || 'Pronta Entrega'}',
        shortDesc: "${shortDesc}",
        fullDesc: "${fullDesc || shortDesc}",
        price: "${price}",
        image: "${image}",
        quantity: ${stock},
        active: true
    },`;
    }

    // Show the code modal
    document.getElementById('code-target-file').textContent = targetFile;
    document.getElementById('generated-code').value = code;
    document.getElementById('code-modal').classList.add('active');
}

/**
 * Close code modal
 */
function closeCodeModal() {
    document.getElementById('code-modal').classList.remove('active');
}

/**
 * Copy generated code to clipboard
 */
function copyGeneratedCode() {
    const codeTextarea = document.getElementById('generated-code');
    codeTextarea.select();
    codeTextarea.setSelectionRange(0, 99999); // For mobile

    try {
        navigator.clipboard.writeText(codeTextarea.value);
        showToast('✅ Código copiado para a área de transferência!', 'success');
    } catch (err) {
        document.execCommand('copy');
        showToast('✅ Código copiado!', 'success');
    }
}
