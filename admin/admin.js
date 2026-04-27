// --- ESTADO DA APLICAÇÃO ---
let products = [];
let editingId = null;

// Configuração do GitHub
let ghConfig = {
    user: localStorage.getItem('ghUser') || '',
    repo: localStorage.getItem('ghRepo') || '',
    token: localStorage.getItem('ghToken') || ''
};

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
        checkConfigAndLoad();
    } else {
        document.getElementById('loginError').innerText = 'Senha incorreta.';
    }
});
document.getElementById('logoutBtn').addEventListener('click', () => location.reload());

// --- CONFIGURAÇÃO GITHUB ---
document.getElementById('configMenuBtn').addEventListener('click', () => openModal('configModal'));
document.getElementById('closeConfigBtn').addEventListener('click', () => closeModal('configModal'));
document.getElementById('saveConfigBtn').addEventListener('click', () => {
    ghConfig.user = document.getElementById('ghUser').value.trim().replace(/\/+$/, '');
    ghConfig.repo = document.getElementById('ghRepo').value.trim().replace(/\/+$/, '');
    ghConfig.token = document.getElementById('ghToken').value.trim();
    
    localStorage.setItem('ghUser', ghConfig.user);
    localStorage.setItem('ghRepo', ghConfig.repo);
    localStorage.setItem('ghToken', ghConfig.token);
    
    closeModal('configModal');
    checkConfigAndLoad();
});

function checkConfigAndLoad() {
    if (!ghConfig.user || !ghConfig.repo || !ghConfig.token) {
        syncStatus.className = 'sync-status offline';
        syncStatus.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> GitHub não configurado (Modo Leitura)';
        // Tenta carregar localmente
        fetchProductsLocal();
        setTimeout(() => openModal('configModal'), 500);
    } else {
        syncStatus.className = 'sync-status syncing';
        syncStatus.innerHTML = '<i class="fa-solid fa-rotate"></i> Conectando...';
        document.getElementById('ghUser').value = ghConfig.user;
        document.getElementById('ghRepo').value = ghConfig.repo;
        document.getElementById('ghToken').value = ghConfig.token;
        fetchProductsGitHub();
    }
}

// --- API GITHUB ---
async function fetchProductsGitHub() {
    try {
        const url = `https://api.github.com/repos/${ghConfig.user}/${ghConfig.repo}/contents/data/produtos.json`;
        const res = await fetch(url, {
            headers: { 'Authorization': `token ${ghConfig.token}` }
        });
        
        if (res.ok) {
            const data = await res.json();
            // Conteúdo vem em Base64
            const content = decodeURIComponent(escape(atob(data.content)));
            products = JSON.parse(content);
            window.fileSha = data.sha; // Guarda o SHA para poder atualizar depois
            syncStatus.className = 'sync-status online';
            syncStatus.innerHTML = '<i class="fa-solid fa-check-circle"></i> Sincronizado';
            renderTable();
        } else {
            if (res.status === 401) {
                throw new Error('Token do GitHub inválido ou expirado. Verifique as configurações.');
            } else if (res.status === 404) {
                throw new Error('Repositório não encontrado ou arquivo produtos.json não existe no caminho data/.');
            } else {
                throw new Error(`Erro do GitHub: ${res.status} ${res.statusText}`);
            }
        }
    } catch (e) {
        console.error(e);
        syncStatus.className = 'sync-status offline';
        syncStatus.innerHTML = `<i class="fa-solid fa-xmark-circle"></i> Erro de Sincronização`;
        alert("Erro de Sincronização: " + e.message); // Exibe o erro exato na tela
        fetchProductsLocal(); // Fallback
    }
}

async function fetchProductsLocal() {
    try {
        const res = await fetch('../data/produtos.json');
        if (res.ok) {
            products = await res.json();
            renderTable();
        }
    } catch (e) {
        console.error("Erro local", e);
    }
}

