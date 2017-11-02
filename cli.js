#!/usr/bin/env node
'use strict'

const mri = require('mri')
const bonjour = require('bonjour')()
const casket = require('./lib')

const help = `
Usage:
	casket [--name my-little-server] [--dir ~/path/to/dir]

Options:
    --name     -n  The name of the server, as shown in the GUI.
    --dir      -d  The directory to serve, default is the current directory.
    --readonly -r  Do not allow deletion of files & uploads.
    --nodelete -w  Do not allow deletion of files.
    --port     -p  Default is 8000.

`



const argv = mri(process.argv.slice(2), {
	boolean: ['help', 'h', 'readonly', 'r']
})

if (argv.help || argv.h) {
	process.stdout.write(help)
	process.exit(0)
}

const name = argv.name || argv.n || 'casket'
const port = +(argv.port || argv.p || process.env.PORT || 8000)



const app = casket({
	  name
	, root: argv.dir  || argv.d || process.cwd()
	, readonly: argv.readonly || argv.r || false
	, nodelete: arv.nodelete || argv.w || false
})
app.listen(port)

const service = bonjour.publish({name, type: 'http', port})
process.on('beforeExit', () => bonjour.unpublishAll())
