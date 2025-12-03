var G_MainRoot = location.origin + "/test-system"; // >> http://localhost:8086 + /test-system
(function ($) {

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
	        url: G_MainRoot + '/test/query',
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

	$('#MultiValueMapBtn').on('click',function(){ //前端畫面更新方式: save > project build > 畫面重整
		// MultiValueMap
		let saveData = {
			account: 'ttt',
			member: 1,
			test: '1',
		}

		$.ajax({
			type: 'POST',
			url: G_MainRoot + '/test/MultiValueMap',
			// dataType: 'json',
			// contentType:'application/json', //傳去格式 default: Content type 'application/x-www-form-urlencoded;charset=UTF-8'
			// data: JSON.stringify(saveData),
			data: saveData,
			async: false,
			success: function(result) {
				console.log('/test/MultiValueMap result: ', result);
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
		

		// http://localhost:8086/test-system/qqqq/indexx + /query
		// var url = location.href + '/go/order';

        // http://localhost:8086 + /demo-maven + /test/go/order...
        var url = G_MainRoot + '/test/go/order?lastName=index_lastName'
		console.log("url: " + url);

        //導頁
		location.href = url; //type GET
		
        //不導頁，傳接參數
        // url = "http://localhost:8086/test-system/products"
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
	        url: G_MainRoot + '/test/save',
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
	        url: G_MainRoot + '/test/delete',
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

        // http://localhost:8086 + /demo-maven + /test/go/sampling...
        var url = G_MainRoot + '/test/go/sampling?lastName=index_lastName'
		console.log("url: " + url);

        //導頁
		location.href = url; //type GET

    });

})(jQuery);