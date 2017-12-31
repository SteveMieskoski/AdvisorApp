var path = require('path');
var _root, _frontend;
switch (process.env.SYS_ENV) {
    case 'local':

        _root = path.resolve(__dirname, '..');
		_frontend = path.resolve(__dirname, '../../../screener');
		console.log('path helper env: local');
		console.log('_frontend calculated base path', _frontend);
        break;
    case 'remote':
        console.log('LOGNAME', process.env.LOGNAME);
        _root = path.resolve(__dirname, '/home/ubuntu');
        break;
    default:
        console.log('path helper env: none (i.e. default)');

        _root = path.resolve(__dirname, '..');
		_frontend = path.resolve(__dirname, '../../../screener');
		console.log('_frontend', _frontend);
        break;
}

//console.log('root helper root', _root);
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

function frontend(args) {
	args = Array.prototype.slice.call(arguments, 0);
	return path.join.apply(path, [_frontend].concat(args));
}

exports.frontend = frontend;
exports.root = root;

