class iPhone3DScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.components = new Map();
        this.originalPositions = new Map();
        this.isExploded = false;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        this.init();
        this.createComponents();
        this.setupEventListeners();
    }

    init() {
        try {
            // Scène
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x000000);

            // Caméra
            this.camera = new THREE.PerspectiveCamera(
                60, 
                window.innerWidth / window.innerHeight, 
                0.1, 
                1000
            );
            this.camera.position.set(0, 0, 10);

            // Renderer
            const canvas = document.getElementById('three-canvas');
            if (!canvas) {
                throw new Error('Canvas not found');
            }

            this.renderer = new THREE.WebGLRenderer({ 
                canvas: canvas,
                antialias: true,
                alpha: true
            });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

            // Contrôles
            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.minDistance = 5;
            this.controls.maxDistance = 20;
            this.controls.autoRotate = true;
            this.controls.autoRotateSpeed = 1.0;

            // Éclairage
            this.setupLighting();

            console.log('Three.js scene initialized successfully');
        } catch (error) {
            console.error('Error initializing Three.js scene:', error);
            throw error;
        }
    }

    setupLighting() {
        // Lumière ambiante
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);

        // Lumière directionnelle
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        this.scene.add(directionalLight);

        // Lumière ponctuelle
        const pointLight = new THREE.PointLight(0x007AFF, 0.5, 20);
        pointLight.position.set(-5, 5, 5);
        this.scene.add(pointLight);
    }

    createComponents() {
        try {
            // Groupe principal
            this.phoneGroup = new THREE.Group();
            this.scene.add(this.phoneGroup);

            // Créer les composants de base
            this.createFrame();
            this.createScreen();
            this.createBattery();
            this.createProcessor();
            this.createCameras();
            this.createSpeakers();
            this.createLightning();

            // Sauvegarder positions originales
            this.components.forEach((component, name) => {
                this.originalPositions.set(name, component.position.clone());
            });

            console.log('Components created successfully');
        } catch (error) {
            console.error('Error creating components:', error);
            throw error;
        }
    }

    createFrame() {
        const geometry = new THREE.BoxGeometry(3, 6, 0.3);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x8a8a8a,
            metalness: 0.8,
            roughness: 0.2
        });
        
        const frame = new THREE.Mesh(geometry, material);
        frame.position.set(0, 0, -0.2);
        frame.userData = { name: 'frame' };
        frame.castShadow = true;
        frame.receiveShadow = true;
        
        this.phoneGroup.add(frame);
        this.components.set('frame', frame);
    }

    createScreen() {
        const geometry = new THREE.BoxGeometry(2.8, 5.8, 0.05);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x000000,
            metalness: 0.1,
            roughness: 0.1,
            clearcoat: 1.0
        });
        
        const screen = new THREE.Mesh(geometry, material);
        screen.position.set(0, 0, 0.2);
        screen.userData = { name: 'screen' };
        screen.castShadow = true;
        screen.receiveShadow = true;
        
        this.phoneGroup.add(screen);
        this.components.set('screen', screen);
    }

    createBattery() {
        const geometry = new THREE.BoxGeometry(2.4, 1.2, 0.3);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xffd700,
            metalness: 0.8,
            roughness: 0.2
        });
        
        const battery = new THREE.Mesh(geometry, material);
        battery.position.set(0, -1.8, 0);
        battery.userData = { name: 'battery' };
        battery.castShadow = true;
        battery.receiveShadow = true;
        
        this.phoneGroup.add(battery);
        this.components.set('battery', battery);
    }

    createProcessor() {
        const geometry = new THREE.BoxGeometry(1.2, 1.2, 0.15);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x333333,
            metalness: 0.9,
            roughness: 0.1
        });
        
        const processor = new THREE.Mesh(geometry, material);
        processor.position.set(0, 0.5, 0);
        processor.userData = { name: 'processor' };
        processor.castShadow = true;
        processor.receiveShadow = true;
        
        this.phoneGroup.add(processor);
        this.components.set('processor', processor);
    }

    createCameras() {
        // Module caméra
        const moduleGeometry = new THREE.BoxGeometry(1.5, 1.5, 0.2);
        const moduleMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x1a1a1a,
            metalness: 0.8,
            roughness: 0.2
        });
        
        const cameraModule = new THREE.Mesh(moduleGeometry, moduleMaterial);
        cameraModule.position.set(-0.8, 2.0, 0.3);
        cameraModule.userData = { name: 'camera_main' };
        cameraModule.castShadow = true;
        cameraModule.receiveShadow = true;
        
        // Caméras individuelles
        const cameraGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1);
        const cameraMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x000000,
            metalness: 0.9,
            roughness: 0.1
        });
        
        const camera1 = new THREE.Mesh(cameraGeometry, cameraMaterial);
        camera1.position.set(-0.3, 0.3, 0.1);
        cameraModule.add(camera1);
        
        const camera2 = new THREE.Mesh(cameraGeometry, cameraMaterial);
        camera2.position.set(0.3, 0.3, 0.1);
        cameraModule.add(camera2);
        
        const camera3 = new THREE.Mesh(cameraGeometry, cameraMaterial);
        camera3.position.set(-0.3, -0.3, 0.1);
        cameraModule.add(camera3);
        
        // LiDAR
        const lidarGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.08);
        const lidarMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x4a4a4a,
            metalness: 0.7,
            roughness: 0.3,
            emissive: 0x001122,
            emissiveIntensity: 0.2
        });
        
        const lidar = new THREE.Mesh(lidarGeometry, lidarMaterial);
        lidar.position.set(0.3, -0.3, 0.1);
        lidar.userData = { name: 'lidar' };
        cameraModule.add(lidar);
        
        this.phoneGroup.add(cameraModule);
        this.components.set('camera_main', cameraModule);
        this.components.set('lidar', lidar);
    }

    createSpeakers() {
        const geometry = new THREE.BoxGeometry(2.0, 0.2, 0.1);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x2a2a2a,
            metalness: 0.3,
            roughness: 0.7
        });
        
        const speaker = new THREE.Mesh(geometry, material);
        speaker.position.set(0, -2.7, 0.1);
        speaker.userData = { name: 'speakers' };
        speaker.castShadow = true;
        speaker.receiveShadow = true;
        
        this.phoneGroup.add(speaker);
        this.components.set('speakers', speaker);
    }

    createLightning() {
        const geometry = new THREE.BoxGeometry(0.3, 0.15, 0.08);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x666666,
            metalness: 0.8,
            roughness: 0.2
        });
        
        const lightning = new THREE.Mesh(geometry, material);
        lightning.position.set(0, -2.9, 0.1);
        lightning.userData = { name: 'lightning' };
        lightning.castShadow = true;
        lightning.receiveShadow = true;
        
        this.phoneGroup.add(lightning);
        this.components.set('lightning', lightning);
    }

    setupEventListeners() {
        this.renderer.domElement.addEventListener('click', (event) => {
            this.onComponentClick(event);
        });

        this.renderer.domElement.addEventListener('mousemove', (event) => {
            this.onMouseMove(event);
        });

        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    onComponentClick(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.phoneGroup.children, true);

        if (intersects.length > 0) {
            let intersectedObject = intersects[0].object;
            let componentName = null;
            
            while (intersectedObject&&!componentName) {
                if (intersectedObject.userData&&intersectedObject.userData.name) {
                    componentName = intersectedObject.userData.name;
                }
                intersectedObject = intersectedObject.parent;
            }
            
            if (componentName&&COMPONENTS_DATA[componentName]) {
                this.showComponentModal(componentName);
            }
        }
    }

    onMouseMove(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.phoneGroup.children, true);

        this.renderer.domElement.style.cursor = intersects.length > 0 ? 'pointer' : 'grab';
    }

    showComponentModal(componentName) {
        const data = COMPONENTS_DATA[componentName];
        if (!data) return;

        const modal = document.getElementById('component-modal');
        const icon = document.getElementById('modal-icon');
        const title = document.getElementById('modal-title');
        const image = document.getElementById('component-image');
        const priceTag = document.getElementById('component-price-tag');
        const description = document.getElementById('component-description');
        const importance = document.getElementById('component-importance');
        const specs = document.getElementById('component-specs');

        if (icon) icon.textContent = data.icon;
        if (title) title.textContent = data.name;
        if (image) image.textContent = data.icon;
        if (priceTag) priceTag.textContent = data.price;
        if (description) description.textContent = data.description;
        if (importance) importance.textContent = data.importance;
        
        if (specs) {
            specs.innerHTML = '';
            data.specs.forEach(spec => {
                const li = document.createElement('li');
                li.textContent = spec;
                specs.appendChild(li);
            });
        }

        if (modal) modal.classList.add('show');
    }

    explodeComponents() {
        this.isExploded = !this.isExploded;
        
        const explodedPositions = {
            'frame': new THREE.Vector3(0, 0, -3),
            'screen': new THREE.Vector3(0, 0, 4),
            'battery': new THREE.Vector3(0, -4, 0),
            'processor': new THREE.Vector3(0, 3, 2),
            'camera_main': new THREE.Vector3(-3, 4, 1),
            'speakers': new THREE.Vector3(0, -5, 1),
            'lightning': new THREE.Vector3(0, -6, 1)
        };
        
        this.components.forEach((component, name) => {
            const targetPosition = this.isExploded 
                ? explodedPositions[name] || new THREE.Vector3(0, 0, 0)
                : this.originalPositions.get(name);
            
            if (targetPosition) {
                this.animateComponentTo(component, targetPosition);
            }
        });
        
        this.controls.autoRotate = !this.isExploded;
    }

    animateComponentTo(component, targetPosition) {
        const startPosition = component.position.clone();
        const startTime = Date.now();
        const duration = 1000;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            component.position.lerpVectors(startPosition, targetPosition, easeOut);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    setCameraView(viewType) {
        const positions = {
            'front': new THREE.Vector3(0, 0, 10),
            'back': new THREE.Vector3(0, 0, -10),
            'side': new THREE.Vector3(10, 0, 0),
            'top': new THREE.Vector3(0, 10, 0)
        };
        
        const position = positions[viewType];
        if (position) {
            this.animateCameraTo(position, new THREE.Vector3(0, 0, 0));
        }
    }

    animateCameraTo(position, target) {
        const startPosition = this.camera.position.clone();
        const startTarget = this.controls.target.clone();
        const startTime = Date.now();
        const duration = 1000;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            this.camera.position.lerpVectors(startPosition, position, easeOut);
            this.controls.target.lerpVectors(startTarget, target, easeOut);
            this.controls.update();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    captureImage() {
        try {
            // Créer un canvas pour la capture
            const captureCanvas = document.getElementById('capture-canvas');
            if (!captureCanvas) return null;
            
            const context = captureCanvas.getContext('2d');
            captureCanvas.width = this.renderer.domElement.width;
            captureCanvas.height = this.renderer.domElement.height;
            
            // Rendre la scène
            this.renderer.render(this.scene, this.camera);
            
            // Copier l'image du renderer vers le canvas de capture
            context.drawImage(this.renderer.domElement, 0, 0);
            
            return captureCanvas.toDataURL('image/png');
        } catch (error) {
            console.error('Error capturing image:', error);
            return null;
        }
    }

    onWindowResize() {
        if (this.camera&&this.renderer) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }

    render() {
        try {
            if (this.controls) this.controls.update();
            if (this.renderer&&this.scene&&this.camera) {
                this.renderer.render(this.scene, this.camera);
            }
        } catch (error) {
            console.error('Error rendering scene:', error);
        }
    }
}