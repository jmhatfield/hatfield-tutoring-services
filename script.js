let isMobile = false;

const routes = {
    home: {
        navId: '#homeNav',
        viewId: '#home'
    },
    services: {
        navId: '#servicesNav',
        viewId: '#services'
    },
    about: {
        navId: '#aboutNav',
        viewId: '#about'
    },
    contact: {
        navId: '#contactNav',
        viewId: '#contact'
    }
};

// const routes = {
//     home: {
//         navId: '#homeNav',
//         viewId: '#home'
//     },
//     services: {
//         navId: '#servicesNav',
//         viewId: '#services'
//     },
//     about: {
//         navId: '#aboutNav',
//         viewId: '#about'
//     },
//     resources: {
//         navId: '#resourcesNav',
//         viewId: '#resources'
//     },
//     contact: {
//         navId: '#contactNav',
//         viewId: '#contact'
//     }
// };

function scrollToElement(element) {
    const elementPosition = element.offsetTop;
    const scrollOffset = (isMobile)
        ? document.querySelector('#navContainer').clientHeight
        : 0;
    const offsetPosition = elementPosition - scrollOffset;
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

function updateNavStyle(route) {
    const navLinks = Array.from(document.querySelectorAll('nav a'));
    navLinks.forEach((ele) => {
        ele.classList.remove('active');
    });
    document.querySelector(route.navId).classList.add('active');
}

function setupNavClickEvents() {
    Object.keys(routes).forEach((route) => {
        document.querySelector(routes[route].navId).addEventListener('click', () => {
            scrollToElement(document.querySelector(routes[route].viewId));
            updateNavStyle(routes[route]);
            if (isMobile) {
                document.querySelector('nav').classList.remove('expanded');
            }
        });
    });
}

function setupObservers() {
    // Create observers
    Object.keys(routes).forEach((route) => {
        let observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateNavStyle(routes[route]);
            }
        }, { threshold: [0.5] });
        routes[route].observer = observer;
    });
    // Use observers
    Object.keys(routes).forEach((route) => {
        routes[route].observer.observe(document.querySelector(routes[route].viewId));
    });
}

function setIsMobile(media) {
    isMobile = media.matches;
}

window.onload = () => {

    /* Responsive */

    let media = window.matchMedia('(max-width: 700px)');
    setIsMobile(media);
    media.addListener(setIsMobile);

    /* Navigation */

    setupNavClickEvents();
    setupObservers();

    /* Buttons */

    document.querySelector('#servicesLink').addEventListener('click', () => {
        scrollToElement(document.querySelector('#services'));
    });

    Array.from(document.querySelectorAll('.contactLink')).forEach((ele) => {
        ele.addEventListener('click', () => {
            scrollToElement(document.querySelector('#contact'));
        });
    });

    /* Mobile navigation */

    const navButton = document.querySelector('#navButton');
    if (navButton) {
        navButton.addEventListener('click', () => {
            const navEle = document.querySelector('nav');
            if (navEle.classList.contains('expanded')) {
                navEle.classList.remove('expanded');
            } else {
                navEle.classList.add('expanded');
            }
        });
    }

    if (isMobile) {
        document.querySelector('#mainContainer').addEventListener('click', () => {
            document.querySelector('nav').classList.remove('expanded');
        });
    }

}
