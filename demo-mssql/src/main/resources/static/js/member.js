// 全域變數
var $table = $("#memberTable");

(function ($) {
    /* 1. Query initial config and setting */
	QueryInitSetting();
	/* 2. Initialize page dom/event/plugin */
	PageInit();
	/* 3. Execute functions (none, one or several)  */  
    

})(jQuery);

function QueryInitSetting() {
    let data = {
        Account: 'Jack'
    }

    $.ajax({
        type: 'POST',
        url: G_MainRoot + '/member/all',
        // dataType: 'json',
        contentType:'application/json', //傳去格式 default: Content type 'application/x-www-form-urlencoded;charset=UTF-8'
        data: JSON.stringify(data),
        async: false,
        success: function(result) {
            console.log('/member/all result: ',result);
            
            buildTable($table, buildTableColumns(), result.sqlData);
            // var obj = JSON.parse(rs);
            // console.log('obj: ',obj);
        },
        error: function(xhr, status, error) {
            console.log('error: ',error);
        },
    });
}

function buildTableColumns() {
    let hasPermission = getPermission();
	columns = [
		{ field: 'state', checkbox: true, width: 10},
		{ field: 'id', title: 'ID', width: 15, sortable: true, visible: false},
        { field: 'account', title: 'Account', width: 30, sortable: true},
        { field: 'member', title: 'Member', width: 15, sortable: true,
            formatter: function(value, row, index){
                if(value === 1){
                    return '<span class="text-dark">Enable</span>';
                } else if(value === 0){
                    return '<span class="text-danger">Disable</span>';
                } else {
                    return 'Unknown!'
                }
            }
        },
        { field: 'report', title: 'Report', width: 15, sortable: true,
            formatter: function(value, row, index){
                if(value === 1){
                    return '<span class="text-dark">Enable</span>';
                } else if(value === 0){
                    return '<span class="text-danger">Disable</span>';
                } else {
                    return 'Unknown!'
                }
            }
        },
        { field: 'test', title: 'Test', width: 15, sortable: true,
            formatter: function(value, row, index){
                if(value === 1){
                    return '<span class="text-dark">Enable</span>';
                } else if(value === 0){
                    return '<span class="text-danger">Disable</span>';
                } else {
                    return 'Unknown!'
                }
            }
        },
		// { field: 'firstName', title: 'FirstName', width: 30, sortable: true},
		// { field: 'lastName', title: 'LastName', width: 30, sortable: true},
		// { field: 'address', title: 'Address', width: 30, sortable: true},
		// { field: 'city', title: 'City', width: 15, sortable: true},
        { field: 'operate', title: 'Action', width: 20, visible: hasPermission,
            formatter: function(value, row, index){
                // console.log('row: ',row)
                var html = '';
                html += '<button class="btn btn-primary" onClick="showEditModal('+row.id+')">Edit</button>'
                // html += '<button class="btn btn-danger" >Delete</button>'
                return html;
            }
        }
	];
    return columns;
}

function getPermission(){
    let hasPermission = false
    // 檢查權限
	let account = getLoginAccountByCookie()
	$.ajax({
        type: 'POST',
        url: G_MainRoot + '/member/getPermission',
        // dataType: 'json',
        contentType:'application/json', //傳去格式 default: Content type 'application/x-www-form-urlencoded;charset=UTF-8'
        data: account,
        async: false,
        success: function(result) {
            console.log('/member/getPermission result: ', result);
            hasPermission = result;
            // var obj = JSON.parse(rs);
            // console.log('obj: ',obj);
        },
        error: function(xhr, status, error) {
            console.log('error: ',error);
        },
    });

    return hasPermission
}
		

function testS() {
    // editModal.hide();
    $('#editModal').modal('hide');
}

function showAddModal() {
    $('#editModal').modal('show');
    $('.modal-header').text('Add')

    $('#editModal input[name=id]').val('');
    $('#editModal input[name=account]').val('');
    // $('#editModal input[name=account]').removeAttr("readonly");
    $('#editModal input[name=account]').prop("readonly", false); // Remove readonly

    //Multiple select init選項
    $('#mySelect').each(function() {
        $(this).val(null).trigger('change');
    });

    //調整width使placeholder正常顯示
    $('.select2-search__field').css('width','200px');
}

