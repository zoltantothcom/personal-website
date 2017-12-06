window.onload = function() {

};

// portfolio
document.querySelector('.portfolio').addEventListener('click', function(e) {
	if (e.target.nodeName !== 'I') return;
	e.target.parentNode.parentNode.classList.toggle('is-flip');
});


var inputs = document.querySelectorAll('.contact__input');
console.log(inputs)

for (var i = 0; i < inputs.length; i++) {
	inputs[i].addEventListener('focus', function(e) {
		e.target.parentNode.classList.add('is-active', 'is-completed');
	});

	inputs[i].addEventListener('blur', function(e) {
		e.target.parentNode.classList.remove('is-active');

		if (e.target.value === '') {
			e.target.parentNode.classList.remove('is-completed');
		}
	});
}


var textarea = document.querySelector('.is-textarea');
var offset = textarea.offsetHeight - textarea.clientHeight;

textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + offset + 'px';
}, false);