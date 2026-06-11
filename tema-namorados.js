document.addEventListener("DOMContentLoaded", () => {
    // Apenas roda se o body tiver a classe tema-namorados
    if (!document.body.classList.contains('tema-namorados')) return;

    const container = document.createElement('div');
    container.id = 'hearts-container';
    container.setAttribute('aria-hidden', 'true');
    document.body.appendChild(container);

    const heartSymbols = ['❤️', '💖', '💕', '💘'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        
        // Sorteio de características
        const symbol = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        const left = Math.random() * 100;
        const animationDuration = 5 + Math.random() * 10; // 5s a 15s
        const fontSize = 10 + Math.random() * 20; // 10px a 30px
        
        heart.textContent = symbol;
        heart.style.left = `${left}vw`;
        heart.style.animationDuration = `${animationDuration}s`;
        heart.style.fontSize = `${fontSize}px`;
        
        container.appendChild(heart);
        
        // Remove o coração após a animação para não pesar o DOM
        setTimeout(() => {
            heart.remove();
        }, animationDuration * 1000);
    }

    // Cria um coração a cada 800ms
    setInterval(createHeart, 800);

    // --- Pop-up Dia dos Namorados ---
    function createPopup() {
        const overlay = document.createElement('div');
        overlay.id = 'namorados-popup-overlay';
        
        const card = document.createElement('div');
        card.classList.add('namorados-popup-card');
        
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('namorados-popup-close');
        closeBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
        closeBtn.setAttribute('aria-label', 'Fechar pop-up');

        const img = document.createElement('img');
        img.classList.add('namorados-popup-img');
        img.id = 'namorados-popup-image';
        img.alt = 'Feliz Dia dos Namorados';
        // A imagem que o usuário vai enviar será salva aqui:
        img.src = 'imagens/popup-namorados.webp'; 
        // Esconde a imagem se ela não for encontrada ainda para não quebrar o layout
        img.onerror = () => { img.style.display = 'none'; };
        
        const actionBtn = document.createElement('a');
        const phoneNumber = '5581983123684';
        const message = 'Ola Quero Garantir a Promoçao!💗💖';
        actionBtn.href = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        actionBtn.target = '_blank';
        actionBtn.rel = 'noopener';
        actionBtn.className = 'bt_laranja namorados-popup-btn';
        actionBtn.innerHTML = `garanta já!`;
        
        actionBtn.addEventListener('click', () => {
            overlay.classList.remove('show');
            setTimeout(() => overlay.remove(), 300);
        });

        card.appendChild(closeBtn);
        card.appendChild(img);
        card.appendChild(actionBtn);
        overlay.appendChild(card);
        document.body.appendChild(overlay);
        
        // Logica de abrir e fechar
        setTimeout(() => {
            overlay.classList.add('show');
        }, 1500); // Mostra apos 1.5s
        
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('show');
            setTimeout(() => overlay.remove(), 300);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('show');
                setTimeout(() => overlay.remove(), 300);
            }
        });
    }

    createPopup();
});
