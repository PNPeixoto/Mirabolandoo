/**
 * Shared UI Logic for Projeto Mirabolando
 * Handles card creation, translations, and common behavior for both Encomenda and Pronta Entrega pages.
 */

const SharedUI = {
    /**
     * Resolves translated text for an item.
     */
    resolveTranslation(item) {
        const currentLang = window.languageManager ? window.languageManager.currentLang : 'pt-BR';
        let name = item.name;
        let shortDesc = item.short_desc || item.shortDesc || '';
        let fullDesc = item.full_desc || item.fullDesc || '';

        // Check explicit translations on snippet
        if (item.translations && item.translations[currentLang]) {
            name = item.translations[currentLang].name;
            shortDesc = item.translations[currentLang].shortDesc;
            fullDesc = item.translations[currentLang].fullDesc;
        }
        // Fallback to global local data (menuCardapioLoja)
        else if (window.menuCardapioLoja) {
            const localItem = window.menuCardapioLoja.find(l => l.id === item.id);
            if (localItem && localItem.translations && localItem.translations[currentLang]) {
                name = localItem.translations[currentLang].name;
                shortDesc = localItem.translations[currentLang].shortDesc;
                fullDesc = localItem.translations[currentLang].fullDesc;
            }
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
                        <input type="radio" name="size_${item.id}" value="${opt.price}" data-size="${opt.label}" ${idx === 0 ? 'checked' : ''}>
                        <span class="size-name">${opt.label}</span>
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
     * @param {Object} item - The product item.
     * @param {number} index - For animation delay.
     * @param {Object} config - { type: 'encomenda' | 'pronta-entrega', addToCartFn: 'addToCart' }
     */
    createCard(item, index, config = { type: 'encomenda' }) {
        const card = document.createElement('div');
        const quantity = item.quantity || 0;
        const isSoldOut = (config.type === 'pronta-entrega') && (quantity === 0);

        card.className = `card ${isSoldOut ? 'sold-out' : ''}`;
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');

        // Staggered Animation
        if (config.type === 'pronta-entrega') {
            card.style.transitionDelay = `${Math.min(index * 0.05, 0.5)}s`;
        } else {
            card.style.animationDelay = `${index * 0.1}s`;
            card.dataset.category = item.category;
            card.dataset.itemId = item.id;
        }

        const { name, shortDesc, fullDesc, currentLang } = this.resolveTranslation(item);

        const image = item.image || 'assets/placeholder.jpg';
        const price = item.price || (config.type === 'encomenda' ? "Consulte" : "R$ 0,00");
        const fromPrice = (config.type === 'encomenda' && item.options) ? 'A partir de ' : '';
        const imagePosition = item.imagePosition || 'center center';

        // Badges
        let badgesHtml = '';
        if (config.type === 'pronta-entrega') {
            const translations = window.translations || {}; // ensure safe access
            const stockText = (translations[currentLang] && translations[currentLang]['cardapio.stock'])
                ? translations[currentLang]['cardapio.stock'].replace('{quantity}', quantity)
                : `Última ${quantity}!`;

            if (isSoldOut) {
                badgesHtml = `<div class="sold-out-overlay"><span class="sold-out-badge-text">Esgotado</span></div>`;
            } else {
                badgesHtml = `
                    <span class="pronta-entrega-badge" data-i18n="nav.pronta_entrega">Pronta Entrega</span>
                    ${quantity <= 3 && quantity > 0 ? `<span class="stock-badge">${stockText}</span>` : ''}
                `;
            }
        } else {
            // Encomenda badges (if any specific logic exists, currently usually empty or 'Mágico')
            // Preserving the 'specialBadge' if logic existed, but based on reading it seems implicit.
            // We can check item.badge property if we add it later.
        }

        const optionsBlock = (config.type === 'encomenda') ? this.renderOptions(item) : '';

        // Quantity Info (Pronta Entrega only)
        const quantityInfo = (config.type === 'pronta-entrega') ? `
            <div class="quantity-info">
                <span>Disponível:</span>
                <span class="qty">${quantity > 0 ? `${quantity} unidade${quantity > 1 ? 's' : ''}` : 'Esgotado'}</span>
            </div>
        ` : '';

        // Actions (Add to Cart - Encomenda only)
        const actionsBlock = (config.type === 'encomenda') ? `
            <div class="card-actions">
                <button class="add-to-cart-btn" onclick="${config.addToCartFn || 'addToCart'}(event, '${item.id}')">
                    Adicionar à Encomenda
                </button>
            </div>
        ` : '';

        card.innerHTML = `
            <div class="card-image-container">
                <img src="${image}" alt="${name}" class="card-img" style="object-position: ${imagePosition};" onerror="this.src='https://via.placeholder.com/400x200?text=Mirabolando'">
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
            if (e.target.closest('.size-option-label') || e.target.closest('.add-to-cart-btn') || e.target.closest('.favorite-btn')) return;
            this.toggleCard(card);
        });

        return card;
    },

    /**
     * Renders a list of items into a container.
     */
    renderMenu(items, containerId, config) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';
        items.forEach((item, index) => {
            const card = this.createCard(item, index, config);
            container.appendChild(card);
        });

        // Post-render animation trigger if needed
        if (config.type === 'pronta-entrega') {
            setTimeout(() => {
                document.querySelectorAll('.card').forEach(card => card.classList.add('visible'));
            }, 100);
        }
    }
};

// Expose to window
window.SharedUI = SharedUI;
