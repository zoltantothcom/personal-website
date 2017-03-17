window.addEventListener('load', function() {
	document.querySelector('.console').classList.add('visible');
	document.getElementById('console__input').focus();
});

var messages = {
	help: 'List of available commands:<br><span class="console__warning">--about</span> .....shows a really short bio',
	default: 'is not recognized as an internal or external command.',
	commands: {
		about:   'A really short bio',
		social:  'Links to social accounts(LinkedIn, StackOverflow, GitHub)',
		contact: 'Email and phone to contact me',

		help:  'List the available commands',
		clean: 'Clean the console window',
		close: 'Close the console'
	}
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
					self.output(command);
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
					console.log('<span class="console__error">\'' + command + '\' ' + messages.default + '</span>');
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

Console.prototype.output = function(command) {
	var div = document.createElement('p');
	div.innerHTML = '> ' + command + '<br>';
	div.innerHTML += messages.help;

	document.querySelector('.console__message-area').appendChild(div);
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