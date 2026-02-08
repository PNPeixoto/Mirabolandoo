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
        image: "assets/lilybraun.jpeg"
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
        image: "assets/chapeleiro.jpeg"
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
        image: "assets/brigous.jpeg"
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
        image: "assets/nonna.jpeg"
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
        image: "assets/princesinha.jpeg"
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
        image: "assets/mirabolando.jpeg"
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
        image: "assets/TortadeLimão.png"
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
        image: "assets/pistache.png"
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
        image: "assets/Mineira.png"
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
        image: "assets/Nutella.png"
    },
    {
        id: 'black_jack',
        name: "Black Jack",
        category: 'Cheesecakes',
        translations: {
            "pt-BR": {
                name: "Black Jack",
                shortDesc: "Cheesecake de chocolate belga e Jack Daniel's",
                fullDesc: "Cheesecake de chocolate belga amargo com um toque de Jack Daniel's.  Aprox.: 155g"
            },
            "en-US": {
                name: "Black Jack",
                shortDesc: "Belgian chocolate cheesecake and Jack Daniel's",
                fullDesc: "Dark Belgian chocolate cheesecake with a hint of Jack Daniel's.  Approx.: 155g"
            },
            "es-ES": {
                name: "Black Jack",
                shortDesc: "Cheesecake de chocolate belga y Jack Daniel's",
                fullDesc: "Cheesecake de chocolate belga oscuro con un toque de Jack Daniel's.  Aprox.: 155 g"
            }
        },
        price: "R$ 36",
        image: "assets/blackjack.png",
        quantity: 0
    },
    {
        id: 'cheesecake_frutas_vermelhas',
        name: "Cheesecake de Frutas Vermelhas",
        category: 'Cheesecakes',
        translations: {
            "pt-BR": {
                name: "Cheesecake de Frutas Vermelhas",
                shortDesc: "Clássico com calda de frutas vermelhas.",
                fullDesc: "Cheesecake clássico com deliciosa calda de frutas vermelhas."
            },
            "en": {
                name: "Red Berries Cheesecake",
                shortDesc: "Classic with red berry sauce.",
                fullDesc: "Classic cheesecake with delicious red berry sauce."
            },
            "es": {
                name: "Cheesecake de Frutos Rojos",
                shortDesc: "Clásico con salsa de frutos rojos.",
                fullDesc: "Cheesecake clásico con deliciosa salsa de frutos rojos."
            }
        },
        price: "R$ 24,00",
        image: "assets/Frutas Vermelhas.png"
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
    },

    // --- COOKIES ---
    {
        id: 'cookie_bossa_nova',
        name: "Cookie Bossa Nova",
        category: 'Cookies',
        translations: {
            "pt-BR": {
                name: "Cookie Bossa Nova",
                shortDesc: "Combinação especial de sabores brasileiros.",
                fullDesc: "Cookie artesanal com uma combinação especial de sabores que remete à música brasileira."
            },
            "en": {
                name: "Bossa Nova Cookie",
                shortDesc: "Special combination of Brazilian flavors.",
                fullDesc: "Artisanal cookie with a special combination of flavors reminiscent of Brazilian music."
            },
            "es": {
                name: "Cookie Bossa Nova",
                shortDesc: "Combinación especial de sabores brasileños.",
                fullDesc: "Cookie artesanal con una combinación especial de sabores que recuerda a la música brasileña."
            }
        },
        price: "R$ 16,00",
        image: "assets/cookie_bossa_nova.jpg"
    },
    {
        id: 'cookie_absurdo',
        name: "Cookie Absurdo (Pistache)",
        category: 'Cookies',
        translations: {
            "pt-BR": {
                name: "Cookie Absurdo (Pistache)",
                shortDesc: "Sabor intenso de pistache.",
                fullDesc: "Cookie artesanal com sabor intenso e marcante de pistache."
            },
            "en": {
                name: "Absurd Cookie (Pistachio)",
                shortDesc: "Intense pistachio flavor.",
                fullDesc: "Artisanal cookie with intense and distinctive pistachio flavor."
            },
            "es": {
                name: "Cookie Absurdo (Pistacho)",
                shortDesc: "Sabor intenso de pistacho.",
                fullDesc: "Cookie artesanal con sabor intenso y marcado de pistacho."
            }
        },
        price: "R$ 22,00",
        image: "assets/cookie_absurdo.jpg"
    },
    {
        id: 'cookie_nutella',
        name: "Cookie de Nutella",
        category: 'Cookies',
        translations: {
            "pt-BR": {
                name: "Cookie de Nutella",
                shortDesc: "Recheado com Nutella.",
                fullDesc: "Cookie artesanal recheado com deliciosa Nutella cremosa."
            },
            "en": {
                name: "Nutella Cookie",
                shortDesc: "Filled with Nutella.",
                fullDesc: "Artisanal cookie filled with delicious creamy Nutella."
            },
            "es": {
                name: "Cookie de Nutella",
                shortDesc: "Relleno con Nutella.",
                fullDesc: "Cookie artesanal relleno con deliciosa Nutella cremosa."
            }
        },
        price: "R$ 26,00",
        image: "assets/cookienutella.jpeg"
    },
    {
        id: 'cookie_tradicional',
        name: "Cookie Tradicional",
        category: 'Cookies',
        translations: {
            "pt-BR": {
                name: "Cookie Tradicional",
                shortDesc: "Cookie clássico com gotas de chocolate.",
                fullDesc: "O clássico cookie americano com gotas de chocolate."
            },
            "en": {
                name: "Traditional Cookie",
                shortDesc: "Classic chocolate chip cookie.",
                fullDesc: "The classic American chocolate chip cookie."
            },
            "es": {
                name: "Cookie Tradicional",
                shortDesc: "Cookie clásico con chips de chocolate.",
                fullDesc: "El clásico cookie americano con chips de chocolate."
            }
        },
        price: "R$ 16,00",
        image: "assets/cookie_tradicional.jpg"
    },

    // --- CASEIRINHOS ---
    {
        id: 'caseirinho_chocolate',
        name: "Caseirinho de Chocolate",
        category: 'Caseirinhos',
        translations: {
            "pt-BR": {
                name: "Caseirinho de Chocolate",
                shortDesc: "Bolo caseiro de chocolate.",
                fullDesc: "Delicioso bolo caseiro de chocolate, feito com muito carinho."
            },
            "en": {
                name: "Chocolate Homemade Cake",
                shortDesc: "Homemade chocolate cake.",
                fullDesc: "Delicious homemade chocolate cake, made with lots of love."
            },
            "es": {
                name: "Casero de Chocolate",
                shortDesc: "Pastel casero de chocolate.",
                fullDesc: "Delicioso pastel casero de chocolate, hecho con mucho cariño."
            }
        },
        price: "R$ 15,50",
        image: "assets/caseirinho_chocolate.jpg"
    },
    {
        id: 'caseirinho_fuba_goiaba',
        name: "Caseirinho de Fubá com Goiaba",
        category: 'Caseirinhos',
        translations: {
            "pt-BR": {
                name: "Caseirinho de Fubá com Goiaba",
                shortDesc: "Fubá com goiabada.",
                fullDesc: "Bolo caseiro de fubá com deliciosa goiabada. A combinação perfeita!"
            },
            "en": {
                name: "Cornmeal Cake with Guava",
                shortDesc: "Cornmeal with guava paste.",
                fullDesc: "Homemade cornmeal cake with delicious guava paste. The perfect combination!"
            },
            "es": {
                name: "Casero de Maíz con Guayaba",
                shortDesc: "Maíz con dulce de guayaba.",
                fullDesc: "Pastel casero de maíz con delicioso dulce de guayaba. ¡La combinación perfecta!"
            }
        },
        price: "R$ 15,50",
        image: "assets/caseirinho_fuba.jpg"
    },
    {
        id: 'caseirinho_formigueiro',
        name: "Caseirinho Formigueiro",
        category: 'Caseirinhos',
        translations: {
            "pt-BR": {
                name: "Caseirinho Formigueiro",
                shortDesc: "Clássico formigueiro.",
                fullDesc: "O clássico bolo formigueiro com chocolate granulado."
            },
            "en": {
                name: "Anthill Cake",
                shortDesc: "Classic anthill cake.",
                fullDesc: "The classic anthill cake with chocolate sprinkles."
            },
            "es": {
                name: "Pastel Hormiguero",
                shortDesc: "Clásico pastel hormiguero.",
                fullDesc: "El clásico pastel hormiguero con chispas de chocolate."
            }
        },
        price: "R$ 18,00",
        image: "assets/caseirinho_formigueiro.jpg"
    },

    // --- BRIGADEIROS ---
    {
        id: 'brigadeiro_tradicional',
        name: "Brigadeiro Tradicional",
        category: 'Brigadeiros',
        translations: {
            "pt-BR": {
                name: "Brigadeiro Tradicional",
                shortDesc: "O clássico brasileiro.",
                fullDesc: "O tradicional brigadeiro de chocolate, feito com muito amor."
            },
            "en": {
                name: "Traditional Brigadeiro",
                shortDesc: "The Brazilian classic.",
                fullDesc: "The traditional chocolate brigadeiro, made with lots of love."
            },
            "es": {
                name: "Brigadeiro Tradicional",
                shortDesc: "El clásico brasileño.",
                fullDesc: "El tradicional brigadeiro de chocolate, hecho con mucho amor."
            }
        },
        price: "R$ 7,00",
        image: "assets/brigadeiro.jpeg"
    },
    {
        id: 'brigadeiro_3_leites',
        name: "Brigadeiro 3 Leites",
        category: 'Brigadeiros',
        translations: {
            "pt-BR": {
                name: "Brigadeiro 3 Leites",
                shortDesc: "Versão cremosa.",
                fullDesc: "Brigadeiro na versão três leites, super cremoso e delicioso."
            },
            "en": {
                name: "Tres Leches Brigadeiro",
                shortDesc: "Creamy version.",
                fullDesc: "Brigadeiro in the tres leches version, super creamy and delicious."
            },
            "es": {
                name: "Brigadeiro Tres Leches",
                shortDesc: "Versión cremosa.",
                fullDesc: "Brigadeiro en versión tres leches, súper cremoso y delicioso."
            }
        },
        price: "R$ 6,00",
        image: "assets/brigadeiro_3_leites.jpg"
    },
    {
        id: 'brigadeiro_pistache',
        name: "Brigadeiro de Pistache",
        category: 'Brigadeiros',
        translations: {
            "pt-BR": {
                name: "Brigadeiro de Pistache",
                shortDesc: "Sabor sofisticado.",
                fullDesc: "Brigadeiro de pistache com sabor sofisticado e marcante."
            },
            "en": {
                name: "Pistachio Brigadeiro",
                shortDesc: "Sophisticated flavor.",
                fullDesc: "Pistachio brigadeiro with sophisticated and distinctive flavor."
            },
            "es": {
                name: "Brigadeiro de Pistacho",
                shortDesc: "Sabor sofisticado.",
                fullDesc: "Brigadeiro de pistacho con sabor sofisticado y marcado."
            }
        },
        price: "R$ 8,00",
        image: "assets/brigadeiro_pistache.jpg"
    },

    // --- BOLINHOS E ESPECIAIS ---
    {
        id: 'bolinho_brulee',
        name: "Bolinho Brûlée com Frutas Vermelhas",
        category: 'Bolinhos',
        translations: {
            "pt-BR": {
                name: "Bolinho Brûlée com Frutas Vermelhas",
                shortDesc: "Mini bolo de baunilha com geleia de frutas vermelhas.",
                fullDesc: "Mini bolo de baunilha com geleia de frutas vermelhas e brigadeiro de baunilha de Madagascar Brûlée. Peso aprox.: 105g. Atenção: Por ser um produto livre de conservantes, sugerimos o consumo imediato."
            },
            "en": {
                name: "Brûlée Mini Cake with Red Fruits",
                shortDesc: "Mini vanilla cake with red fruit jam.",
                fullDesc: "Mini vanilla cake with red fruit jam and Madagascar vanilla brûlée brigadeiro. Approx. weight: 105g. Note: As a preservative-free product, we suggest immediate consumption."
            },
            "es": {
                name: "Bolito Brûlée con Frutas Rojas",
                shortDesc: "Mini pastel de vainilla con mermelada de frutas rojas.",
                fullDesc: "Mini pastel de vainilla con mermelada de frutas rojas y brigadeiro de vainilla de Madagascar Brûlée. Peso aprox.: 105g. Atención: Por ser un producto sin conservantes, sugerimos consumo inmediato."
            }
        },
        price: "R$ 16,00",
        image: "assets/bolinho_brulee.jpg"
    },
    {
        id: 'toalha_felpuda',
        name: "Toalha Felpuda",
        category: 'Bolos',
        translations: {
            "pt-BR": {
                name: "Toalha Felpuda",
                shortDesc: "Bolo gelado com toque cítrico e coco.",
                fullDesc: "Bolo gelado com toque cítrico, molhadinho e finalizado com coco. Peso aprox.: 470g"
            },
            "en": {
                name: "Fluffy Towel Cake",
                shortDesc: "Cold cake with citrus touch and coconut.",
                fullDesc: "Cold cake with citrus touch, moist and finished with coconut. Approx. weight: 470g"
            },
            "es": {
                name: "Toalla Afelpada",
                shortDesc: "Pastel frío con toque cítrico y coco.",
                fullDesc: "Pastel frío con toque cítrico, muy húmedo y finalizado con coco. Peso aprox.: 470g"
            }
        },
        price: "R$ 32,00",
        image: "assets/toalhafelpuda.jpeg"
    },
    {
        id: 'caseirinho_limao_mirtilo',
        name: "Caseirinho de Limão com Mirtilo",
        category: 'Caseirinhos',
        translations: {
            "pt-BR": {
                name: "Caseirinho de Limão com Mirtilo",
                shortDesc: "Limão com mirtilo e crumble.",
                fullDesc: "Bolo de limão com mirtilo e crumble de limão. Peso aprox.: 325g"
            },
            "en": {
                name: "Lemon Blueberry Homemade Cake",
                shortDesc: "Lemon with blueberry and crumble.",
                fullDesc: "Lemon cake with blueberry and lemon crumble. Approx. weight: 325g"
            },
            "es": {
                name: "Casero de Limón con Arándanos",
                shortDesc: "Limón con arándanos y crumble.",
                fullDesc: "Pastel de limón con arándanos y crumble de limón. Peso aprox.: 325g"
            }
        },
        price: "R$ 21,00",
        image: "assets/limaomirtilo.jpeg"
    },
    {
        id: 'pudim_tradicional',
        name: "Pudim Tradicional",
        category: 'Pudim',
        translations: {
            "pt-BR": {
                name: "Pudim Tradicional",
                shortDesc: "O queridinho da Mirabolando.",
                fullDesc: "Pudim no Pote - O queridinho da Mirabolando. Pudim de leite condensado com calda de baunilha de Madagascar, super cremoso. Peso aprox.: 140g"
            },
            "en": {
                name: "Traditional Flan",
                shortDesc: "Mirabolando's favorite.",
                fullDesc: "Flan in a Jar - Mirabolando's favorite. Condensed milk flan with Madagascar vanilla syrup, super creamy. Approx. weight: 140g"
            },
            "es": {
                name: "Pudín Tradicional",
                shortDesc: "El favorito de Mirabolando.",
                fullDesc: "Pudín en Tarro - El favorito de Mirabolando. Pudín de leche condensada con almíbar de vainilla de Madagascar, súper cremoso. Peso aprox.: 140g"
            }
        },
        price: "R$ 20,00",
        image: "assets/pudim.jpg"
    },
    {
        id: 'torta_maca',
        name: "Torta de Maçã",
        category: 'Tortas',
        translations: {
            "pt-BR": {
                name: "Torta de Maçã",
                shortDesc: "Parece a do desenho, só que muito melhor!",
                fullDesc: "Torta de Maçã com Especiarias. Acompanha copinho com nosso delicioso coulis de frutas vermelhas. Atenção: Torta assada na hora, por esse motivo, adicione 30 minutos ao tempo de entrega. Peso aprox.: 240g"
            },
            "en": {
                name: "Apple Pie",
                shortDesc: "Like the cartoon, but much better!",
                fullDesc: "Apple Pie with Spices. Comes with a small cup of our delicious red fruit coulis. Note: Freshly baked pie, please add 30 minutes to delivery time. Approx. weight: 240g"
            },
            "es": {
                name: "Tarta de Manzana",
                shortDesc: "Como la del dibujo, pero mucho mejor!",
                fullDesc: "Tarta de Manzana con Especias. Acompaña un vasito con nuestro delicioso coulis de frutas rojas. Atención: Tarta horneada al momento, por eso, agregue 30 minutos al tiempo de entrega. Peso aprox.: 240g"
            }
        },
        price: "R$ 36,00",
        image: "assets/torta_maca.jpg"
    },
    {
        id: 'san_sebastian',
        name: "San Sebastián Cheesecake",
        category: 'Cheesecakes',
        translations: {
            "pt-BR": {
                name: "San Sebastián Cheesecake",
                shortDesc: "Crosta caramelizada e interior cremoso.",
                fullDesc: "Conhecido por sua crosta caramelizada e interior incrivelmente cremoso, ele derrete na boca a cada mordida. Atenção: a imagem é com adicional de calda de chocolate ao leite. Se não selecionar a calda, a basca vai purinha."
            },
            "en": {
                name: "San Sebastián Cheesecake",
                shortDesc: "Caramelized crust and creamy interior.",
                fullDesc: "Known for its caramelized crust and incredibly creamy interior, it melts in your mouth with every bite. Note: the image shows additional milk chocolate sauce. If you don't select the sauce, it comes pure."
            },
            "es": {
                name: "San Sebastián Cheesecake",
                shortDesc: "Costra caramelizada e interior cremoso.",
                fullDesc: "Conocido por su costra caramelizada e interior increíblemente cremoso, se derrite en la boca con cada mordida. Atención: la imagen es con adicional de salsa de chocolate con leche. Si no selecciona la salsa, viene pura."
            }
        },
        price: "R$ 28,00",
        image: "assets/san_sebastian.jpg"
    },
    {
        id: 'pave_bossa_nova',
        name: "Pavê Bossa Nova",
        category: 'Pavês',
        translations: {
            "pt-BR": {
                name: "Pavê Bossa Nova",
                shortDesc: "É de comer cantando!",
                fullDesc: "Camadas de creme de limão, biscoito champanhe embebido no limoncello, caramelo de limão, ganache de macadâmia, Cookie Bossa e chocolate branco derretido. É de comer cantando!"
            },
            "en": {
                name: "Bossa Nova Trifle",
                shortDesc: "So good you'll sing while eating!",
                fullDesc: "Layers of lemon cream, champagne biscuit soaked in limoncello, lemon caramel, macadamia ganache, Bossa Cookie and melted white chocolate. So good you'll sing while eating!"
            },
            "es": {
                name: "Pavé Bossa Nova",
                shortDesc: "¡Para comer cantando!",
                fullDesc: "Capas de crema de limón, galleta champán empapada en limoncello, caramelo de limón, ganache de macadamia, Cookie Bossa y chocolate blanco derretido. ¡Para comer cantando!"
            }
        },
        price: "R$ 30,00",
        image: "assets/pave_bossa_nova.jpg"
    }
];

window.menuCardapioLoja = menuCardapioLoja;
