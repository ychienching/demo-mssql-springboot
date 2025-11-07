var G_MainRoot = location.origin + "/test-system/";

$(function () {
	/* 1. Query initial config and setting */
	//QueryInitSetting();
	/* 2. Initialize page dom/event/plugin */
	PageInit();
	/* 3. Execute functions (none, one or several)  */
  
  
});


  
function PageInit() {
	var testModal = new bootstrap.Modal(document.getElementById('testModal'), {
		backdrop: 'static', //設定click Modal以外的地方 觸發怎樣的行為
		keyboard: true //設定ESC是否能關閉Modal
	})

	$('#openBtn').click(function () {
		testModal.show();
		//testModal.handleUpdate();
	})

	var lastName = window.localStorage.getItem("lastName1");// data from main.js
	var url = G_MainRoot   + 'test/initOrder';
	console.log("url: " + url);
	console.log("lastName: " + lastName);

	var data = {
		lastName: lastName,// go_order_lastName from main.js
	};

	//不導頁，傳接參數
	$.ajax({
		type: "POST",
		url: url,
		async: true,
		// dataType: "json",
		contentType:"application/json", //傳去data格式化 default: Content type 'application/x-www-form-urlencoded;charset=UTF-8'
		data: JSON.stringify(data),
		success: function(rs) {
			console.log('rs: ',rs);
			// var obj = JSON.parse(rs);
			// console.log('obj: ',obj);
			buildTable(rs.myTestModelList);
		},
		error: function(xhr, status, error) {
			console.log('error: ',error);
		},
	});
}

function buildTable(dataList) {
	var tableClass = 'table table-hover table-bordered text-sm';
	// var dataList = _CST_INFO_OBJ[pk]
	var columns = [];

	columns = [
		{ field: 'id', title: 'ID', sortable: true},
		{ field: 'firstName', title: 'FirstName', sortable: true},
		{ field: 'lastName', title: 'LastName', sortable: true},
		{ field: 'address', title: 'Address', sortable: true},
		{ field: 'city', title: 'City', sortable: true},
	];

	$("#testTable").bootstrapTable('destroy').bootstrapTable({ //Cassette Information   cassette
		columns: columns,
		classes: tableClass,
		data: dataList,
		sortable: true,
		// search: true,
		// searchAlign: 'left',
		// showColumns: true,
		// showColumnsToggleAll: true,
		// showPaginationSwitch: true,
		pagination: true,
		pageSize: 5,
		pageList: [5, 10, 20],
		//toolbar: "#toolbar",
		locale: "en-US",
	});

}


