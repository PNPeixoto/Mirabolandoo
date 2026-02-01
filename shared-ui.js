/**
 * Shared UI Logic for Projeto Mirabolando
 * Handles card creation, translations, and common behavior for both Encomenda and Pronta Entrega pages.
 * VERSÃO CORRIGIDA E BLINDADA
 */

const SharedUI = {
    /**
     * Resolves translated text for an item with safety checks.
     */
    resolveTranslation(item) {
        // Garante que existe um idioma padrão
        const currentLang = (window.languageManager && window.languageManager.currentLang) ? window.languageManager.currentLang : 'pt-BR';
        
        let name = item.name || 'Item sem nome';
        let shortDesc = item.short_desc || item.shortDesc || '';
        let fullDesc = item.full_desc || item.fullDesc || '';

        try {
            // Check explicit translations on snippet
            if (item.translations && item.translations[currentLang]) {
                name = item.translations[currentLang].name || name;
                shortDesc = item.translations[currentLang].shortDesc || shortDesc;
                fullDesc = item.translations[currentLang].fullDesc || fullDesc;
            }
            // Fallback to global local data (menuCardapioLoja)
            else if (window.menuCardapioLoja) {
                const localItem = window.menuCardapioLoja.find(l => l.id === item.id);
                if (localItem && localItem.translations && localItem.translations[currentLang]) {
                    name = localItem.translations[currentLang].name || name;
                    shortDesc = localItem.translations[currentLang].shortDesc || shortDesc;
                    fullDesc = localItem.translations[currentLang].fullDesc || fullDesc;
                }
            }
        } catch (e) {
            console.warn(`Erro na tradução do item ${item.id}`, e);
        }

        return { name, shortDesc, fullDesc, currentLang };
    },

    /**
     * Renders options (HTML) for variables items (sizes, flavors).
     */
    renderOptions(item) {
        if (!item.options || item.options.length === 0) return '';

        return `
            <div class="size-options">
                <p data-i18n="cardapio.options.choose_size">Escolha o tamanho:</p>
                ${item.options.map((opt, idx) => `
                    <label class="size-option-label" onclick="event.stopPropagation()">
                        <input type="radio" name="size_${item.id}" value="${opt.price}" data-size="${opt.label || opt.size}" ${idx === 0 ? 'checked' : ''}>
                        <span class="size-name">${opt.label || opt.size}</span>
                        <span class="size-price">${opt.price}</span>
                    </label>
                `).join('')}
            </div>
        `;
    },

    /**
     * Toggles the card expanded state.
     */
    toggleCard(card) {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(c => {
            if (c !== card && c.classList.contains('expanded')) {
                c.classList.remove('expanded');
            }
        });
        card.classList.toggle('expanded');
    },

    /**
     * Creates a card DOM element.
     */
    createCard(item, index, config = { type: 'encomenda' }) {
        const card = document.createElement('div');
        // Garante que quantity é um número
        const quantity = parseInt(item.quantity) || 0; 
        const isSoldOut = (config.type === 'pronta_entrega' || config.type === 'pronta-entrega') && (quantity === 0);

        card.className = `card ${isSoldOut ? 'sold-out' : ''}`;
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');

        // Animação escalonada
        if (config.type.includes('pronta')) {
            card.style.transitionDelay = `${Math.min(index * 0.05, 0.5)}s`;
        } else {
            card.style.animationDelay = `${index * 0.1}s`;
            card.dataset.category = item.category;
            card.dataset.itemId = item.id;
        }

        const { name, shortDesc, fullDesc, currentLang } = this.resolveTranslation(item);

        const image = item.image || 'assets/placeholder.jpg';
        // Tratamento seguro de preço
        let price = item.price || "R$ 0,00";
        if (config.type === 'encomenda' && (!item.price || item.price === '0' || item.price === 0)) {
            price = "Consulte";
        }
        
        const fromPrice = (config.type === 'encomenda' && item.options && item.options.length > 0) ? 'A partir de ' : '';
        const imagePosition = item.imagePosition || 'center center';

        // Badges Logic
        let badgesHtml = '';
        if (config.type.includes('pronta')) {
            // Acesso seguro às traduções globais
            let stockText = `Última ${quantity}!`;
            try {
                if (window.translations && window.translations[currentLang] && window.translations[currentLang]['cardapio.stock']) {
                    stockText = window.translations[currentLang]['cardapio.stock'].replace('{quantity}', quantity);
                }
            } catch (e) {}

            if (isSoldOut) {
                badgesHtml = `<div class="sold-out-overlay"><span class="sold-out-badge-text">Esgotado</span></div>`;
            } else {
                badgesHtml = `
                    <span class="pronta-entrega-badge" data-i18n="nav.pronta_entrega">Pronta Entrega</span>
                    ${quantity <= 3 && quantity > 0 ? `<span class="stock-badge">${stockText}</span>` : ''}
                `;
            }
        }

        const optionsBlock = (config.type === 'encomenda') ? this.renderOptions(item) : '';

        // Quantity Info (Pronta Entrega only)
        const quantityInfo = (config.type.includes('pronta')) ? `
            <div class="quantity-info">
                <span>Disponível:</span>
                <span class="qty">${quantity > 0 ? `${quantity} unidade${quantity > 1 ? 's' : ''}` : 'Esgotado'}</span>
            </div>
        ` : '';

        // Actions (Add to Cart - Encomenda only)
        // Se for pronta entrega, pode ser botão de WhatsApp
        let actionsBlock = '';
        if (config.type === 'encomenda') {
            actionsBlock = `
                <div class="card-actions">
                    <button class="add-to-cart-btn" onclick="${config.addToCartFn || 'addToCart'}(event, '${item.id}')">
                        Adicionar à Encomenda
                    </button>
                </div>
            `;
        } else if (config.type.includes('pronta') && !isSoldOut) {
            // Botão WhatsApp para Pronta Entrega
            const msg = encodeURIComponent(`Olá! Quero reservar o item de pronta entrega: ${name}`);
            actionsBlock = `
                <div class="card-actions">
                     <a href="https://wa.me/5522999999999?text=${msg}" target="_blank" class="btn-whatsapp" style="display:block; text-align:center; padding:10px; background:#25D366; color:white; border-radius:8px; text-decoration:none; margin-top:10px;">
                        Comprar Agora 📱
                    </a>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="card-image-container">
                <img src="${image}" alt="${name}" class="card-img" loading="lazy" style="object-position: ${imagePosition};" onerror="this.src='https://via.placeholder.com/400x200?text=Mirabolando'">
                <button class="favorite-btn" aria-label="Favoritar">♥</button>
                ${badgesHtml}
                <span class="card-price">${fromPrice}${price}</span>
            </div>
            
            <div class="card-content">
                <div class="card-header">
                    <h3 class="card-title">${name}</h3>
                </div>
                
                <p class="card-short-desc">${shortDesc}</p>
                
                <div class="card-full-details">
                    <p style="margin-bottom: 15px; color: var(--cafe-noir); line-height: 1.7;">${fullDesc}</p>
                    ${optionsBlock}
                </div>

                ${quantityInfo}

                <div class="expand-hint" data-i18n="cardapio.details">+ detalhes</div>
                
                ${actionsBlock}
            </div>
        `;

        // Event Listeners
        card.addEventListener('click', (e) => {
            // Não expande se clicar nos botões de ação ou radio buttons
            if (e.target.closest('.size-option-label') || 
                e.target.closest('.add-to-cart-btn') || 
                e.target.closest('.btn-whatsapp') ||
                e.target.closest('.favorite-btn')) return;
            this.toggleCard(card);
        });

        return card;
    },

    /**
     * Renders a list of items into a container.
     */
    renderMenu(items, containerId, config) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} não encontrado`);
            return;
        }

        container.innerHTML = '';
        
        if (!items || items.length === 0) {
            container.innerHTML = '<p class="empty-state">Nenhum item encontrado.</p>';
            return;
        }

        items.forEach((item, index) => {
            try {
                const card = this.createCard(item, index, config);
                container.appendChild(card);
            } catch (error) {
                console.error(`Erro ao renderizar item ${index}:`, error);
            }
        });

        // Post-render animation trigger if needed
        if (config.type && config.type.includes('pronta')) {
            setTimeout(() => {
                document.querySelectorAll('.card').forEach(card => card.classList.add('visible'));
            }, 100);
        }
    }
};

// Expose to window
window.SharedUI = SharedUI;
