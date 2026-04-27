let products = [];
/*
    // LEGUMES
    { id: 1, name: "Abobrinha Itália", category: "legumes", desc: "700g-900g = 3 a 4 unidades", price: 4.50, img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80" },
    { id: 2, name: "Abóbora Capotiá", category: "legumes", desc: "unidade (aprox. 1,5kg)", price: 8.90, img: "https://images.unsplash.com/photo-1506543730435-e2c1d4553a84?auto=format&fit=crop&w=300&q=80" },
    { id: 3, name: "Batata Inglesa", category: "legumes", desc: "1kg = aprox. 6 a 8 unidades", price: 6.50, img: "https://images.unsplash.com/photo-1518977676601-b53f02bad675?auto=format&fit=crop&w=300&q=80" },
    { id: 4, name: "Berinjela", category: "legumes", desc: "3 unidades", price: 5.00, img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=300&q=80" },
    { id: 5, name: "Batata Doce", category: "legumes", desc: "1kg", price: 5.50, img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80" },
    { id: 6, name: "Brócolis Ninja", category: "legumes", desc: "UNIDADE", price: 7.00, img: "https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?auto=format&fit=crop&w=300&q=80" },
    { id: 7, name: "Cebola", category: "legumes", desc: "1kg", price: 5.90, img: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=300&q=80" },
    { id: 8, name: "Cebola Roxa", category: "legumes", desc: "600g", price: 4.80, img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=300&q=80" },
    { id: 9, name: "Cenoura", category: "legumes", desc: "700g", price: 4.50, img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=300&q=80" },
    { id: 10, name: "Chuchu", category: "legumes", desc: "1kg", price: 3.90, img: "https://images.unsplash.com/photo-1603513143093-9c84918e9321?auto=format&fit=crop&w=300&q=80" },
    { id: 11, name: "Couve-Flor", category: "legumes", desc: "UNIDADE", price: 8.00, img: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=300&q=80" },
    { id: 12, name: "Gengibre", category: "legumes", desc: "100g", price: 2.50, img: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=300&q=80" },
    { id: 13, name: "Inhame", category: "legumes", desc: "700g", price: 6.00, img: "https://images.unsplash.com/photo-1615485247092-613401569753?auto=format&fit=crop&w=300&q=80" },
    { id: 14, name: "Jiló", category: "legumes", desc: "800g", price: 4.50, img: "https://images.unsplash.com/photo-1594968973184-2224a28299ef?auto=format&fit=crop&w=300&q=80" },
    { id: 15, name: "Milho Verde", category: "legumes", desc: "bandeja", price: 6.50, img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=300&q=80" },
    { id: 16, name: "Pepino Caipira", category: "legumes", desc: "3-4 unidades", price: 4.00, img: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=300&q=80" },
    { id: 17, name: "Pepino Japonês", category: "legumes", desc: "4-5 unidades", price: 4.50, img: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=300&q=80" },
    { id: 18, name: "Pimentão Vermelho", category: "legumes", desc: "3 a 4 unidades", price: 7.50, img: "https://images.unsplash.com/photo-1563513331624-391ba95e9718?auto=format&fit=crop&w=300&q=80" },
    { id: 19, name: "Pimentão Verde", category: "legumes", desc: "3 a 4 unidades", price: 5.00, img: "https://images.unsplash.com/photo-1563513331624-391ba95e9718?auto=format&fit=crop&w=300&q=80" },
    { id: 20, name: "Pimentão Amarelo", category: "legumes", desc: "3 a 4 unidades", price: 7.50, img: "https://images.unsplash.com/photo-1563513331624-391ba95e9718?auto=format&fit=crop&w=300&q=80" },
    { id: 21, name: "Pimentão Mix", category: "legumes", desc: "1 unidade de cada", price: 8.00, img: "https://images.unsplash.com/photo-1563513331624-391ba95e9718?auto=format&fit=crop&w=300&q=80" },
    { id: 22, name: "Quiabo", category: "legumes", desc: "350g", price: 4.50, img: "https://images.unsplash.com/photo-1444732328140-9a302e588d0b?auto=format&fit=crop&w=300&q=80" },
    { id: 23, name: "Tomate", category: "legumes", desc: "900g", price: 7.50, img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80" },
    { id: 24, name: "Vagem Itatiba", category: "legumes", desc: "300g", price: 5.00, img: "https://images.unsplash.com/photo-1567375639073-9377469a4891?auto=format&fit=crop&w=300&q=80" },
    { id: 25, name: "Alho Roxo", category: "legumes", desc: "300g", price: 12.00, img: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=300&q=80" },
    { id: 26, name: "Tomate Cereja", category: "legumes", desc: "400g", price: 6.50, img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80" },
    { id: 27, name: "Ervilha Torta", category: "legumes", desc: "200G", price: 5.00, img: "https://images.unsplash.com/photo-1567375639073-9377469a4891?auto=format&fit=crop&w=300&q=80" },
    { id: 28, name: "Repolho", category: "legumes", desc: "unidade", price: 4.50, img: "https://images.unsplash.com/photo-1548682052-0447038e2197?auto=format&fit=crop&w=300&q=80" },

    // VERDURAS
    { id: 29, name: "Alface Americana", category: "verduras", desc: "3-4 UNIDADES", price: 10.00, img: "https://images.unsplash.com/photo-1622206151226-18ca2c9e7a16?auto=format&fit=crop&w=300&q=80" },
    { id: 30, name: "Alface Crespa", category: "verduras", desc: "3-4 UNIDADES", price: 10.00, img: "https://images.unsplash.com/photo-1622206151226-18ca2c9e7a16?auto=format&fit=crop&w=300&q=80" },
    { id: 31, name: "Alface Mimosa", category: "verduras", desc: "3-4 UNIDADES", price: 10.00, img: "https://images.unsplash.com/photo-1622206151226-18ca2c9e7a16?auto=format&fit=crop&w=300&q=80" },
    { id: 32, name: "Alface Lisa", category: "verduras", desc: "3-4 UNIDADES", price: 10.00, img: "https://images.unsplash.com/photo-1622206151226-18ca2c9e7a16?auto=format&fit=crop&w=300&q=80" },
    { id: 33, name: "Alface Roxa", category: "verduras", desc: "3-4 UNIDADES", price: 12.00, img: "https://images.unsplash.com/photo-1622206151226-18ca2c9e7a16?auto=format&fit=crop&w=300&q=80" },
    { id: 34, name: "Alface Romana", category: "verduras", desc: "3-4 UNIDADES", price: 12.00, img: "https://images.unsplash.com/photo-1622206151226-18ca2c9e7a16?auto=format&fit=crop&w=300&q=80" },
    { id: 35, name: "Escarola", category: "verduras", desc: "3 a 4 unidades", price: 10.00, img: "https://images.unsplash.com/photo-1622206151226-18ca2c9e7a16?auto=format&fit=crop&w=300&q=80" },
    { id: 36, name: "Rúcula", category: "verduras", desc: "maço", price: 3.50, img: "https://images.unsplash.com/photo-1528640107297-cdd1b6a32d66?auto=format&fit=crop&w=300&q=80" },
    { id: 37, name: "Agrião", category: "verduras", desc: "maço", price: 3.50, img: "https://images.unsplash.com/photo-1626200225134-c4aeb53c15eb?auto=format&fit=crop&w=300&q=80" },
    { id: 38, name: "Acelga", category: "verduras", desc: "unidade", price: 6.00, img: "https://images.unsplash.com/photo-1548682052-0447038e2197?auto=format&fit=crop&w=300&q=80" },
    { id: 39, name: "Couve Manteiga", category: "verduras", desc: "maço", price: 3.50, img: "https://images.unsplash.com/photo-1528640107297-cdd1b6a32d66?auto=format&fit=crop&w=300&q=80" },
    { id: 40, name: "Coentro", category: "verduras", desc: "maço", price: 2.50, img: "https://images.unsplash.com/photo-1588877381448-588f7ad7febf?auto=format&fit=crop&w=300&q=80" },
    { id: 41, name: "Almeirão", category: "verduras", desc: "maço", price: 3.50, img: "https://images.unsplash.com/photo-1528640107297-cdd1b6a32d66?auto=format&fit=crop&w=300&q=80" },
    { id: 42, name: "Almeirão Catalunha", category: "verduras", desc: "maço", price: 4.00, img: "https://images.unsplash.com/photo-1528640107297-cdd1b6a32d66?auto=format&fit=crop&w=300&q=80" },
    { id: 43, name: "Rabanete", category: "verduras", desc: "maço", price: 4.50, img: "https://images.unsplash.com/photo-1584061807106-ca792461469e?auto=format&fit=crop&w=300&q=80" },
    { id: 44, name: "Salsinha", category: "verduras", desc: "maço", price: 2.00, img: "https://images.unsplash.com/photo-1588877381448-588f7ad7febf?auto=format&fit=crop&w=300&q=80" },
    { id: 45, name: "Cheiro Verde", category: "verduras", desc: "maço", price: 3.00, img: "https://images.unsplash.com/photo-1588877381448-588f7ad7febf?auto=format&fit=crop&w=300&q=80" },
    { id: 46, name: "Hortelã", category: "verduras", desc: "maço", price: 2.50, img: "https://images.unsplash.com/photo-1600077106724-946750eeaf3c?auto=format&fit=crop&w=300&q=80" },

    // FRUTAS
    { id: 47, name: "Limão Tahiti", category: "frutas", desc: "900g", price: 4.90, img: "https://images.unsplash.com/photo-1590505660564-44b1e66f833a?auto=format&fit=crop&w=300&q=80" },
    { id: 48, name: "Limão Rosa", category: "frutas", desc: "900G", price: 5.50, img: "https://images.unsplash.com/photo-1590505660564-44b1e66f833a?auto=format&fit=crop&w=300&q=80" },
    { id: 49, name: "Laranja", category: "frutas", desc: "3-5kg SACO", price: 15.00, img: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=300&q=80" },
*/
let cart = [];

