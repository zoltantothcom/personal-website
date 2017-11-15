window.onload = function() {

};

// portfolio
document.querySelector('.Portfolio').addEventListener('click', function(e) {
	if (e.target.nodeName !== 'I') return;
	e.target.parentNode.parentNode.classList.toggle('is-flip');
});