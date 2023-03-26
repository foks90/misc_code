function showMeme() {
	const parent = document.querySelector('.main-content');
	let meme = document.createElement('img');
	let randMemeNumber = Math.floor(Math.random()*6);
	meme.setAttribute('src', 'memes/meme' + String(randMemeNumber) + '.jpg');
	meme.setAttribute('id', 'newMeme');
	meme.style.width = '400px';
	parent.insertBefore(meme,parent.querySelectorAll('div')[1]);
}