document.addEventListener("DOMContentLoaded", function (e) {
	// menu
	document.querySelector('.menu').addEventListener('click', function (e) {
		e.preventDefault();

		if (e.target.className !== 'menu__link') return;

		var parts = e.target.href.split('/');

		document.querySelector(parts[parts.length - 1]).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	});

	// portfolio
	document.querySelector('.portfolio').addEventListener('click', function (e) {
		if (e.target.classList.contains('portfolio__item-front')) {
			e.target.parentNode.parentNode.classList.add('hover');
		}

		if (e.target.classList.contains('hover')) {
			e.target.classList.remove('hover');
		}
	});

	// contact
	var inputs = document.querySelectorAll('.contact__input');

	for (var i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener('focus', function (e) {
			e.target.parentNode.classList.add('is-active', 'is-completed');
		});

		inputs[i].addEventListener('blur', function (e) {
			e.target.parentNode.classList.remove('is-active');

			if (e.target.value === '') {
				e.target.parentNode.classList.remove('is-completed');
			}
		});
	}

	var textarea = document.querySelector('.is-textarea');
	var offset = textarea.offsetHeight - textarea.clientHeight;

	textarea.addEventListener('input', function () {
		this.style.height = 'auto';
		this.style.height = this.scrollHeight + offset + 'px';
	}, false);

	// temp
	document.querySelector('.contact__button').addEventListener('click', function (e) {
		e.preventDefault();

		document.querySelector('.contact__under-development').classList.remove('is-hidden');
	});
});