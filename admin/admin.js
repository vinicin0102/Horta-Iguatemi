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

// --- MAPEAMENTO COMPLETO DE TODAS AS CONFIGURAÇÕES ---
const CONFIG_MAP = [
    // WhatsApp
    { chave: 'whatsapp', id: 'cfgWhatsapp', fallback: '5515999999999' },
    // Hero
    { chave: 'hero_tag', id: 'cfgHeroTag', fallback: 'Entrega Rápida em Sorocaba' },
    { chave: 'hero_title', id: 'cfgHeroTitle', fallback: 'Hortifruti Fresco Direto da <span>Horta</span> para Sua Casa' },
    { chave: 'hero_subtitle', id: 'cfgHeroSub', fallback: 'Verduras e legumes colhidos no mesmo dia, com mais sabor, qualidade e entrega rápida em Sorocaba e região.' },
    { chave: 'hero_img', id: 'cfgHeroImg', fallback: 'images/Unknown-3.jpeg' },
    { chave: 'badge_title', id: 'cfgBadgeTitle', fallback: 'Delivery Rápido' },
    { chave: 'badge_sub', id: 'cfgBadgeSub', fallback: 'Sorocaba e Região' },
    // Sobre
    { chave: 'about_tag', id: 'cfgAboutTag', fallback: 'Nossa História' },
    { chave: 'about_img', id: 'cfgAboutImg', fallback: 'images/Unknown-1.jpeg' },
    { chave: 'about_title', id: 'cfgAboutTitle', fallback: 'Tradição de mais de 20 anos em Sorocaba' },
    { chave: 'about_text', id: 'cfgAboutText', fallback: '' },
    // Benefícios
    { chave: 'ben_tag', id: 'cfgBenTag', fallback: 'Por que escolher a Horta Iguatemi?' },
    { chave: 'ben_title', id: 'cfgBenTitle', fallback: 'Benefícios de comprar direto do produtor' },
    { chave: 'ben1_title', id: 'cfgBen1Title', fallback: 'Colhidos no Mesmo Dia' },
    { chave: 'ben1_text', id: 'cfgBen1Text', fallback: 'Garantia de frescor absoluto com produtos colhidos no dia da entrega.' },
    { chave: 'ben2_title', id: 'cfgBen2Title', fallback: 'Fertilizantes Biológicos' },
    { chave: 'ben2_text', id: 'cfgBen2Text', fallback: 'Cultivo sustentável que respeita o meio ambiente e a sua saúde.' },
    { chave: 'ben3_title', id: 'cfgBen3Title', fallback: 'Sem Atravessadores' },
    { chave: 'ben3_text', id: 'cfgBen3Text', fallback: 'Direto da nossa horta para a sua casa, com preços justos e mais qualidade.' },
    { chave: 'ben4_title', id: 'cfgBen4Title', fallback: 'Entrega Rápida' },
    { chave: 'ben4_text', id: 'cfgBen4Text', fallback: 'Agilidade no delivery para Sorocaba e região, mantendo o frescor.' },
    // Como Funciona
    { chave: 'steps_tag', id: 'cfgStepsTag', fallback: 'Praticidade' },
    { chave: 'steps_title', id: 'cfgStepsTitle', fallback: 'Como Funciona' },
    { chave: 'step1_title', id: 'cfgStep1Title', fallback: 'Escolha seus produtos' },
    { chave: 'step1_text', id: 'cfgStep1Text', fallback: 'Confira nossa lista de verduras e legumes frescos.' },
    { chave: 'step2_title', id: 'cfgStep2Title', fallback: 'Faça o pedido' },
    { chave: 'step2_text', id: 'cfgStep2Text', fallback: 'Confira nossa lista e faça seu pedido diretamente pelo site.' },
    { chave: 'step3_title', id: 'cfgStep3Title', fallback: 'Colheita no dia' },
    { chave: 'step3_text', id: 'cfgStep3Text', fallback: 'A Horta Iguatemi colhe os produtos fresquinhos para você.' },
    { chave: 'step4_title', id: 'cfgStep4Title', fallback: 'Entregamos' },
    { chave: 'step4_text', id: 'cfgStep4Text', fallback: 'Receba na sua casa com todo conforto e praticidade.' },
    // Vitrine de Produtos
    { chave: 'prod_tag', id: 'cfgProdTag', fallback: 'Frescor Garantido' },
    { chave: 'prod_title', id: 'cfgProdTitle', fallback: 'Produtos Disponíveis' },
    { chave: 'vp1_tag', id: 'cfgVp1Tag', fallback: 'Mais Vendido' },
    { chave: 'vp1_name', id: 'cfgVp1Name', fallback: 'Couve' },
    { chave: 'vp1_img', id: 'cfgVp1Img', fallback: 'images/couve-4.jpeg' },
    { chave: 'vp1_desc', id: 'cfgVp1Desc', fallback: 'Folhas verdes e crocantes, ideais para refogados e sucos.' },
    { chave: 'vp2_name', id: 'cfgVp2Name', fallback: 'Beterraba' },
    { chave: 'vp2_img', id: 'cfgVp2Img', fallback: 'images/Unknown-2.jpeg' },
    { chave: 'vp2_desc', id: 'cfgVp2Desc', fallback: 'Fresquinha e cheia de nutrientes, cultivada com amor.' },
    { chave: 'vp3_name', id: 'cfgVp3Name', fallback: 'Hortelã' },
    { chave: 'vp3_img', id: 'cfgVp3Img', fallback: 'images/Unknown.jpeg' },
    { chave: 'vp3_desc', id: 'cfgVp3Desc', fallback: 'Aroma intenso e frescor inigualável para suas receitas.' },
    { chave: 'vp4_name', id: 'cfgVp4Name', fallback: 'Agrião' },
    { chave: 'vp4_img', id: 'cfgVp4Img', fallback: 'images/agriao.jpeg' },
    { chave: 'vp4_desc', id: 'cfgVp4Desc', fallback: 'Perfeito para saladas e refogados saudáveis.' },
    { chave: 'vp5_name', id: 'cfgVp5Name', fallback: 'Alface' },
    { chave: 'vp5_img', id: 'cfgVp5Img', fallback: 'images/alface.jpeg' },
    { chave: 'vp5_desc', id: 'cfgVp5Desc', fallback: 'Crespa, lisa e americana. Extremamente fresca.' },
    { chave: 'vp6_name', id: 'cfgVp6Name', fallback: 'Tomate' },
    { chave: 'vp6_img', id: 'cfgVp6Img', fallback: 'images/tomate.jpg' },
    { chave: 'vp6_desc', id: 'cfgVp6Desc', fallback: 'Vermelhinhos, suculentos e cheios de sabor.' },
    { chave: 'prod_extra', id: 'cfgProdExtra', fallback: 'E muito mais: Rúcula, Cebolinha, Salsinha, Pepino, Abobrinha e Legumes variados.' },
    // Delivery Banner
    { chave: 'delivery_title', id: 'cfgDeliveryTitle', fallback: 'Delivery Horta Iguatemi' },
    { chave: 'delivery_text', id: 'cfgDeliveryText', fallback: 'Agora você pode receber verduras e legumes frescos sem sair de casa. A Horta Iguatemi colhe no mesmo dia e entrega direto para você em Sorocaba e região.' },
    // Rodapé
    { chave: 'footer_text', id: 'cfgFooterText', fallback: 'Mais de 20 anos produzindo qualidade.<br>Produtos frescos direto da horta para sua mesa.' },
];