function showEditModal(id) {
    $('#editModal').modal('show');
    $('.modal-header').text('Edit')
    $('#editModal input[name=account]').prop("readonly", true); // Set readonly
    
    //取得選取的編輯資料
    var rowData = $table.bootstrapTable('getRowByUniqueId', id);
    // console.log('rowData: ', rowData);
    
    $('#editModal input[name=id]').val(rowData.id);
    $('#editModal input[name=account]').val(rowData.account);
    
    let selected = []
    let invalidKeys = ['id','account','state']
    let keys = Object.keys(rowData);

    $.each(keys, function(index, key) {
        let value = rowData[key];
        // console.log('key: ' , key)
        // console.log('value: ' , value)
        // 非無效keys,且為啟用1
        if(!invalidKeys.includes(key) && 1 === value)selected.push(key)
    });

    //Multiple select載入啟用選項
    $('#mySelect').each(function() {
        $(this).val(selected).trigger('change');
    });

    //調整width使placeholder正常顯示
    $('.select2-search__field').css('width','200px');
}

function saveEdit() {
    let saveData = {
        id: $('#editModal input[name=id]').val(),
        account: $('#editModal input[name=account]').val(),
    }

    var test1 = $('#editModal select[name=states]').val();
    var test2 = $('#mySelect').val()
    
    console.log('test1: ', test1)
    console.log('test2: ', test2)

    let selected = $('#mySelect').val()
    $.each(selected, function(index, value) {
        saveData[value] = 1;// 1啟用 0停用
        // saveData.push(obj)
        // Object.assign(saveData, obj)
    });

    console.log('saveData+: ', saveData)

    $.ajax({
        type: 'POST',
        url: G_MainRoot + '/member/saveMember',
        // dataType: 'json',
        contentType:'application/json', //傳去格式 default: Content type 'application/x-www-form-urlencoded;charset=UTF-8'
        data: JSON.stringify(saveData),
        async: false,
        success: function(result) {
            console.log('/member/saveMember result: ', result);
            QueryInitSetting()
            $('#editModal').modal('hide');
            // var obj = JSON.parse(rs);
            // console.log('obj: ',obj);
        },
        error: function(xhr, status, error) {
            console.log('error: ',error);
        },
    });

}


function PageInit() {
    var editModal = new bootstrap.Modal(document.getElementById('editModal'), {
		//設定點擊 遮罩範圍(Modal以外的地方) 觸發怎樣的行為   static:保持modal視窗不關閉    false:關閉遮罩  true:啟用遮罩且點擊會關閉Modal
		backdrop: 'static', 
		keyboard: true //設定ESC是否能關閉Modal
	})
    // editModal.show();

    $('#mySelect').select2({
        dropdownParent: $("#editModal"), //顯示優先於指定物件
        placeholder: 'Please select permission',
        tags: true,
        allowClear: true,
        //JSON寫法
		data: [
			{
			"id": 'member',
			"text": "Member",
            // "selected": true,
			},
			{
			"id": 'report',
			"text": "Report",
			// "selected": false,
			},
			{
			"id": 'test',
			"text": "Test",
			// "disabled": true
			}
		],
        tokenSeparators: [',', ' ']
    });

    $('#deleteBtn').click(function() {
        var selectedRows = getRowSelections($table);
        console.log(selectedRows)
        var selectedItemsText = '\n';
        var selectedId = [];
        $.each(selectedRows, function(index, value) {
            selectedItemsText += value.account + ', '; // Access the 'name' property of the selected row object
            selectedId.push(value.id)
            // selectedId.push(String(value.id))
        });
        selectedItemsText = selectedItemsText.slice(0, -2)
        Swal.fire({
            title: 'You will delete selected,\nAre you sure?',
            text: selectedItemsText,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: '<i class="fa fa-trash-o"></i> Delete!',
            confirmButtonColor: "#d63030ff",
            //draggable: true //可拖曳
        }).then((result) => {
            if (result.isConfirmed) {
                DeleteData(selectedId)
            }
        });
        console.log('The following products are selected: ' + selectedItemsText);
    });
}

function getRowSelections($table) {
    return $.map($table.bootstrapTable('getSelections'), function(row) {
        return row;
    });
}

function DeleteData(selectedId) {
    console.log('DeleteData: ', selectedId);
    let array = []
    $.each(selectedId, function(index, value) {
        let obj = {id: value}
        array.push(obj)
    });
    console.log('array: ', array);

    let event = '/member/deleteMember';
    // ajax
    $.ajax({
        type: 'POST',
        url: G_MainRoot + event,
        // dataType: 'json',
        contentType:'application/json', //傳去格式 default: Content type 'application/x-www-form-urlencoded;charset=UTF-8'
        data: JSON.stringify(selectedId),
        // data: selectedId,
        async: false,
        success: function(rs) {
            console.log(event + ' result: ', rs);
            if('Success' === rs.result){
                QueryInitSetting()
            }
            // var obj = JSON.parse(rs);
            // console.log('obj: ',obj);
        },
        error: function(xhr, status, error) {
            console.log(event + 'error: ',error);
        },
    });

}

