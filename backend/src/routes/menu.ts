import { Router, Request, Response } from 'express';
import { MenuItem, ApiResponse } from '../types';

const router = Router();

// Menu data (same as frontend data.js but as API)
const menuItems: MenuItem[] = [
    {
        id: 'delirium',
        name: "Delirium",
        category: 'Bolos',
        shortDesc: "Bolo branco com pistache, coco queimado e caramelo.",
        fullDesc: "Bolo branco recheado com brigadeiro de pistache, brigadeiro de coco queimado e caramelo salgado.",
        price: "R$ 22,00",
        image: "assets/delirium.jpg",
        available: true
    },
    {
        id: 'brulee',
        name: "Bolo Brûlée",
        category: 'Bolos',
        shortDesc: "Massa branca, chocolate belga e baunilha de Madagascar.",
        fullDesc: "Bolo de massa branca, brigadeiro de chocolate belga, coberto com brigadeiro queimadinho.",
        price: "R$ 22,00",
        image: "assets/brulee.jpg",
        available: true
    },
    {
        id: 'brigous',
        name: "Brigous",
        category: 'Bolos',
        shortDesc: "Muito chocolate Belga meio amargo.",
        fullDesc: "Bolo de chocolate, recheado e coberto com brigadeiro de chocolate Belga meio amargo.",
        price: "R$ 22,00",
        image: "assets/brigous.jpg",
        available: true
    },
    {
        id: 'red_velvet',
        name: "Red Velvet",
        category: 'Bolos',
        shortDesc: "Bolo vermelho aveludado com mascarpone.",
        fullDesc: "Bolo vermelho aveludado, denso e de sabor marcante, recheado com chantilly de mascarpone.",
        price: "R$ 22,00",
        image: "assets/redvelvet.jpg",
        available: true
    },
    {
        id: 'mirabolando',
        name: "Mirabolando",
        category: 'Bolos',
        shortDesc: "Chocolate úmido, creme belga amargo e caramelo salgado.",
        fullDesc: "Bolo de chocolate naturalmente úmido com creme de chocolate Belga amargo e caramelo.",
        price: "R$ 22,00",
        image: "assets/mirabolando.jpg",
        available: true
    },
    {
        id: 'bolo_pote',
        name: "Bolo de Pote Ninho com Nutella",
        category: 'Individuais',
        shortDesc: "Massa fofinha de chocolate com Ninho e Nutella.",
        fullDesc: "Massa de chocolate 50% cacau com brigadeiro de Leite Ninho e Nutella.",
        price: "R$ 22,00",
        image: "assets/bolo_pote.jpg",
        available: true
    },
    {
        id: 'brownie_recheado',
        name: "Brownie Super Recheado",
        category: 'Individuais',
        shortDesc: "Brownie com doce de leite caseiro.",
        fullDesc: "Brownie denso e molhadinho com doce de leite caseiro.",
        price: "R$ 22,00",
        image: "assets/brownie.jpg",
        available: true
    },
    {
        id: 'torta_limao',
        name: "Torta de Limão",
        category: 'Tortas',
        shortDesc: "Base crocante, creme de limão e merengue.",
        fullDesc: "Base de biscoito amanteigado, creme de limão siciliano e merengue maçaricado.",
        price: "R$ 22,00",
        image: "assets/torta_limao.jpg",
        available: true
    }
];

// GET /api/menu - List all menu items
router.get('/', (req: Request, res: Response): void => {
    const { category, available } = req.query;

    let items = [...menuItems];

    if (category) {
        items = items.filter(item => item.category.toLowerCase() === (category as string).toLowerCase());
    }

    if (available === 'true') {
        items = items.filter(item => item.available);
    }

    res.json({
        success: true,
        data: items,
        message: `Found ${items.length} menu items`
    } as ApiResponse<MenuItem[]>);
});

// GET /api/menu/categories - List all categories
router.get('/categories', (_req: Request, res: Response): void => {
    const categories = [...new Set(menuItems.map(item => item.category))];

    res.json({
        success: true,
        data: categories
    });
});

// GET /api/menu/:id - Get single menu item
router.get('/:id', (req: Request, res: Response): void => {
    const { id } = req.params;

    const item = menuItems.find(i => i.id === id);

    if (!item) {
        res.status(404).json({
            success: false,
            error: 'Menu item not found'
        });
        return;
    }

    res.json({
        success: true,
        data: item
    });
});

export default router;
