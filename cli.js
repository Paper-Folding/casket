#!/usr/bin/env node
'use strict'

const mri = require('mri')
const casket = require('./lib')

const help = `
Usage:
    casket [--name my-little-server] [--dir ~/path/to/dir]

Options:
    --name      -n  The name of the server, as shown in the GUI.
    --dir       -d  The directory to serve, default is the current directory.
    --readonly  -r  Do not allow deletion of files & uploads.
    --no-delete -w  Do not allow deletion of files.
    --no-upload -u  Do not allow file upload.
    --port      -p  Default is 8000.
`



const argv = mri(process.argv.slice(2), {
    boolean: ['help', 'h', 'readonly', 'r', 'no-delete', 'w', 'no-upload', 'u']
})

if (argv.help || argv.h) {
    process.stdout.write(help)
    process.exit(0)
}

const name = argv.name || argv.n || 'root'
const port = +(argv.port || argv.p || process.env.PORT || 8000)



const app = casket({
      name
    , root: argv.dir  || argv.d || process.cwd()
    , readonly: argv.readonly || argv.r || false
    , noDelete: argv['delete'] === false || argv.w || false
    , noUpload: argv['upload'] === false || argv.u || false
})
app.listen(port)