// Tailwind Theme Configuration
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            "colors": {
                "surface-bright": "#fff8f5",
                "background": "#fff8f5",
                "on-primary-fixed-variant": "#5f402a",
                "surface-container": "#ffeade",
                "inverse-on-surface": "#ffede4",
                "on-error-container": "#93000a",
                "surface-container-high": "#ffe3d2",
                "on-secondary-container": "#765f3d",
                "surface-container-low": "#fff1ea",
                "on-secondary-fixed": "#281801",
                "tertiary": "#463d29",
                "tertiary-fixed": "#f0e1c5",
                "inverse-surface": "#3f2c20",
                "surface-dim": "#f2d4c2",
                "surface-container-lowest": "#ffffff",
                "outline-variant": "#d4c3ba",
                "on-tertiary": "#ffffff",
                "on-background": "#28180d",
                "surface": "#fff8f5",
                "on-tertiary-fixed": "#221b0a",
                "error-container": "#ffdad6",
                "tertiary-container": "#5e543f",
                "on-tertiary-fixed-variant": "#4f4631",
                "on-secondary": "#ffffff",
                "on-primary": "#ffffff",
                "on-surface-variant": "#50453e",
                "primary-fixed": "#ffdcc6",
                "surface-tint": "#79573f",
                "outline": "#82746d",
                "secondary": "#725a39",
                "secondary-fixed-dim": "#e1c299",
                "primary": "#553722",
                "error": "#ba1a1a",
                "surface-variant": "#fbddca",
                "secondary-fixed": "#feddb3",
                "on-primary-container": "#eec1a4",
                "on-tertiary-container": "#d7c9ae",
                "inverse-primary": "#eabda0",
                "on-surface": "#28180d",
                "on-error": "#ffffff",
                "tertiary-fixed-dim": "#d3c5aa",
                "on-secondary-fixed-variant": "#584324",
                "secondary-container": "#fbdbb0",
                "primary-container": "#6f4e37",
                "surface-container-highest": "#fbddca",
                "on-primary-fixed": "#2d1604",
                "primary-fixed-dim": "#eabda0"
            },
            "borderRadius": {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            "spacing": {
                "lg": "32px",
                "sm": "12px",
                "xl": "48px",
                "gutter": "24px",
                "base": "8px",
                "margin-mobile": "16px",
                "xs": "4px",
                "md": "20px"
            },
            "fontFamily": {
                "headline-sm": ["Plus Jakarta Sans"],
                "headline-md": ["Plus Jakarta Sans"],
                "body-lg": ["Plus Jakarta Sans"],
                "label-sm": ["Plus Jakarta Sans"],
                "price-display": ["Plus Jakarta Sans"],
                "body-md": ["Plus Jakarta Sans"],
                "headline-lg": ["Plus Jakarta Sans"],
                "label-lg": ["Plus Jakarta Sans"]
            },
            "fontSize": {
                "headline-sm": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "700"}],
                "body-lg": ["18px", {"lineHeight": "26px", "fontWeight": "400"}],
                "label-sm": ["12px", {"lineHeight": "16px", "fontWeight": "500"}],
                "price-display": ["22px", {"lineHeight": "24px", "fontWeight": "700"}],
                "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                "headline-lg": ["32px", {"lineHeight": "40px", "fontWeight": "700"}],
                "label-lg": ["14px", {"lineHeight": "20px", "letterSpacing": "0.02em", "fontWeight": "600"}]
            }
        },
    },
};

