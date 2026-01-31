const menuCardapioLoja = [
    // --- BOLOS (FATIAS) ---
    {
        id: 'delirium',
        name: "Delirium",
        category: 'Bolos',
        translations: {
            "pt-BR": {
                name: "Delirium",
                shortDesc: "Bolo branco com pistache, coco queimado e caramelo.",
                fullDesc: "Bolo branco recheado com brigadeiro de pistache, brigadeiro de coco queimado e caramelo salgado."
            },
            "en": {
                name: "Delirium",
                shortDesc: "White cake with pistachio, burnt coconut, and caramel.",
                fullDesc: "White cake filled with pistachio brigadeiro, burnt coconut brigadeiro, and salted caramel."
            },
            "es": {
                name: "Delirium",
                shortDesc: "Pastel blanco con pistacho, coco quemado y caramelo.",
                fullDesc: "Pastel blanco relleno de brigadeiro de pistacho, brigadeiro de coco quemado y caramelo salado."
            }
        },
        price: "R$ 22,00",
        image: "assets/delirium.png"
    },
    {
        id: 'apelacao',
        name: "Bolo Apelação",
        category: 'Bolos',
        translations: {
            "pt-BR": {
                name: "Bolo Apelação",
                shortDesc: "Massa branca, 3 leites, morango, Nutella e Oreo.",
                fullDesc: "Bolo fofinho de massa branca, recheado com brigadeiro de 3 leites, geleia de morango da casa e Nutella. Topo com biscoito Oreo e morango."
            },
            "en": {
                name: "Appeal Cake",
                shortDesc: "White sponge, tres leches, strawberry, Nutella, and Oreo.",
                fullDesc: "Fluffy white sponge cake, filled with tres leches brigadeiro, house-made strawberry jam, and Nutella. Topped with Oreo cookie and strawberry."
            },
            "es": {
                name: "Pastel Apelación",
                shortDesc: "Masa blanca, tres leches, fresa, Nutella y Oreo.",
                fullDesc: "Pastel esponjoso de masa blanca, relleno con brigadeiro de tres leches, mermelada de fresa casera y Nutella. Cubierto con galleta Oreo y fresa."
            }
        },
        price: "R$ 22,00",
        image: "assets/apelacao.png"
    },
    {
        id: 'brulee',
        name: "Bolo Brûlée",
        category: 'Bolos',
        translations: {
            "pt-BR": {
                name: "Bolo Brûlée",
                shortDesc: "Massa branca, chocolate belga e baunilha de Madagascar.",
                fullDesc: "Bolo de massa branca, brigadeiro de chocolate belga, coberto com brigadeiro queimadinho, feito com baunilha de Madagascar."
            },
            "en": {
                name: "Brûlée Cake",
                shortDesc: "White sponge, Belgian chocolate, and Madagascar vanilla.",
                fullDesc: "White sponge cake, Belgian chocolate brigadeiro, topped with bruleed brigadeiro made with Madagascar vanilla."
            },
            "es": {
                name: "Pastel Brûlée",
                shortDesc: "Masa blanca, chocolate belga y vainilla de Madagascar.",
                fullDesc: "Pastel de masa blanca, brigadeiro de chocolate belga, cubierto con brigadeiro quemadito, hecho con vainilla de Madagascar."
            }
        },
        price: "R$ 22,00",
        image: "assets/brulee.png"
    },
    {
        id: 'gabigui',
        name: "GabiGui",
        category: 'Bolos',
        translations: {
            "pt-BR": {
                name: "GabiGui",
                shortDesc: "Coco, maracujá e flores comestíveis.",
                fullDesc: "Bolo branco recheado com brigadeiro de coco cremoso, caramelo de maracujá, ganache de maracujá com toque de água de flor de laranjeira, coberto com chantilly fresco de chocolate branco, crocante de coco e maracujá com pétalas de flores comestíveis."
            },
            "en": {
                name: "GabiGui",
                shortDesc: "Coconut, passion fruit, and edible flowers.",
                fullDesc: "White cake filled with creamy coconut brigadeiro, passion fruit caramel, passion fruit ganache with a touch of orange blossom water, topped with fresh white chocolate whipped cream, coconut crunch, and edible flower petals."
            },
            "es": {
                name: "GabiGui",
                shortDesc: "Coco, maracuyá y flores comestibles.",
                fullDesc: "Pastel blanco relleno con brigadeiro de coco cremoso, caramelo de maracuyá, ganache de maracuyá con un toque de agua de azahar, cubierto con crema batida fresca de chocolate blanco, crocante de coco y maracuyá con pétalos de flores comestibles."
            }
        },
        price: "R$ 22,00",
        image: "assets/gabigui.png"
    },
    {
        id: 'mounirs',
        name: "Mounir's Cake",
        category: 'Bolos',
        translations: {
            "pt-BR": {
                name: "Mounir's Cake",
                shortDesc: "Chocolate, pistache e café. Homenagem especial.",
                fullDesc: "Esse bolo foi criado em homenagem ao padrasto de nossa confeiteira. Lembranças de um final de tarde com café, pistache e conversa sobre como foi o dia ♥. Bolo de Chocolate recheado com brigadeiro de pistache, brigadeiro de café e brigadeiro de chocolate Belga."
            },
            "en": {
                name: "Mounir's Cake",
                shortDesc: "Chocolate, pistachio, and coffee. Special tribute.",
                fullDesc: "This cake was created in honor of our confectioner's stepfather. Memories of a late afternoon with coffee, pistachio, and conversation about the day ♥. Chocolate Cake filled with pistachio brigadeiro, coffee brigadeiro, and Belgian chocolate brigadeiro."
            },
            "es": {
                name: "Pastel de Mounir",
                shortDesc: "Chocolate, pistacho y café. Homenaje especial.",
                fullDesc: "Este pastel fue creado en homenaje al padrastro de nuestra repostera. Recuerdos de una tarde con café, pistacho y conversación sobre cómo fue el día ♥. Pastel de Chocolate relleno con brigadeiro de pistacho, brigadeiro de café y brigadeiro de chocolate belga."
            }
        },
        price: "R$ 22,00",
        image: "assets/Mounir.png",
        imagePosition: 'center bottom'
    },
    {
        id: 'lily_braun',
        name: "Bolo Lily Braun",
        category: 'Bolos',
        translations: {
            "pt-BR": {
                name: "Bolo Lily Braun",
                shortDesc: "Massa branca, pistache, 3 leites e geleia de morango.",
                fullDesc: "Massa branca fofinha, recheada com brigadeiro de pistache e brigadeiro de 3 leites com geleia de morango da casa. Esse bolo é pura poesia, em homenagem a Chico Buarque."
            },
            "en": {
                name: "Lily Braun Cake",
                shortDesc: "White sponge, pistachio, tres leches, and strawberry jam.",
                fullDesc: "Fluffy white sponge, filled with pistachio brigadeiro and tres leches brigadeiro with house-made strawberry jam. This cake is pure poetry, a tribute to Chico Buarque."
            },
            "es": {
                name: "Pastel Lily Braun",
                shortDesc: "Masa blanca, pistacho, tres leches y mermelada de fresa.",
                fullDesc: "Masa blanca esponjosa, rellena con brigadeiro de pistacho y brigadeiro de tres leches con mermelada de fresa casera. Este pastel es pura poesía, en homenaje a Chico Buarque."
            }
        },
        price: "R$ 22,00",
        image: "assets/lilybraun.jpg"
    },
    {
        id: 'chapeleiro',
        name: "Chapeleiro",
        category: 'Bolos',
        translations: {
            "pt-BR": {
                name: "Chapeleiro",
                shortDesc: "Chocolate belga e brigadeiro de 3 leites.",
                fullDesc: "Bolo de massa branca, recheio e cobertura de brigadeiro de chocolate belga e brigadeiro de 3 leites. Topo: Brigadeiro Belga e Brigadeiro de 3 Leites enrolados."
            },
            "en": {
                name: "Mad Hatter",
                shortDesc: "Belgian chocolate and tres leches brigadeiro.",
                fullDesc: "White sponge cake, filling and topping of Belgian chocolate brigadeiro and tres leches brigadeiro. Topping: Rolled Belgian Brigadeiro and Tres Leches Brigadeiro."
            },
            "es": {
                name: "Sombrerero",
                shortDesc: "Chocolate belga y brigadeiro de tres leches.",
                fullDesc: "Pastel de masa blanca, relleno y cobertura de brigadeiro de chocolate belga y brigadeiro de tres leches. Cubierta: Brigadeiro Belga y Brigadeiro de Tres Leches enrollados."
            }
        },
        price: "R$ 22,00",
        image: "assets/chapeleiro.jpg"
    },
    {
        id: 'brigous',
        name: "Brigous",
        category: 'Bolos',
        translations: {
            "pt-BR": {
                name: "Brigous",
                shortDesc: "Muito chocolate Belga meio amargo.",
                fullDesc: "Bolo de chocolate, recheado e coberto com brigadeiro de chocolate Belga meio amargo, finalizado com flakes de chocolate Belga ao leite."
            },
            "en": {
                name: "Brigous",
                shortDesc: "Lots of semi-sweet Belgian chocolate.",
                fullDesc: "Chocolate cake, filled and covered with semi-sweet Belgian chocolate brigadeiro, finished with milk Belgian chocolate flakes."
            },
            "es": {
                name: "Brigous",
                shortDesc: "Mucho chocolate belga semiamargo.",
                fullDesc: "Pastel de chocolate, relleno y cubierto con brigadeiro de chocolate belga semiamargo, finalizado con escamas de chocolate belga con leche."
            }
        },
        price: "R$ 22,00",
        image: "assets/brigous.jpg"
    },
    {
        id: 'bolo_nonna',
        name: "Bolo da Nonna",
        category: 'Bolos',
        translations: {
            "pt-BR": {
                name: "Bolo da Nonna",
                shortDesc: "Coco, abacaxi e chantilly de mascarpone.",
                fullDesc: "Bolo fofinho de massa branca recheado com brigadeiro de coco cremoso, compota de abacaxi e chantilly de mascarpone. A cobertura é um delicioso marshmallow com coco."
            },
            "en": {
                name: "Nonna's Cake",
                shortDesc: "Coconut, pineapple, and mascarpone whipped cream.",
                fullDesc: "Fluffy white sponge cake filled with creamy coconut brigadeiro, pineapple compote, and mascarpone whipped cream. Topped with delicious coconut marshmallow."
            },
            "es": {
                name: "Pastel de la Nonna",
                shortDesc: "Coco, piña y crema batida de mascarpone.",
                fullDesc: "Pastel esponjoso de masa blanca relleno con brigadeiro de coco cremoso, compota de piña y crema batida de mascarpone. La cobertura es un delicioso malvavisco con coco."
            }
        },
        price: "R$ 22,00",
        image: "assets/nonna.jpg"
    },
    {
        id: 'tom_jobim',
        name: "Tom Jobim",
        category: 'Bolos',
        translations: {
            "pt-BR": {
                name: "Tom Jobim",
                shortDesc: "Nozes, coco queimado e doce de leite.",
                fullDesc: "Bolo de nozes recheado com brigadeiro de coco queimado, doce de leite e chantilly de mascarpone. A cobertura é de chantilly fresco e rosetas de doce de leite."
            },
            "en": {
                name: "Tom Jobim",
                shortDesc: "Walnuts, burnt coconut, and dulce de leche.",
                fullDesc: "Walnut cake filled with burnt coconut brigadeiro, dulce de leche, and mascarpone whipped cream. Topping is fresh whipped cream and dulce de leche rosettes."
            },
            "es": {
                name: "Tom Jobim",
                shortDesc: "Nueces, coco quemado y dulce de leche.",
                fullDesc: "Pastel de nueces relleno con brigadeiro de coco quemado, dulce de leche y crema batida de mascarpone. La cobertura es de crema batida fresca y rosetas de dulce de leche."
            }
        },
        price: "R$ 22,00",
        image: "assets/tomjobim.jpg"
    },
    {
        id: 'princesinha',
        name: "Novo Princesinha do Atlântico",
        category: 'Bolos',
        translations: {
            "pt-BR": {
                name: "Novo Princesinha do Atlântico",
                shortDesc: "Massa branca, 3 leites, morango e chocolate branco.",
                fullDesc: "Bolo de massa branca bem fofinha, recheado com brigadeiro de 3 leites e geleia de morango da casa, coberto com um levíssimo buttercream de chocolate belga branco. Topo: Morangos frescos e pétalas de flores comestíveis."
            },
            "en": {
                name: "New Princess of the Atlantic",
                shortDesc: "White sponge, tres leches, strawberry, and white chocolate.",
                fullDesc: "Very fluffy white sponge cake, filled with tres leches brigadeiro and house-made strawberry jam, covered with a very light Belgian white chocolate buttercream. Topping: Fresh strawberries and edible flower petals."
            },
            "es": {
                name: "Nueva Princesita del Atlántico",
                shortDesc: "Masa blanca, tres leches, fresa y chocolate blanco.",
                fullDesc: "Pastel de masa blanca muy esponjosa, relleno con brigadeiro de tres leches y mermelada de fresa casera, cubierto con un buttercream muy ligero de chocolate belga blanco. Cubierta: Fresas frescas y pétalos de flores comestibles."
            }
        },
        price: "R$ 22,00",
        image: "assets/princesinha.jpg"
    },
    {
        id: 'mirabolando',
        name: "Mirabolando",
        category: 'Bolos',
        translations: {
            "pt-BR": {
                name: "Mirabolando",
                shortDesc: "Chocolate úmido, creme belga amargo e caramelo salgado.",
                fullDesc: "Bolo de chocolate naturalmente úmido. O recheio e cobertura foram feitos com um sofisticado creme de chocolate Belga amargo e caramelo com toque de flor de sal."
            },
            "en": {
                name: "Mirabolando",
                shortDesc: "Moist chocolate, bitter Belgian cream, and salted caramel.",
                fullDesc: "Naturally moist chocolate cake. The filling and frosting are made with a sophisticated bitter Belgian chocolate cream and caramel with a touch of fleur de sel."
            },
            "es": {
                name: "Mirabolando",
                shortDesc: "Chocolate húmedo, crema belga amarga y caramelo salado.",
                fullDesc: "Pastel de chocolate naturalmente húmedo. El relleno y la cobertura fueron hechos con una sofisticada crema de chocolate belga amargo y caramelo con un toque de flor de sal."
            }
        },
        price: "R$ 22,00",
        image: "assets/mirabolando.jpg"
    },
    {
        id: 'red_velvet',
        name: "Red Velvet",
        category: 'Bolos',
        translations: {
            "pt-BR": {
                name: "Red Velvet",
                shortDesc: "Bolo vermelho aveludado com mascarpone e frutas vermelhas.",
                fullDesc: "Bolo vermelho aveludado, naturalmente úmido. Ele é denso e de sabor marcante, recheado com chantilly de mascarpone e geleia de frutas vermelhas da casa. A cobertura é um levíssimo buttercream de chocolate branco."
            },
            "en": {
                name: "Red Velvet",
                shortDesc: "Velvety red cake with mascarpone and red fruits.",
                fullDesc: "Velvety red cake, naturally moist. It is dense with a striking flavor, filled with mascarpone whipped cream and house-made red fruit jam. The frosting is a very light white chocolate buttercream."
            },
            "es": {
                name: "Red Velvet",
                shortDesc: "Pastel rojo aterciopelado con mascarpone y frutos rojos.",
                fullDesc: "Pastel rojo aterciopelado, naturalmente húmedo. Es denso y de sabor marcado, relleno con crema batida de mascarpone y mermelada de frutos rojos casera. La cobertura es un buttercream de chocolate blanco muy ligero."
            }
        },
        price: "R$ 22,00",
        image: "assets/redvelvet.jpg"
    },

    // --- TORTAS (FATIAS) ---
    {
        id: 'torta_limao',
        name: "Torta de Limão",
        category: 'Tortas',
        translations: {
            "pt-BR": {
                name: "Torta de Limão",
                shortDesc: "Coberta por Merengue Queimadinho.",
                fullDesc: "Torta de Limão coberta por Merengue Queimadinho. Fatia deliciosa!"
            },
            "en": {
                name: "Lemon Pie",
                shortDesc: "Topped with Burnt Meringue.",
                fullDesc: "Lemon Pie topped with Burnt Meringue. Delicious slice!"
            },
            "es": {
                name: "Tarta de Limón",
                shortDesc: "Cubierta con Merengue Quemadito.",
                fullDesc: "Tarta de Limón cubierta con Merengue Quemadito. ¡Rebanada deliciosa!"
            }
        },
        price: "R$ 22,00",
        image: "assets/torta_limao_25.jpg"
    },
    {
        id: 'banoffee',
        name: "Banoffee de Doce de Leite",
        category: 'Tortas',
        translations: {
            "pt-BR": {
                name: "Banoffee de Doce de Leite",
                shortDesc: "Doce de leite, banana, chantilly e caramelo salgado.",
                fullDesc: "Base de biscoito, doce de leite da casa, bananas frescas, chantilly fresco, raspas de chocolate e nosso delicioso caramelo salgado."
            },
            "en": {
                name: "Dulce de Leche Banoffee",
                shortDesc: "Dulce de leche, banana, whipped cream, and salted caramel.",
                fullDesc: "Biscuit base, house-made dulce de leche, fresh bananas, fresh whipped cream, chocolate shavings, and our delicious salted caramel."
            },
            "es": {
                name: "Banoffee de Dulce de Leche",
                shortDesc: "Dulce de leche, plátano, crema batida y caramelo salado.",
                fullDesc: "Base de galleta, dulce de leche casero, plátanos frescos, crema batida fresca, virutas de chocolate y nuestro delicioso caramelo salado."
            }
        },
        price: "R$ 22,00",
        image: "assets/banoffee.jpg"
    },

    // --- CHEESECAKES (FATIAS) ---
    {
        id: 'cheesecake_pistache',
        name: "Cheesecake de Pistache com Café",
        category: 'Cheesecakes',
        translations: {
            "pt-BR": {
                name: "Cheesecake de Pistache com Café",
                shortDesc: "Fatia cremosa e saborosa.",
                fullDesc: "Cheesecake de Pistache com Café. Fatia cremosa e deliciosa."
            },
            "en": {
                name: "Pistachio Coffee Cheesecake",
                shortDesc: "Creamy and tasty slice.",
                fullDesc: "Pistachio Coffee Cheesecake. Creamy and delicious slice."
            },
            "es": {
                name: "Cheesecake de Pistacho con Café",
                shortDesc: "Rebanada cremosa y sabrosa.",
                fullDesc: "Cheesecake de Pistacho con Café. Rebanada cremosa y deliciosa."
            }
        },
        price: "R$ 22,00",
        image: "assets/cheesecake_pistache.jpg"
    },
    {
        id: 'cheesecake_mineiro',
        name: "Cheesecake Mineiro",
        category: 'Cheesecakes',
        translations: {
            "pt-BR": {
                name: "Cheesecake Mineiro",
                shortDesc: "Calda de goiabada e crumble de castanhas.",
                fullDesc: "Cheesecake tradicional com calda de goiabada e crumble de castanhas."
            },
            "en": {
                name: "Mineiro Cheesecake",
                shortDesc: "Guava syrup and nut crumble.",
                fullDesc: "Traditional cheesecake with guava syrup and nut crumble."
            },
            "es": {
                name: "Cheesecake Mineiro",
                shortDesc: "Almíbar de guayaba y crumble de castañas.",
                fullDesc: "Cheesecake tradicional con almíbar de guayaba y crumble de castañas."
            }
        },
        price: "R$ 22,00",
        image: "assets/cheesecake_mineiro.jpg"
    },
    {
        id: 'cheesecake_nutella',
        name: "Cheesecake de Nutella",
        category: 'Cheesecakes',
        translations: {
            "pt-BR": {
                name: "Cheesecake de Nutella",
                shortDesc: "Fatia irresistível de Nutella.",
                fullDesc: "Cheesecake de Nutella. Fatia cremosa e irresistível."
            },
            "en": {
                name: "Nutella Cheesecake",
                shortDesc: "Irresistible Nutella slice.",
                fullDesc: "Nutella Cheesecake. Creamy and irresistible slice."
            },
            "es": {
                name: "Cheesecake de Nutella",
                shortDesc: "Rebanada irresistible de Nutella.",
                fullDesc: "Cheesecake de Nutella. Rebanada cremosa e irresistible."
            }
        },
        price: "R$ 22,00",
        image: "assets/cheesecake_nutella.jpg"
    },

    // --- BROWNIES (FATIAS) ---
    {
        id: 'brownie_cake_mesclado',
        name: "Brownie Mesclado",
        category: 'Brownies',
        translations: {
            "pt-BR": {
                name: "Brownie Mesclado",
                shortDesc: "Brownie denso com chocolate Belga 70%, 3 leites e doce de leite.",
                fullDesc: "Brownie denso, feito com chocolate Belga 70%, coberto com doce de leite, pé de moleque de macadâmia e caramelo salgado."
            },
            "en": {
                name: "Marbled Brownie",
                shortDesc: "Dense brownie with 70% Belgian chocolate, tres leches, and dulce de leche.",
                fullDesc: "Dense brownie, made with 70% Belgian chocolate, covered with dulce de leche, macadamia nut brittle, and salted caramel."
            },
            "es": {
                name: "Brownie Marmolado",
                shortDesc: "Brownie denso con chocolate belga 70%, tres leches y dulce de leche.",
                fullDesc: "Brownie denso, hecho con chocolate belga 70%, cubierto con dulce de leche, palanqueta de macadamia y caramelo salado."
            }
        },
        price: "R$ 22,00",
        image: "assets/brownie_doce_leite.jpg"
    },
    {
        id: 'torta_brownie',
        name: "Torta Brownie",
        category: 'Brownies',
        translations: {
            "pt-BR": {
                name: "Torta Brownie",
                shortDesc: "Brownie denso com creme de chocolate Belga amargo.",
                fullDesc: "Brownie denso, feito com chocolate Belga 70%, coberto com creme de chocolate Belga amargo, pé de moleque de macadâmia e caramelo salgado."
            },
            "en": {
                name: "Brownie Pie",
                shortDesc: "Dense brownie with bitter Belgian chocolate cream.",
                fullDesc: "Dense brownie, made with 70% Belgian chocolate, covered with bitter Belgian chocolate cream, macadamia nut brittle, and salted caramel."
            },
            "es": {
                name: "Tarta Brownie",
                shortDesc: "Brownie denso con crema de chocolate belga amargo.",
                fullDesc: "Brownie denso, hecho con chocolate belga 70%, cubierto con crema de chocolate belga amargo, palanqueta de macadamia y caramelo salado."
            }
        },
        price: "R$ 22,00",
        image: "assets/brownie_chocolate_amargo.jpg"
    }
];

window.menuCardapioLoja = menuCardapioLoja;
