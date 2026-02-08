// Versão DEBUG da função deleteorder - COPIAR para az1admin.js linha 712

async function deleteOrder(orderId) {
    console.log('🗑️🗑️🗑️ deleteOrder v175100 CHAMADO! ID:', orderId);
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
        console.log('🔄 DELETE:', `orders?id=eq.${orderId}`);
        const result = await supabaseRequest(`orders?id=eq.${orderId}`, { method: 'DELETE' });
        console.log('📡 Resultado:', result);

        if (result.success) {
            console.log('✅ SUCESSO!');
            showToast('Encomenda excluída!', 'success');
            orders = orders.filter(o => o.id !== orderId);
            console.log('📊 Restantes:', orders.length);
            await loadOrders();
            updateStats();
        } else {
            console.error('❌ Erro:', result.error);
            showToast('Erro ao excluir', 'error');
        }
    } catch (error) {
        console.error('❌ Exceção:', error);
        showToast('Erro ao excluir', 'error');
    }
}
