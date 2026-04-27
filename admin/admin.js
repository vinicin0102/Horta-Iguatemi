// --- ESTADO DA APLICAÇÃO ---
let products = [];
let editingId = null;

// Configuração Supabase (Migrado do GitHub)
const SUPABASE_URL = "https://ykmcjsrhiwkhqmtsrhzz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrbWNqc3JoaXdraHFtdHNyaHp6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzI5NDA1NSwiZXhwIjoyMDkyODcwMDU1fQ.G62TDXD41dAY_YBdiL4sjlDrWg9yfLWba1rplDoBrwo";

// Elementos da Interface
const loginScreen = document.getElementById('loginScreen');
const dashboardScreen = document.getElementById('dashboardScreen');
const syncStatus = document.getElementById('syncStatus');

// --- LOGIN SIMPLES ---
document.getElementById('loginBtn').addEventListener('click', () => {
    const pass = document.getElementById('passwordInput').value;
    if (pass === 'iguatemi123') {
        loginScreen.style.display = 'none';
        dashboardScreen.style.display = 'flex';
        
        // Remove configuração do GitHub antiga da tela
        const configBtn = document.getElementById('configMenuBtn');
        if(configBtn) configBtn.style.display = 'none';
        document.getElementById('saveChangesBtn').style.display = 'none'; // No Supabase salva na hora
        
        fetchProductsSupabase();
    } else {
        document.getElementById('loginError').innerText = 'Senha incorreta.';
    }
});
document.getElementById('logoutBtn').addEventListener('click', () => location.reload());

// --- NAVEGAÇÃO LATERAL ---
const menuProdutos = document.getElementById('menu-produtos');
const menuSite = document.getElementById('menu-site');
const productsSection = document.getElementById('productsSection');
const siteConfigSection = document.getElementById('siteConfigSection');
const topbarActions = document.querySelector('.topbar-actions');

menuProdutos.addEventListener('click', (e) => {
    e.preventDefault();
    menuProdutos.classList.add('active');
    menuSite.classList.remove('active');
    productsSection.style.display = 'block';
    siteConfigSection.style.display = 'none';
    topbarActions.style.display = 'flex';
});

menuSite.addEventListener('click', (e) => {
    e.preventDefault();
    menuSite.classList.add('active');
    menuProdutos.classList.remove('active');
    productsSection.style.display = 'none';
    siteConfigSection.style.display = 'block';
    topbarActions.style.display = 'none';
    fetchSiteConfigSupabase(); // Carrega os dados mais recentes ao abrir
});

// --- API SUPABASE ---
async function fetchProductsSupabase() {
    syncStatus.className = 'sync-status syncing';
    syncStatus.innerHTML = '<i class="fa-solid fa-rotate"></i> Conectando DB...';

    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/produtos?select=*&order=id.asc`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });
        
        if (res.ok) {
            products = await res.json();
            
            // Migração Automática se estiver vazio!
            if (products.length === 0) {
                syncStatus.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Migrando dados antigos...';
                await migrateLocalToSupabase();
            } else {
                syncStatus.className = 'sync-status online';
                syncStatus.innerHTML = '<i class="fa-solid fa-check-circle"></i> Banco Conectado';
                renderTable();
            }
        } else {
            throw new Error(`Erro ${res.status}: Crie a tabela "produtos" no Supabase primeiro!`);
        }
    } catch (e) {
        console.error(e);
        syncStatus.className = 'sync-status offline';
        syncStatus.innerHTML = `<i class="fa-solid fa-xmark-circle"></i> Tabela Não Encontrada`;
        alert(e.message);
    }
}

// Migra os dados do produtos.json para o Supabase na primeira vez
async function migrateLocalToSupabase() {
    try {
        const res = await fetch('../data/produtos.json');
        if (res.ok) {
            const localProducts = await res.json();
            
            // Insere todos no Supabase
            const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/produtos`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(localProducts)
            });
            
            if (insertRes.ok) {
                products = await insertRes.json();
                syncStatus.className = 'sync-status online';
                syncStatus.innerHTML = '<i class="fa-solid fa-check-circle"></i> Banco Conectado';
                renderTable();
                alert("Migração concluída! Todos os seus produtos foram copiados para o Supabase com sucesso.");
            } else {
                throw new Error("Erro ao inserir produtos no banco");
            }
        }
    } catch (e) {
        console.error("Erro na migração", e);
        alert("Erro na migração: " + e.message);
    }
}