async function publishToGitHub() {
    if (!ghConfig.token) return alert("Configure o GitHub primeiro!");
    
    syncStatus.className = 'sync-status syncing';
    syncStatus.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Publicando...';
    document.getElementById('saveChangesBtn').disabled = true;

    try {
        // Pega o SHA mais recente primeiro para evitar conflitos
        const getUrl = `https://api.github.com/repos/${ghConfig.user}/${ghConfig.repo}/contents/data/produtos.json`;
        const getRes = await fetch(getUrl, { headers: { 'Authorization': `token ${ghConfig.token}` } });
        if(getRes.ok) {
            const currentData = await getRes.json();
            window.fileSha = currentData.sha;
        }

        const contentStr = JSON.stringify(products, null, 4);
        const encodedContent = btoa(unescape(encodeURIComponent(contentStr)));

        const url = `https://api.github.com/repos/${ghConfig.user}/${ghConfig.repo}/contents/data/produtos.json`;
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${ghConfig.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: "Atualiza catálogo de produtos via Admin",
                content: encodedContent,
                sha: window.fileSha
            })
        });

        if (res.ok) {
            const data = await res.json();
            window.fileSha = data.content.sha;
            syncStatus.className = 'sync-status online';
            syncStatus.innerHTML = '<i class="fa-solid fa-check-circle"></i> Publicado com Sucesso!';
            setTimeout(() => {
                syncStatus.innerHTML = '<i class="fa-solid fa-check-circle"></i> Sincronizado';
            }, 3000);
        } else {
            throw new Error(await res.text());
        }
    } catch (e) {
        console.error(e);
        alert("Erro ao publicar: " + e.message);
        syncStatus.className = 'sync-status offline';
        syncStatus.innerHTML = '<i class="fa-solid fa-xmark-circle"></i> Erro ao publicar';
    } finally {
        document.getElementById('saveChangesBtn').disabled = false;
    }
}

async function uploadImageToGitHub(file) {
    if (!ghConfig.token) throw new Error("GitHub não configurado");
    
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64data = reader.result.split(',')[1];
            const fileName = `img_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
            
            try {
                const url = `https://api.github.com/repos/${ghConfig.user}/${ghConfig.repo}/contents/images/${fileName}`;
                const res = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${ghConfig.token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: "Upload de imagem via Admin",
                        content: base64data
                    })
                });
                
                if (res.ok) {
                    resolve(`../images/${fileName}`);
                } else {
                    reject("Erro ao fazer upload da imagem");
                }
            } catch(e) {
                reject(e);
            }
        };
        reader.readAsDataURL(file);
    });
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
                <span class="prod-desc">${p.desc}</span>
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

// Preview de imagem (URL)
document.getElementById('pImageURL').addEventListener('input', (e) => {
    if(e.target.value) {
        document.getElementById('imagePreview').src = e.target.value;
        document.getElementById('pImageFile').value = ""; // limpa file
    }
});

// Preview de imagem (File)
document.getElementById('pImageFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        document.getElementById('imagePreview').src = url;
        document.getElementById('pImageURL').value = ""; // limpa url
    }
});

// Salvar (Memória)
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

    // Faz upload se tiver arquivo
    if (fileInput.files.length > 0) {
        try {
            img = await uploadImageToGitHub(fileInput.files[0]);
        } catch(err) {
            alert(err);
            btn.disabled = false;
            btn.innerHTML = 'Salvar Produto';
            return;
        }
    } else if (!img && !editingId) {
        img = "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80"; // fallback
    }

    if (editingId) {
        // Atualiza
        const index = products.findIndex(p => p.id === editingId);
        products[index] = {
            ...products[index],
            name, category, desc, price, stock,
            img: img || products[index].img
        };
    } else {
        // Novo
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.unshift({
            id: newId, name, category, desc, price, stock, img
        });
    }

    renderTable();
    closeModal('productModal');
    btn.disabled = false;
    btn.innerHTML = 'Salvar Produto';
    
    // Alerta para lembrar de publicar
    syncStatus.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Alterações não publicadas';
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

window.deleteProduct = (id) => {
    if(confirm("Tem certeza que deseja excluir este produto?")) {
        products = products.filter(p => p.id !== id);
        renderTable();
        syncStatus.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Alterações não publicadas';
    }
};

// --- PUBLICAR ---
document.getElementById('saveChangesBtn').addEventListener('click', publishToGitHub);
