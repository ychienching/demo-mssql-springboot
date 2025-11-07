
(function ($) {
    // var G_MainRoot = "/test-system/";
    var G_MainRoot = location.origin + "/test-system/";
    $('.spinner-border').hide();
    // var G_MainRoot = location.pathname;
    // pathname: "/test-system/test/index2"

    
    $('#signUpBtn').on('click',function(){ //前端畫面更新方式: save > project build > 畫面重整
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

    	console.log('Sign Up');
        $('.spinner-border').show();// spinner-border
		
		var data = {
			username: $("input[name='username']").val(),
			password: $("input[name='password']").val(),
		};
        console.log('data: ',data);

        //不導頁，傳接參數
        $.ajax({
            type: "POST",
            url: G_MainRoot + 'signUp',
            // dataType: "json",
            contentType:"application/json", //傳去格式 default: Content type 'application/x-www-form-urlencoded;charset=UTF-8'
            data: JSON.stringify(data),
            success: function(rs) {
                console.log('rs: ',rs);
                $('.spinner-border').hide();
                if(rs.result==='Success'){
                    Swal.fire({
                        title: rs.result,
                        icon: "success",
                        //draggable: true //可拖曳
                    }).then((result) => {
                        if (result.isConfirmed) {
                            //window.location.href = G_MainRoot;
                            setTimeout(function() {
                                window.location.href = G_MainRoot; // 替換為你要跳轉的網址
                            }, 3000);
                        }
                    });
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
    });

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
    
    

})(jQuery);