// --- API SUPABASE (CONFIGURAÇÕES DO SITE) ---
async function fetchSiteConfigSupabase() {
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/configuracoes?select=*`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });
        
        if (res.ok) {
            const configs = await res.json();
            const getConfig = (chave) => {
                const item = configs.find(c => c.chave === chave);
                return item ? item.valor : '';
            };
            
            document.getElementById('cfgWhatsapp').value = getConfig('whatsapp') || '5515999999999';
            document.getElementById('cfgHeroTitle').value = getConfig('hero_title') || 'Hortifruti Fresco Direto da <span>Horta</span> para Sua Casa';
            document.getElementById('cfgHeroSub').value = getConfig('hero_subtitle') || 'Verduras e legumes colhidos no mesmo dia, com mais sabor, qualidade e entrega rápida em Sorocaba e região.';
            document.getElementById('cfgAboutTitle').value = getConfig('about_title') || 'Tradição de mais de 20 anos em Sorocaba';
            document.getElementById('cfgAboutText').value = getConfig('about_text') || 'Na <strong>Horta Iguatemi</strong>, estamos há mais de 20 anos no ramo, trabalhando em família para produzir, com muito amor, verduras e legumes de alta qualidade em Sorocaba e região.<br><br>Ao longo dessas duas décadas, conquistamos a confiança dos nossos clientes oferecendo produtos sempre frescos, saborosos e cultivados com responsabilidade. Todos os itens são <strong>colhidos no mesmo dia da venda</strong>, garantindo mais qualidade, mais durabilidade e muito mais sabor para a sua mesa.<br><br>Utilizamos apenas fertilizantes biológicos em nossa produção, respeitando a natureza e cuidando da saúde da sua família.<br><br>E agora, dando mais um passo para facilitar o seu dia a dia, a Horta Iguatemi está iniciando seu <strong>serviço de delivery</strong>. Receba em casa produtos frescos, colhidos no dia, diretamente da nossa horta — com a mesma qualidade de sempre, mas com muito mais praticidade.';
        }
    } catch (e) {
        console.error("Erro ao carregar configurações", e);
    }
}

document.getElementById('siteConfigForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('saveSiteConfigBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';
    
    const payload = [
        { chave: 'whatsapp', valor: document.getElementById('cfgWhatsapp').value },
        { chave: 'hero_title', valor: document.getElementById('cfgHeroTitle').value },
        { chave: 'hero_subtitle', valor: document.getElementById('cfgHeroSub').value },
        { chave: 'about_title', valor: document.getElementById('cfgAboutTitle').value },
        { chave: 'about_text', valor: document.getElementById('cfgAboutText').value }
    ];
    
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/configuracoes`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'resolution=merge-duplicates'
            },
            body: JSON.stringify(payload)
        });
        
        if (res.ok) {
            alert("Configurações salvas com sucesso!");
        } else {
            throw new Error(`Erro: Você precisa criar a tabela 'configuracoes' primeiro!`);
        }
    } catch(err) {
        alert(err.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-save"></i> Salvar Alterações do Site';
    }
});

