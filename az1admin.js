/* ============================================
   ADMIN PANEL - MIRABOLANDO CONFEITARIA
   JavaScript - Supabase Integration
   ============================================ */

// Supabase Configuration
const SUPABASE_URL = 'https://xomejrbswvtkdylwhlba.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvbWVqcmJzd3Z0a2R5bHdobGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzODM5MzAsImV4cCI6MjA4NDk1OTkzMH0.OjCi7WPyricvSwisVUPCmplfDis9_RQd-aap_wfHaT4';

// Global State
let currentSection = 'dashboard';
let orders = [];
let menuItems = [];
let prontaEntregaItems = [];
let customers = [];
let isLoading = false;

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
    initNavigation();
    updateDateTime();
    setInterval(updateDateTime, 60000);
    initLoadingStates();

    // Load all data and then hide the fullscreen loader
    await Promise.all([
        loadDashboard(),
        loadOrders(),
        loadMenuItems(),
        loadProntaEntrega(),
        loadCustomers()
    ]);

    // Hide fullscreen loader with a smooth animation
    hideFullscreenLoader();
});

// ============================================
// LOADING STATE MANAGEMENT
// ============================================

function initLoadingStates() {
    // Add loading class to body for initial load
    document.body.classList.add('loading');
}

function showLoadingState(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const skeletonHTML = `
        <div class="skeleton-loader">
            <div class="skeleton-card">
                <div class="skeleton-img"></div>
                <div class="skeleton-content">
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line short"></div>
                </div>
            </div>
            <div class="skeleton-card">
                <div class="skeleton-img"></div>
                <div class="skeleton-content">
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line short"></div>
                </div>
            </div>
            <div class="skeleton-card">
                <div class="skeleton-img"></div>
                <div class="skeleton-content">
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line short"></div>
                </div>
            </div>
        </div>
    `;
    container.innerHTML = skeletonHTML;
}

function hideLoadingState() {
    document.body.classList.remove('loading');
}

function hideFullscreenLoader() {
    const loader = document.getElementById('fullscreenLoader');
    if (loader) {
        // Add hidden class for fade out animation
        loader.classList.add('hidden');

        // Remove loader completely from DOM after animation
        setTimeout(() => {
            loader.remove();
        }, 700);
    }
}

// Fallback: Hide loader after max 5 seconds even if data hasn't loaded
setTimeout(() => {
    hideFullscreenLoader();
}, 5000);

// ============================================
// SUPABASE API HELPERS
// ============================================

async function supabaseRequest(endpoint, options = {}) {
    const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
    const headers = {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': options.prefer || 'return=representation'
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers: { ...headers, ...options.headers }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Supabase request error:', error);
        return { success: false, error: error.message };
    }
}

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

            // Close sidebar on mobile
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('open');
            }
        });
    });

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024 &&
            !sidebar.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
}

function switchSection(section) {
    currentSection = section;

    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${section}"]`)?.classList.add('active');

    // Update sections
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });
    document.getElementById(`${section}-section`)?.classList.add('active');

    // Update title
    const titles = {
        dashboard: 'Dashboard',
        orders: 'Encomendas',
        menu: 'Cardápio',
        'pronta-entrega': 'Pronta Entrega',
        customers: 'Clientes'
    };
    document.getElementById('page-title').textContent = titles[section] || section;
}

function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById('datetime').textContent = now.toLocaleDateString('pt-BR', options);
}

// ============================================
// DASHBOARD
// ============================================

async function loadDashboard() {
    await loadOrders();
    updateStats();
    renderRecentOrders();
}

