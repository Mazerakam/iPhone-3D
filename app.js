class iPhone3DApp {
    constructor() {
        this.scene = null;
        this.isLoading = true;
        
        this.init();
    }

    async init() {
        try {
            console.log('Initializing iPhone 3D App...');
            
            this.showLoadingScreen();
            await this.simulateLoading();
            
            this.scene = new iPhone3DScene();
            this.setupUI();
            this.hideLoadingScreen();
            this.startRenderLoop();
            
            setTimeout(() => this.showSidePanel(), 1500);
            
            console.log('iPhone 3D App initialized successfully');
        } catch (error) {
            console.error('Error initializing app:', error);
            this.showErrorMessage('Erreur lors du chargement: ' + error.message);
        }
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            loadingScreen.style.opacity = '1';
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }
    }

    async simulateLoading() {
        const steps = [
            { text: 'Initialisation du moteur 3D...', progress: 20 },
            { text: 'Chargement des composants...', progress: 40 },
            { text: 'Configuration des matériaux...', progress: 60 },
            { text: 'Mise en place de l\'éclairage...', progress: 80 },
            { text: 'Finalisation...', progress: 100 }
        ];

        for (const step of steps) {
            await this.updateLoadingProgress(step.text, step.progress);
            await this.delay(300);
        }
    }

    async updateLoadingProgress(text, progress) {
        const loadingText = document.querySelector('.loading-text');
        const loadingProgress = document.getElementById('loading-progress');
        const loadingPercentage = document.getElementById('loading-percentage');
        
        if (loadingText) loadingText.textContent = text;
        if (loadingProgress) loadingProgress.style.width = `${progress}%`;
        if (loadingPercentage) loadingPercentage.textContent = `${progress}%`;
        
        return this.delay(100);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    setupUI() {
        // Bouton explosion
        const explodeBtn = document.getElementById('explode-btn');
        if (explodeBtn) {
            explodeBtn.addEventListener('click', () => this.toggleExplosion());
        }

        // Bouton reset
        const resetBtn = document.getElementById('reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetView());
        }

        // Bouton info
        const infoBtn = document.getElementById('info-btn');
        if (infoBtn) {
            infoBtn.addEventListener('click', () => this.toggleSidePanel());
        }

        // Bouton capture
        const captureBtn = document.getElementById('capture-btn');
        if (captureBtn) {
            captureBtn.addEventListener('click', () => this.captureImage());
        }

        // Boutons de vue
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(button => {
            button.addEventListener('click', () => {
                const viewType = button.dataset.view;
                this.setActiveViewButton(button);
                this.scene.setCameraView(viewType);
            });
        });

        this.setupModal();
        this.setupSidePanel();
        this.setupCaptureModal();
        this.setupKeyboardControls();
    }

    setupModal() {
        const modal = document.getElementById('component-modal');
        const modalClose = document.getElementById('modal-close');
        const modalBackdrop = modal?.querySelector('.modal-backdrop');

        if (modalClose) {
            modalClose.addEventListener('click', () => this.hideModal());
        }

        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', () => this.hideModal());
        }
    }

    setupSidePanel() {
        const componentList = document.getElementById('component-list');
        const closePanel = document.getElementById('close-panel');

        if (componentList) {
            this.populateComponentList(componentList);
        }

        if (closePanel) {
            closePanel.addEventListener('click', () => this.hideSidePanel());
        }
    }

    setupCaptureModal() {
        const captureModal = document.getElementById('capture-modal');
        const captureModalClose = document.getElementById('capture-modal-close');
        const downloadBtn = document.getElementById('download-btn');
        const shareBtn = document.getElementById('share-btn');

        if (captureModalClose) {
            captureModalClose.addEventListener('click', () => {
                captureModal.classList.remove('show');
            });
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadCapture());
        }

        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareCapture());
        }
    }

    populateComponentList(container) {
        container.innerHTML = '';
        
        Object.entries(COMPONENTS_DATA).forEach(([key, data]) => {
            const componentItem = document.createElement('div');
            componentItem.className = 'component-item';
            componentItem.innerHTML = `
                <div class="component-icon">${data.icon}</div>
                <div class="component-info">
                    <div class="component-name">${data.name}</div>
                    <div class="component-price">${data.price}</div>
                </div>
            `;
            
            componentItem.addEventListener('click', () => {
                this.scene.showComponentModal(key);
            });
            
            container.appendChild(componentItem);
        });
    }

    setupKeyboardControls() {
        document.addEventListener('keydown', (event) => {
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
                return;
            }

            switch (event.key.toLowerCase()) {
                case 'e':
                    this.toggleExplosion();
                    break;
                case 'r':
                    this.resetView();
                    break;
                case 'i':
                    this.toggleSidePanel();
                    break;
                case 'c':
                    this.captureImage();
                    break;
                case 'escape':
                    this.hideModal();
                    break;
            }
        });
    }

    toggleExplosion() {
        if (this.scene) {
            this.scene.explodeComponents();
            const explodeBtn = document.getElementById('explode-btn');
            const btnText = explodeBtn?.querySelector('.btn-text');
            
            if (btnText) {
                btnText.textContent = this.scene.isExploded ? 'Assembler' : 'Démonter';
            }
        }
    }

    resetView() {
        if (this.scene) {
            this.scene.camera.position.set(0, 0, 10);
            this.scene.controls.target.set(0, 0, 0);
            this.scene.controls.update();
            
            if (this.scene.isExploded) {
                this.toggleExplosion();
            }
            
            this.scene.controls.autoRotate = true;
            this.setActiveViewButton(document.querySelector('[data-view="front"]'));
        }
    }

    captureImage() {
        if (this.scene) {
            const imageData = this.scene.captureImage();
            if (imageData) {
                const captureCanvas = document.getElementById('capture-canvas');
                const captureModal = document.getElementById('capture-modal');
                
                if (captureCanvas&&captureModal) {
                    const context = captureCanvas.getContext('2d');
                    const img = new Image();
                    img.onload = () => {
                        captureCanvas.width = img.width;
                        captureCanvas.height = img.height;
                        context.drawImage(img, 0, 0);
                        captureModal.classList.add('show');
                    };
                    img.src = imageData;
                    this.capturedImageData = imageData;
                }
            }
        }
    }

    downloadCapture() {
        if (this.capturedImageData) {
            const link = document.createElement('a');
            link.download = 'iphone-15-pro-3d-capture.png';
            link.href = this.capturedImageData;
            link.click();
        }
    }

    shareCapture() {
        if (navigator.share&&this.capturedImageData) {
            // Convertir data URL en blob
            fetch(this.capturedImageData)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], 'iphone-3d.png', { type: 'image/png' });
                    navigator.share({
                        title: 'iPhone 15 Pro - Vue 3D',
                        text: 'Découvrez l\'iPhone 15 Pro en 3D',
                        files: [file]
                    });
                })
                .catch(err => console.log('Erreur de partage:', err));
        } else {
            // Fallback: copier le lien
            navigator.clipboard.writeText(window.location.href)
                .then(() => alert('Lien copié dans le presse-papier!'))
                .catch(() => alert('Impossible de partager'));
        }
    }

    showSidePanel() {
        const sidePanel = document.getElementById('side-panel');
        if (sidePanel) {
            sidePanel.classList.add('open');
        }
    }

    hideSidePanel() {
        const sidePanel = document.getElementById('side-panel');
        if (sidePanel) {
            sidePanel.classList.remove('open');
        }
    }

    toggleSidePanel() {
        const sidePanel = document.getElementById('side-panel');
        if (sidePanel) {
            sidePanel.classList.toggle('open');
        }
    }

    hideModal() {
        const modal = document.getElementById('component-modal');
        const captureModal = document.getElementById('capture-modal');
        if (modal) modal.classList.remove('show');
        if (captureModal) captureModal.classList.remove('show');
    }

    setActiveViewButton(activeButton) {
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(btn => btn.classList.remove('active'));
        
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }

    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 0, 0, 0.9);
            color: white;
            padding: 2rem;
            border-radius: 16px;
            z-index: 10001;
            text-align: center;
            max-width: 400px;
        `;
        errorDiv.innerHTML = `
            <h3>Erreur</h3>
            <p style="margin: 1rem 0;">${message}</p>
            <button onclick="location.reload()" style="padding: 0.5rem 1rem; background: white; color: black; border: none; border-radius: 8px; cursor: pointer;">
                Recharger la page
            </button>
        `;
        document.body.appendChild(errorDiv);
    }

    startRenderLoop() {
        const animate = () => {
            requestAnimationFrame(animate);
            if (this.scene) {
                this.scene.render();
            }
        };
        
        animate();
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier WebGL
    if (!window.WebGLRenderingContext) {
        alert('WebGL n\'est pas supporté sur ce navigateur');
        return;
    }
    
    try {
        new iPhone3DApp();
    } catch (error) {
        console.error('Erreur fatale:', error);
    }
});

// Gestion des erreurs
window.addEventListener('error', (event) => {
    console.error('Erreur JavaScript:', event.error);
});