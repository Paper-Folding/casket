# *casket*

***casket* is an HTTP server** that supports `GET`, `POST` and `DELETE` requests. It can respond in HTML, JSON and plain text format, **the HTML-version being a file management UI**.

It also supports file search [using Spotlight](https://github.com/derhuerst/node-spotlight). For the specific needs of mine, it serves ad-hoc [M3U playlists](https://en.wikipedia.org/wiki/M3U) for any directory.

![casket serving a directory](demo.png)

[![npm version](https://img.shields.io/npm/v/casket.svg)](https://www.npmjs.com/package/casket)
[![dependency status](https://img.shields.io/david/derhuerst/casket.svg)](https://david-dm.org/derhuerst/casket)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/casket.svg)](https://david-dm.org/derhuerst/casket#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/casket.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Installing

```shell
npm install -g casket
```


## Usage

```
Usage:
	casket [--name my-little-server] [--dir ~/path/to/dir]

Options:
    --name      -n  The name of the server, as shown in the GUI.
    --dir       -d  The directory to serve, default is the current directory.
    --readonly  -r  Do not allow deletion of files & uploads.
    --no-delete -w  Do not allow delete of files (superceded by --readonly).
    --no-upload -u  Do not allow upload of files (superceded by --readonly).
    --port      -p  Default is 8000.
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/casket/issues).
