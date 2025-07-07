const COMPONENTS_DATA = {
    'screen': {
        name: 'Écran Super Retina XDR',
        price: '350€',
        description: 'Écran OLED de 6,1 pouces avec technologie ProMotion 120Hz, luminosité maximale de 2000 nits et support HDR10.',
        importance: 'Interface principale utilisateur - essentiel pour l\'interaction',
        specs: [
            'Résolution : 2556 × 1179 pixels',
            'Densité : 460 ppi',
            'Technologie : OLED Super Retina XDR',
            'Taux de rafraîchissement : 120Hz ProMotion',
            'Luminosité : 1000 nits (typique), 2000 nits (pic)'
        ],
        icon: '📱'
    },
    'battery': {
        name: 'Batterie Lithium-ion',
        price: '89€',
        description: 'Batterie haute capacité de 3274 mAh avec technologie de charge rapide et charge sans fil MagSafe.',
        importance: 'Source d\'alimentation principale - critique pour le fonctionnement',
        specs: [
            'Capacité : 3274 mAh',
            'Tension : 3.87V',
            'Charge rapide : 20W',
            'Charge sans fil : 15W MagSafe',
            'Charge sans fil Qi : 7.5W'
        ],
        icon: '🔋'
    },
    'processor': {
        name: 'Puce A17 Pro',
        price: '180€',
        description: 'Processeur 6 cœurs gravé en 3nm avec GPU 6 cœurs et Neural Engine 16 cœurs pour l\'IA.',
        importance: 'Cerveau de l\'appareil - traite toutes les opérations',
        specs: [
            'Architecture : 6 cœurs (2P + 4E)',
            'Processus : 3 nanomètres',
            'GPU : 6 cœurs',
            'Neural Engine : 16 cœurs',
            'Mémoire : 8GB LPDDR5'
        ],
        icon: '🧠'
    },
    'camera_main': {
        name: 'Système caméra Pro',
        price: '300€',
        description: 'Système triple caméra avec capteur principal 48MP, ultra grand-angle 13MP et téléobjectif 12MP.',
        importance: 'Capture photo/vidéo professionnelle - fonctionnalité clé',
        specs: [
            'Capteur principal : 48MP f/1.78',
            'Ultra grand-angle : 13MP f/2.2',
            'Téléobjectif : 12MP f/2.8',
            'Zoom optique : 3x',
            'Stabilisation optique avancée'
        ],
        icon: '📷'
    },
    'lidar': {
        name: 'Scanner LiDAR',
        price: '45€',
        description: 'Scanner LiDAR pour la mesure de profondeur et la réalité augmentée.',
        importance: 'Réalité augmentée et autofocus - technologie avancée',
        specs: [
            'Type : Time-of-Flight',
            'Portée : Jusqu\'à 5 mètres',
            'Utilisation : AR, autofocus',
            'Précision : Millimétrique',
            'Vitesse : Instantanée'
        ],
        icon: '🔬'
    },
    'speakers': {
        name: 'Haut-parleurs stéréo',
        price: '25€',
        description: 'Système audio stéréo avec support Dolby Atmos et audio spatial.',
        importance: 'Sortie audio - essentiel pour multimédia',
        specs: [
            'Configuration : Stéréo',
            'Support : Dolby Atmos',
            'Audio spatial : Oui',
            'Puissance : 2 × 1W',
            'Réponse : 20Hz - 20kHz'
        ],
        icon: '🔊'
    },
    'lightning': {
        name: 'Port USB-C',
        price: '15€',
        description: 'Port USB-C avec support USB 3.0 et DisplayPort pour la connectivité.',
        importance: 'Connectivité et charge - interface principale',
        specs: [
            'Type : USB-C',
            'Norme : USB 3.0',
            'Débit : 5 Gbps',
            'Support : DisplayPort',
            'Charge : 20W max'
        ],
        icon: '🔌'
    },
    'frame': {
        name: 'Châssis Titane',
        price: '200€',
        description: 'Châssis en titane de qualité aérospatiale avec finition brossée.',
        importance: 'Structure et protection - élément fondamental',
        specs: [
            'Matériau : Titane Grade 5',
            'Finition : Brossée',
            'Résistance : IP68',
            'Poids : 187g',
            'Épaisseur : 8.25mm'
        ],
        icon: '🛡️'
    }
};