// Accordion toggle
window.toggleAccordion = function(header) {
    const section = header.parentElement;
    section.classList.toggle('open');
};

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
                return item ? item.valor : null;
            };
            
            CONFIG_MAP.forEach(cfg => {
                const el = document.getElementById(cfg.id);
                if (el) {
                    const val = getConfig(cfg.chave) || cfg.fallback;
                    el.value = val;
                    // Atualizar preview de imagem se existir
                    if (cfg.chave.includes('img') || cfg.chave.includes('vp')) {
                        let previewId = '';
                        if(cfg.chave === 'hero_img') previewId = 'previewHeroImg';
                        if(cfg.chave === 'about_img') previewId = 'previewAboutImg';
                        if(cfg.chave === 'vp1_img') previewId = 'previewVp1Img';
                        if(cfg.chave === 'vp2_img') previewId = 'previewVp2Img';
                        if(cfg.chave === 'vp3_img') previewId = 'previewVp3Img';
                        if(cfg.chave === 'vp4_img') previewId = 'previewVp4Img';
                        if(cfg.chave === 'vp5_img') previewId = 'previewVp5Img';
                        if(cfg.chave === 'vp6_img') previewId = 'previewVp6Img';
                        if(previewId) {
                            const preview = document.getElementById(previewId);
                            if(preview) {
                                let imgSrc = val;
                                // Ajustar caminhos relativos para funcionar dentro da pasta admin/
                                if (imgSrc && imgSrc.startsWith('images/')) {
                                    imgSrc = '../' + imgSrc;
                                }
                                preview.src = imgSrc;
                            }
                        }
                    }
                }
            });
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
    
    const payload = CONFIG_MAP.map(cfg => ({
        chave: cfg.chave,
        valor: document.getElementById(cfg.id).value
    }));
    
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
            alert("✅ Todas as configurações foram salvas com sucesso!");
        } else {
            throw new Error(`Erro: Você precisa criar a tabela 'configuracoes' primeiro!`);
        }
    } catch(err) {
        alert(err.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-save"></i> Salvar Todas as Alterações';
    }
});

// Função para tratar upload de imagem no editor do site
window.handleSiteImageUpload = async function(input, targetInputId, previewId) {
    const file = input.files[0];
    if (file) {
        try {
            const dataUrl = await uploadImage(file);
            document.getElementById(targetInputId).value = dataUrl;
            document.getElementById(previewId).src = dataUrl;
        } catch (e) {
            alert("Erro ao ler imagem: " + e.message);
        }
    }
};

window.updatePreview = function(previewId, val) {
    const preview = document.getElementById(previewId);
    if(preview) {
        let imgSrc = val;
        if (imgSrc && imgSrc.startsWith('images/')) {
            imgSrc = '../' + imgSrc;
        }
        preview.src = imgSrc || 'https://via.placeholder.com/120';
    }
}

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
