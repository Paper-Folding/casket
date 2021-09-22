const caption = document.querySelector('#span-upload')
const uploadInput = document.querySelector('#input-upload')
uploadInput.addEventListener('change', (e) => {
	const files = Array.from(e.target.files)
	if (files.length === 0) caption.innerHTML = 'select files'
	else caption.innerHTML = files.map((f) => f.name).join(', ')
	document.getElementById('upload-form').submit();
})
caption.addEventListener('click', () => {
	uploadInput.click();
})