function updateStats() {
    const pending = orders.filter(o => o.status === 'pending').length;
    const preparing = orders.filter(o => o.status === 'preparing').length;
    const ready = orders.filter(o => o.status === 'ready').length;

    // Total de hoje
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(o => o.created_at?.startsWith(today));
    const todayTotal = todayOrders.reduce((sum, o) => sum + parseFloat(o.total || 0), 0);

    document.getElementById('stat-pending').textContent = pending;
    document.getElementById('stat-preparing').textContent = preparing;
    document.getElementById('stat-ready').textContent = ready;
    document.getElementById('stat-total').textContent = `R$ ${todayTotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('pending-count').textContent = pending;
}

function renderRecentOrders() {
    const container = document.getElementById('recent-orders-list');
    const recent = orders.slice(0, 5);

    if (recent.length === 0) {
        container.innerHTML = '<p class="empty-state">Nenhuma encomenda ainda</p>';
        return;
    }

    container.innerHTML = recent.map(order => `
        <div class="order-item" onclick="viewOrder('${order.id}')">
            <div class="order-info">
                <div class="order-customer">${order.customer_name}</div>
                <div class="order-details">${formatItems(order.items)} • ${formatDate(order.created_at)}</div>
            </div>
            <span class="status-badge status-${order.status}">${translateStatus(order.status)}</span>
            <span class="order-total">R$ ${parseFloat(order.total).toFixed(2).replace('.', ',')}</span>
        </div>
    `).join('');
}

// ============================================
// ORDERS
// ============================================

async function loadOrders() {
    const statusFilter = document.getElementById('status-filter')?.value;
    let endpoint = 'orders?order=created_at.desc';

    if (statusFilter) {
        endpoint += `&status=eq.${statusFilter}`;
    }

    const result = await supabaseRequest(endpoint);

    if (result.success) {
        orders = result.data;
        renderOrdersTable();
        updateStats();
    } else {
        showToast('Erro ao carregar encomendas', 'error');
    }
}

function renderOrdersTable() {
    const tbody = document.getElementById('orders-table-body');

    if (orders.length === 0) {
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
        body: JSON.stringify({
            status: newStatus,
            updated_at: new Date().toISOString()
        })
    });

    if (result.success) {
        showToast(`Status atualizado para: ${translateStatus(newStatus)}`);
        loadOrders();
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
        <div class="modal-row">
            <span class="modal-label">Cliente</span>
            <span class="modal-value">${order.customer_name}</span>
        </div>
        <div class="modal-row">
            <span class="modal-label">WhatsApp</span>
            <span class="modal-value">${order.customer_phone}</span>
        </div>
        ${order.customer_cpf ? `
        <div class="modal-row">
            <span class="modal-label">CPF</span>
            <span class="modal-value">${order.customer_cpf}</span>
        </div>
        ` : ''}
        <div class="modal-row">
            <span class="modal-label">Endereço</span>
            <span class="modal-value">${order.delivery_address || 'Retirada na loja'}</span>
        </div>
        <div class="modal-row">
            <span class="modal-label">Status</span>
            <span class="modal-value"><span class="status-badge status-${order.status}">${translateStatus(order.status)}</span></span>
        </div>
        <div class="modal-row">
            <span class="modal-label">Total</span>
            <span class="modal-value" style="color: var(--accent-gold); font-size: 1.25rem;">R$ ${parseFloat(order.total).toFixed(2).replace('.', ',')}</span>
        </div>
        ${order.notes ? `
        <div class="modal-row">
            <span class="modal-label">Observações</span>
            <span class="modal-value">${order.notes}</span>
        </div>
        ` : ''}
        <div class="modal-items">
            <h4>Itens do Pedido</h4>
            ${items.map(item => `
                <div class="modal-item">
                    <span>${item.quantity}x ${item.name}</span>
                    <span>${item.price}</span>
                </div>
            `).join('')}
        </div>
    `;

    document.getElementById('order-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('order-modal').classList.remove('active');
}

// ============================================
// MENU ITEMS
// ============================================

async function loadMenuItems() {
    const result = await supabaseRequest('menu_items?menu_type=eq.cardapio&order=category,name');

    if (result.success) {
        menuItems = result.data;
        renderMenuGrid();
        populateCategoryFilter();
    } else {
        showToast('Erro ao carregar cardápio', 'error');
    }
}

function populateCategoryFilter() {
    const filter = document.getElementById('category-filter');
    const categories = [...new Set(menuItems.map(item => item.category))];

    filter.innerHTML = '<option value="">Todas Categorias</option>';
    categories.forEach(cat => {
        filter.innerHTML += `<option value="${cat}">${cat}</option>`;
    });

    filter.addEventListener('change', () => {
        renderMenuGrid(filter.value);
    });
}

function renderMenuGrid(categoryFilter = '') {
    const container = document.getElementById('menu-grid');
    let items = menuItems;

    if (categoryFilter) {
        items = items.filter(item => item.category === categoryFilter);
    }

    if (items.length === 0) {
        container.innerHTML = '<p class="empty-state">Nenhum item encontrado</p>';
        return;
    }

    container.innerHTML = items.map(item => `
        <div class="menu-item ${item.active ? '' : 'inactive'}">
            <img src="${item.image}" alt="${item.name}" class="menu-item-image" 
                 onerror="this.src='https://via.placeholder.com/400x200?text=Mirabolando'">
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <span class="menu-item-name">${item.name}</span>
                    <span class="menu-item-price">${item.price}</span>
                </div>
                <div class="menu-item-category">${item.category}</div>
                <div class="menu-item-controls">
                    <div class="toggle-wrapper">
                        <span class="toggle-label">Ativo</span>
                        <label class="toggle">
                            <input type="checkbox" ${item.active ? 'checked' : ''} 
                                   onchange="toggleMenuItem('${item.id}', this.checked)">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    <div class="quantity-wrapper">
                        <span class="quantity-label">Qtd:</span>
                        <input type="number" class="quantity-input" value="${item.quantity || 0}" min="0"
                               onchange="updateMenuQuantity('${item.id}', this.value)">
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

async function toggleMenuItem(itemId, active) {
    const result = await supabaseRequest(`menu_items?id=eq.${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            active,
            updated_at: new Date().toISOString()
        })
    });

    if (result.success) {
        showToast(`Item ${active ? 'ativado' : 'desativado'}`);
        loadMenuItems();
    } else {
        showToast('Erro ao atualizar item', 'error');
    }
}

