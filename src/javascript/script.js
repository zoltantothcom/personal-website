// var rp = require('request-promise'); 

document.addEventListener('DOMContentLoaded', function (e) {
	// menu
	var clickEvent = ('ontouchstart' in window ? 'touchend' : 'click');

	document.querySelector('.menu__button').addEventListener(clickEvent, function (e) {
		e.preventDefault();
		document.querySelector('.menu__list').classList.toggle('is-hidden');
		document.querySelector('.menu__button').classList.toggle('is-open');
	}, false);

	document.querySelector('.menu__list').addEventListener('click', function (e) {
		e.preventDefault();

		if (e.target.className !== 'menu__item') return;

		document.querySelector('.menu__list').classList.add('is-hidden');
		document.querySelector('.menu__button').classList.remove('is-open');

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
var form = document.getElementById("form")

	document.querySelector('.contact__button').addEventListener('click', function (e) {
		e.preventDefault();

		fetch('/send', {
			headers: { "Content-Type": "application/json; charset=utf-8" },
			method: 'PUT',
			body: JSON.stringify({
				username: 'Elon Musk',
				email: 'elonmusk@gmail.com',
			})
		})
		.then(response => response.json())
  	.then(data => console.log(JSON.stringify(data)))

	// 	document.querySelector('.contact__under-development').classList.remove('is-hidden');
	});
});
