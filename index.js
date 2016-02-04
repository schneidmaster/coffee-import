var os = require('os');

module.exports = function(source) {
  var transpiledLines = source.split(os.EOL).map(function(line) {
    if(line.trim().substr(0, 7) === 'import ') {
      // Determine what kind of import this is.
      var cutLine = line.substr(6).trim().split(/\s+/).join(' ');
      if(cutLine.substr(0, 1) === '*') {
        // Import everything
        cutLine = cutLine.substr(4).trim();
        cutLine = cutLine.split('from');
        var moduleName = cutLine.shift().trim();
        var packageName = cutLine.shift().trim();

        return moduleName + ' = require(' + packageName + ')';
      }
      else if(cutLine.substr(0, 1) === '{') {
        // Import the listed modules
        var packageList = cutLine.substr(1, cutLine.indexOf('}') - 1).split(',');
        var packageName = cutLine.split('from')[1].trim();

        var transpiledLine = '';
        packageList.forEach(function(moduleName) {
          if(transpiledLine !== '') {
            transpiledLine += os.EOL;
          }
          transpiledLine += moduleName.trim() + ' = require(' + packageName + ').' + moduleName.trim();
        });
        return transpiledLine;
      }
      else {
        // Default import
        cutLine = cutLine.split('from');
        var moduleName = cutLine.shift().trim();
        var packageName = cutLine.shift().trim();

        return moduleName + ' = require(' + packageName + ')';
      }
    }
    else {
      return line;
    }
  });
  return transpiledLines.join(os.EOL);
}