// --- RENDERIZAÇÃO DA TABELA ---
function renderTable() {
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = '';
    
    products.forEach(p => {
        const isStock = p.stock !== false && p.stock !== 'false' && p.stock !== 0;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="prod-img-cell"><img src="${p.img}" onerror="this.src='https://via.placeholder.com/48?text=Img'"></td>
            <td>
                <span class="prod-name-cell">${p.name}</span>
                <span class="prod-desc">${p.desc || ''}</span>
            </td>
            <td><span class="badge badge-cat">${p.category}</span></td>
            <td><b>R$ ${parseFloat(p.price).toFixed(2).replace('.', ',')}</b></td>
            <td>
                <span class="badge badge-stock ${!isStock ? 'out' : ''}">
                    ${isStock ? 'Em Estoque' : 'Esgotado'}
                </span>
            </td>
            <td class="actions-cell">
                <button class="btn btn-icon btn-outline" onclick="editProduct(${p.id})" title="Editar"><i class="fa-solid fa-pen"></i></button>
                <button class="btn btn-icon btn-danger" onclick="deleteProduct(${p.id})" title="Excluir"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// --- MODAIS E FORMULÁRIOS ---
function openModal(id) {
    document.getElementById(id).classList.add('active');
}
function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

document.getElementById('addProductBtn').addEventListener('click', () => {
    editingId = null;
    document.getElementById('modalTitle').innerText = "Novo Produto";
    document.getElementById('productForm').reset();
    document.getElementById('imagePreview').src = 'https://via.placeholder.com/300x200?text=Sem+Imagem';
    openModal('productModal');
});

document.getElementById('closeModalBtn').addEventListener('click', () => closeModal('productModal'));
document.getElementById('cancelModalBtn').addEventListener('click', () => closeModal('productModal'));

document.getElementById('pImageURL').addEventListener('input', (e) => {
    if(e.target.value) {
        document.getElementById('imagePreview').src = e.target.value;
        document.getElementById('pImageFile').value = ""; 
    }
});

document.getElementById('pImageFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        document.getElementById('imagePreview').src = url;
        document.getElementById('pImageURL').value = ""; 
    }
});

// Upload via imgbb gratuito (para facilitar no Supabase)
async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    // API Key pública de testes/exemplo do ImgBB ou podemos retornar data URI
    // Como Supabase storage precisa de setup, vamos usar DataURI temporário para não quebrar
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}

// Salvar no Banco
document.getElementById('saveProductBtn').addEventListener('click', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('saveProductBtn');
    
    const name = document.getElementById('pName').value;
    const category = document.getElementById('pCategory').value;
    const desc = document.getElementById('pDesc').value;
    const price = parseFloat(document.getElementById('pPrice').value);
    const stock = document.getElementById('pStock').checked;
    
    let img = document.getElementById('pImageURL').value;
    const fileInput = document.getElementById('pImageFile');
    
    if(!name || !category || isNaN(price)) return alert("Preencha os campos obrigatórios!");

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';

    if (fileInput.files.length > 0) {
        img = await uploadImage(fileInput.files[0]);
    } else if (!img && !editingId) {
        img = "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80";
    }

    const payload = { name, category, desc, price, stock, img };

    try {
        if (editingId) {
            // Atualiza (PATCH)
            const res = await fetch(`${SUPABASE_URL}/rest/v1/produtos?id=eq.${editingId}`, {
                method: 'PATCH',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(payload)
            });
            if(res.ok) {
                const updated = await res.json();
                const index = products.findIndex(p => p.id === editingId);
                products[index] = updated[0];
            } else throw new Error("Falha ao atualizar");
        } else {
            // Novo (POST)
            const res = await fetch(`${SUPABASE_URL}/rest/v1/produtos`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(payload)
            });
            if(res.ok) {
                const inserted = await res.json();
                products.push(inserted[0]);
            } else throw new Error("Falha ao inserir");
        }
        renderTable();
        closeModal('productModal');
    } catch(err) {
        alert(err.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = 'Salvar Produto';
    }
});

window.editProduct = (id) => {
    editingId = id;
    const p = products.find(x => x.id === id);
    if(!p) return;
    
    document.getElementById('modalTitle').innerText = "Editar Produto";
    document.getElementById('pName').value = p.name;
    document.getElementById('pCategory').value = p.category;
    document.getElementById('pDesc').value = p.desc;
    document.getElementById('pPrice').value = p.price;
    document.getElementById('pStock').checked = p.stock !== false && p.stock !== 'false' && p.stock !== 0;
    
    document.getElementById('pImageURL').value = p.img;
    document.getElementById('imagePreview').src = p.img;
    document.getElementById('pImageFile').value = "";
    
    openModal('productModal');
};

window.deleteProduct = async (id) => {
    if(confirm("Tem certeza que deseja excluir este produto do Banco de Dados?")) {
        try {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/produtos?id=eq.${id}`, {
                method: 'DELETE',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            });
            
            if(res.ok) {
                products = products.filter(p => p.id !== id);
                renderTable();
            } else throw new Error("Erro ao deletar");
        } catch(e) {
            alert(e.message);
        }
    }
};
