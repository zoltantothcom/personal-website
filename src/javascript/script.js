window.addEventListener('load', function() {
	document.querySelector('.console').classList.add('visible');
	document.getElementById('console__input').focus();
});

var messages = {
	default: [
		'type <span class="console__success">-h</span> or <span class="console__success">help</span> and press Enter for available commands'
	],
	error: [
		' is not recognized as a valid command.'
	],

	help: [
		'<span class="console__success">-a</span> or <span class="console__success">about</span> ... A really short bio',
		'<span class="console__success">-s, social</span> .. Links to LinkedIn, StackOverflow, GitHub',
		'<span class="console__success">-c, contact</span> . Email and phone for quick contact',
		'<span class="console__success">-h, help</span> .... Available commands',
		'',
		'<span class="console__success">-x, exit</span> .... Close this window',
		'<span class="console__success">-m, hide</span> .... Minimize this window',
		'<span class="console__success">-d, clean</span> ... Clean this window',
	],

	social: [
		'<a href="" class="console__info">LinkedIn</a>',
		'<a href="" class="console__info">StackOverflow</a>',
		'<a href="" class="console__info">GitHub</a>'
	],

	about: [
		'Front End Developer. Toronto.'
	],

	contact: [
		'contact@zoltantoth.com',
		'416-402-3404'
	]
};

var Console = function() {
	var input   = document.querySelector('.console input'),
		command = '',
		self = this;

	self.history = [];

	self.addListener('.console__button--cls', 'click', self.close);
	self.addListener('.console__button--min', 'click', self.hide);
	self.addListener('.console__button--max', 'click', self.show);

	// show default message to help start using the console
	self.output('default');

	input.addEventListener('keyup', function(e) {
		// 38 - arrow up
		// 40 - arrow down
		if (e.keyCode === 38) {
			input.value = self.history[0] || '';
		} else if (e.keyCode === 13) {
			command = input.value;

			switch (command) {
				case '-d':
				case 'clean':
					self.clean();
					break;

				case '-m':
				case 'hide':
					self.hide();
					break;

				case '-p':
				case 'show':
					self.show();
					break;

				case '-x':
				case 'exit':
					self.close();
					break;

				default:
					self.output(command);
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

	if (command !== 'default') {
		// push the command to the history array
		this.history.unshift(command);

		// show the command
		div.innerHTML = '> ' + command + '<br>';
	}

	switch (command) {
		case '-a':
			command = 'about';
			break;
		case '-s':
			command = 'social';
			break;
		case '-c':
			command = 'contact';
			break;
		case '-h':
			command = 'help';
			break;
		default:

	}

	if (messages[command]) {
		var size = messages[command].length;

		for (var i = 0; i < size; i++) {
			div.innerHTML += messages[command][i] + '<br>';
		}
	} else {
		div.innerHTML += '<span class="console__error">ERROR! '+ '\''  + command + '\'' + messages.error + '</span>';
	}

	document.querySelector('.console__message-area').appendChild(div);

	var container = document.querySelector('.console__window');

	// always scroll to bottom
	container.scrollTop = container.scrollHeight;
};

Console.prototype.clean = function() {
	document.querySelector('.console__message-area').innerHTML = '';
	this.output('default');
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