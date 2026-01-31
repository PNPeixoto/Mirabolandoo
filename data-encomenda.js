const menuData = [
    // --- BOLOS ESPECIAIS ---
    {
        id: 'delirium',
        name: "Delirium",
        category: 'Bolos',
        tags: [],
        shortDesc: "Bolo branco com pistache, coco queimado e caramelo.",
        fullDesc: "Bolo branco recheado com brigadeiro de pistache, brigadeiro de coco queimado e caramelo salgado. (Até 20 fatias)",
        price: "R$ 235,00",
        image: "assets/delirium.png"
    },
    {
        id: 'apelacao',
        name: "Bolo Apelação",
        category: 'Bolos',
        tags: [],
        shortDesc: "Massa branca, 3 leites, morango, Nutella e Oreo.",
        fullDesc: "Bolo fofinho de massa branca, recheado com brigadeiro de 3 leites, geleia de morango da casa e Nutella. Topo com biscoito Oreo e morango. *Em volta tem uma tira de acetato que deve ser removida somente na hora do corte.",
        price: "A partir de R$ 185,00",
        image: "assets/apelacao.png",
        options: [
            { size: "PP - 15cm (Até 10 fatias)", price: "R$ 185,00" },
            { size: "P - 20cm (Até 20 fatias)", price: "R$ 245,00" }
        ]
    },
    {
        id: 'brulee',
        name: "Bolo Brûlée",
        category: 'Bolos',
        tags: [],
        shortDesc: "Massa branca, chocolate belga e baunilha de Madagascar.",
        fullDesc: "Bolo de massa branca, brigadeiro de chocolate belga, coberto com brigadeiro queimadinho, feito com baunilha de Madagascar.",
        price: "A partir de R$ 185,00",
        image: "assets/brulee.png",
        options: [
            { size: "PP - 15cm (Até 10 fatias)", price: "R$ 185,00" },
            { size: "P - 20cm (Até 20 fatias)", price: "R$ 245,00" }
        ]
    },
    {
        id: 'gabigui',
        name: "GabiGui",
        category: 'Bolos',
        tags: [],
        shortDesc: "Coco, maracujá e flores comestíveis.",
        fullDesc: "Bolo branco recheado com brigadeiro de coco cremoso, caramelo de maracujá, ganache de maracujá com toque de água de flor de laranjeira, coberto com chantilly fresco de chocolate branco, crocante de coco e maracujá com pétalas de flores comestíveis.",
        price: "A partir de R$ 235,00",
        image: "assets/gabigui.png",
        options: [
            { size: "PP - 15cm (10 fatias)", price: "R$ 235,00" },
            { size: "P - 20cm (20 fatias)", price: "R$ 285,00" }
        ]
    },
    {
        id: 'mounirs',
        name: "Mounir's Cake",
        category: 'Bolos',
        tags: [],
        shortDesc: "Chocolate, pistache e café. Homenagem especial.",
        fullDesc: "Esse bolo foi criado em homenagem ao padrasto de nossa confeiteira. Lembranças de um final de tarde com café, pistache e conversa sobre como foi o dia ♥. Bolo de Chocolate recheado com brigadeiro de pistache, brigadeiro de café e brigadeiro de chocolate Belga.",
        price: "A partir de R$ 225,00",
        image: "assets/Mounir.png",
        imagePosition: 'center bottom',
        options: [
            { size: "PP - 15cm (Até 10 fatias)", price: "R$ 225,00" },
            { size: "P - 20cm (Até 20 fatias)", price: "R$ 335,00" }
        ]
    },
    {
        id: 'lily_braun',
        name: "Bolo Lily Braun",
        category: 'Bolos',
        tags: [],
        shortDesc: "Massa branca, pistache, 3 leites e geleia de morango.",
        fullDesc: "Massa branca fofinha, recheada com brigadeiro de pistache e brigadeiro de 3 leites com geleia de morango da casa. Esse bolo é pura poesia, em homenagem a Chico Buarque.",
        price: "A partir de R$ 185,00",
        image: "assets/lilybraun.jpg",
        options: [
            { size: "PP - 16cm (Até 12 fatias)", price: "R$ 185,00" },
            { size: "P - 22cm (Até 24 fatias)", price: "R$ 265,00" }
        ]
    },
    {
        id: 'chapeleiro',
        name: "Chapeleiro",
        category: 'Bolos',
        tags: [],
        shortDesc: "Chocolate belga e brigadeiro de 3 leites.",
        fullDesc: "Bolo de massa branca, recheio e cobertura de brigadeiro de chocolate belga e brigadeiro de 3 leites. Topo: Brigadeiro Belga e Brigadeiro de 3 Leites enrolados.",
        price: "A partir de R$ 215,00",
        image: "assets/chapeleiro.jpg",
        options: [
            { size: "PP - 15cm (10 fatias)", price: "R$ 215,00" },
            { size: "P - 20cm (25 fatias)", price: "R$ 285,00" }
        ]
    },
    {
        id: 'brigous',
        name: "Brigous",
        category: 'Bolos',
        tags: [],
        shortDesc: "Muito chocolate Belga meio amargo.",
        fullDesc: "Bolo de chocolate, recheado e coberto com brigadeiro de chocolate Belga meio amargo, finalizado com flakes de chocolate Belga ao leite.",
        price: "A partir de R$ 245,00",
        image: "assets/brigous.jpg",
        options: [
            { size: "PP - 15cm (Até 10 fatias)", price: "R$ 245,00" },
            { size: "P - 20cm (Até 25 fatias)", price: "R$ 315,00" }
        ]
    },
    {
        id: 'bolo_nonna',
        name: "Bolo da Nonna",
        category: 'Bolos',
        tags: [],
        shortDesc: "Coco, abacaxi e chantilly de mascarpone.",
        fullDesc: "Bolo fofinho de massa branca recheado com brigadeiro de coco cremoso, compota de abacaxi e chantilly de mascarpone. A cobertura é um delicioso marshmallow com coco. São 3 camadas de bolo e 3 de recheio para deixar o seu dia ainda mais saboroso! (20 fatias)",
        price: "R$ 235,00",
        image: "assets/nonna.jpg"
    },
    {
        id: 'tom_jobim',
        name: "Tom Jobim",
        category: 'Bolos',
        tags: [],
        shortDesc: "Nozes, coco queimado e doce de leite.",
        fullDesc: "Bolo de nozes recheado com brigadeiro de coco queimado, doce de leite e chantilly de mascarpone. A cobertura é de chantilly fresco e rosetas de doce de leite. (20 fatias)",
        price: "R$ 265,00",
        image: "assets/tomjobim.jpg"
    },
    {
        id: 'princesinha',
        name: "Novo Princesinha do Atlântico",
        category: 'Bolos',
        tags: [],
        shortDesc: "Massa branca, 3 leites, morango e chocolate branco.",
        fullDesc: "Bolo de massa branca bem fofinha, recheado com brigadeiro de 3 leites e geleia de morango da casa, coberto com um levíssimo buttercream de chocolate belga branco. Topo: Morangos frescos e pétalas de flores comestíveis.",
        price: "A partir de R$ 215,00",
        image: "assets/princesinha.jpg",
        options: [
            { size: "PP - 15cm (Até 10 fatias)", price: "R$ 215,00" },
            { size: "P - 20cm (20 a 25 fatias)", price: "R$ 285,00" }
        ]
    },
    {
        id: 'mirabolando',
        name: "Mirabolando",
        category: 'Bolos',
        tags: [],
        shortDesc: "Chocolate úmido, creme belga amargo e caramelo salgado.",
        fullDesc: "Bolo de chocolate naturalmente úmido. O recheio e cobertura foram feitos com um sofisticado creme de chocolate Belga amargo e caramelo com toque de flor de sal.",
        price: "A partir de R$ 225,00",
        image: "assets/mirabolando.jpg",
        options: [
            { size: "PP - 15cm (10 fatias)", price: "R$ 225,00" },
            { size: "P - 20cm (20 fatias)", price: "R$ 335,00" }
        ]
    },
    {
        id: 'red_velvet',
        name: "Red Velvet",
        category: 'Bolos',
        tags: [],
        shortDesc: "Bolo vermelho aveludado com mascarpone e frutas vermelhas.",
        fullDesc: "Bolo vermelho aveludado, naturalmente úmido. Ele é denso e de sabor marcante, recheado com chantilly de mascarpone e geleia de frutas vermelhas da casa. A cobertura é um levíssimo buttercream de chocolate branco.",
        price: "A partir de R$ 175,00",
        image: "assets/redvelvet.jpg",
        options: [
            { size: "15cm (10 a 12 fatias)", price: "R$ 175,00" },
            { size: "20cm (18 a 20 fatias)", price: "R$ 235,00" }
        ]
    },

    // --- SOBREMESAS NATALINAS ---
    {
        id: 'natal_rabanada',
        name: "Rabanada Tradicional",
        category: 'Natal',
        tags: ['natal'],
        shortDesc: "Kit com 10 rabanadas fritas e empanadas.",
        fullDesc: "Kit com 10 rabanadas tradicionais, molhadinhas na medida, fritas e empanadas em açúcar e canela.",
        price: "R$ 88,00",
        image: "assets/rabanada.jpg"
    },
    {
        id: 'natal_torta_maca',
        name: "Torta de Maçã",
        category: 'Natal',
        tags: ['natal'],
        shortDesc: "Com especiarias e coulis de frutas vermelhas.",
        fullDesc: "Torta de maçã com especiarias e coulis de frutas vermelhas combina e muito com a sua ceia! Tamanho: 22cm de diâmetro. Peso aproximado: 1,5kg. Serve até 10 fatias.",
        price: "R$ 185,00",
        image: "assets/torta_maca.jpg"
    },
    {
        id: 'natal_pudim',
        name: "Pudim Super Cremoso",
        category: 'Natal',
        tags: ['natal'],
        shortDesc: "Pudim de leite condensado com baunilha de Madagascar.",
        fullDesc: "Pudim de leite condensado, super cremoso e com uma saborosa calda feita com baunilha de Madagascar. Serve até 10 porções / Peso aproximado 1kg.",
        price: "R$ 126,00",
        image: "assets/pudim.jpg"
    },
    {
        id: 'natal_basca',
        name: "Torta Basca",
        category: 'Natal',
        tags: ['natal'],
        shortDesc: "Textura aveludada, leve acidez e dulçor equilibrado.",
        fullDesc: "O que esperar da torta basca: Ela tem textura aveludada, leve acidez e dulçor equilibrado. Possui uma crosta levemente caramelizada. É uma sobremesa suave e sofisticada. Sugerimos comer purinha antes de colocar a sua cobertura preferida!",
        price: "A partir de R$ 288,00",
        image: "assets/basca.jpg",
        options: [
            { size: "Purinha", price: "R$ 288,00" },
            { size: "Calda de chocolate Belga meio amargo", price: "R$ 348,00" },
            { size: "Calda de chocolate ao leite", price: "R$ 348,00" },
            { size: "Geleia de frutas vermelhas artesanal", price: "R$ 348,00" },
            { size: "Caramelo de maracujá", price: "R$ 348,00" },
            { size: "Caramelo salgado", price: "R$ 348,00" }
        ]
    },

    // --- TORTAS ---
    {
        id: 'torta_limao_25',
        name: "Torta de Limão (25cm)",
        category: 'Tortas',
        tags: [],
        shortDesc: "Coberta por Merengue Queimadinho.",
        fullDesc: "Torta de Limão - 25cm de diâmetro. Coberta por Merengue Queimadinho. Tamanho único - até 20 fatias.",
        price: "R$ 165,00",
        image: "assets/torta_limao_25.jpg"
    },
    {
        id: 'banoffee',
        name: "Banoffee de Doce de Leite",
        category: 'Tortas',
        tags: [],
        shortDesc: "Doce de leite, banana, chantilly e caramelo salgado.",
        fullDesc: "Base de biscoito, doce de leite da casa, bananas frescas, chantilly fresco, raspas de chocolate e nosso delicioso caramelo salgado.",
        price: "R$ 215,00",
        image: "assets/banoffee.jpg"
    },

    // --- CHEESECAKES ---
    {
        id: 'cheesecake_pistache',
        name: "Cheesecake de Pistache com Café",
        category: 'Cheesecakes',
        tags: [],
        shortDesc: "Aro 25cm. Tamanho único.",
        fullDesc: "Cheesecake de Pistache com Café (aro 25cm). Tamanho único - até 20 fatias.",
        price: "R$ 285,00",
        image: "assets/cheesecake_pistache.jpg"
    },
    {
        id: 'cheesecake_tiramisu',
        name: "Cheesecake de Tiramisù",
        category: 'Cheesecakes',
        tags: ['tiramisu'],
        shortDesc: "Versão de cheesecake da sobremesa italiana.",
        fullDesc: "Cheesecake de Tiramisù (aro 25cm). Nossa versão de cheesecake da sobremesa tradicional Italiana. Leve e saboroso. OBS: A retirada ocorre em nossa loja somente com horário previamente combinado.",
        price: "R$ 188,00",
        image: "assets/cheesecake_tiramisu.jpg"
    },
    {
        id: 'cheesecake_mineiro',
        name: "Cheesecake Mineiro",
        category: 'Cheesecakes',
        tags: [],
        shortDesc: "Calda de goiabada e crumble de castanhas.",
        fullDesc: "Cheesecake Mineiro (aro 25cm). Cheesecake tradicional com calda de goiabada e crumble de castanhas.",
        price: "R$ 220,00",
        image: "assets/cheesecake_mineiro.jpg"
    },
    {
        id: 'cheesecake_nutella',
        name: "Cheesecake de Nutella",
        category: 'Cheesecakes',
        tags: [],
        shortDesc: "Aro 25cm. Tamanho único.",
        fullDesc: "Cheesecake de Nutella (aro 25cm). Tamanho único - até 20 fatias.",
        price: "R$ 230,00",
        image: "assets/cheesecake_nutella.jpg"
    },

    // --- BROWNIES ---
    {
        id: 'torta_brownie_doce_leite',
        name: "Torta Brownie com Doce de Leite",
        category: 'Brownies',
        tags: [],
        shortDesc: "Brownie denso com chocolate Belga 70% e doce de leite.",
        fullDesc: "Brownie denso, feito com chocolate Belga 70%, coberto com doce de leite, pé de moleque de macadâmia e caramelo salgado. Peso aprox.: 1.3kg. Tamanho único - 10 fatias.",
        price: "R$ 215,00",
        image: "assets/brownie_doce_leite.jpg"
    },
    {
        id: 'torta_brownie_chocolate_amargo',
        name: "Torta Brownie com Creme de Chocolate Amargo",
        category: 'Brownies',
        tags: [],
        shortDesc: "Brownie denso com creme de chocolate Belga amargo.",
        fullDesc: "Brownie denso, feito com chocolate Belga 70%, coberto com creme de chocolate Belga amargo, pé de moleque de macadâmia e caramelo salgado. Peso aprox.: 1.3kg. 10 fatias.",
        price: "R$ 255,00",
        image: "assets/brownie_chocolate_amargo.jpg"
    },
    {
        id: 'brownie_cake_mesclado',
        name: "Brownie Cake Mesclado",
        category: 'Brownies',
        tags: [],
        shortDesc: "Brownie denso recheado com brigadeiros.",
        fullDesc: "Brownie bem denso, feito com chocolate Belga 70%, recheado com brigadeiro de chocolate belga meio amargo, doce de leite e brigadeiro de 3 Leites.",
        price: "R$ 255,00",
        image: "assets/brownie_mesclado.jpg"
    }
];

window.menuData = menuData;