const SUPABASE_URL = "https://ykmcjsrhiwkhqmtsrhzz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrbWNqc3JoaXdraHFtdHNyaHp6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzI5NDA1NSwiZXhwIjoyMDkyODcwMDU1fQ.G62TDXD41dAY_YBdiL4sjlDrWg9yfLWba1rplDoBrwo";

let whatsappNumber = "5515999999999";

async function loadConfig() {
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/configuracoes?chave=eq.whatsapp&select=valor`, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });
        if (res.ok) {
            const data = await res.json();
            if (data.length > 0 && data[0].valor) {
                whatsappNumber = data[0].valor.replace(/\D/g, ''); // Garante apenas números
            }
        }
    } catch(e) {
        console.log("Usando WhatsApp padrão.");
    }
}

async function loadProducts() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/produtos?select=*&order=id.asc`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });
        
        if (response.ok) {
            products = await response.json();
            // Filtrar produtos fora de estoque
            products = products.filter(p => p.stock !== false && p.stock !== 'false' && p.stock !== 0);
            renderCatalog();
        } else {
            console.error("Erro ao carregar produtos:", response.statusText);
            document.getElementById('catalogContent').innerHTML = '<p style="text-align:center; padding: 40px;">Não foi possível carregar o catálogo no momento.</p>';
        }
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        document.getElementById('catalogContent').innerHTML = '<div style="text-align:center; padding: 40px;"><p>⚠️ Erro ao conectar ao banco de dados.</p></div>';
    }
}

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
                    <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
                    <button class="add-btn" onclick="addToCart(${product.id})">
                        <i class="fa-solid fa-plus"></i>
                    </button>
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

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartUI();
}