// Main Single Page Application Initialization
document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // Tab Navigation Logic
    // ----------------------------------------------------
    const desktopTabButtons = document.querySelectorAll('#sidebar [data-tab]');
    const mobileTabButtons = document.querySelectorAll('#mobile-bottom-nav .mobile-nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    const switchTab = (tabId) => {
        tabContents.forEach(content => content.classList.add('hidden'));
        const activeContent = document.getElementById(`tab-${tabId}`);
        if (activeContent) activeContent.classList.remove('hidden');

        // Desktop sidebar active state
        desktopTabButtons.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabId) {
                btn.className = "flex items-center space-x-4 bg-surface-variant/20 dark:bg-primary-fixed-dim/20 text-on-primary dark:text-primary-fixed border-l-4 border-surface-variant rounded-r-xl py-3 px-6 transition-all duration-150 scale-95 cursor-pointer";
                const icon = btn.querySelector('.material-symbols-outlined');
                if (icon) icon.style.fontVariationSettings = "'FILL' 1";
            } else {
                btn.className = "flex items-center space-x-4 text-on-primary/70 dark:text-on-primary-container/70 hover:text-on-primary hover:bg-primary-container/10 dark:hover:bg-primary-fixed/10 py-3 px-6 transition-colors duration-150 rounded-lg cursor-pointer";
                const icon = btn.querySelector('.material-symbols-outlined');
                if (icon) icon.style.fontVariationSettings = "'FILL' 0";
            }
        });

        // Mobile bottom nav active state
        mobileTabButtons.forEach(btn => {
            const isActive = btn.getAttribute('data-tab') === tabId;
            btn.className = isActive ? 'mobile-nav-item active' : 'mobile-nav-item';
            const icon = btn.querySelector('.material-symbols-outlined');
            if (icon) icon.style.fontVariationSettings = isActive ? "'FILL' 1" : "'FILL' 0";
        });

        // Close sidebar drawer on mobile after tab switch
        closeSidebar();

        if (tabId === 'dashboard') runDashboardAnimations();
        if (tabId === 'penjualan') {
            if (typeof renderSalesTable === 'function') renderSalesTable();
        }
    };

    // Attach click events
    desktopTabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(btn.getAttribute('data-tab'));
        });
    });

    mobileTabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(btn.getAttribute('data-tab'));
        });
    });

    // ------------------------------------------------
    // Responsive: Sidebar Drawer (Mobile)
    // ------------------------------------------------
    const sidebar        = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    const openSidebar  = () => {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    };
    const closeSidebar = () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('visible');
        document.body.style.overflow = '';
    };

    // Hamburger buttons in each tab header
    document.getElementById('mobile-menu-toggle')?.addEventListener('click', openSidebar);
    document.querySelectorAll('.mobile-nav-hamburger').forEach(btn => {
        btn.addEventListener('click', openSidebar);
    });
    sidebarOverlay.addEventListener('click', closeSidebar);

    // ------------------------------------------------
    // Responsive: Cart Bottom Sheet (Mobile)
    // ------------------------------------------------
    const cartPanel   = document.getElementById('kasir-cart-panel');
    const cartFab     = document.getElementById('cart-fab-btn');
    const cartBadge   = document.getElementById('cart-fab-count');
    const cartBackdrop = document.getElementById('cart-backdrop');
    const dragHandle  = document.getElementById('kasir-cart-drag-handle');

    const openCartSheet  = () => {
        cartPanel.classList.add('open');
        cartBackdrop.classList.add('visible');
        document.body.style.overflow = 'hidden';
    };
    const closeCartSheet = () => {
        cartPanel.classList.remove('open');
        cartBackdrop.classList.remove('visible');
        document.body.style.overflow = '';
    };

    if (cartFab)    cartFab.addEventListener('click', openCartSheet);
    if (dragHandle) dragHandle.addEventListener('click', closeCartSheet);
    if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartSheet);
    // Close button in cart header (mobile)
    document.getElementById('cart-close-mobile-btn')?.addEventListener('click', closeCartSheet);



    const ctaNewTrx = document.getElementById('cta-new-trx');
    if (ctaNewTrx) {
        ctaNewTrx.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('kasir');
        });
    }

    const runDashboardAnimations = () => {
        const cards = document.querySelectorAll('#tab-dashboard .bg-surface-container-lowest');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    };
    runDashboardAnimations();

    // ----------------------------------------------------
    // Interactive Cart Logic (Kasir)
    // ----------------------------------------------------
    // Global Products Array (source of truth)
    let defaultProducts = [
        {
            id: 'corndog',
            name: 'Corndog',
            category: 'Jajanan',
            price: 10000,
            stock: 100,
            image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&auto=format&fit=crop&q=60'
        },
        {
            id: 'bakaran',
            name: 'Bakaran',
            category: 'Bakaran',
            price: 5000,
            stock: 150,
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60'
        },
        {
            id: 'dimsum',
            name: 'Dimsum',
            category: 'Jajanan',
            price: 15000,
            stock: 80,
            image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=60'
        }
    ];
    let products = JSON.parse(localStorage.getItem('kasir_products')) || defaultProducts;
    if (!localStorage.getItem('kasir_products')) {
        localStorage.setItem('kasir_products', JSON.stringify(products));
    }

    let cart = [];

    // Global Sales Transactions Array — starts empty
    let sales = JSON.parse(localStorage.getItem('kasir_sales')) || [];
    if (!localStorage.getItem('kasir_sales')) {
        localStorage.setItem('kasir_sales', JSON.stringify(sales));
    }

    // Set current date automatically
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayISO = `${yyyy}-${mm}-${dd}`;

    const getFormattedDate = () => {
        const monthNames = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        return `${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;
    };

    const dashboardDateEl = document.getElementById('dashboard-date');
    if (dashboardDateEl) dashboardDateEl.textContent = getFormattedDate();
    
    const kasirDateEl = document.getElementById('kasir-date');
    if (kasirDateEl) kasirDateEl.textContent = getFormattedDate();

    const pDateFilter = document.getElementById('penjualan-date-filter');
    if (pDateFilter) pDateFilter.value = todayISO;

    const cartItemsWrapper = document.getElementById('cart-items');
    const cartTotalLabel = document.getElementById('cart-total');
    const cashInput = document.getElementById('cart-cash-input');
    const changeDisplay = document.getElementById('cart-change-display');

    const formatCurrency = (val) => {
        return "Rp " + val.toLocaleString('id-ID');
    };

    const parseCurrency = (str) => {
        return parseInt(str.replace(/[^0-9]/g, '')) || 0;
    };

    const updateChange = () => {
        if (!cashInput || !changeDisplay || !cartTotalLabel) return;
        const total = parseCurrency(cartTotalLabel.textContent);
        const cash = parseCurrency(cashInput.value);
        const change = cash - total;
        
        if (change >= 0) {
            changeDisplay.textContent = formatCurrency(change);
        } else {
            changeDisplay.textContent = "Rp 0";
        }
    };

    if (cashInput) {
        cashInput.addEventListener('input', (e) => {
            let numericVal = parseCurrency(e.target.value);
            e.target.value = numericVal.toLocaleString('id-ID');
            updateChange();
        });
    }

    const renderCart = () => {
        if (!cartItemsWrapper) return;
        cartItemsWrapper.innerHTML = '';
        
        let total = 0;
        
        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = "flex items-center gap-3";
            cartItemDiv.innerHTML = `
                <div class="flex-1">
                    <h4 class="text-label-lg font-label-lg text-on-surface">${item.name}</h4>
                    <p class="text-label-sm text-on-surface-variant">${formatCurrency(item.price)} / pcs</p>
                </div>
                <div class="flex items-center gap-2 bg-surface-container rounded-full px-2 py-1">
                    <button class="qty-btn-minus w-8 h-8 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-soft" data-id="${item.id}">
                        <span class="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span class="text-label-lg font-label-lg w-4 text-center">${item.quantity}</span>
                    <button class="qty-btn-plus w-8 h-8 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-soft" data-id="${item.id}">
                        <span class="material-symbols-outlined text-sm">add</span>
                    </button>
                </div>
                <div class="flex items-center gap-2 min-w-[110px] justify-end">
                    <p class="text-label-lg font-label-lg text-primary text-right">${formatCurrency(subtotal)}</p>
                    <button class="cart-remove-item-btn text-error hover:bg-error-container/20 p-1.5 rounded-full transition-soft" data-id="${item.id}">
                        <span class="material-symbols-outlined text-sm">delete</span>
                    </button>
                </div>
            `;
            cartItemsWrapper.appendChild(cartItemDiv);
        });

        if (cartTotalLabel) {
            cartTotalLabel.textContent = formatCurrency(total);
        }

        // Reattach qty adjust events
        document.querySelectorAll('.qty-btn-minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                adjustQty(id, -1);
            });
        });

        document.querySelectorAll('.qty-btn-plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                adjustQty(id, 1);
            });
        });

        // Reattach cart remove events
        document.querySelectorAll('.cart-remove-item-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                removeFromCart(id);
            });
        });

        updateChange();

        // Update mobile FAB badge count
        const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
        const fabBadge = document.getElementById('cart-fab-count');
        if (fabBadge) fabBadge.textContent = totalItems;
        // Show/hide FAB on mobile based on cart items
        const fabBtn = document.getElementById('cart-fab-btn');
        if (fabBtn && window.innerWidth < 1024) {
            fabBtn.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    };


    const removeFromCart = (id) => {
        cart = cart.filter(x => x.id !== id);
        renderCart();
    };

    const adjustQty = (id, amount) => {
        const item = cart.find(x => x.id === id);
        if (item) {
            item.quantity += amount;
            if (item.quantity <= 0) {
                cart = cart.filter(x => x.id !== id);
            }
            renderCart();
        }
    };

    // Dynamic Product Cards Event Listeners are handled inside renderKasirGrid()

    // ---- Generic Confirm Modal Helper ----
    // Reuses #delete-confirm-modal with a custom message and callback
    let _confirmCallback = null;
    const showConfirmModal = (message, confirmLabel, onConfirm) => {
        // We need the deleteModal to be ready (it's defined later in script), so access by id
        const dModal = document.getElementById('delete-confirm-modal');
        if (!dModal) { if (onConfirm) onConfirm(); return; }
        document.getElementById('delete-confirm-text').textContent = message;
        const confirmBtn = document.getElementById('confirm-delete-modal-btn');
        confirmBtn.textContent = confirmLabel || 'Ya';
        _confirmCallback = onConfirm;
        dModal.classList.remove('opacity-0', 'pointer-events-none');
        dModal.querySelector('.transform').classList.remove('scale-95');
        dModal.querySelector('.transform').classList.add('scale-100');
    };

    // Clear Cart button
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if (cart.length === 0) return;
            showConfirmModal('Kosongkan semua item di keranjang? Tindakan ini tidak bisa dibatalkan.', 'Ya, Kosongkan', () => {
                cart = [];
                renderCart();
            });
        });
    }

    // Cancel transaction button
    const cancelBtn = document.getElementById('cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            showConfirmModal('Batalkan transaksi ini? Semua item di keranjang akan dihapus.', 'Ya, Batalkan', () => {
                cart = [];
                if (cashInput) cashInput.value = '0';
                renderCart();
            });
        });
    }


    // Checkout / Print receipt action
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Keranjang masih kosong!');
                return;
            }
            const cash = parseCurrency(cashInput.value);
            const total = parseCurrency(cartTotalLabel.textContent);
            if (cash < total) {
                alert('Uang diterima kurang dari total tagihan!');
                return;
            }

            // Record new sales transaction
            const newTrxId = "TRX" + Math.floor(10000 + Math.random() * 90000);
            const now = new Date();
            const timeStr = now.toTimeString().split(' ')[0].substring(0, 5); // "HH:MM"
            const dateStr = now.toISOString().split('T')[0]; // "YYYY-MM-DD"
            const menuNames = cart.map(item => item.name).join(', ');
            const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

            sales.unshift({
                id: newTrxId,
                date: dateStr,
                time: timeStr,
                menu: menuNames,
                qty: totalQty,
                total: total,
                method: "Tunai",
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    category: products.find(p => p.id === item.id)?.category || 'Jajanan'
                }))
            });

            localStorage.setItem('kasir_sales', JSON.stringify(sales));

            if (typeof renderSalesTable === 'function') {
                renderSalesTable();
            }

            // Decrease stock for each item in cart
            cart.forEach(cartItem => {
                const product = products.find(p => p.id === cartItem.id);
                if (product) {
                    product.stock = Math.max(0, product.stock - cartItem.quantity);
                }
            });

            localStorage.setItem('kasir_products', JSON.stringify(products));

            if (typeof renderMenuTable === 'function') {
                renderMenuTable();
            }
            if (typeof renderKasirGrid === 'function') {
                renderKasirGrid();
            }

            if (typeof updateDashboardStats === 'function') {
                updateDashboardStats();
            }
            if (typeof updateReportView === 'function') {
                const activeBtn = document.querySelector('.report-period-btn.bg-primary');
                const currentPeriod = activeBtn ? activeBtn.getAttribute('data-period') : 'bulan';
                updateReportView(currentPeriod);
            }

            // Show receipt modal
            const receiptModal = document.getElementById('receipt-modal');
            if (receiptModal) {
                document.getElementById('receipt-trx-id').textContent = newTrxId;
                document.getElementById('receipt-time').textContent = `${dateStr} ${timeStr}`;
                
                const receiptItemsBody = document.getElementById('receipt-items');
                receiptItemsBody.innerHTML = '';
                cart.forEach(item => {
                    const subtotal = item.price * item.quantity;
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td class="pb-1">${item.name}</td>
                        <td class="pb-1 text-right">${item.quantity}</td>
                        <td class="pb-1 text-right">${formatCurrency(item.price).replace('Rp ', '')}</td>
                        <td class="pb-1 text-right">${formatCurrency(subtotal).replace('Rp ', '')}</td>
                    `;
                    receiptItemsBody.appendChild(tr);
                });

                document.getElementById('receipt-total').textContent = formatCurrency(total);
                document.getElementById('receipt-cash').textContent = formatCurrency(cash);
                const change = cash - total;
                document.getElementById('receipt-change').textContent = formatCurrency(change);

                // Show modal
                receiptModal.classList.remove('opacity-0', 'pointer-events-none');
                receiptModal.querySelector('.transform').classList.remove('scale-95');
                receiptModal.querySelector('.transform').classList.add('scale-100');
            } else {
                // Fallback if modal is missing
                cart = [];
                if (cashInput) cashInput.value = '0';
                renderCart();
            }

            // Show global success toast alert
            const mainToast = document.getElementById('toast');
            if (mainToast) {
                mainToast.querySelector('p').textContent = 'Transaksi Berhasil!';
                mainToast.classList.remove('opacity-0', 'translate-y-[-20px]', 'pointer-events-none');
                mainToast.classList.add('opacity-100', 'translate-y-0');
                
                setTimeout(() => {
                    mainToast.classList.add('opacity-0', 'translate-y-[-20px]', 'pointer-events-none');
                    mainToast.classList.remove('opacity-100', 'translate-y-0');
                }, 3000);
            }
        });
    }

    // Receipt Modal Buttons
    const closeReceiptBtn = document.getElementById('close-receipt-btn');
    if (closeReceiptBtn) {
        closeReceiptBtn.addEventListener('click', () => {
            const receiptModal = document.getElementById('receipt-modal');
            receiptModal.classList.add('opacity-0', 'pointer-events-none');
            receiptModal.querySelector('.transform').classList.add('scale-95');
            receiptModal.querySelector('.transform').classList.remove('scale-100');

            // Reset cart
            cart = [];
            const cashInput = document.getElementById('kasir-cash');
            if (cashInput) cashInput.value = '0';
            renderCart();
            
            // Auto-close cart sheet on mobile after checkout
            if (window.innerWidth < 1024) {
                const cPanel = document.getElementById('kasir-cart-panel');
                const cBack  = document.getElementById('cart-backdrop');
                if (cPanel) cPanel.classList.remove('open');
                if (cBack)  cBack.classList.remove('visible');
                document.body.style.overflow = '';
            }
        });
    }

    const printReceiptBtn = document.getElementById('print-receipt-btn');
    if (printReceiptBtn) {
        printReceiptBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // Web Bluetooth ESC/POS Printing Logic
    const printBluetoothBtn = document.getElementById('print-bluetooth-btn');
    if (printBluetoothBtn) {
        printBluetoothBtn.addEventListener('click', async () => {
            if (!navigator.bluetooth) {
                alert('Web Bluetooth tidak didukung di browser ini. Gunakan Google Chrome versi terbaru.');
                return;
            }
            try {
                // Formatting receipt for 58mm (max 32 chars per line)
                const trxId = document.getElementById('receipt-trx-id').textContent || '';
                const time = document.getElementById('receipt-time').textContent || '';
                const total = document.getElementById('receipt-total').textContent || '0';
                const cash = document.getElementById('receipt-cash').textContent || '0';
                const change = document.getElementById('receipt-change').textContent || '0';

                let receiptText = 
                    "\x1B\x40" + // Initialize printer
                    "\x1B\x61\x01" + // Center align
                    "jajanan favorit\n" +
                    "Jl. Masjid Al Abror, desa gajah .\n" +
                    "Telp: 085219473217\n" +
                    "--------------------------------\n" +
                    "\x1B\x61\x00" + // Left align
                    `No: ${trxId}\n` +
                    `Waktu: ${time}\n` +
                    `Kasir: Admin\n` +
                    "--------------------------------\n";

                cart.forEach(item => {
                    const line1 = `${item.name}\n`;
                    const qtyPrice = `${item.quantity} x ${formatCurrency(item.price).replace('Rp ', '')}`;
                    const subtotal = formatCurrency(item.quantity * item.price).replace('Rp ', '');
                    const spaces = 32 - qtyPrice.length - subtotal.length;
                    const line2 = qtyPrice + " ".repeat(Math.max(0, spaces)) + subtotal + "\n";
                    receiptText += line1 + line2;
                });

                receiptText += "--------------------------------\n";
                
                const totalStr = total.replace('Rp ', '');
                const cashStr = cash.replace('Rp ', '');
                const changeStr = change.replace('Rp ', '');
                
                const formatLine = (label, value) => {
                    const spaces = 32 - label.length - value.length;
                    return label + " ".repeat(Math.max(0, spaces)) + value + "\n";
                };

                receiptText += formatLine("Total", totalStr);
                receiptText += formatLine("Tunai", cashStr);
                receiptText += formatLine("Kembali", changeStr);
                
                receiptText += "\n\x1B\x61\x01" + // Center align
                               "Terima Kasih Atas Kunjungan Anda\n" +
                               "=== Lunas ===\n\n\n\n";

                const encoder = new TextEncoder();
                const data = encoder.encode(receiptText);

                // Bluetooth Connection
                const device = await navigator.bluetooth.requestDevice({
                    acceptAllDevices: true,
                    optionalServices: [
                        '000018f0-0000-1000-8000-00805f9b34fb', // Standard SPP equivalent
                        'e7810a71-73ae-499d-8c15-faa9aef0c3f2', // Generic Printer
                        '49535343-fe7d-4ae5-8fa9-9fafd205e455', // ISSC
                        '0000fee7-0000-1000-8000-00805f9b34fb'
                    ]
                });

                const server = await device.gatt.connect();
                let characteristic = null;

                // Attempt to find a writable characteristic
                const services = await server.getPrimaryServices();
                for (const service of services) {
                    const characteristics = await service.getCharacteristics();
                    for (const char of characteristics) {
                        if (char.properties.write || char.properties.writeWithoutResponse) {
                            characteristic = char;
                            break;
                        }
                    }
                    if (characteristic) break;
                }

                if (!characteristic) {
                    throw new Error('Printer tidak terdeteksi sebagai perangkat ESC/POS yang bisa ditulisi.');
                }

                // Helper: delay between chunks so printer buffer doesn't overflow
                const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

                // Send data in small chunks of 100 bytes with 50ms delay between each
                // (Large chunks cause buffer overflow on thermal printers via BLE)
                const CHUNK_SIZE = 100;
                for (let i = 0; i < data.length; i += CHUNK_SIZE) {
                    const chunk = data.slice(i, i + CHUNK_SIZE);
                    if (characteristic.properties.writeWithoutResponse) {
                        await characteristic.writeValueWithoutResponse(chunk);
                    } else {
                        await characteristic.writeValue(chunk);
                    }
                    await sleep(50); // 50ms delay between chunks
                }

                // Extra feed lines + paper cut command (ESC/POS)
                // \x1B\x64\x05 = Feed 5 lines, \x1D\x56\x42\x00 = Full cut
                const cutCmd = new Uint8Array([0x1B, 0x64, 0x05, 0x1D, 0x56, 0x42, 0x00]);
                await sleep(200);
                if (characteristic.properties.writeWithoutResponse) {
                    await characteristic.writeValueWithoutResponse(cutCmd);
                } else {
                    await characteristic.writeValue(cutCmd);
                }

                alert('Struk berhasil dicetak!');

            } catch (error) {
                console.error(error);
                // Don't alert if user just cancelled the pairing dialog
                if (error.name !== 'NotFoundError') {
                    alert('Gagal mencetak: ' + error.message);
                }
            }
        });
    }



    // Initialize cart render

    renderCart();

    // ----------------------------------------------------
    // Dynamic Render & Filter Logic (Kasir & Menu)
    // ----------------------------------------------------
    let activeKasirCategory = 'Semua';
    let activeMenuCategory = 'Semua';
    const kasirSearch = document.getElementById('kasir-search');
    const menuSearch = document.getElementById('menu-search');

    // Render Kasir cards dynamically
    const renderKasirGrid = () => {
        const grid = document.getElementById('kasir-products-grid');
        if (!grid) return;
        grid.innerHTML = '';

        const searchQuery = kasirSearch ? kasirSearch.value.toLowerCase() : '';

        const filteredProducts = products.filter(p => {
            const matchesCategory = activeKasirCategory === 'Semua' || p.category.toLowerCase() === activeKasirCategory.toLowerCase();
            const matchesSearch = p.name.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });

        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = "bg-white p-4 rounded-2xl border border-outline-variant/30 flex flex-col group transition-soft hover:shadow-md cursor-pointer menu-card";
            card.setAttribute('data-id', product.id);

            card.innerHTML = `
                <div class="w-full h-40 rounded-xl overflow-hidden bg-surface-container-low mb-3">
                    <img class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src="${product.image}" alt="${product.name}"/>
                </div>
                <h3 class="text-body-md font-semibold text-on-surface mt-1 truncate">${product.name}</h3>
                <p class="text-headline-sm font-bold text-primary mt-1 text-price-display">${formatCurrency(product.price)}</p>
                <button class="w-full mt-3 py-2 bg-surface-variant/30 hover:bg-primary text-primary hover:text-white rounded-xl transition-soft flex items-center justify-center gap-1 font-label-lg select-none">
                    <span class="material-symbols-outlined text-[18px]">add</span>
                    Tambah
                </button>
            `;

            const handleAdd = (e) => {
                e.stopPropagation();
                card.classList.add('ring-2', 'ring-primary');
                setTimeout(() => card.classList.remove('ring-2', 'ring-primary'), 300);

                const existingItem = cart.find(x => x.id === product.id);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
                }
                renderCart();
            };

            card.addEventListener('click', handleAdd);
            const addBtn = card.querySelector('button');
            if (addBtn) addBtn.addEventListener('click', handleAdd);

            grid.appendChild(card);
        });
    };

    // Update Stats counters on Menu page
    const updateStatsCount = () => {
        const statsEl = document.querySelectorAll('#tab-menu .text-headline-sm');
        if (statsEl.length >= 3) {
            statsEl[0].textContent = `${products.length} Item`;
            const lowStockCount = products.filter(p => p.stock <= 20).length;
            statsEl[1].textContent = `${lowStockCount} Item`;
            const uniqueCategories = new Set(products.map(p => p.category)).size;
            statsEl[2].textContent = `${uniqueCategories} Grup`;
        }
    };

    // Render Menu Table dynamically
    const renderMenuTable = () => {
        const tableBody = document.getElementById('menu-table-body');
        if (!tableBody) return;
        tableBody.innerHTML = '';

        const searchQuery = menuSearch ? menuSearch.value.toLowerCase() : '';

        const filteredProducts = products.filter(p => {
            const matchesCategory = activeMenuCategory === 'Semua' || p.category.toLowerCase() === activeMenuCategory.toLowerCase();
            const matchesSearch = p.name.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });

        filteredProducts.forEach(product => {
            const statusBadge = product.stock <= 20 
                ? `<span class="px-3 py-1 bg-secondary-container text-on-secondary-fixed-variant rounded-full text-label-sm font-bold flex items-center w-fit gap-1">
                       <span class="material-symbols-outlined text-[14px]">warning</span> Hampir Habis
                   </span>`
                : `<span class="px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-label-sm font-bold flex items-center w-fit gap-1">
                       <span class="w-1.5 h-1.5 rounded-full bg-[#2E7D32]"></span> Aman
                   </span>`;

            const row = document.createElement('tr');
            row.className = 'hover:bg-surface-bright/50 transition-colors';
            row.innerHTML = `
                <td class="px-6 py-4">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-lg bg-surface-container-high overflow-hidden border border-outline-variant flex items-center justify-center">
                            <img class="w-full h-full object-cover" src="${product.image}" alt="${product.name}"/>
                        </div>
                        <span class="font-label-lg text-on-surface font-semibold">${product.name}</span>
                    </div>
                </td>
                <td class="px-6 py-4 text-body-md text-on-surface-variant">${product.category}</td>
                <td class="px-6 py-4 font-headline-sm text-primary text-price-display">${formatCurrency(product.price)}</td>
                <td class="px-6 py-4 text-body-md font-medium">${product.stock} <span class="text-label-sm text-outline">pcs</span></td>
                <td class="px-6 py-4">${statusBadge}</td>
                <td class="px-6 py-4">
                    <div class="flex justify-center gap-2">
                        <button class="edit-menu-btn w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-secondary-container transition-colors" data-id="${product.id}">
                            <span class="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button class="delete-menu-btn w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant text-error hover:bg-error-container/20 transition-colors" data-id="${product.id}">
                            <span class="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                    </div>
                </td>
            `;

            row.addEventListener('mouseover', () => {
                row.classList.add('scale-[1.002]', 'shadow-sm');
            });
            row.addEventListener('mouseout', () => {
                row.classList.remove('scale-[1.002]', 'shadow-sm');
            });

            row.querySelector('.edit-menu-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                editMenuItem(product.id);
            });

            row.querySelector('.delete-menu-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                deleteMenuItem(product.id);
            });

            tableBody.appendChild(row);
        });

        updateStatsCount();
    };

    // ---- Custom Modal Helpers (Edit & Delete) ----
    const editModal = document.getElementById('edit-menu-modal');
    const deleteModal = document.getElementById('delete-confirm-modal');
    let _pendingDeleteId = null;
    let _pendingEditId = null;

    const openEditModal = () => {
        editModal.classList.remove('opacity-0', 'pointer-events-none');
        editModal.querySelector('.transform').classList.remove('scale-95');
        editModal.querySelector('.transform').classList.add('scale-100');
    };
    const closeEditModal = () => {
        editModal.classList.add('opacity-0', 'pointer-events-none');
        editModal.querySelector('.transform').classList.add('scale-95');
        editModal.querySelector('.transform').classList.remove('scale-100');
        _pendingEditId = null;
    };
    const openDeleteModal = () => {
        deleteModal.classList.remove('opacity-0', 'pointer-events-none');
        deleteModal.querySelector('.transform').classList.remove('scale-95');
        deleteModal.querySelector('.transform').classList.add('scale-100');
    };
    const closeDeleteModal = () => {
        deleteModal.classList.add('opacity-0', 'pointer-events-none');
        deleteModal.querySelector('.transform').classList.add('scale-95');
        deleteModal.querySelector('.transform').classList.remove('scale-100');
        _pendingDeleteId = null;
    };

    // Wire up Edit modal buttons
    document.getElementById('close-edit-modal-btn').addEventListener('click', closeEditModal);
    document.getElementById('cancel-edit-modal-btn').addEventListener('click', closeEditModal);
    editModal.addEventListener('click', (e) => { if (e.target === editModal) closeEditModal(); });

    document.getElementById('save-edit-modal-btn').addEventListener('click', () => {
        if (!_pendingEditId) return;
        const product = products.find(p => p.id === _pendingEditId);
        if (!product) return;

        const newName = document.getElementById('edit-menu-name').value.trim();
        const newCategory = document.getElementById('edit-menu-category').value;
        const newPrice = parseInt(document.getElementById('edit-menu-price').value) || 0;
        const newStock = parseInt(document.getElementById('edit-menu-stock').value) || 0;

        if (!newName) { alert('Nama menu tidak boleh kosong!'); return; }

        product.name = newName;
        product.category = newCategory;
        product.price = newPrice;
        product.stock = newStock;

        localStorage.setItem('kasir_products', JSON.stringify(products));

        const cartItem = cart.find(c => c.id === _pendingEditId);
        if (cartItem) {
            cartItem.name = newName;
            cartItem.price = newPrice;
        }

        closeEditModal();

        // Success toast
        const toast = document.getElementById('toast');
        if (toast) {
            toast.querySelector('p').textContent = `"${newName}" berhasil diperbarui!`;
            toast.classList.remove('opacity-0', 'translate-y-[-20px]', 'pointer-events-none');
            toast.classList.add('opacity-100', 'translate-y-0');
            setTimeout(() => {
                toast.classList.add('opacity-0', 'translate-y-[-20px]', 'pointer-events-none');
                toast.classList.remove('opacity-100', 'translate-y-0');
            }, 3000);
        }

        renderCart();
        renderMenuTable();
        renderKasirGrid();
    });

    // Wire up Delete modal buttons
    document.getElementById('cancel-delete-modal-btn').addEventListener('click', closeDeleteModal);
    deleteModal.addEventListener('click', (e) => { if (e.target === deleteModal) closeDeleteModal(); });

    document.getElementById('confirm-delete-modal-btn').addEventListener('click', () => {
        // Case 1: Generic callback (e.g. Clear Cart, Cancel Transaction)
        if (_confirmCallback) {
            const cb = _confirmCallback;
            _confirmCallback = null;
            // Reset button label
            document.getElementById('confirm-delete-modal-btn').textContent = 'Ya, Hapus';
            closeDeleteModal();
            cb();
            return;
        }

        // Case 2: Delete menu item
        if (!_pendingDeleteId) return;
        const itemName = products.find(p => p.id === _pendingDeleteId)?.name || '';
        products = products.filter(p => p.id !== _pendingDeleteId);
        cart = cart.filter(c => c.id !== _pendingDeleteId);
        closeDeleteModal();

        localStorage.setItem('kasir_products', JSON.stringify(products));

        // Success toast
        const toast = document.getElementById('toast');
        if (toast) {
            toast.querySelector('p').textContent = `"${itemName}" berhasil dihapus dari menu.`;
            toast.classList.remove('opacity-0', 'translate-y-[-20px]', 'pointer-events-none');
            toast.classList.add('opacity-100', 'translate-y-0');
            setTimeout(() => {
                toast.classList.add('opacity-0', 'translate-y-[-20px]', 'pointer-events-none');
                toast.classList.remove('opacity-100', 'translate-y-0');
            }, 3000);
        }

        renderCart();
        renderMenuTable();
        renderKasirGrid();
    });


    const deleteMenuItem = (id) => {
        const item = products.find(p => p.id === id);
        if (!item) return;
        _pendingDeleteId = id;
        document.getElementById('delete-confirm-text').textContent =
            `Apakah Anda yakin ingin menghapus "${item.name}" dari daftar menu? Tindakan ini tidak bisa dibatalkan.`;
        openDeleteModal();
    };

    const editMenuItem = (id) => {
        const product = products.find(p => p.id === id);
        if (!product) return;
        _pendingEditId = id;

        document.getElementById('edit-menu-name').value = product.name;
        document.getElementById('edit-menu-category').value = product.category;
        document.getElementById('edit-menu-price').value = product.price;
        document.getElementById('edit-menu-stock').value = product.stock;

        openEditModal();
    };


    // Category button events for Kasir
    const updateKasirCategoryButtons = () => {
        const categoryButtons = document.querySelectorAll('#tab-kasir button[data-category]');
        categoryButtons.forEach(btn => {
            const cat = btn.getAttribute('data-category');
            if (cat === activeKasirCategory) {
                btn.className = "px-6 py-2 bg-primary text-on-primary rounded-full text-label-lg transition-soft";
            } else {
                btn.className = "px-6 py-2 bg-white border border-outline-variant text-primary hover:bg-surface-container transition-soft rounded-full text-label-lg";
            }
        });
    };

    const categoryButtons = document.querySelectorAll('#tab-kasir button[data-category]');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            activeKasirCategory = btn.getAttribute('data-category');
            updateKasirCategoryButtons();
            renderKasirGrid();
        });
    });

    if (kasirSearch) {
        kasirSearch.addEventListener('input', () => {
            renderKasirGrid();
        });
    }

    // Category button events for Menu
    const updateMenuCategoryButtons = () => {
        const menuCategoryButtons = document.querySelectorAll('#tab-menu button[data-menu-category]');
        menuCategoryButtons.forEach(btn => {
            const cat = btn.getAttribute('data-menu-category');
            if (cat === activeMenuCategory) {
                btn.className = "px-5 py-2 rounded-full bg-primary text-on-primary font-label-lg whitespace-nowrap";
            } else {
                btn.className = "px-5 py-2 rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors font-label-lg whitespace-nowrap";
            }
        });
    };

    const menuCategoryButtons = document.querySelectorAll('#tab-menu button[data-menu-category]');
    menuCategoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            activeMenuCategory = btn.getAttribute('data-menu-category');
            updateMenuCategoryButtons();
            renderMenuTable();
        });
    });

    if (menuSearch) {
        menuSearch.addEventListener('input', () => {
            renderMenuTable();
        });
    }

    // Add Menu Modal & Form Logic
    const openModalBtn = document.getElementById('open-add-menu-modal-btn');
    const modal = document.getElementById('add-menu-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const cancelModalBtn = document.getElementById('cancel-modal-btn');
    const form = document.getElementById('add-menu-form');
    const fileInput = document.getElementById('modal-menu-image');
    const imagePreview = document.getElementById('image-preview');
    const uploadPlaceholder = document.getElementById('upload-placeholder');
    const removeImageBtn = document.getElementById('remove-image-btn');

    let uploadedImageUrl = "";

    const openModal = () => {
        if (!modal) return;
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.querySelector('.transform').classList.remove('scale-95');
        modal.querySelector('.transform').classList.add('scale-100');
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.querySelector('.transform').classList.add('scale-95');
        modal.querySelector('.transform').classList.remove('scale-100');
        
        // Reset Form
        form.reset();
        resetImageUpload();
    };

    const resetImageUpload = () => {
        fileInput.value = "";
        imagePreview.src = "";
        imagePreview.classList.add('hidden');
        uploadPlaceholder.classList.remove('hidden');
        removeImageBtn.classList.add('hidden');
        uploadedImageUrl = "";
    };

    if (openModalBtn) openModalBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeModal);

    // Close modal on click outside content
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Image Upload Change Listener
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                uploadedImageUrl = URL.createObjectURL(file);
                imagePreview.src = uploadedImageUrl;
                imagePreview.classList.remove('hidden');
                uploadPlaceholder.classList.add('hidden');
                removeImageBtn.classList.remove('hidden');
            }
        });
    }

    // Remove Image button click
    if (removeImageBtn) {
        removeImageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            resetImageUpload();
        });
    }

    // Form Submission for Add Menu Modal
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('modal-menu-name').value;
            const category = document.getElementById('modal-menu-category').value;
            const stock = parseInt(document.getElementById('modal-menu-stock').value) || 0;
            const price = parseInt(document.getElementById('modal-menu-price').value) || 0;
            
            const imgSrc = uploadedImageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
            
            const newId = name.toLowerCase().replace(/\s+/g, '-');
            
            const newProduct = {
                id: newId,
                name: name,
                category: category,
                price: price,
                stock: stock,
                image: imgSrc
            };

            products.push(newProduct);
            localStorage.setItem('kasir_products', JSON.stringify(products));
            
            renderMenuTable();
            renderKasirGrid();
            closeModal();

            // Success Toast notification
            const mainToast = document.getElementById('toast');
            if (mainToast) {
                mainToast.querySelector('p').textContent = 'Menu Baru Berhasil Ditambahkan!';
                mainToast.classList.remove('opacity-0', 'translate-y-[-20px]', 'pointer-events-none');
                mainToast.classList.add('opacity-100', 'translate-y-0');
                
                setTimeout(() => {
                    mainToast.classList.add('opacity-0', 'translate-y-[-20px]', 'pointer-events-none');
                    mainToast.classList.remove('opacity-100', 'translate-y-0');
                }, 3000);
            }
        });
    }

    // ----------------------------------------------------
    // Penjualan Page Actions & Toast Export
    // ----------------------------------------------------
    const penjualanSearch = document.getElementById('penjualan-search');
    const penjualanMethodFilter = document.getElementById('penjualan-method-filter');
    const penjualanDateFilter = document.getElementById('penjualan-date-filter');
    const salesTableBody = document.getElementById('penjualan-table-body');
    const salesTotalRevenue = document.getElementById('sales-total-revenue');
    const salesTotalTransactions = document.getElementById('sales-total-transactions');
    const salesAvgPurchase = document.getElementById('sales-avg-purchase');

    const renderSalesTable = () => {
        if (!salesTableBody) return;
        salesTableBody.innerHTML = '';

        const selectedDate = penjualanDateFilter ? penjualanDateFilter.value : '';
        const selectedMethod = penjualanMethodFilter ? penjualanMethodFilter.value : 'Semua Transaksi';
        const searchQuery = penjualanSearch ? penjualanSearch.value.toLowerCase() : '';

        // Filter sales by date, method and search query
        const filteredSales = sales.filter(item => {
            const matchesDate = !selectedDate || item.date === selectedDate;
            const matchesMethod = selectedMethod === 'Semua Transaksi' || item.method.toLowerCase() === selectedMethod.toLowerCase();
            
            const itemText = `${item.id} ${item.menu} ${item.method}`.toLowerCase();
            const matchesSearch = !searchQuery || itemText.includes(searchQuery);

            return matchesDate && matchesMethod && matchesSearch;
        });

        // Populate Table
        filteredSales.forEach((item, index) => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-surface-bright transition-colors group cursor-pointer';
            
            const methodBadge = item.method === 'QRIS' 
                ? `<span class="px-3 py-1 bg-secondary-container/50 text-on-secondary-container text-label-sm font-label-sm rounded-full">QRIS</span>`
                : `<span class="px-3 py-1 bg-surface-variant/50 text-primary text-label-sm font-label-sm rounded-full">Tunai</span>`;

            row.innerHTML = `
                <td class="px-6 py-4 text-body-md font-body-md">${index + 1}</td>
                <td class="px-6 py-4 text-body-md font-body-md">${item.time}</td>
                <td class="px-6 py-4 text-label-lg font-label-lg font-mono text-primary">${item.id}</td>
                <td class="px-6 py-4 text-body-md font-body-md font-semibold">${item.menu}</td>
                <td class="px-6 py-4 text-body-md font-body-md">${item.qty}</td>
                <td class="px-6 py-4 text-body-md font-body-md font-bold text-right">${item.total.toLocaleString('id-ID')}</td>
                <td class="px-6 py-4 text-center">${methodBadge}</td>
            `;

            row.addEventListener('click', () => {
                row.classList.toggle('bg-surface-container-low');
            });

            salesTableBody.appendChild(row);
        });

        // Calculate and Update Summary Cards
        let totalRev = 0;
        let trxCount = filteredSales.length;

        filteredSales.forEach(item => {
            totalRev += item.total;
        });

        const avgPurchase = trxCount > 0 ? Math.round(totalRev / trxCount) : 0;

        if (salesTotalRevenue) salesTotalRevenue.textContent = `Rp ${totalRev.toLocaleString('id-ID')}`;
        if (salesTotalTransactions) salesTotalTransactions.textContent = `${trxCount} Transaksi`;
        if (salesAvgPurchase) salesAvgPurchase.textContent = `Rp ${avgPurchase.toLocaleString('id-ID')}`;
    };

    if (penjualanSearch) {
        penjualanSearch.addEventListener('input', renderSalesTable);
    }
    if (penjualanMethodFilter) {
        penjualanMethodFilter.addEventListener('change', renderSalesTable);
    }
    if (penjualanDateFilter) {
        penjualanDateFilter.addEventListener('change', renderSalesTable);
    }

    const exportBtn = document.getElementById('export-sales-btn');
    const toast = document.getElementById('toast');
    if (exportBtn && toast) {
        exportBtn.addEventListener('click', () => {
            // Toast dynamic message update for Export Action
            toast.querySelector('p').textContent = 'Data berhasil diekspor sebagai PDF';
            toast.classList.remove('opacity-0', 'translate-y-[-20px]', 'pointer-events-none');
            toast.classList.add('opacity-100', 'translate-y-0');
            
            setTimeout(() => {
                toast.classList.add('opacity-0', 'translate-y-[-20px]', 'pointer-events-none');
                toast.classList.remove('opacity-100', 'translate-y-0');
            }, 3000);
        });
    }

    document.querySelectorAll('#tab-penjualan tbody tr').forEach(row => {
        row.addEventListener('click', () => {
            row.classList.toggle('bg-surface-container-low');
        });
    });

    // ----------------------------------------------------
    // Dashboard Stats Dynamic Calculations & Render
    // ----------------------------------------------------
    const updateDashboardStats = () => {
        const salesToday = sales.filter(item => item.date === todayISO);
        
        let totalSales = 0;
        let totalTrx = salesToday.length;
        
        salesToday.forEach(item => {
            totalSales += item.total;
        });
        
        let totalProfit = Math.round(totalSales * 0.5);

        const totalSalesEl = document.getElementById('dashboard-total-sales');
        const totalTrxEl = document.getElementById('dashboard-total-trx');
        const totalProfitEl = document.getElementById('dashboard-total-profit');
        
        if (totalSalesEl) totalSalesEl.textContent = formatCurrency(totalSales);
        if (totalTrxEl) totalTrxEl.textContent = totalTrx.toLocaleString('id-ID');
        if (totalProfitEl) totalProfitEl.textContent = formatCurrency(totalProfit);

        const bestSellersContainer = document.getElementById('dashboard-best-sellers');
        if (bestSellersContainer) {
            const itemCounts = {};
            salesToday.forEach(trx => {
                if (trx.items) {
                    trx.items.forEach(item => {
                        if (!itemCounts[item.name]) {
                            itemCounts[item.name] = { qty: 0, image: '' };
                        }
                        itemCounts[item.name].qty += item.quantity;
                        const prod = products.find(p => p.name === item.name);
                        itemCounts[item.name].image = prod ? prod.image : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
                    });
                } else {
                    const names = trx.menu.split(', ');
                    names.forEach(name => {
                        if (name) {
                            if (!itemCounts[name]) {
                                itemCounts[name] = { qty: 0, image: '' };
                            }
                            itemCounts[name].qty += Math.ceil(trx.qty / names.length);
                            const prod = products.find(p => p.name === name);
                            itemCounts[name].image = prod ? prod.image : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
                        }
                    });
                }
            });

            const sortedItems = Object.keys(itemCounts).map(name => ({
                name: name,
                qty: itemCounts[name].qty,
                image: itemCounts[name].image
            })).sort((a, b) => b.qty - a.qty).slice(0, 3);

            if (sortedItems.length === 0) {
                bestSellersContainer.innerHTML = `<div class="text-center py-8 text-on-surface-variant font-medium">Belum ada penjualan terlaris hari ini</div>`;
            } else {
                bestSellersContainer.innerHTML = '';
                sortedItems.forEach((item, index) => {
                    const rowDiv = document.createElement('div');
                    rowDiv.className = "flex items-center justify-between p-sm bg-surface-bright rounded-lg border border-outline-variant/30";
                    rowDiv.innerHTML = `
                        <div class="flex items-center space-x-4">
                            <span class="text-label-lg font-bold text-primary w-6">${index + 1}.</span>
                            <div class="w-10 h-10 rounded-lg overflow-hidden">
                                <img class="w-full h-full object-cover" src="${item.image}" alt="${item.name}"/>
                            </div>
                            <span class="text-body-md font-body-md font-semibold">${item.name}</span>
                        </div>
                        <span class="text-label-lg bg-primary-fixed px-3 py-1 rounded-full text-on-primary-fixed-variant">${item.qty} pcs</span>
                    `;
                    bestSellersContainer.appendChild(rowDiv);
                });
            }
        }

        const chartLine = document.getElementById('dashboard-chart-line');
        const chartArea = document.getElementById('dashboard-chart-area');
        if (chartLine && chartArea) {
            const hours = [8, 10, 12, 14, 16, 18];
            const hourlySales = [0, 0, 0, 0, 0, 0];

            salesToday.forEach(trx => {
                const hour = parseInt(trx.time.split(':')[0]) || 0;
                if (hour < 10) hourlySales[0] += trx.total;
                else if (hour < 12) hourlySales[1] += trx.total;
                else if (hour < 14) hourlySales[2] += trx.total;
                else if (hour < 16) hourlySales[3] += trx.total;
                else if (hour < 18) hourlySales[4] += trx.total;
                else hourlySales[5] += trx.total;
            });

            const maxSale = Math.max(...hourlySales);
            const xCoords = [0, 20, 40, 60, 80, 100];
            let points = [];
            
            hourlySales.forEach((sale, i) => {
                const x = xCoords[i];
                const y = maxSale > 0 ? 100 - (sale / maxSale) * 80 : 100;
                points.push(`${x} ${y}`);
            });

            const lineD = `M ` + points.join(' L ');
            const areaD = `M ` + points.join(' L ') + ` L 100 100 L 0 100 Z`;
            
            chartLine.setAttribute('d', lineD);
            chartArea.setAttribute('d', areaD);
        }
    };

    // ----------------------------------------------------
    // Laporan Page Interactivity & Live Calculations
    // ----------------------------------------------------
    const reportPeriodBtns = document.querySelectorAll('.report-period-btn');
    const reportMonthSelect = document.getElementById('report-month-select');
    const exportReportBtn = document.getElementById('export-report-btn');

    const updateReportView = (period) => {
        reportPeriodBtns.forEach(btn => {
            if (btn.getAttribute('data-period') === period) {
                btn.className = "report-period-btn px-5 py-2 rounded-xl text-label-lg font-medium transition-colors bg-primary text-on-primary";
            } else {
                btn.className = "report-period-btn px-5 py-2 rounded-xl text-label-lg font-medium transition-colors border border-outline-variant hover:bg-surface-container-high";
            }
        });

        let filteredSales = [];
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        if (period === 'hari') {
            filteredSales = sales.filter(s => s.date === todayISO);
        } else if (period === 'minggu') {
            const oneWeekAgo = new Date(startOfToday.getTime() - 7 * 24 * 60 * 60 * 1000);
            filteredSales = sales.filter(s => {
                const sDate = new Date(s.date);
                return sDate >= oneWeekAgo;
            });
        } else {
            const currentMonthPrefix = todayISO.substring(0, 7);
            filteredSales = sales.filter(s => s.date.substring(0, 7) === currentMonthPrefix);
        }

        let totalOmset = 0;
        let totalCount = filteredSales.length;
        filteredSales.forEach(s => totalOmset += s.total);
        let totalLaba = Math.round(totalOmset * 0.5);
        let avgTrx = totalCount > 0 ? Math.round(totalOmset / totalCount) : 0;

        const itemCounts = {};
        filteredSales.forEach(trx => {
            if (trx.items) {
                trx.items.forEach(item => {
                    if (!itemCounts[item.name]) itemCounts[item.name] = 0;
                    itemCounts[item.name] += item.quantity;
                });
            } else {
                const names = trx.menu.split(', ');
                names.forEach(name => {
                    if (name) {
                        if (!itemCounts[name]) itemCounts[name] = 0;
                        itemCounts[name] += Math.ceil(trx.qty / names.length);
                    }
                });
            }
        });

        let bestSeller = '-';
        let bestSellerQty = 0;
        Object.keys(itemCounts).forEach(name => {
            if (itemCounts[name] > bestSellerQty) {
                bestSeller = name;
                bestSellerQty = itemCounts[name];
            }
        });

        const catQuantities = { 'jajanan': 0, 'bakaran': 0, 'minuman': 0 };
        filteredSales.forEach(trx => {
            if (trx.items) {
                trx.items.forEach(item => {
                    const cat = (item.category || 'jajanan').toLowerCase();
                    if (catQuantities[cat] !== undefined) {
                        catQuantities[cat] += item.quantity;
                    } else {
                        catQuantities['jajanan'] += item.quantity;
                    }
                });
            }
        });

        const totalCatQty = Object.values(catQuantities).reduce((a, b) => a + b, 0);
        let jajananPct = 0;
        let bakaranPct = 0;
        let minumanPct = 0;

        if (totalCatQty > 0) {
            jajananPct = Math.round((catQuantities['jajanan'] / totalCatQty) * 100);
            bakaranPct = Math.round((catQuantities['bakaran'] / totalCatQty) * 100);
            minumanPct = 100 - jajananPct - bakaranPct;
            if (minumanPct < 0) minumanPct = 0;
        }

        document.getElementById('report-stat-omset').textContent = formatCurrency(totalOmset);
        document.getElementById('report-stat-laba').textContent = formatCurrency(totalLaba);
        document.getElementById('report-stat-transaksi').textContent = formatCurrency(avgTrx);
        document.getElementById('report-stat-count').textContent = totalCount;
        document.getElementById('report-stat-terlaris').textContent = bestSeller;
        document.getElementById('report-stat-terlaris-qty').textContent = bestSellerQty;

        document.getElementById('report-cat-jajanan-pct').textContent = `${jajananPct}%`;
        document.getElementById('report-cat-jajanan-bar').style.width = `${jajananPct}%`;

        document.getElementById('report-cat-bakaran-pct').textContent = `${bakaranPct}%`;
        document.getElementById('report-cat-bakaran-bar').style.width = `${bakaranPct}%`;

        document.getElementById('report-cat-minuman-pct').textContent = `${minumanPct}%`;
        document.getElementById('report-cat-minuman-bar').style.width = `${minumanPct}%`;

        const reportChartLine = document.getElementById('report-chart-line');
        const reportChartArea = document.getElementById('report-chart-area');
        if (reportChartLine && reportChartArea) {
            let labels = [];
            let dailySales = [];

            if (period === 'hari') {
                labels = ["08.00", "10.00", "12.00", "14.00", "16.00", "18.00", "20.00"];
                dailySales = [0, 0, 0, 0, 0, 0, 0];
                filteredSales.forEach(s => {
                    const hr = parseInt(s.time.split(':')[0]) || 0;
                    if (hr < 10) dailySales[0] += s.total;
                    else if (hr < 12) dailySales[1] += s.total;
                    else if (hr < 14) dailySales[2] += s.total;
                    else if (hr < 16) dailySales[3] += s.total;
                    else if (hr < 18) dailySales[4] += s.total;
                    else if (hr < 20) dailySales[5] += s.total;
                    else dailySales[6] += s.total;
                });
            } else if (period === 'minggu') {
                labels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
                dailySales = [0, 0, 0, 0, 0, 0, 0];
                const dayIndices = [1, 2, 3, 4, 5, 6, 0];
                filteredSales.forEach(s => {
                    const dayIdx = new Date(s.date).getDay();
                    const targetIdx = dayIndices.indexOf(dayIdx);
                    if (targetIdx !== -1) {
                        dailySales[targetIdx] += s.total;
                    }
                });
            } else {
                labels = ["Mgg 1", "Mgg 2", "Mgg 3", "Mgg 4"];
                dailySales = [0, 0, 0, 0];
                filteredSales.forEach(s => {
                    const day = new Date(s.date).getDate();
                    if (day <= 7) dailySales[0] += s.total;
                    else if (day <= 14) dailySales[1] += s.total;
                    else if (day <= 21) dailySales[2] += s.total;
                    else dailySales[3] += s.total;
                });
            }

            const labelsContainer = document.getElementById('report-chart-labels');
            if (labelsContainer) {
                labelsContainer.innerHTML = labels.map(l => `<span>${l}</span>`).join('');
            }

            const maxVal = Math.max(...dailySales);
            const xCoords = labels.map((_, i) => (i / (labels.length - 1)) * 100);
            const points = [];
            dailySales.forEach((sale, i) => {
                const x = xCoords[i];
                const y = maxVal > 0 ? 100 - (sale / maxVal) * 80 : 100;
                points.push(`${x} ${y}`);
            });

            const lineD = `M ` + points.join(' L ');
            const areaD = `M ` + points.join(' L ') + ` L 100 100 L 0 100 Z`;

            reportChartLine.setAttribute('d', lineD);
            reportChartArea.setAttribute('d', areaD);
        }

        const tableBody = document.getElementById('report-table-body');
        if (tableBody) {
            const dateGroups = {};
            filteredSales.forEach(s => {
                if (!dateGroups[s.date]) {
                    dateGroups[s.date] = { count: 0, omset: 0 };
                }
                dateGroups[s.date].count++;
                dateGroups[s.date].omset += s.total;
            });

            const sortedDates = Object.keys(dateGroups).sort((a, b) => b.localeCompare(a));
            if (sortedDates.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="5" class="px-6 py-8 text-center text-on-surface-variant font-medium">Belum ada transaksi dalam periode ini</td></tr>`;
            } else {
                tableBody.innerHTML = '';
                sortedDates.forEach(dateStr => {
                    const group = dateGroups[dateStr];
                    const laba = Math.round(group.omset * 0.5);
                    
                    const d = new Date(dateStr);
                    const standardMonths = [
                        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                    ];
                    const formattedDate = `${d.getDate()} ${standardMonths[d.getMonth()]} ${d.getFullYear()}`;

                    const status = group.omset > 200000 
                        ? `<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-label-sm font-bold">Sangat Baik</span>`
                        : `<span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-label-sm font-bold">Cukup</span>`;

                    const row = document.createElement('tr');
                    row.className = 'hover:bg-surface-bright/50 transition-colors';
                    row.innerHTML = `
                        <td class="px-6 py-4 font-label-lg text-on-surface">${formattedDate}</td>
                        <td class="px-6 py-4 text-body-md text-center">${group.count}</td>
                        <td class="px-6 py-4 font-headline-sm text-primary text-right">${group.omset.toLocaleString('id-ID')}</td>
                        <td class="px-6 py-4 font-headline-sm text-green-700 text-right">${laba.toLocaleString('id-ID')}</td>
                        <td class="px-6 py-4 text-center">${status}</td>
                    `;
                    tableBody.appendChild(row);
                });
            }
        }
    };

    reportPeriodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const period = btn.getAttribute('data-period');
            updateReportView(period);
        });
    });

    if (reportMonthSelect) {
        reportMonthSelect.addEventListener('change', () => {
            const periodBtnActive = document.querySelector('.report-period-btn.bg-primary');
            const currentPeriod = periodBtnActive ? periodBtnActive.getAttribute('data-period') : 'bulan';
            updateReportView(currentPeriod);
        });
    }

    if (exportReportBtn && toast) {
        exportReportBtn.addEventListener('click', () => {
            toast.querySelector('p').textContent = 'Laporan performa toko berhasil diunduh sebagai PDF';
            toast.classList.remove('opacity-0', 'translate-y-[-20px]', 'pointer-events-none');
            toast.classList.add('opacity-100', 'translate-y-0');
            
            setTimeout(() => {
                toast.classList.add('opacity-0', 'translate-y-[-20px]', 'pointer-events-none');
                toast.classList.remove('opacity-100', 'translate-y-0');
            }, 3000);
        });
    }

    // Reset Data button
    const resetSalesBtn = document.getElementById('reset-sales-btn');
    if (resetSalesBtn) {
        resetSalesBtn.addEventListener('click', () => {
            showConfirmModal('Apakah Anda yakin ingin menghapus semua data transaksi? Tindakan ini akan mengosongkan riwayat penjualan, dashboard, dan laporan.', 'Ya, Kosongkan', () => {
                sales = [];
                localStorage.setItem('kasir_sales', JSON.stringify(sales));
                
                renderSalesTable();
                updateDashboardStats();
                const activeBtn = document.querySelector('.report-period-btn.bg-primary');
                const currentPeriod = activeBtn ? activeBtn.getAttribute('data-period') : 'bulan';
                updateReportView(currentPeriod);

                const mainToast = document.getElementById('toast');
                if (mainToast) {
                    mainToast.querySelector('p').textContent = 'Semua data transaksi berhasil dikosongkan!';
                    mainToast.classList.remove('opacity-0', 'translate-y-[-20px]', 'pointer-events-none');
                    mainToast.classList.add('opacity-100', 'translate-y-0');
                    setTimeout(() => {
                        mainToast.classList.add('opacity-0', 'translate-y-[-20px]', 'pointer-events-none');
                        mainToast.classList.remove('opacity-100', 'translate-y-0');
                    }, 3000);
                }
            });
        });
    }

    // Initial sales log, kasir cards, and menu list rendering
    renderSalesTable();
    renderKasirGrid();
    renderMenuTable();
    updateDashboardStats();
    updateReportView('bulan');
});