async function updateMenuQuantity(itemId, quantity) {
    const result = await supabaseRequest(`menu_items?id=eq.${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            quantity: parseInt(quantity) || 0,
            updated_at: new Date().toISOString()
        })
    });

    if (result.success) {
        showToast('Quantidade atualizada');
    } else {
        showToast('Erro ao atualizar quantidade', 'error');
    }
}

// ============================================
// PRONTA ENTREGA
// ============================================

async function loadProntaEntrega() {
    const result = await supabaseRequest('menu_items?menu_type=eq.pronta_entrega&order=name');

    if (result.success) {
        prontaEntregaItems = result.data;
        renderProntaGrid();
        updateStockCount();
    } else {
        showToast('Erro ao carregar pronta entrega', 'error');
    }
}

function updateStockCount() {
    const totalStock = prontaEntregaItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const stockCountEl = document.getElementById('stock-count');
    const totalStockEl = document.getElementById('total-stock');

    if (stockCountEl) stockCountEl.textContent = totalStock;
    if (totalStockEl) totalStockEl.textContent = totalStock;
}

function renderProntaGrid() {
    const container = document.getElementById('pronta-grid');

    if (!container) return;

    if (prontaEntregaItems.length === 0) {
        container.innerHTML = '<p class="empty-state">Nenhum item de pronta entrega encontrado</p>';
        return;
    }

    container.innerHTML = prontaEntregaItems.map(item => `
        <div class="pronta-item ${item.active ? '' : 'inactive'} ${(item.quantity || 0) === 0 ? 'out-of-stock' : ''}">
            <img src="${item.image}" alt="${item.name}" class="pronta-item-image" 
                 onerror="this.src='https://via.placeholder.com/400x200?text=Mirabolando'">
            <div class="pronta-item-content">
                <div class="pronta-item-header">
                    <span class="pronta-item-name">${item.name}</span>
                    <span class="pronta-item-price">${item.price}</span>
                </div>
                <div class="pronta-item-stock ${(item.quantity || 0) === 0 ? 'empty' : (item.quantity <= 1 ? 'low' : '')}">
                    <span class="stock-icon">${(item.quantity || 0) === 0 ? '⚠️' : '📦'}</span>
                    <span class="stock-text">${item.quantity || 0} unidade${(item.quantity || 0) !== 1 ? 's' : ''}</span>
                </div>
                <div class="pronta-item-controls">
                    <div class="toggle-wrapper">
                        <span class="toggle-label">Disponível</span>
                        <label class="toggle">
                            <input type="checkbox" ${item.active ? 'checked' : ''} 
                                   onchange="toggleProntaItem('${item.id}', this.checked)">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    <div class="quantity-controls">
                        <button class="qty-btn minus" onclick="updateProntaQuantity('${item.id}', ${(item.quantity || 0) - 1})">−</button>
                        <input type="number" class="quantity-input" value="${item.quantity || 0}" min="0"
                               onchange="updateProntaQuantity('${item.id}', this.value)">
                        <button class="qty-btn plus" onclick="updateProntaQuantity('${item.id}', ${(item.quantity || 0) + 1})">+</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

async function toggleProntaItem(itemId, active) {
    const result = await supabaseRequest(`menu_items?id=eq.${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            active,
            updated_at: new Date().toISOString()
        })
    });

    if (result.success) {
        showToast(`Item ${active ? 'ativado' : 'desativado'}`);
        loadProntaEntrega();
    } else {
        showToast('Erro ao atualizar item', 'error');
    }
}

async function updateProntaQuantity(itemId, quantity) {
    const newQty = Math.max(0, parseInt(quantity) || 0);

    const result = await supabaseRequest(`menu_items?id=eq.${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            quantity: newQty,
            updated_at: new Date().toISOString()
        })
    });

    if (result.success) {
        showToast('Estoque atualizado');
        loadProntaEntrega();
    } else {
        showToast('Erro ao atualizar estoque', 'error');
    }
}

