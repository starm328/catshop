
/**
 * 存储首屏缓存
 */
function store()
{
	const dom= document.getElementById( 'app' );

	localStorage.setItem( '<page>'+location.href, dom.innerHTML );
}

export default {
	store,
}
