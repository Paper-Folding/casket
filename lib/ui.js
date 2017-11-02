'use strict'

const read  = require('fs').readFileSync
const path  = require('path')
const h     = require('pithy')
const filesize = require('filesize')

const css = {
	  base:   read(path.join(__dirname, '../css/base.css'))
	, dir:    read(path.join(__dirname, '../css/dir.css'))
	, menu:   read(path.join(__dirname, '../css/menu.css'))
	, search: read(path.join(__dirname, '../css/search.css'))
	, upload: read(path.join(__dirname, '../css/upload.css'))
}
const js = {
	  fetch:  read(require.resolve('whatwg-fetch/fetch'))
	, delete: read(path.join(__dirname, '../js/delete.js'))
	, upload: read(path.join(__dirname, '../js/upload.js'))
}

const icon = read(path.join(__dirname, '../icon.png'))
const iconUrl = 'data:image/png;base64,' + icon.toString('base64')

const size = (bytes) => filesize(bytes, {
	spacer: '', round: 1,
	symbols: {B: 'b', KB: 'k', MB: 'm', GB: 'g', TB: 't'}
})



const head = (_) =>
	`<!DOCTYPE html><html>
	<head>
		<title>${_.name}/${_.path}</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<link rel="icon" href="/favicon.png">
		<style>${css.base}</style>
		<meta name="apple-mobile-web-app-title" content="${_.name}">
		<meta name="google" value="notranslate">
		<link rel="icon" sizes="144x144" href="${iconUrl}">
		<link rel="apple-touch-icon" href="${iconUrl}">
	</head>`

const partOfPath = (part, i, all) =>
	h.li(i === (all.length - 1) ? '.active' : null, [
		h.a({href: encodeURI(part.path)}, part.name)
	])

const menu = (_) =>
	`<style>${css.menu}</style>`
	+ h.div({id: 'menu'}, [
		h.ul({id: 'breadcrumb', class: 'container'},
			_.breadcrumb.map(partOfPath))
	])



const search = (_) =>
	`<style>${css.search}</style>`
	+ h.form({
		id: 'search', class: 'container',
		method: 'GET', action: _.path
	}, [
		h.input({
			id: 'search-query', name: 'q',
			type: 'text',
			placeholder: 'search this directory',
			value: _.query || ''
		})
	])
	+ `<script type="application/javascript">${js.search}</script>`



const upload = (_) =>
	`<style>${css.upload}</style>`
	+ h.form({
		id: 'upload', class: 'container',
		method: 'POST', action: _.path, enctype: 'multipart/form-data'
	}, [
		h.label({id: 'upload-files'}, [
			h.span({class: 'button'}, 'select files'),
			h.input({name: 'files', type: 'file', required: true, multiple: true})
		]),
		h.input({id: 'upload-submit', type: 'submit', value: 'upload'})
	])
	+ `<script type="application/javascript">${js.upload}</script>`



const playlist = (_) =>
	h.div({class: 'container'}, [
		h.a({class: 'button', href: _.path + '?playlist=true'}, 'playlist')
	])



const nameColumn = (file) =>
	h.td({class: 'file-name'}, [
		h.a({href: encodeURI(file.path)}, [
			file.name,
			file.isDir ? h.span({class: 'file-suffix'}, '/') : ''
		])
	])

const sizeColumn = (file) =>
	h.td({class: 'file-size'}, file.isDir ? '' : size(file.size))

const actionsColumn = (file) =>
	h.td({class: 'file-actions'}, [
		h.form({class: 'file-actions-delete',
			method: 'DELETE', action: encodeURI(file.path)}, [
			h.input({class: 'file-actions-delete-button', type: 'submit', value: 'delete'})
		])
	])

const file = (_) => (file) =>
	h.tr({class: 'file'}, [
		nameColumn(file),
		sizeColumn(file),
		(_.readonly || _['no-delete']) ? '' : actionsColumn(file)
	])



const ui = (_) =>
	  head(_)
	+ `<body>`
	+ menu(_)
	+ search(_)
	+ ((_.readonly || _['no-upload']) ? '' : upload(_))
	+ `<style>${css.dir}</style>

	<div id="directory" class="container">
		<table id="files" sortable>`
	+ _.files.map(file(_)).join('\n')
	+ `
		</table>
	</div>`
	+ playlist(_)
	+ `<script type="application/javascript">${js.fetch}</script>
	<script type="application/javascript">${js.delete}</script>
	</body></html>`

module.exports = ui