// ============================================
// CUSTOMERS
// ============================================

async function loadCustomers() {
    const result = await supabaseRequest('customers?order=created_at.desc');

    if (result.success) {
        customers = result.data;
        renderCustomersTable();
    } else {
        showToast('Erro ao carregar clientes', 'error');
    }
}

function renderCustomersTable() {
    const tbody = document.getElementById('customers-table-body');

    if (customers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">Nenhum cliente cadastrado</td></tr>';
        return;
    }

    tbody.innerHTML = customers.map(customer => `
        <tr>
            <td><strong>${customer.full_name}</strong></td>
            <td>${formatCPF(customer.cpf)}</td>
            <td>${customer.whatsapp}</td>
            <td style="max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${customer.address}</td>
            <td>${formatDate(customer.created_at)}</td>
        </tr>
    `).join('');
}

// ============================================
// UTILITIES
// ============================================

function formatItems(items) {
    if (!items) return '-';
    const parsedItems = typeof items === 'string' ? JSON.parse(items) : items;
    const count = parsedItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    return `${count} item${count !== 1 ? 's' : ''}`;
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatCPF(cpf) {
    if (!cpf) return '-';
    // Remove non-digits
    const digits = cpf.replace(/\D/g, '');
    if (digits.length !== 11) return cpf;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function translateStatus(status) {
    const translations = {
        pending: 'Pendente',
        confirmed: 'Confirmado',
        preparing: 'Preparando',
        ready: 'Pronto',
        delivered: 'Entregue',
        cancelled: 'Cancelado'
    };
    return translations[status] || status;
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    toastMessage.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Event listener for status filter
document.getElementById('status-filter')?.addEventListener('change', loadOrders);

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Close modal on backdrop click
document.getElementById('order-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'order-modal') {
        closeModal();
    }
});
