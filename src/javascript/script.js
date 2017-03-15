window.addEventListener('load', function() {
	document.querySelector('.console').classList.add('visible');
});

var messages = {
	help: 'List of available commands:',
	default: 'is not recognized as an internal or external command.'
};

var Console = function() {
	var input   = document.querySelector('.console input'),
		command = '',
		self = this;

	self.addListener('.console__button--cls', 'click', self.close);
	self.addListener('.console__button--min', 'click', self.hide);
	self.addListener('.console__button--max', 'click', self.show);

	input.addEventListener('keyup', function(e) {
		if (e.keyCode === 13) {
			command = input.value;

			switch (command) {
				case '--help':
				case   'help':
					console.log(messages.help);
					break;

				case '--clean':
				case   'clean':
					self.clean();
					break;

				case '--hide':
				case   'hide':
					self.hide();
					break;

				case '--show':
				case   'show':
					self.show();
					break;

				case '--close':
				case   'close':
					self.close();
					break;

				default:
					console.log('\'' + command + '\' ' + messages.default);
					console.log(messages.help);
			}

			input.value = '';
		}
	});

};

Console.prototype.addListener = function(elem, event, action) {
	document.querySelector(elem).addEventListener(event, function() {
		action();
	});
};

Console.prototype.clean = function() {
	document.querySelector('.console__message-area').innerHTML = '';
};

Console.prototype.hide = function() {
	document.querySelector('.console__window').style.height = '0';
};

Console.prototype.show = function() {
	document.querySelector('.console__window').style.height = '370px';
};

Console.prototype.close = function() {
	document.querySelector('.console').style.display = 'none';
};

var cmd = new Console();