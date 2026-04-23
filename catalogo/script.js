const products = [
    // LEGUMES
    { name: "Abobrinha Itália", category: "legumes", desc: "700g-900g = 3 a 4 unidades", price: "R$ 4,50", img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80" },
    { name: "Abóbora Capotiá", category: "legumes", desc: "unidade (aprox. 1,5kg)", price: "R$ 8,90", img: "https://images.unsplash.com/photo-1506543730435-e2c1d4553a84?auto=format&fit=crop&w=300&q=80" },
    { name: "Batata Inglesa", category: "legumes", desc: "1kg = aprox. 6 a 8 unidades", price: "R$ 6,50", img: "https://images.unsplash.com/photo-1518977676601-b53f02bad675?auto=format&fit=crop&w=300&q=80" },
    { name: "Berinjela", category: "legumes", desc: "3 unidades", price: "R$ 5,00", img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=300&q=80" },
    { name: "Batata Doce", category: "legumes", desc: "1kg", price: "R$ 5,50", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80" },
    { name: "Brócolis Ninja", category: "legumes", desc: "UNIDADE", price: "R$ 7,00", img: "https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?auto=format&fit=crop&w=300&q=80" },
    { name: "Cebola", category: "legumes", desc: "1kg", price: "R$ 5,90", img: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=300&q=80" },
    { name: "Cebola Roxa", category: "legumes", desc: "600g", price: "R$ 4,80", img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=300&q=80" },
    { name: "Cenoura", category: "legumes", desc: "700g", price: "R$ 4,50", img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=300&q=80" },
    { name: "Chuchu", category: "legumes", desc: "1kg", price: "R$ 3,90", img: "https://images.unsplash.com/photo-1603513143093-9c84918e9321?auto=format&fit=crop&w=300&q=80" },
    { name: "Couve-Flor", category: "legumes", desc: "UNIDADE", price: "R$ 8,00", img: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=300&q=80" },
    { name: "Gengibre", category: "legumes", desc: "100g", price: "R$ 2,50", img: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=300&q=80" },
    { name: "Inhame", category: "legumes", desc: "700g", price: "R$ 6,00", img: "https://images.unsplash.com/photo-1615485247092-613401569753?auto=format&fit=crop&w=300&q=80" },
    { name: "Jiló", category: "legumes", desc: "800g", price: "R$ 4,50", img: "https://images.unsplash.com/photo-1594968973184-2224a28299ef?auto=format&fit=crop&w=300&q=80" },
    { name: "Milho Verde", category: "legumes", desc: "bandeja", price: "R$ 6,50", img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=300&q=80" },
    { name: "Pepino Caipira", category: "legumes", desc: "3-4 unidades", price: "R$ 4,00", img: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=300&q=80" },
    { name: "Pepino Japonês", category: "legumes", desc: "4-5 unidades", price: "R$ 4,50", img: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=300&q=80" },
    { name: "Pimentão Vermelho", category: "legumes", desc: "3 a 4 unidades", price: "R$ 7,50", img: "https://images.unsplash.com/photo-1563513331624-391ba95e9718?auto=format&fit=crop&w=300&q=80" },
    { name: "Pimentão Verde", category: "legumes", desc: "3 a 4 unidades", price: "R$ 5,00", img: "https://images.unsplash.com/photo-1563513331624-391ba95e9718?auto=format&fit=crop&w=300&q=80" },
    { name: "Pimentão Amarelo", category: "legumes", desc: "3 a 4 unidades", price: "R$ 7,50", img: "https://images.unsplash.com/photo-1563513331624-391ba95e9718?auto=format&fit=crop&w=300&q=80" },
    { name: "Pimentão Mix", category: "legumes", desc: "1 unidade de cada", price: "R$ 8,00", img: "https://images.unsplash.com/photo-1563513331624-391ba95e9718?auto=format&fit=crop&w=300&q=80" },
    { name: "Quiabo", category: "legumes", desc: "350g", price: "R$ 4,50", img: "https://images.unsplash.com/photo-1444732328140-9a302e588d0b?auto=format&fit=crop&w=300&q=80" },
    { name: "Tomate", category: "legumes", desc: "900g", price: "R$ 7,50", img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80" },
    { name: "Vagem Itatiba", category: "legumes", desc: "300g", price: "R$ 5,00", img: "https://images.unsplash.com/photo-1567375639073-9377469a4891?auto=format&fit=crop&w=300&q=80" },
    { name: "Alho Roxo", category: "legumes", desc: "300g", price: "R$ 12,00", img: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=300&q=80" },
    { name: "Tomate Cereja", category: "legumes", desc: "400g", price: "R$ 6,50", img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80" },
    { name: "Ervilha Torta", category: "legumes", desc: "200G", price: "R$ 5,00", img: "https://images.unsplash.com/photo-1567375639073-9377469a4891?auto=format&fit=crop&w=300&q=80" },
    { name: "Repolho", category: "legumes", desc: "unidade", price: "R$ 4,50", img: "https://images.unsplash.com/photo-1548682052-0447038e2197?auto=format&fit=crop&w=300&q=80" },

    // VERDURAS
    { name: "Alface Americana", category: "verduras", desc: "3-4 UNIDADES", price: "R$ 10,00", img: "https://images.unsplash.com/photo-1622206151226-18ca2c9e7a16?auto=format&fit=crop&w=300&q=80" },
    { name: "Alface Crespa", category: "verduras", desc: "3-4 UNIDADES", price: "R$ 10,00", img: "https://images.unsplash.com/photo-1622206151226-18ca2c9e7a16?auto=format&fit=crop&w=300&q=80" },
    { name: "Alface Mimosa", category: "verduras", desc: "3-4 UNIDADES", price: "R$ 10,00", img: "https://images.unsplash.com/photo-1622206151226-18ca2c9e7a16?auto=format&fit=crop&w=300&q=80" },
    { name: "Alface Lisa", category: "verduras", desc: "3-4 UNIDADES", price: "R$ 10,00", img: "https://images.unsplash.com/photo-1622206151226-18ca2c9e7a16?auto=format&fit=crop&w=300&q=80" },
    { name: "Alface Roxa", category: "verduras", desc: "3-4 UNIDADES", price: "R$ 12,00", img: "https://images.unsplash.com/photo-1622206151226-18ca2c9e7a16?auto=format&fit=crop&w=300&q=80" },
    { name: "Alface Romana", category: "verduras", desc: "3-4 UNIDADES", price: "R$ 12,00", img: "https://images.unsplash.com/photo-1622206151226-18ca2c9e7a16?auto=format&fit=crop&w=300&q=80" },
    { name: "Escarola", category: "verduras", desc: "3 a 4 unidades", price: "R$ 10,00", img: "https://images.unsplash.com/photo-1622206151226-18ca2c9e7a16?auto=format&fit=crop&w=300&q=80" },
    { name: "Rúcula", category: "verduras", desc: "maço", price: "R$ 3,50", img: "https://images.unsplash.com/photo-1528640107297-cdd1b6a32d66?auto=format&fit=crop&w=300&q=80" },
    { name: "Agrião", category: "verduras", desc: "maço", price: "R$ 3,50", img: "https://images.unsplash.com/photo-1626200225134-c4aeb53c15eb?auto=format&fit=crop&w=300&q=80" },
    { name: "Acelga", category: "verduras", desc: "unidade", price: "R$ 6,00", img: "https://images.unsplash.com/photo-1548682052-0447038e2197?auto=format&fit=crop&w=300&q=80" },
    { name: "Couve Manteiga", category: "verduras", desc: "maço", price: "R$ 3,50", img: "https://images.unsplash.com/photo-1528640107297-cdd1b6a32d66?auto=format&fit=crop&w=300&q=80" },
    { name: "Coentro", category: "verduras", desc: "maço", price: "R$ 2,50", img: "https://images.unsplash.com/photo-1588877381448-588f7ad7febf?auto=format&fit=crop&w=300&q=80" },
    { name: "Almeirão", category: "verduras", desc: "maço", price: "R$ 3,50", img: "https://images.unsplash.com/photo-1528640107297-cdd1b6a32d66?auto=format&fit=crop&w=300&q=80" },
    { name: "Almeirão Catalunha", category: "verduras", desc: "maço", price: "R$ 4,00", img: "https://images.unsplash.com/photo-1528640107297-cdd1b6a32d66?auto=format&fit=crop&w=300&q=80" },
    { name: "Rabanete", category: "verduras", desc: "maço", price: "R$ 4,50", img: "https://images.unsplash.com/photo-1584061807106-ca792461469e?auto=format&fit=crop&w=300&q=80" },
    { name: "Salsinha", category: "verduras", desc: "maço", price: "R$ 2,00", img: "https://images.unsplash.com/photo-1588877381448-588f7ad7febf?auto=format&fit=crop&w=300&q=80" },
    { name: "Cheiro Verde", category: "verduras", desc: "maço", price: "R$ 3,00", img: "https://images.unsplash.com/photo-1588877381448-588f7ad7febf?auto=format&fit=crop&w=300&q=80" },
    { name: "Hortelã", category: "verduras", desc: "maço", price: "R$ 2,50", img: "https://images.unsplash.com/photo-1600077106724-946750eeaf3c?auto=format&fit=crop&w=300&q=80" },

    // FRUTAS
    { name: "Limão Tahiti", category: "frutas", desc: "900g", price: "R$ 4,90", img: "https://images.unsplash.com/photo-1590505660564-44b1e66f833a?auto=format&fit=crop&w=300&q=80" },
    { name: "Limão Rosa", category: "frutas", desc: "900G", price: "R$ 5,50", img: "https://images.unsplash.com/photo-1590505660564-44b1e66f833a?auto=format&fit=crop&w=300&q=80" },
    { name: "Laranja", category: "frutas", desc: "3-5kg SACO", price: "R$ 15,00", img: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=300&q=80" },
];

function renderCatalog(filter = "todos") {
    const catalogContent = document.getElementById('catalogContent');
    catalogContent.innerHTML = '';

    const categories = filter === "todos" ? ["legumes", "verduras", "frutas"] : [filter];

    categories.forEach(cat => {
        const catProducts = products.filter(p => p.category === cat);
        if (catProducts.length === 0) return;

        const catSection = document.createElement('div');
        catSection.innerHTML = `<h2 class="category-title">${cat.charAt(0).toUpperCase() + cat.slice(1)}</h2>`;
        
        const listDiv = document.createElement('div');
        listDiv.className = 'products-list';

        catProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-desc">${product.desc}</div>
                    <div class="product-price">${product.price}</div>
                </div>
                <div class="product-image">
                    <img src="${product.img}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/100?text=Produto'">
                </div>
            `;
            listDiv.appendChild(productCard);
        });

        catSection.appendChild(listDiv);
        catalogContent.appendChild(catSection);
    });
}

document.getElementById('categorySelect').addEventListener('change', (e) => {
    renderCatalog(e.target.value);
});

// Initial render
renderCatalog();
