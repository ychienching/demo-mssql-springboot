var G_MainRoot = location.origin + "/test-system"; // >> http://localhost:8086 + /test-system
var G_ver = '1120'

function buildTable($table, columns, dataList) {
	// text-nowrap搭配style="table-layout: fixed;" 才能修改欄位的寬度限制
	var tableClass = 'table table-hover table-bordered table-success text-nowrap';

	$table.bootstrapTable('destroy').bootstrapTable({ //Cassette Information   cassette
		data: dataList,
		columns: columns,
		classes: tableClass,
		uniqueId: 'id',
		cache: false,
		// minWidth: 20,
		// maxWidth: 40,
		// width: 1000,
		headerStyle: {css: { 'color': 'blue' ,'text-align':'center'}},
		sortable: true,
		search: true,
		// searchAlign: 'left',
		// showColumns: true,
		// showColumnsToggleAll: true,
		// showPaginationSwitch: true,
		// clickToSelect: true,
		searchHighlight: true,
		stickyHeader: true, //往下scroll時，固定Header顯示
		// showRefresh: true,
		pagination: true,
		pageSize: 5,
		pageList: [5, 10, 20],
		toolbar: '#toolbar',
		locale: 'en-US',
		showExport: true,     //是否顯示匯出
		exportDataType: 'basic',	//匯出資料型別，支援：'基本'，'全部'，'選中'
		exportTypes:['json', 'csv', 'excel', 'xlsx'], //, 'png'
	});

}

function getWebCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function getLoginAccountByCookie(){
	let account = ''

	$.ajax({
		type: "GET",
		url: G_MainRoot + '/getAccountCookie',
		// dataType: "json",
		// contentType:"application/json",
		// contentType:'application/x-www-form-urlencoded; charset=UTF-8', //default
		// data: JSON.stringify(data),
		// data: data,
		async: false,
		success: function(rs) {
			// alert('getAccountCookie rs: ' + rs);
			// console.log('getAccountCookie rs: ', rs);
			account = rs
		},
		error: function(xhr, status, error) {
			alert('登入已過期，請重新登入! ' + error);
			// console.log('error: ', error);

			//cookie過期則會來到error  這裡跳轉登入畫面
			window.location.href = G_MainRoot + '/';
		},
	});// ajax

	return account;
}

function deleteAccountCookie(){

	$.ajax({
		type: "GET",
		url: G_MainRoot + '/deleteAccountCookie',
		// dataType: "json",
		// contentType:"application/json",
		// contentType:'application/x-www-form-urlencoded; charset=UTF-8', //default
		// data: JSON.stringify(data),
		// data: data,
		async: false,
		success: function(rs) {
			// alert('deleteCookie rs: ' + rs);
			console.log('deleteCookie rs: ', rs);
			
		},
		error: function(xhr, status, error) {
			console.log('error: ',error);
		},
	});// ajax

	return ;
}