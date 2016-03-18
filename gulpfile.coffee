(require './src')
	bundle:        enabled: false
	documentation: enabled: false
	forever:       enabled: false
	nodemon:       enabled: false
	less:          enabled: false
	livereload:    enabled: false
	tests:         enabled: true
	copy:          enabled: true
	watch:         enabled: true
	coffee:
		enabled:             true
		sourceDirectoryPath: "src"
		targetDirectoryPath: "build"
