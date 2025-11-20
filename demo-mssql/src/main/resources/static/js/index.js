var G_MainRoot = location.origin + "/test-system"; // >> http://localhost:8086 + /test-system
(function ($) {

	// menu switch page
	let items = document.getElementsByName('menuBtn');
	for (let i = 0; i < items.length; i++) {
		items[i].onclick = function (){
			$('#iframe-page').show()
			$('#index-content').hide()
			let src = items[i].getAttribute('data-src')
			document.getElementById('iframe-page').setAttribute('src', src) // init iframe-page by src
			
		}
	}

	$('#iframe-page').hide()
	//$('#index-content').show()

	$('#indexBtn').on('click', function(){
		window.location.href = G_MainRoot + '/index'; // 替換為你要跳轉的網址
	})
	$('#logoutBtn').on('click', function(){
		window.location.href = G_MainRoot + '/'; // 替換為你要跳轉的網址
	})

	// document.cookie = 'test1440=000';
    // console.log('index document.cookie: ', document.cookie);
	// console.log('index document.cookie.account: ', getWebCookie('account'));

	// 檢查權限
	let account = getLoginAccountByCookie()
	// console.log('account: ', account);
    

})(jQuery);