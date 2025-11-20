var G_MainRoot = location.origin + "/test-system"; // >> http://localhost:8086 + /test-system
(function ($) {

    //$('.validate-form').on('submit',function(){});
    // document.cookie = "account=" + '0';// 紀錄登入帳號歸0
    console.log('login document.cookie: ', document.cookie);
    // document.cookie = 'max-age=5';
    // document.cookie = 'test1410=111';

    //初始化登入帳號
    deleteAccountCookie();
    

    $('#testBtn').on('click', function(){
        let account = $("input[name='account']").val();

        setAccountCookie(account)
        
    })

    $('#test2Btn').on('click', function(){

        let account = getLoginAccountByCookie()
        console.log('login account: ', account);
    })


	$('#loginBtn').on('click', function(){
		//[ Validate ]
		var input = $('.validate-input .input100');
		var checkSuccess = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                checkSuccess=false;
            }
        }

        if(!checkSuccess) return;
		var data = {
			account: $("input[name='account']").val(),
			password: $("input[name='password']").val(),
		};
        console.log('data: ',data);
        
        $.ajax({
            type: "POST",
            url: G_MainRoot + '/login',
            // dataType: "json",
            // true  = 非同步 > 可同時處理其他程式碼 (default)
            // false = 同步   > 需等待response才會進行下一步
            async: false,
            contentType:"application/json", //傳去格式 default: Content type 'application/x-www-form-urlencoded;charset=UTF-8'
            data: JSON.stringify(data),
            success: function(rs) {
                console.log('rs: ',rs);
                $('.spinner-border').hide();
                if(rs.result==='Success'){
                    setAccountCookie(data.account)
                    // document.cookie = "account=" + data.account;
                    window.location.href = G_MainRoot + '/index'; // 替換為你要跳轉的網址
                    /*
                    Swal.fire({
                        title: rs.result,
                        icon: "success",
                        //draggable: true //可拖曳
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = G_MainRoot + '/index'; // 替換為你要跳轉的網址
                        }
                    });
                    */
                } else {
                    Swal.fire({
                        title: rs.result,//顯示錯誤訊息
                        icon: "error",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            //
                        }
                    });
                }
            },
            error: function(xhr, status, error) {
                console.log('error: ',error);
            },
        });// ajax

	})

    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

	//檢核英文數字
    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    function setAccountCookie(account){
        var data = {
			account: account,
		};
        $.ajax({
            type: "GET",
            url: G_MainRoot + '/setAccountCookie',
            // dataType: "json",
            // contentType:"application/json",
            // contentType:'application/x-www-form-urlencoded; charset=UTF-8', //default
            // data: JSON.stringify(data),
            data: data,
            async: false,
            success: function(rs) {
                console.log('setAccountCookie rs: ',rs);
                
            },
            error: function(xhr, status, error) {
                console.log('error: ',error);
            },
        });// ajax
    }
    
    
})(jQuery);