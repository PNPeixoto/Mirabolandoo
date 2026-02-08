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
        renderItemsManagement();
    } else {
        console.error('❌ loadAllItems: Erro:', result.error);
        showToast('Erro ao carregar itens', 'error');
    }
}

/**
 * Render items management grid
 */
function renderItemsManagement() {
    console.log('📋 renderItemsManagement: Renderizando lista de itens...');
    const container = document.getElementById('items-management-grid');
    if (!container) return;

    if (allItems.length === 0) {
        container.innerHTML = '<p class="empty-state">Nenhum item cadastrado. Clique em "Adicionar Novo Item" para começar.</p>';
        return;
    }

    container.innerHTML = allItems.map(item => `
        <div class="item-card" onclick="showItemModal('${item.id}')">
            <div class="item-card-header">
                <h4>${item.name}</h4>
                <span class="item-badge ${item.menu_type}">${getCategoryLabel(item.menu_type)}</span>
            </div>
            <div class="item-card-body">
                <div class="item-info">
                    <span class="item-price">R$ ${parseFloat(item.price || 0).toFixed(2).replace('.', ',')}</span>
                    ${item.menu_type === 'pronta_entrega' ? `<span class="item-stock">Estoque: ${item.quantity || 0}</span>` : ''}
                    <span class="item-status ${item.active ? 'active' : 'inactive'}">${item.active ? 'Ativo' : 'Inativo'}</span>
                </div>
            </div>
            <div class="item-card-actions" onclick="event.stopPropagation()">
                <button class="btn-icon btn-edit" onclick="showItemModal('${item.id}')" title="Editar">✏️</button>
                <button class="btn-icon btn-delete" onclick="deleteItemConfirm('${item.id}')" title="Deletar">🗑️</button>
            </div>
        </div>
    `).join('');

    console.log('✅ renderItemsManagement: Renderização concluída');
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

    if (itemId) {
        // Edit mode
        const item = allItems.find(i => i.id === itemId);
        if (item) {
            title.textContent = 'Editar Item';
            document.getElementById('item-id').value = item.id;
            document.getElementById('item-name').value = item.name || '';
            document.getElementById('item-price').value = item.price || '';
            document.getElementById('item-category').value = item.menu_type || '';
            document.getElementById('item-image').value = item.image || '';
            // document.getElementById('item-description').value = item.description || ''; // Campo não existe mais
            document.getElementById('item-stock').value = item.quantity || 0;
            document.getElementById('item-active').checked = item.active !== false;
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
    console.log('💾 Salvando item...');

    const itemId = document.getElementById('item-id').value;
    const name = document.getElementById('item-name').value.trim();
    const menuType = document.getElementById('item-category').value; // menu_type no banco
    const price = document.getElementById('item-price').value.trim();
    const imageUrl = document.getElementById('item-image-url')?.value?.trim() || '';
    const active = document.getElementById('item-available')?.checked ?? true;
    const shortDesc = document.getElementById('item-short-desc')?.value?.trim() || '';
    const stock = parseInt(document.getElementById('item-stock')?.value) || 0;

    if (!name || !menuType || !price) {
        showToast('Preencha todos os campos obrigatórios', 'error');
        return;
    }

    // Remover R$ e formatar preço
    const formattedPrice = price.replace('R$', '').trim();

    const itemData = {
        name: name,
        menu_type: menuType,
        category: menuType, // mantém para compatibilidade
        price: formattedPrice,
        image: imageUrl || null,
        active: active,
        short_desc: shortDesc || null,
        quantity: stock
    };

    try {
        let result;
        if (itemId) {
            // Atualizar item existente
            result = await supabaseRequest(`menu_items?id=eq.${itemId}`, {
                method: 'PATCH',
                body: JSON.stringify(itemData)
            });
        } else {
            // Criar novo item
            result = await supabaseRequest('menu_items', {
                method: 'POST',
                body: JSON.stringify(itemData)
            });
        }

        if (result.success) {
            showToast(itemId ? 'Item atualizado!' : 'Item criado!', 'success');
            closeItemModal();
            loadItems();
        } else {
            showToast('Erro ao salvar item: ' + result.error, 'error');
            console.error('Erro detalhado:', result.error);
        }
    } catch (error) {
        console.error('Erro ao salvar item:', error);
        showToast('Erro ao salvar item', 'error');
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
