/* ============================================
   ADMIN PANEL - MIRABOLANDO CONFEITARIA
   JavaScript - Supabase Integration (CORRIGIDO)
   ============================================ */

// Supabase Configuration
// Nota: O client já foi inicializado no HTML (supabaseClient), vamos reutilizá-lo ou usar as constantes.
const SUPABASE_URL = 'https://xomejrbswvtkdylwhlba.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvbWVqcmJzd3Z0a2R5bHdobGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzODM5MzAsImV4cCI6MjA4NDk1OTkzMH0.OjCi7WPyricvSwisVUPCmplfDis9_RQd-aap_wfHaT4';

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
        return;
    }

    try {
        await Promise.all([
            loadDashboard(),
            loadOrders(),
            loadMenuItems(),
            loadProntaEntrega(),
            loadCustomers()
        ]);
        console.log('Todos os dados carregados.');
    } catch (e) {
        console.error('Erro ao carregar dados iniciais:', e);
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
            ...options,
            headers: { ...headers, ...options.headers }
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`API Error ${response.status}: ${errText}`);
        }

        const data = await response.json();
        return { success: true, data };
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
        customers: 'Clientes'
    };
    const titleEl = document.getElementById('page-title');
    if(titleEl) titleEl.textContent = titles[section] || section;
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

async function loadDashboard() {
    // Não chama loadOrders aqui para evitar chamada duplicada, 
    // pois initAdmin já chama loadOrders em paralelo.
    updateStats(); 
    // Renderiza orders recentes se já tivermos orders, senão espera o loadOrders terminar
}

function updateStats() {
    if(!orders) return;
    
    const pending = orders.filter(o => o.status === 'pending').length;
    const preparing = orders.filter(o => o.status === 'preparing').length;
    const ready = orders.filter(o => o.status === 'ready').length;

    const today = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(o => o.created_at?.startsWith(today));
    const todayTotal = todayOrders.reduce((sum, o) => sum + parseFloat(o.total || 0), 0);

    setText('stat-pending', pending);
    setText('stat-preparing', preparing);
    setText('stat-ready', ready);
    setText('stat-total', `R$ ${todayTotal.toFixed(2).replace('.', ',')}`);
    setText('pending-count', pending);
    
    renderRecentOrders();
}

function setText(id, value) {
    const el = document.getElementById(id);
    if(el) el.textContent = value;
}

function renderRecentOrders() {
    const container = document.getElementById('recent-orders-list');
    if(!container) return;

    const recent = orders.slice(0, 5);
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
}

// ============================================
// ORDERS LOGIC
// ============================================

async function loadOrders() {
    const statusFilter = document.getElementById('status-filter')?.value;
    let endpoint = 'orders?order=created_at.desc';
    if (statusFilter) endpoint += `&status=eq.${statusFilter}`;

    const result = await supabaseRequest(endpoint);
    if (result.success) {
        orders = result.data;
        renderOrdersTable();
        updateStats(); // Atualiza stats com novos dados
    }
}

function renderOrdersTable() {
    const tbody = document.getElementById('orders-table-body');
    if(!tbody) return;

    if (!orders || orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Nenhuma encomenda encontrada</td></tr>';
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
                <button class="action-btn view" onclick="viewOrder('${order.id}')">👁️ Ver</button>
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
        if(order) order.status = newStatus;
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
    if(!filter) return;
    const categories = [...new Set(menuItems.map(item => item.category))];
    
    let html = '<option value="">Todas Categorias</option>';
    categories.forEach(cat => html += `<option value="${cat}">${cat}</option>`);
    filter.innerHTML = html;
    
    // Evita adicionar múltiplos listeners se a função for chamada novamente
    filter.onchange = () => renderMenuGrid(filter.value);
}

function renderMenuGrid(categoryFilter = '') {
    const container = document.getElementById('menu-grid');
    if(!container) return;
    
    let items = menuItems;
    if (categoryFilter) items = items.filter(item => item.category === categoryFilter);

    if (items.length === 0) {
        container.innerHTML = '<p class="empty-state">Nenhum item encontrado</p>';
        return;
    }

    container.innerHTML = items.map(item => `
        <div class="menu-item ${item.active ? '' : 'inactive'}">
            <img src="${item.image}" alt="${item.name}" class="menu-item-image" onerror="this.src='https://via.placeholder.com/100'">
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
        if(item) item.active = active;
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
            <img src="${item.image}" alt="${item.name}" class="pronta-item-image" onerror="this.src='https://via.placeholder.com/100'">
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
        if(item) item.quantity = newQty;
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
    if(!tbody) return;
    
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
    } catch(e) { return 'Erro itens'; }
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
    
    if(msgEl !== toast) msgEl.textContent = message;
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
