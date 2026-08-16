/* Class responsible for creating and managing the link ring. */
class CircularLinks {
    constructor() {
        // Gets a reference to the link ring container
        this.container = document.getElementById('circleContainer');
        
        // Defines the links in the inner ring
        this.innerLinks = [
            { id: 'ddg012', url: 'https://duckduckgo.com/&search', image: 'assets/images/img-porto_norte-v4.png' },
            { id: 'ddg013', url: 'https://duckduckgo.com/&search', image: 'assets/images/img-oriente-v4.png' },
            { id: 'ddg014', url: 'https://duckduckgo.com/&search', image: 'assets/images/img-oeiras-v4.png' },
            { id: 'ddg015', url: 'https://duckduckgo.com/&search', image: 'assets/images/img-evora-v4.png' },
            { id: 'ddg016', url: 'https://duckduckgo.com/&search', image: 'assets/images/img-porto_centro-v4.png' },

            { id: 'ddg017', url: 'https://duckduckgo.com/&search', image: 'assets/images/img-porto_norte-v2.png' },
            { id: 'ddg018', url: 'https://duckduckgo.com/&search', image: 'assets/images/img-porto_centro-v2.png' },
            { id: 'ddg019', url: 'https://duckduckgo.com/&search', image: 'assets/images/img-evora-v2.png' },
            { id: 'ddg020', url: 'https://duckduckgo.com/&search', image: 'assets/images/img-oeiras-v2.png' },
            { id: 'ddg021', url: 'https://duckduckgo.com/&search', image: 'assets/images/img-oriente-v2.png' }
        ];

        // Defines the links in the outer ring
        this.outerLinks = [
            { id: 'ddg01', url: 'https://duckduckgo.com/&search', image: 'assets/images/img-axporto_norte-v2.png' },
            { id: 'ddg02', url: 'https://duckduckgo.com/&search', image: 'assets/images/img-axoriente-v2.png' },
            { id: 'ddg03', url: 'https://duckduckgo.com/&search', image: 'assets/images/img-axoeiras-v2.png' },
            { id: 'ddg04', url: 'https://duckduckgo.com/&search', image: 'assets/images/img-expedia-v2.png' },
            { id: 'ddg05', url: 'https://duckduckgo.com/&search', image: 'assets/images/img-mirai-v2.png' },
            { id: 'ddg06', url: 'https://duckduckgo.com/&search', image: 'assets/images/img-dedge-v2.png' },

            { id: 'clean', image: 'assets/images/clean.png' },
            { id: 'clean', image: 'assets/images/clean.png' },
            { id: 'clean', image: 'assets/images/clean.png' },

            { id: 'ddg07', url: 'https://duckduckgo.com/&search', image: 'assets/images/img-planet-v2.png' },
            { id: 'ddg08', url: 'https://duckduckgo.com/&search', image: 'assets/images/img-hrs-v2.png' },
            { id: 'ddg09', url: 'https://duckduckgo.com/&search', image: 'assets/images/img-booking-v2.png' },
            { id: 'ddg10', url: 'https://duckduckgo.com/&search', image: 'assets/images/img-axporto_centro-v2.png' },
            { id: 'ddg11', url: 'https://duckduckgo.com/&search', image: 'assets/images/img-axevora-v2.png' }
        ];
        
        // Initialize
        this.init();
        
        // Adds a window resize event listener
        window.addEventListener('resize', () => this.updateLayout());
    }

    // Creates an individual link element
    createLinkElement(link, index, isOuter) {
        // Creates an <a> element
        const linkElement = document.createElement('a');
        linkElement.className = 'link-item';
        linkElement.dataset.id = link.id;
        linkElement.dataset.isOuter = isOuter;
        linkElement.dataset.index = index;
    
        // Disable the link if no URL is provided
        if (!link.url) {
            linkElement.classList.add('disabled');
            linkElement.style.cursor = 'default'; // Forces the default cursor
        } else {
            linkElement.href = link.url;
            linkElement.target = '_blank';
        }
    
        // Creates an <img> element
        const img = document.createElement('img');
        img.src = link.image;
        img.alt = link.id;
        linkElement.appendChild(img);
    
        return linkElement;
    }

    // Initializes the ring elements and layout
    init() {
        this.createLinks();
        this.updateLayout();
    }

    // Builds all links in the ring
    createLinks() {
        // Adds external links
        this.outerLinks.forEach((link, index) => {
            this.container.appendChild(this.createLinkElement(link, index, true));
        });

        // Add internal links
        this.innerLinks.forEach((link, index) => {
            this.container.appendChild(this.createLinkElement(link, index, false));
        });
    }

    // Updates the ring layout
    updateLayout() {
        const margin = 2;
        const hoverSpace = 40;
        
        // Calculates the container size
        const containerRect = this.container.getBoundingClientRect();
        const containerSize = Math.min(
            containerRect.width - (margin * 0 + hoverSpace * 0),
            containerRect.height - (margin * 0 + hoverSpace * 0)
        );
        // Other values ​​for tests/debug:
        /* 
        const containerSize = Math.min(
            window.innerWidth - (margin * 2 + hoverSpace * 2),
            window.innerHeight - (margin * 2 + hoverSpace * 2)
        );
        */

        // Sets the ring radii
        const outerRadius = (containerSize / 2) * 0.9;  // 90% of container radius for the outer ring
        const innerRadius = outerRadius * 0.6;  // 60% of outer radius for the concentric inner ring

        // Adjusts the container dimensions
        this.container.style.width = `${containerSize}px`;
        this.container.style.height = `${containerSize}px`;

        // Calculates the item size
        const outerItemSize = Math.min(
            (2 * Math.PI * outerRadius) / this.outerLinks.length * 0.5,
            70
        );
        const innerItemSize = Math.min(
            (2 * Math.PI * innerRadius) / this.innerLinks.length * 0.5,
            70
        );

        // Positions each item around the ring
        const links = this.container.getElementsByClassName('link-item');
        Array.from(links).forEach(link => {
            const isOuter = link.dataset.isOuter === 'true';
            const index = parseInt(link.dataset.index);
            const total = isOuter ? this.outerLinks.length : this.innerLinks.length;
            const radius = isOuter ? outerRadius : innerRadius;
            const itemSize = isOuter ? outerItemSize : innerItemSize;

            // Calculates the position using trigonometry
            const angle = (index * 2 * Math.PI) / total - Math.PI / 2;  // Offsets by -90deg (-PI/2) so item 0 starts at 12 o'clock
            const left = radius * Math.cos(angle) + containerSize / 2 - itemSize / 2;  // X-coord centered on the ring point
            const top = radius * Math.sin(angle) + containerSize / 2 - itemSize / 2;  // Y-coord centered on the ring point

            // Applies the calculated position
            link.style.left = `${left}px`;
            link.style.top = `${top}px`;
            link.style.width = `${itemSize}px`;
            link.style.height = `${itemSize}px`;
        });
    }
}

// Initializes the class when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new CircularLinks();
});