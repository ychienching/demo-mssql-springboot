
(function ($) {
    // var G_MainRoot = "/demo-sqlserver/";
    var G_MainRoot = location.origin + "/demo-sqlserver/";
    
    // var G_MainRoot = location.pathname;
    // pathname: "/demo-sqlserver/test/index2"

	// menu switch page
	let items = document.getElementsByName('menuBtn');
	for (let i = 0; i < items.length; i++) {
		items[i].onclick = function (){
			$('#iframe-page').show()
			$('#index-data').hide()
			let src = items[i].getAttribute('data-src')
			document.getElementById('iframe-page').setAttribute('src', src)
			
		}
	}

	$('#iframe-page').hide()
	//$('#index-data').show()

	$('#indexBtn').on('click', function(){
		window.location.href = G_MainRoot + 'index'; // 替換為你要跳轉的網址
	})

    $('#queryBtn').on('click',function(){ //前端畫面更新方式: save > project build > 畫面重整
    	console.log('test Query');
    	let userJSON = '{"ID": "18", "NAME": "9TestName", "ADDRESS": "9TestAddress", "CITY": "9TestCity"}';
		let userObj = JSON.parse(userJSON);
		console.log("user.ID: " + userObj.ID + ', user.NAME: ' + userObj.NAME);
		
		var data = {
			id: "99",
			name: "TestName",
		};
		// var data = [
		// 	{
		// 		id: "17",
		// 		name: "TestName",
		// 	},
		// 	{
		// 		id: "17",
		// 		name: "TestName",
		// 	},
		// ]

        //不導頁，傳接參數
       $.ajax({
	        type: "POST",
	        url: G_MainRoot + 'test/query',
	        // dataType: "json",
			contentType:"application/json", //傳去格式 default: Content type 'application/x-www-form-urlencoded;charset=UTF-8'
	        data: JSON.stringify(data),
	        success: function(rs) {
                console.log('rs: ',rs);
	        	// var obj = JSON.parse(rs);
	            // console.log('obj: ',obj);
	        },
	        error: function(xhr, status, error) {
	        	console.log('error: ',error);
	        },
	    });
    });

    $('#goOrderBtn').on('click',function(){
		document.cookie = "username=" + username;
		document.cookie = "favorite_food=tripe";
    	console.log('test Go Order');
		//getItem()/setItem()/removeItem()
		// window.localStorage.setItem("username", username);
		// window.sessionStorage.setItem("username", username);
		

		// http://localhost:8081/demo-maven/qqqq/indexx + /query
		// var url = location.href + '/go/order';

        // http://localhost:8081 + /demo-maven + /test/go/order...
        var url = G_MainRoot + 'test/go/order?lastName=index_lastName'
		console.log("url: " + url);

        //導頁
		location.href = url; //type GET
		
        //不導頁，傳接參數
        // url = "http://localhost:8081/demo-maven/products"
        // $.ajax({
	    //     type: "POST",
	    //     url: url,
	    //     // dataType: "json",
	    //     data: {
	    //         id:"B0006",
        //         name: "Enterprise",
        //         price: 460
	    //     },
	    //     success: function(rs) {
        //         console.log('rs: ',rs);
	    //     	//var obj = JSON.parse(rs);
	    //         //console.log('obj: ',obj);
	    //     },
	    //     error: function(xhr, status, error) {
	    //     	console.log('error: ',error);
	    //     },
	    // });

    });
    
    $('#dbBtn2').on('click',function(){
    	console.log('test Save');
        $.ajax({
	        type: "POST",
	        url: G_MainRoot + 'test/save',
	        //dataType: "json",
	        data: {
	            event: "SAVE_MY_TEST",
	        },
	        success: function(rs) {
	            console.log('rs: ',rs);
	        },
	        error: function(xhr, status, error) {
	        	console.log('error: ',error);
	        },
	    });
    });
    
    $('#dbBtn3').on('click',function(){
    	console.log('test Delete');
        $.ajax({
	        type: "POST",
	        url: G_MainRoot + 'test/delete',
	        //dataType: "json",
	        data: {
	            _event: "PART_NO_BY_MODEL_NO",
	        },
	        success: function(rs) {
	            console.log('rs: ',rs);
	        },
	        error: function(xhr, status, error) {
	        	console.log('error: ',error);
	        },
	    });
    });

	$('#goSamplingBtn').click( function(){
    	console.log('test Sampling Page');

        // http://localhost:8081 + /demo-maven + /test/go/sampling...
        var url = G_MainRoot + 'test/go/sampling?lastName=index_lastName'
		console.log("url: " + url);

        //導頁
		location.href = url; //type GET

    });
    

})(jQuery);