function removeFromCart(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem.qty > 1) {
        cartItem.qty--;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }
    updateCartUI();
}

function updateCartUI() {
    const badge = document.getElementById('cartBadge');
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.innerText = totalItems;

    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Seu carrinho está vazio</div>';
        cartTotalElement.innerText = 'R$ 0,00';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div>
                <div class="product-name">${item.name}</div>
                <div class="product-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
            </div>
            <div class="item-qty">
                <button class="qty-btn" onclick="removeFromCart(${item.id})">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="addToCart(${item.id})">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    cartTotalElement.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function toggleCart() {
    document.getElementById('modalOverlay').classList.toggle('active');
}

document.getElementById('openCart').addEventListener('click', toggleCart);
document.getElementById('closeCart').addEventListener('click', toggleCart);
document.getElementById('categorySelect').addEventListener('change', (e) => {
    renderCatalog(e.target.value);
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) return;

    let message = "Olá! Gostaria de fazer um pedido:\n\n";
    let total = 0;

    cart.forEach(item => {
        message += `*${item.qty}x ${item.name}* - R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}\n`;
        total += item.price * item.qty;
    });

    message += `\n*Total: R$ ${total.toFixed(2).replace('.', ',')}*`;
    message += `\n\n_Pedido feito via Catálogo Digital Horta Iguatemi_`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});

// Initial load
loadConfig().then(() => loadProducts());
