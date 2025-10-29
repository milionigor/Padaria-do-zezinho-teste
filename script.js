document.addEventListener('DOMContentLoaded', function() {
    // 1. Funcionalidade do Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-list a');

    // Ao clicar no ícone do menu
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Alterna o ícone de hambúrguer para X
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times'); // Ícone de "X" do Font Awesome
    });
    
    // Fechar o menu ao clicar em um link (útil no mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                // Garante que o ícone retorne ao hambúrguer
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 2. Scroll Suave para Animações em Rolagem
    // Adiciona o comportamento de scroll suave a todos os links de navegação interna
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Impede o salto imediato
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Rola suavemente para a seção
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 3. Animações Leves (Exemplo: Fazer as seções aparecerem ao rolar)
    // Usaremos a Intersection Observer API para animações simples.

    const sections = document.querySelectorAll('.section, .hero-section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona uma classe para animar a entrada
                entry.target.classList.add('visible');
                // Para de observar depois de animar
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // 10% da seção visível para acionar a animação
    });

    sections.forEach(section => {
        section.classList.add('hidden'); // Classe inicial para o CSS
        observer.observe(section);
    });
});

// Adicione este bloco CSS no final do seu style.css para as animações
/*
.hidden {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.visible {
    opacity: 1;
    transform: translateY(0);
}

.hero-section.hidden {
    transform: none; // A HERO não precisa de translateY, só de opacidade
}
*/