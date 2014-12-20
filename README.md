coffee-project
==============

A gulp based project for coffee-script, copied from the awesome [id-project](https://github.com/Industrial/id-project) by [Industrial](https://github.com/Industrial)

## Installation

```bash
$ npm install --save-dev coffee-project gulp coffee-script
```

## Usage

1. Put a file named `gulpfile.coffee` in your project directory containing:

```coffee
  (require "id-project")
    documentation: enabled: false # still has a bug
    livereload:    enabled: true
    browserify:    enabled: true
    clean:         enabled: true
    copy:          enabled: true
    less:          enabled: true
    watch:         enabled: true
    forever:       enabled: true
    tests:         enabled: true
```

2. Run gulp:

	```bash
	$ gulp
	```
