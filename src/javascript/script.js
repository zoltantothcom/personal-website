window.onload = function() {

};

// portfolio
document.querySelector('.Portfolio').addEventListener('click', function(e) {
	if (e.target.nodeName !== 'I') return;
	e.target.parentNode.parentNode.classList.toggle('is-flip');
});


document.getElementById('name').addEventListener('focus', function(e) {
	e.target.parentNode.classList.add('is-active', 'is-completed');
});
document.getElementById('name').addEventListener('blur', function(e) {
	e.target.parentNode.classList.remove('is-active');
});