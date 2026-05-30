/* Zoo Agency — interações */

/* ── Player de áudio customizado (feedback dos canais) ───── */
(function () {
	var players = document.querySelectorAll('.audio-player');
	var todos = [];

	function fmt(s) {
		s = Math.floor(s || 0);
		var m = Math.floor(s / 60);
		var seg = s % 60;
		return m + ':' + (seg < 10 ? '0' + seg : seg);
	}

	players.forEach(function (p) {
		var audio = p.querySelector('audio');
		var btn   = p.querySelector('.audio-play');
		var bar   = p.querySelector('.audio-bar');
		var fill  = p.querySelector('.audio-bar-fill');
		var time  = p.querySelector('.audio-time');
		todos.push(audio);

		btn.addEventListener('click', function () {
			if (audio.paused) {
				todos.forEach(function (a) { if (a !== audio) a.pause(); });
				audio.play();
			} else {
				audio.pause();
			}
		});
		audio.addEventListener('play',  function () { p.classList.add('playing'); });
		audio.addEventListener('pause', function () { p.classList.remove('playing'); });
		audio.addEventListener('ended', function () {
			p.classList.remove('playing');
			fill.style.width = '0%';
			time.textContent = fmt(audio.duration);
		});
		audio.addEventListener('loadedmetadata', function () { time.textContent = fmt(audio.duration); });
		audio.addEventListener('timeupdate', function () {
			var pct = audio.duration ? (audio.currentTime / audio.duration * 100) : 0;
			fill.style.width = pct + '%';
			time.textContent = fmt(audio.currentTime);
		});
		bar.addEventListener('click', function (e) {
			var r = bar.getBoundingClientRect();
			if (audio.duration) audio.currentTime = (e.clientX - r.left) / r.width * audio.duration;
		});
	});
})();

(function () {

	/* ── Carrosséis ─────────────────────────────────────────── */
	function initCarousel(wrap) {
		var track = wrap.querySelector('.carousel-track');
		var prev  = wrap.querySelector('.seta.anterior');
		var next  = wrap.querySelector('.seta.proximo');
		var dots  = Array.from(wrap.querySelectorAll('.servico-dot'));
		var pos   = 0;

		function vp()        { return wrap.querySelector('.carousel-viewport'); }
		function maxOffset() { return Math.max(0, track.scrollWidth - vp().clientWidth); }
		function step() {
			var vw = vp().clientWidth;
			if (vw < 640) return Math.round(vw * 0.9);
			var declared = wrap.getAttribute('data-step');
			if (declared === 'full') return Math.round(vw);
			var n = parseInt(declared || '0', 10);
			return n || Math.round(vw * 0.8);
		}
		var isFull = wrap.getAttribute('data-step') === 'full';
		function activeIndex() { return Math.round(pos / step()); }
		function updateDots() {
			if (!dots.length) return;
			var idx = activeIndex();
			dots.forEach(function (d, i) { d.classList.toggle('ativo', i === idx); });
		}
		/* slides de altura variável: viewport acompanha o card ativo
		   (evita cards curtos esticados com vazio enorme) */
		function adjustHeight() {
			if (!isFull) return;
			var li = track.children[activeIndex()];
			if (li) vp().style.height = li.offsetHeight + 'px';
		}
		function apply() {
			var max = maxOffset();
			if (pos > max) pos = max;
			if (pos < 0)   pos = 0;
			track.style.transform = 'translateX(' + (-pos) + 'px)';
			updateDots();
			adjustHeight();
		}

		next.addEventListener('click', function () { pos += step(); apply(); });
		prev.addEventListener('click', function () { pos -= step(); apply(); });
		dots.forEach(function (dot, i) {
			dot.addEventListener('click', function () { pos = i * step(); apply(); });
		});

		/* roda do mouse sobre o carrossel → navega para o lado.
		   Trava de ~550ms = um slide por gesto; quando chega na ponta,
		   libera o scroll da página (não prende o usuário). */
		var wheelLock = false;
		wrap.addEventListener('wheel', function (e) {
			var delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
			if (!delta) return;
			var dir = delta > 0 ? 1 : -1;
			var max = maxOffset();
			if ((dir > 0 && pos >= max) || (dir < 0 && pos <= 0)) return;
			e.preventDefault();
			if (wheelLock) return;
			wheelLock = true;
			pos += dir * step();
			apply();
			setTimeout(function () { wheelLock = false; }, 550);
		}, { passive: false });

		window.addEventListener('resize', function () { pos = 0; apply(); });

		/* recalcula a altura quando as mídias do card carregam */
		if (isFull) {
			wrap.querySelectorAll('img, video').forEach(function (m) {
				m.addEventListener('loadeddata', adjustHeight);
				m.addEventListener('load', adjustHeight);
			});
			window.addEventListener('load', adjustHeight);
			setTimeout(adjustHeight, 150);
		}

		apply();
	}

	document.querySelectorAll('[data-carousel]').forEach(initCarousel);

	/* ── Menu mobile ─────────────────────────────────────────── */
	var menuBtn   = document.querySelector('.bt_menu_mobile');
	var headerNav = document.querySelector('header nav');

	if (menuBtn && headerNav) {
		menuBtn.addEventListener('click', function () {
			var open = headerNav.classList.toggle('nav-open');
			menuBtn.textContent = open ? 'fechar' : 'menu';
			menuBtn.setAttribute('aria-expanded', String(open));
		});
		headerNav.querySelectorAll('a').forEach(function (a) {
			a.addEventListener('click', function () {
				headerNav.classList.remove('nav-open');
				menuBtn.textContent = 'menu';
				menuBtn.setAttribute('aria-expanded', 'false');
			});
		});
	}

	/* ── Botão voltar ao topo ────────────────────────────────── */
	var btnTopo = document.getElementById('topo');
	if (btnTopo) {
		window.addEventListener('scroll', function () {
			btnTopo.classList.toggle('visivel', window.scrollY > 400);
		}, { passive: true });
		btnTopo.addEventListener('click', function () {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}

	/* ── Scroll reveal ───────────────────────────────────────── */
	if ('IntersectionObserver' in window) {
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('revealed');
					io.unobserve(entry.target);
				}
			});
		}, { threshold: 0.1 });

		document.querySelectorAll(
			'#sobre article, #numeros li, .feedback-card, .cliente-card'
		).forEach(function (el) {
			el.classList.add('reveal');
			io.observe(el);
		});
	}

})();
