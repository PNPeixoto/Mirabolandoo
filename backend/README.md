# Mirabolando Backend

Backend API para o sistema de pedidos da Mirabolando Confeitaria.

## Tecnologias

- **Express.js** - Framework web
- **TypeScript** - Tipagem estática  
- **SQLite** (better-sqlite3) - Banco de dados local

## Instalação

```bash
cd backend
npm install
```

## Execução

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## Endpoints

### Menu
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /api/menu | Listar itens |
| GET | /api/menu/categories | Listar categorias |
| GET | /api/menu/:id | Buscar item |

### Pedidos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /api/orders | Listar pedidos |
| GET | /api/orders/stats | Estatísticas |
| GET | /api/orders/:id | Buscar pedido |
| POST | /api/orders | Criar pedido |
| PATCH | /api/orders/:id | Atualizar status |
| DELETE | /api/orders/:id | Remover pedido |

### Filtros de Pedidos
- `?status=pending|confirmed|preparing|ready|delivered|cancelled`
- `?phone=22999999999`
- `?date=2026-01-24`

## Criar Pedido

```json
POST /api/orders
{
  "customerName": "João Silva",
  "customerPhone": "22999999999",
  "items": [
    { "id": "brigous", "name": "Brigous", "price": "R$ 22,00", "quantity": 2 }
  ],
  "notes": "Sem cobertura extra"
}
```

## Status do Pedido

- `pending` - Aguardando confirmação
- `confirmed` - Confirmado
- `preparing` - Em preparo
- `ready` - Pronto para retirada
- `delivered` - Entregue
- `cancelled` - Cancelado
