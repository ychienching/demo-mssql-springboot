/* Initialize page variable */
/* 1. 設置本頁全域變數, 接收 PageLoader 傳遞值 */
var PageVar = {};
if ("PageLoader" in window) {
  PageVar = PageLoader.getPassParams();
  PageVar.processStage = PageLoader.processStage;
  PageLoader.setPassParams({});
}
else {
  if ('PassParam' in window && !$.isEmptyObject(PassParam)) {
    PageVar = PassParam;
    PassParam = {};
  }
  // 因應 MobileMQC 先硬碼
  PageVar.processStage = "ARRAY";
}

// 預設本頁動作為新增規則
if (!PageVar.hasOwnProperty("action") || $.isEmptyObject(PageVar.action)) {
  PageVar.action = "ADD";
}

/* 2. 設置本頁全域變數, 加入本頁使用全域變數 */
PageVar.priority = ""; // TRX 使用
PageVar.opSlot = { // 指定Sampling OP 抽檢 Slot
  listid: ["sampOpList_0"],
};

var G_Mqc_Root = "http://10.88.32.39:28500/libertango_mobile";

$(function () {
  /* 1. Query initial config and db setting */
  QueryInitSetting();
  /* 2. Initialize page dom/event/plugin */
  PageInit();
  /* 3. Execute functions (none, one or several)  */
});


function QueryInitSetting() {

  
  var url = location.origin + G_MainRoot   + 'test/initSampling';
	console.log("url: " + url);

	var data = {
		eqpId: "initSampling Test eqpId",
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

  $.ajax({
    type: "GET", async: true, cache: false, dataType: "json",
    url: G_Mqc_Root + "/db/MQuerySamplingDb.jsp",
    data: {
      processStage: PageVar.processStage,
      _event: "QUERY_INIT_RULE_EDIT"
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("QUERY_INIT_RULE_EDIT Ajax Fail: ", jqXHR);
    },
    success: function (result) {
      var errMsg = "";
      var dataList = [];

      // Abbr 選項
      dataList = result.abbrList;
      if (dataList.length == 0) {
        errMsg = errMsg + "<span data-i18n='not_found_abbr'>查無設定 Abbr</span><br>";
      }
      else {
        buildAbbrTable(dataList);
      }

      /* Slot Number*/
      dataList = result.slotNum;
      if (dataList.length == 0) {
        errMsg = errMsg + "<span data-i18n='not_found_slot_number'>查無設定 Slot 數量</span><br>";
      }
      else {
        //buildSlotOptionDiv(dataList[0]);
        buildNumberItemDiv($("#slotItemDiv"), dataList[0], "slotItem");
        buildNumberItemDiv($("#opSlotItemDiv"), dataList[0], "opSlotItem");
      }

      /* PEP and Sampling OP */
      if (result.pepList.length == 0) {
        errMsg = errMsg + "<span data-i18n='not_found_route_pep'>查無 Route PEP</span><br>";
      }
      else {
        var arr = result.pepList;
        var first = arr[0].pep;
        $("#pepPickDown").text(first).val(first);
        querySampOpByPep(first);

        var html = [];
        arr.forEach(function (item) {
          html.push('<li class="dropdown-item pepItem" ');
          //html.push(item.pep);
          html.push('>' + item.pep + '</li>');
        });
        $("#pepListUl").html(html.join(''));

        $(".pepItem").click(function () {
          var pep = $(this).text(); // 為什麼 li 用 val()不行喔, 只能用抓text

          //8.2.4
          $("#pepPickDown").text(pep).val(pep);
          querySampOpByPep(pep);
        });
      }

      if (errMsg.length !== 0) {
        setErrorMsgDiv("errMsgDiv", errMsg);
        alert("Init Rule Edit errMsg= " + errMsg);
      }
    }
  });
}

function PageInit() {
  // 他頁導入動作
  if (PageVar.action === "UPDATE" || PageVar.action === "EQP_ADD") {

    // 查詢RULE內容
    if (!$.isEmptyObject(PageVar.ruleSn)) querySettingUpdateData();

    if (PageVar.action === "UPDATE") {
      $("#newRuleBtn").text("From EQP : UPDATE");
    }
    else {
      $("#newRuleBtn").text("From EQP : ADD");
      PageVar.action = "ADD";
      $("#modelAbbrList").val("").text("(Optional)").removeClass("active").siblings().removeClass("active");
      // $("#logoffOP").val("").text("(Optional)").removeClass("active").siblings().removeClass("active");
    }

    // 設定 btn : 返回EQP
    $("[name=returnEqpBtn").show();
    // $("[name=returnEqpBtn").attr("data-eqpid", PageVar.eqpId);
    // $("[name=returnEqpBtn").attr("data-area", PageVar.area);
    
  }
  else {
    $("[name=returnEqpBtn").hide();
  }

  // btn : 返回 EQP 之動作
  $("[name=returnEqpBtn").click(function () {
    var param = {};
    // param.eqpId = $(this).data("eqpid");
    // param.area = $(this).data("area");
    param.action = "EQP_RETURN";
    param.isLotStart = "Y";

    var htmlStr = '<strong class="text-danger text-left text-lg">本頁內容不會保存</strong>';
    Swal.fire({
      title: '確定離開嗎?',
      html: htmlStr,
      icon: 'warning',
      iconColor: "orange",
      showCancelButton: true,
      confirmButtonText: 'Yes! 走吧!'
    }).then((result) => {
      if (result.isConfirmed) {
        if ("PageLoader" in window) {
          PageLoader.setSubFuncName("EqpRules");
          PageLoader.setPassParams(param);
          PageLoader.innerLoad();
        }
        else {
          window.PassParam = param;
          setLayoutPath("EqpRules");
          layout(subFuncDiv, surl);
        }
      }
    });
  });

  //車用預設Sampling OP List 為 multiple mode
  changeSampRouteMode("multiple");

  // 初始化 Start Time
  $('#ruleStartTimePicker').datetimepicker({
    format: "YYYY-MM-DD HH:00",
    allowInputToggle: true,
    useCurrent: true,
    buttons: {
      showToday: true,
      showClear: true,
      showClose: true
    }
  });
  // 初始化 End Time
  $('#ruleEndTimePicker').datetimepicker({
    format: "YYYY-MM-DD HH:00",
    allowInputToggle: true,
    useCurrent: false,
    buttons: {
      showToday: true,
      showClear: true,
      showClose: true
    }
  });
  // 決定 Start Time 時限定 End Time 起始時間
  $("#ruleStartTimePicker").on("change.datetimepicker", function (e) {
    $('#ruleEndTimePicker').datetimepicker('minDate', e.date);
  });

  // model Abbr OK
  $("#modelAbbrOK").click(function () {
    if ($("#modelAbbrPickedDiv").html().length > 0) {
      $("#modelAbbrList").addClass("active").siblings("label").addClass("active");

      var uniqueid = $(".abbrItem").attr("data-uniqueid");
      $("#modelAbbrList").val(uniqueid).html(uniqueid.replace("/$/", "<br>"));
      
      // 顯示指定 Sampling Route, 非自動分配/IDLE
      if ($("[name=autoAssignCstBtn].active").val() === "N") {
        $("#sampRouteIdDiv").fadeIn();
      }
    }
    else {
      $("[name=routeQBtn][value=N]").click();
      $("#sampRouteIdDiv").hide();

      $("#modelAbbrList").val("").text("(Optional)").removeClass("active");
      $("#modelAbbrList").siblings("label").removeClass("active");
    }

    $("#modelAbbrModal").modal("hide");

    // 查詢並顥示 Sampling Route 及 Panel Size
    $.each($("[name=sampOpList]"), function (idx, obj) {
      var listid = "#" + obj.id;
      querySampRouteFitPanelSize("COUNT", false, listid);
    });
  });
  // model Abbr Trash
  $("#modelAbbrList ~ label").click(function () {
    clearModelAbbr($("#modelAbbrMode").text(), "all");
    // 查詢並顥示 Sampling Route 及 Panel Size
    $.each($("[name=sampOpList]"), function (idx, obj) {
      var listid = "#" + obj.id;
      querySampRouteFitPanelSize("COUNT", false, listid);
    });
  });

  // Sampling OP List ok
  $("#sampOpOK").click(function () {
    var $obj = $(".samop");
    var samop = "", opArr = [];
    for (i = 0, len = $obj.length; i < len; i++) {
      samop = $obj.eq(i).attr("data-samop");
      if (opArr.indexOf(samop) === -1) opArr.push(samop);
    }
    var targetListId = $("#sampOpOK").attr("data-listid"); //ex: #sampOpList_0
    buildMutipleValueText($(targetListId), opArr);
    $("#sampOpModal").modal("hide");

    // 查詢並顥示 Sampling Route Count
    querySampRouteFitPanelSize("COUNT", false, targetListId);
  });

  // 增加 新的 Sampling Op List
  $("#plusSampOp").find("button").click(function () {
    var listid = plusOneSampOpList();
  });

  // 指定 Sampling Route Id : 打勾
  $("[name=routeQBtn]").click(function () {
    $("[name=routeQBtn].active").removeClass("active");
    $(this).addClass("active");

    if (this.value === "Y") {
      $("#sampRouteValueDiv").fadeIn();
      $("#sampRouteId").click();
    }
    else {
      $("#sampRouteValueDiv").hide();
      $("#sampRouteId").val("").text("").removeClass("active")
        .siblings().removeClass("active");
    }
  });
  // Sampling Route Id : choose
  $("#sampRouteId").click(function () {
    querySampRouteFitPanelSize("ROUTE", true, "#sampOpList_0");
  });
  // Sampling Route Id : OK
  $("#sampRouteIdOK").click(function () {
    var sampRouteId = $("#sampRouteTable .selected.bg-gradient-primary").data("uniqueid");

    if (!$.isEmptyObject(sampRouteId)) {
      $("#sampRouteId").val(sampRouteId).text(sampRouteId).addClass("active")
        .siblings().addClass("active");
    }
    else {
      $("[name=routeQBtn][value=N]").click();
    }
    $("#sampRouteModal").modal("hide");
  });

  // 指定 Sampling OP 抽檢 SLOT : 打勾
  $("[name=slotQBtn]").click(function () {
    $("[name=slotQBtn].active").removeClass("active");
    $(this).addClass("active");

    if (this.value === "Y") {
      $("#opSlotDefaultDiv, #opSlotValueDiv").fadeIn();
    }
    else {
      $("#opSlotDefaultDiv, #opSlotValueDiv").hide();
    }
  });

  // Modal Btn :  Use Default/ALL/Clear 動作
  $("#opslotAllBtn, #opslotResetBtn, #opslotDefaultBtn").click(function () {
    $("[name=opSlotItem], #opslotDefaultBtn").removeClass("active");
    if (this.id === "opslotAllBtn") {
      $("[name=opSlotItem]").addClass("active");
    }
    else if (this.id === "opslotDefaultBtn") {
      $(this).addClass("active");
    }
  });

  // #logoff Op Modal 選項
  $("#logoffOP").click(function () {
    var modelAbbrList = $("#modelAbbrList").val();
    var modelAbbrListInModal = $("#logoffOpModal").attr('data-modelAbbrList');
    //var eqpInOP = $("#eqpInOP").val();

    if (modelAbbrList === "") {
      Swal.fire({
        title: '請先選 Model Abbr',
        text: 'Please Select Model Abbr First!!',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }
    // 有換 eqpId 時候才重新 query db
    if (modelAbbrList !== modelAbbrListInModal) {
      //$("#eqpInOP").val(eqpId).text(eqpId);
      $("#logoffOpModal").attr('data-modelAbbrList', modelAbbrList);
      buildOpListModal();
    }

    $("#logoffOpModal").modal("show");
  });

  function clearLogoffOP() {
    $("#logoffOP").val("").text("(Optional)").removeClass("active");
    $("[name=logoffOpItem].active").removeClass("active");
    $("#logoffPickedDiv").empty();
    $("#logoffOP ~ label").removeClass("active");
  }
  // Logoff OP List OK
  $("#logoffOpOK").click(function () {
    var $obj = $(".logoffop");
    var offop = "", arr = [], i = 0, len = $obj.length;

    if (len > 0) {
      for (i = 0; i < len; i++) {
        offop = $obj.eq(i).attr("data-logoffop");
        arr.push(offop);
      }
      $("#logoffOP").val(arr.join(",")).text(arr.join(" , ")).addClass("active");
      $("#logoffOP ~ label").addClass("active");
    }
    else {
      clearLogoffOP();
    }

    $("#logoffOpModal").modal("hide");

  });
  // logoffOP 垃圾桶
  $("#logoffOP ~ label").click(function () {
    clearLogoffOP();
  });

  // btn : RuleType
  $("[name=ruleTypeBtn]").click(function () {
    var selector = "[name=" + $(this).attr("name") + "].active";
    $(selector).removeClass("active");
    $(this).addClass('active');
  });

  // btn : 抽匣順序
  $("[name=orderBtn]").click(function () {
    $("[name=orderBtn]").removeClass("active");
    $(this).addClass('active');
    if (this.value === "ASSIGN") {
      $("#odrValueDiv").fadeIn();
    }
    else {
      $("#odrReset").click();
      $("#odrValueDiv").hide();
    }
  });
  // 指定匣 : 選項展開與設定
  $("#orderValue").click(function () {
    var posInt = new RegExp("^[0-9]*[1-9][0-9]*$");
    var interval = $("#intervalInput").val();
    if (!posInt.test(interval)) {
      Swal.fire({
        title: '請輸入單回數批正整數',
        text: 'Please Input Positive Interval Number!!',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    var num = parseInt(interval);
    buildNumberItemDiv($("#odrItemList"), num, "odrItem");
    $("#odrCollapse").collapse("show");

    // orderValue 的值需要再設定 odrItem.acitve
    var odrs = $("#orderValue").val().split("-");
    if (odrs.length > 0) {
      odrs.forEach(function (item, idx) {
        $("[name=odrItem][value='" + item + "'").addClass("active");
      });
    }
  });
  // 指定匣選擇 OK
  $("#odrOK").click(function () {
    var cnt = setupChosenNumberValue($("#orderValue"), "odrItem");
    $("#odrCollapse").collapse("hide");
  });
  // 清空已選 odrItem 和 orderValue
  $("#odrReset").click(function () {
    $("[name=odrItem]").removeClass("active");
    $("#orderValue").val("").text("");
  });

  // btn : 執行回合, 跑他匣重數
  $("[name=roundBtn], [name=recalcBtn]").click(function () {
    var selectName = "[name='" + $(this).attr("name") + "']";
    $(selectName + ".active").removeClass("active");

    if ($(this).val() !== "N")
      $(selectName).not("[value=N]").addClass("active");
    else {
      $(selectName).not("[value=N]").val("");
      $(this).addClass("active");
    }
  });

  // btn : Chamber Type
  $("[name=chTypeBtn]").click(function () {
    $("[name=chTypeBtn].active").removeClass("active");
    $(this).addClass("active");
    $("#chQtyDiv, #chIdListDiv").hide();

    var chValue = $(this).val();
    if (chValue != "") {
      if (chValue === "AVERAGE") $("#chQtyDiv").fadeIn();
      else if (chValue === "ASSIGN") $("#chIdListDiv").fadeIn();
      // 只抽檢Process Sheet=NO 和 不手動指定Slot
      $("[name=onlyProcSheetBtn][value=N], [name=slotValueBtn][value=N]").click();
      $("#opSlotDefault").val("");
    }
  });

  // btn : Chamber ID List 失焦時, 去除每個ID的前後空白以逗點重組
  $("#chIdList").blur(function () {
    var str = this.value;
    this.value = $.map(str.split(","), $.trim).join(",");
  });

  // btn : 只抽撿 Process Sheet
  $("[name=onlyProcSheetBtn]").click(function () {
    $("[name=onlyProcSheetBtn]").removeClass("active");
    $(this).addClass('active');
    if (this.value === "Y") {
      $("[name=chTypeBtn][value=''], [name=slotValueBtn][value=N]").click();
    }
  });

  // btn : 手動指定 Slot
  $("[name=slotValueBtn]").click(function () {
    $("[name=slotValueBtn].active").removeClass("active");
    if (this.value === "N") {
      $(this).addClass("active");
      $("#slotReset").click();
      $("#slotCollapse.show").collapse('hide');
      $("#opSlotAssingDiv").hide();
    }
    else {
      $("[name=slotValueBtn]").not("[value=N]").addClass("active");
      $("[name=chTypeBtn][value=''], [name=onlyProcSheetBtn][value=N]").click();
      $("#opSlotAssingDiv").fadeIn();
    }
  });
  // slot collapse : Clear
  $("#slotReset").click(function () {
    $("[name=slotItem]").removeClass("active");
    $("#slotValue").val("").text("");
  });
  // slot collapse : OK
  $("#slotOK").click(function () {
    setupChosenNumberValue($("#slotValue, #opSlotDefault"), "slotItem");
    $("#slotCollapse").collapse('hide');
  });

  

  function changeSampRouteMode(mode) {
    if (mode === "single") {
      $("#plusSampOp").hide();
      $("#roundInputDiv, #recalcInputDiv").fadeIn();
      $("[name=intervalBtn]").not("[value=N]").fadeIn();
      $("[name=orderBtn][value=LAST]").fadeIn();

      $("#sampRouteIdDiv").fadeIn();
      //if ($("#modelAbbrList").val().length > 0) {
      //  $("#sampRouteIdDiv").fadeIn();
      //}
    }
    else { // (mode === multiple)
      $("#plusSampOp").fadeIn();
      // 全卡第一項 : 回合, 抽匣間隔, 抽匣順序, 跑他匣重數
      $("[name=roundBtn][value=N], [name=intervalBtn][value=N]").click();
      $("[name=orderBtn][value=FIRST], [name=recalcBtn][value=N]").click();

      $("#roundInputDiv, #recalcInputDiv").hide();
      $("[name=intervalBtn]").not("[value=N]").hide();
      $("[name=orderBtn]").not("[value=FIRST]").hide();

      // HIDE : 指定 Sampling Route Id
      $("[name=routeQBtn][value=N]").click();
      $("#sampRouteIdDiv").hide();
    }
  }

  // Submit
  $("#ruleSubmit").click(function () {
    processTrxEdit();
  });

  $("[name=validBtn]").click(function () {
    var selectName = "[name='" + $(this).attr("name") + "']";
    $(selectName + ".active").removeClass("active");

    if ($(this).val() == "Y")
      $(selectName + "[value=Y]").addClass("active");

    else if ($(this).val() == "N")
      $(selectName + "[value=N]").addClass("active");

    else {
      //$(selectName).not("[value=N]").val("");
      $(selectName).not("[value=N]").not("[value=Y]").addClass("active");
      $(".validPeriodDiv").fadeIn();
      //$(this).addClass("active");
    }
  });

  //// end : 指定 Slot
}// end of PageInit()

// Logoff OP 已選項目
function buildLogoffOpItem() { 
  $.each($("#logoffOP").val().split(","), function (i, op) {
    $.each($("[name=logoffOpItem]"), function (i, opBtn) {
      if(op === $(opBtn).val()){
        $(opBtn).addClass('active');

        var arr = ['<div class="col-12 btn-group mb-2 logoffop" data-logoffop="', op,
          '"><button type="text" class="btn btn-info">', op,
          '</button><label class="btn btn-info text-nowrap mb-0 border-left xlogoffop">',
          '<span class="fas fa-times"></span></label></div>'
        ].join('');
        $("#logoffPickedDiv").append(arr);
      }
    });
  });
  
  $(".xlogoffop").click(function () {
    var xop = $(this).parent().attr("data-logoffop");
    $(this).parent().remove();
    $("[name=logoffOpItem][value='" + xop + "']").removeClass("active");
  });
}


// 清空 Model Abbr 選項
function clearModelAbbr(mode, target, $elem) {
  var tableId = "";
  if (mode === "Abbr") {
    tableId = "#abbrTable";
    //if (target === "one")
    // 清空 pickedDiv
    // 清空 Table selected row
    // not return
  }

  // 清空 pickedDiv
  $("#modelAbbrPickedDiv").empty();
  // 清空 Table selected row
  var row = $(tableId).bootstrapTable('getData');
  row.forEach(function (item, idx) { item.selected = ""; });
  $(tableId + " .selected").removeClass("selected");

  if (target === "all") {
    $("#modelAbbrList").val("").text("(Optional)").removeClass("active")
      .siblings("label").removeClass("active");
  }
}
// SampOpModal 已選項目
function buildSampOpItem(obj) {
  var opList = [];
  if (obj instanceof jQuery) {
    var opstr = obj.val(); // OP1,OP2,Op3
    if (opstr.length > 0) {
      opList = opstr.split(",");
    }
    $("[name=sampBtn]").removeClass("active");
    $("#sampOpOK").attr("data-listid", "#" + obj.attr('id')); // #sampOpList_0
    $("#sampPickedDiv").empty();
  }
  else if (typeof $this === 'string') {
    opList.push($this);
  }

  var arr = [];
  opList.forEach(function (item) {
    arr.push('<div class="col-12 btn-group mb-2 samop" data-samop="', item, '">');
    arr.push('<button type="text" class="btn btn-info">', item, '</button>');
    arr.push('<label class="btn btn-info text-nowrap mb-0 border-left" ');
    arr.push(' onclick="clearSampOpItem($(this));">');
    arr.push('<span class="fas fa-times"></span></label></div>');
  });

  $("#sampPickedDiv").append(arr.join(''));
}
// 清空已選項目 SampOPItem
function clearSampOpItem($this) {
  var xop = $this.parent().attr("data-samop");
  $this.parent().remove();
  $("[name=sampBtn][value='" + xop + "']").removeClass("active");
}

function clearSampOpList(dom) {
  var listid = "#" + $(dom).siblings("[name=sampOpList]").attr("id");

  if (listid === "#sampOpList_0") {
    $("#sampOpList_0").val("").empty();
    $("[name='#sampOpList_0']").find(".routeCnt").text("0");
  }
  else {
    $(dom).parents(".sampoplistDiv").remove();
  }
}

function querySampOpByPep(pep) {
  $.ajax({
    type: "GET", async: true, cache: false, dataType: "json",
    url: G_Mqc_Root + "/db/MQuerySamplingDb.jsp",
    data: {
      pep: pep,
      processStage: PageVar.processStage,
      _event: "QUERY_PEP_SAMPLING_OP"
    },
    error: function (jqXHR, textStatus, errorThrown) {
      //setErrorDiv("QueryInitSetting Ajax Fail: " + jqXHR.status);
      alert("QUERY_PEP_SAMPLING_OP Ajax Fail: status= ", jqXHR.status);
      //tttt = jqXHR
    },
    success: function (result) {
      var arr = [];
      if (result.sampOpList.length > 0) {
        result.sampOpList.forEach(function (item) {
          arr.push('<div class="col-6 col-sm-3 col-lg-2">');
          arr.push('<button class="btn btn-outline-info btn-block mb-2" name="sampBtn" value="');
          arr.push(item.op_id);
          arr.push('">');
          arr.push(item.op_id + '</button></div>');
        });
      }
      else {
        arr.push('<div class="alert text-orange">PEP 沒有可選 Sampling OP. </div>');
      }
      $("#sampItemDiv").html(arr.join(''));
      $("[name=sampBtn]").click(function () {
        var op = $(this).val();
        if ($(this).hasClass("active")) {
          $(this).removeClass("active");
          $("[data-samop='" + op + "']").remove();
        }
        else {
          $(this).addClass("active");
          var arr = ['<div class="col-12 btn-group mb-2 samop" data-samop="', op,
            '"><button type="text" class="btn btn-info">', op,
            '</button><label class="btn btn-info text-nowrap mb-0 border-left xSamOp">',
            '<span class="fas fa-times"></span></label></div>'
          ].join('');
          $("#sampPickedDiv").append(arr);
          $(".xSamOp").click(function () {
            var xop = $(this).parent().attr("data-samop");
            $(this).parent().remove();
            $("[name=sampBtn][value='" + xop + "']").removeClass("active");
          });
        }
      });
    }
  });

}

function querySampRouteFitPanelSize(action, isShow = false, sampOpListId = "") {
  //tttt = sampOpListId
  var opListVal = $(sampOpListId).val();
  //var num = sampOpListId.split("_")[1];

  var modelList = "";
  if ($("#modelAbbrList") !== "") {
    var tmp = $("#modelAbbrList").val().split("/$/");
    modelList = tmp[0];
  }

  var jqxhr = $.ajax({
    type: "POST", async: true, cache: false, dataType: "json",
    url: G_Mqc_Root + "/db/MQuerySamplingDb.jsp",
    data: {
      modelNo: modelList,
      processStage: PageVar.processStage,
      sampOpListStr: opListVal,
      _event: "QUERY_SAMPLING_ROUTE"
    },
    beforeSend: function () { processingWait("show"); },
    complete: function () { processingWait("hide"); },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("QUERY_SAMPLING_ROUTE Ajax Fail: status= ", jqXHR.status);
    },
    success: function (result) {
      var dataList = result.sampRoute;
      var noRouteArr = result.noRoute;
      //var noSizeModel = result.noSizeModel;

      $("[data-listid='" + sampOpListId + "']").find(".routeCnt").text(dataList.length);
      if (dataList.length > 0) {
        $("[name='" + sampOpListId + "']").removeClass("btn-dark").addClass("btn-success");
      }
      else {
        $("[name='" + sampOpListId + "']").removeClass("btn-success").addClass("btn-dark");
      }

      if (isShow) {
        $("#sampRouteModal").modal('show');
        $("#pickSampOpList").text(opListVal.split(",").join(" , "));
      }
      else {
        return;
      }

      if (noRouteArr.length > 0) {
        $("#noRoutePanelSize").text(noRouteArr.join(' , '));
      }
      else {
        $("#noRoutePanelSize").text("(none)");
      }

      var columns = [
        { field: 'panel_size', title: 'Panel Size', width: '120', sortable: true },
        { field: 'route_id', title: 'Route Id', sortable: true },
        { field: 'route_ver', title: 'Ver', sortable: true },
        { field: 'description', title: 'Description', sortable: false },
      ];

      $("#sampRouteTable").bootstrapTable('destroy').bootstrapTable({
        columns: columns,
        classes: 'table table-hover table-bordered table-sm',
        data: dataList,
        uniqueId: 'route_id',
        search: true,
        searchAlign: 'left',
        pagination: true,
        pageSize: 10,
        pageList: [5, 10],
        locale: 'en-US',
      });

      if (action === "ROUTE") {// Pick Samplint Route Id
        $("#sampRouteIdOK").show();
        // Click Row to Select
        $("#sampRouteTable").on('click-row.bs.table', function (e, row, $element) {
          $('tr.selected.bg-gradient-primary').removeClass('selected bg-gradient-primary');
          $element.addClass('selected bg-gradient-primary');
        });
      }
      else { // if (action === COUNT) 只是顯示找到的 Sampling route 及收量
        $("#sampRouteIdOK").hide();
      }
    }

  });
  return jqxhr;
}
// QUERY_RULE_BY_SN
function querySettingUpdateData() {
  $.ajax({
    type: "GET", async: false, cache: false, dataType: "json",
    url: G_Mqc_Root + "/db/MQuerySamplingDb.jsp",
    data: {
      ruleSn: PageVar.ruleSn,
      _event: "QUERY_RULE_BY_SN"
    },
    error: function (jqXHR, textStatus, errorThrown) {
      //setErrorDiv("QueryInitSetting Ajax Fail: " + jqXHR.status);
      alert("QUERY_RULE_BY_SN Ajax Fail: status= ", jqXHR.status);
    },
    success: function (result) {
      if (!result.ruleData.length > 0) {
        alert("RULE 已不存在!! Eqp Id: " + PageVar.eqpId + ". Rule Sn: " + PageVar.ruleSn);
        PageVar.action = "ADD";
        return;
      }

      var dd = result.ruleData[0];
      PageVar.priority = dd.priority; // TRX 要用

      var key = dd.model_no_list + "/$/" + dd.abbr_no;;
      $("#modelAbbrList").val(key).html(key.replace("/$/", "<br>"));
      // 建立 Modal 內已選項
      builePickedItemAbbr(key);


      if ($("#modelAbbrList").html().length > 0) {
        $("#modelAbbrList").addClass("active").siblings("label").addClass("active");
      }

      // Logoff OP
      if (dd.op_id_list.length > 0) {
        $("#logoffOP").val(dd.op_id_list).text(dd.op_id_list.split(",").join(" , "));
        $("#logoffOP, #logoffOP ~ label").addClass('active');
      }

      // 指定抽檢 Sheet 方式?
      // ChamberType
      var chType = dd.chamber_smp_type;
      $("[name=chTypeBtn][value='" + chType + "']").click();
      if (chType === "ASSIGN") {
        $("#chIdList").val(dd.chamber_smp_parameter);
      }
      else if (chType === "AVERAGE") {
        $("#chQty").val(dd.chamber_smp_parameter);
      }
      // 只抽撿 Process Sheet
      if (dd.smp_process_slot === "Y") $("[name=onlyProcSheetBtn][value='Y']").click();
      // 手動指定 Slot
      if (dd.process_slot_list.length > 0) {
        var arr = dd.process_slot_list.split("-");
        arr.forEach(function (item) {
          $("[name=slotItem][value='" + item + "']").addClass("active");
        });

        $("[name=slotValueBtn]").toggleClass('active');
        $("#slotValue, #opSlotDefault").val(dd.process_slot_list).text(dd.process_slot_list);
        $("#opSlotAssingDiv").show();
      }

      // 自動分配卡匣 / IDLE 抽檢 : 需自動分配卡匣
      var routeArr = dd.sampling_op_list
        .substring(1, dd.sampling_op_list.length - 1).split("][");

      $.each(routeArr, function (idx, obj) {
        var listid = "#sampOpList_0";
        var opArr = obj.split(",");

        if (idx !== 0) listid = plusOneSampOpList(); // ex: #sampOpList_2

        // 先設定 OP指定抽檢 opSlotValue
        buildMutipleValueText($("[name=opSlotList][data-listid='" + listid + "']"), opArr);

        // Sampling OP List
        buildMutipleValueText($(listid), opArr);
        querySampRouteFitPanelSize("COUNT", false, listid);
      });

      // Rule Setting
      // 抽匣間隔, 數批
      $("#intervalInput").val(dd.interval_count);

      // 規則開關
      if (dd.validate_flag === "Y") $("[name=validBtn]").toggleClass('active');
      // Start Time
      if (dd.start_time !== "") $("#ruleStartTimePicker > input").val(dd.start_time);
      // End Time
      if (dd.end_time !== "") $("#ruleEndTimePicker > input").val(dd.end_time);
      // Rule Note
      $("#ruleNote").val(dd.note).text(dd.note); // Rule Note
      // Rule Type
      if (dd.rule_type !== "") {
        $("[name=ruleTypeBtn]").removeClass("active");
        $("[name=ruleTypeBtn][value='" + dd.rule_type + "']").addClass("active");
      }
    }
  });
}
// Check Data befrom TRX
function checkTrxDataIsOK() {
  var errList = [];
  var firstErr = "";
  var posInt = new RegExp("^[0-9]*[1-9][0-9]*$"); // 正整數的正規表示式


  // Sampling OP List
  if ($("#sampOpList_0").val().trim() === "") {
    if (errList.length === 0) firstErr = "#sampOpList_0";
    errList.push("請確認抽檢站點 Sampling OP List");
  }

  // CHAMBER : AVERAGE
  if ($("[value=AVERAGE]").hasClass("active") && !posInt.test($("#chQty").val().trim())) {
    if (errList.length === 0) firstErr = "#chQty";
    errList.push("請輸入 Chamber抽檢參數 : 平均分配片數 ");
  }
  // CHAMBER : ASSIGN
  if ($("[name=chTypeBtn][value=ASSIGN]").hasClass("active") && $("#chIdList").val().trim() === "") {
    if (errList.length === 0) firstErr = "#chIdList";
    errList.push("請輸入 Chamber抽檢參數 : 指定 Chamber ID List ");
  }

  //抽匣間隔
  var num = $("#intervalInput").val().trim();
  if ("" == num) {
    if (errList.length === 0) firstErr = "#intervalInput";
    errList.push("請輸入抽匣間隔");
  }
  else if (!posInt.test(num)) {
    if (errList.length === 0) firstErr = "#intervalInput";
    errList.push("請輸入正整數");
  }

  //手動指定 Slot
  if ($("#slotValue").hasClass("active") && $("#slotValue").val().trim() === "") {
    if (errList.length === 0) firstErr = "#slotValue";
    errList.push("請輸入指定抽檢 Slot");
  }

  if ($("#ruleEndTimePicker > input").val().trim() !== "" && $("#ruleStartTimePicker > input").val().trim() == "") {
    if (errList.length === 0) firstErr = "#ruleStartTimePicker";
    errList.push("有指定結束時間時, 請輸入開始時間.");
  }

  //note
  var ruleNoteLen = $("#ruleNote").val().trim().length;
  if (ruleNoteLen === 0) {
    if (errList.length === 0) firstErr = "#ruleNote";
    errList.push("請輸入 Role Note. (中文上限約 60 字)");
  }
  else if (ruleNoteLen > 66) {
    if (errList.length === 0) firstErr = "#ruleNote";
    errList.push("Role Note 字數過多: " + ruleNoteLen + ". (中文上限約 60 字)");
  }

  if (errList.length > 0) {
    alert(errList.join("\n"));
    //alert("First error= " + firstErr);
    $(firstErr).focus();

    return false;
  }
  return true;
}
// Process TRX
function processTrxEdit() {
  if (!checkTrxDataIsOK()) return;

  item = {};
  if (PageVar.action === "ADD") {
    item.rule_sn = "";
    item.priority = "0";
  }
  else { // PageVar.action === "UPDATE"
    item.rule_sn = PageVar.ruleSn;
    item.priority = PageVar.priority;
  }

  // Rule Setting
  if ($("#modelAbbrList") === "") {
    item.model_no = "";
    item.abbr_no = "";
  }
  else {
    var tmp = $("#modelAbbrList").val().split("/$/");
    item.model_no = tmp[0];
    item.abbr_no = tmp[1];
  }

  // Rule Group
  item.rule_group = "";

  // Logoff OP
  item.op_id = $("#logoffOP").val();

  // Trigger OP => db : future_sampling_op ==> trx : future_af_sampling_op
  item.future_sampling_op = "";

  // Finish Sampling Hold OP => db : future_before_hold_op ==> trx : future_bf_hold_op
  item.future_before_hold_op = "";

  // Sampling OP List
  // 有設定 OP 抽檢 SLOT 要抓不同 sampling op list
  var $listName = $("[name=sampOpList]");
  var list = [];
  $.each($listName, function (idx, obj) {
    if (obj.value != "") {
      list.push("[", obj.value, "]");
    }
  });

  item.sampling_op_list = list.join("");
  item.sampling_route = ""; // 自動分配卡匣不指定 Sampling Route Id

  // BATCH
  item.batch_mode = "LOT_START_BATCH"; // {NONE/BATCH}
  item.batch_before_hold_op = "";

  // 指定抽檢 Sheet 方式?
  // Chamber Type
  var chType = $("[name=chTypeBtn].active").val();
  item.chamber_smp_type = chType; // ASSIGN/AVERAGE/"", 不可寫 "N"
  item.chamber_smp_parameter = "";
  if (chType === "ASSIGN") {
    var str = $("#chIdList").val();
    item.chamber_smp_parameter = $.map(str.split(","), $.trim).join(",");
  }
  else if (chType === "AVERAGE") {
    item.chamber_smp_parameter = $("#chQty").val().trim();
  }

  // 只抽撿 Process Sheet
  item.smp_process_slot = $("[name=onlyProcSheetBtn].active").val(); // N/Y
  // 手動指定 Slot
  item.process_slot_list = $("#slotValue.active").length > 0 ?
    $("#slotValue.active").val() : ""; // ""/2-12-22

  // 自動分配卡匣 / IDLE 抽檢
  var autoAssignCst = "N";
  item.need_auto_assign_cst = autoAssignCst;
  item.min_idle_time = "";
  item.max_idle_time = "";

  // 有設定 OP 抽檢 SLOT 要抓不同 sampling op list
  var $listName = $("[name=sampOpList]");
  var list = [];
  $.each($listName, function (idx, obj) {
    if (obj.value != "") {
      list.push("[", obj.value, "]");
    }
  });

  item.sampling_op_list = list.join("");
  item.sampling_route = ""; // 自動分配卡匣不指定 Sampling Route Id
  

  // 觸發多規則 @ 同一匣
  item.repeat_sampling_mode = "REPEAT"; // {空/REPEAT}
  // 班別抽檢
  item.is_by_shift = 'N';
  // 執行回合
  item.sampling_round = "";

  // 抽檢間隔
  item.interval_count = "";
  item.interval_count_list = "";

  // 數批
  item.interval_count = parseInt($("#intervalInput").val()).toString();

  // 抽匣順序
  item.sampling_order = 'SMP_FL_HLD_L';

  // 跑他匣重數
  item.recalc_by_prod = "";

  // 規則開關
  item.validate_flag = $("[name=validBtn].active").val(); // N/Y
  // 指定起迄時間
  item.start_time = $("#ruleStartTimePicker > input").val(); // jsp 檢查至少要寫 lmTime
  item.end_time = $("#ruleEndTimePicker > input").val();
  // Rule Note
  item.note = encodeURIComponent($("#ruleNote").val().trim());
  // Rule Type
  item.rule_type = $("[name=ruleTypeBtn].active").val(); // ""/ACTIVE_ONCE/REGULAR

  item.rule_mode = "LOT_START_BATCH";


  var ruleInfosArr = [];
  ruleInfosArr.push(item);
  ruleInfosStr = JSON.stringify(ruleInfosArr);

  var trxData = {
    eqpId: "-",
    eqpListStr: "", // COPY_TO 使用
    ruleInfos: ruleInfosStr,
    action: PageVar.action,
    lmUser: G_UserInfo.workId,
    _trxName: "AUMFGSampling",
    isLotStart: "Y",
  };

  $.ajax({
    type: "POST", async: true, cache: false, dataType: "json",
    url: G_Mqc_Root + "/trx/MSmartSampling_McmqSend.jsp",
    data: trxData,
    beforeSend: function () { processingWait("show"); },
    complete: function () { processingWait("hide"); },
    error: function (jqXHR, textStatus, errorThrown) {
      var errMsg = "AUMFGSampling Ajax Fail: " + jqXHR.status + " : " + jqXHR.textStatus
        + '<br>' + errorThrown;
      alert(errMsg);
      //showSystemErrorDiv("#errMsgDiv", errMsg);
    },
    success: function (result) {
      var json = {};
      if (!$.isEmptyObject(result.return_xml)) {
        $xml = $(result.return_xml);
        json.rtn_code = $xml.find("rtn_code").text();
        json.rtn_msg = $xml.find("rtn_msg").text();
        json.rtn_action = $xml.find("rtn_action").text();
        json.rtn_param = $xml.find("rtn_param").text();
        json.trx_name = $xml.find("trx_name").text();
        json.log_id = $xml.find("log_id").text();
        //console.log("$xml = ", $xml);
      }
      else {
        json.rtn_code = "NULL";
        json.rtn_msg = "Unknown Error. 未知的 TRX 回傳!!";
      }
      json.now_time = moment().format('YYYY-MM-DD HH:mm:ss');
      //console.log("processTrxEdit ajax return: json= ", json);

      // Show result alert
      sweetAlertTrxResult(PageVar.action, json);
    }
  });
  // &, <,
}

function builePickedItemAbbr(item) {
  //ACTUAL-V22H1-2-1/$/01
  var keyArr = item.split("/$/");
  var arr = ['<div class="col-12 btn-group mb-2 abbrItem" data-uniqueid="', item, '">',
    '<button type="text" class="btn btn-info btn-sm">', keyArr[0], "<br>", keyArr[1], '</button>',
    '<label class="btn btn-info btn-sm text-nowrap mb-0 border-left" ',
    ' onclick="clearModelAbbr(\'Abbr\', \'one\');">',
    '<span class="fas fa-times"></span></label></div>'];
  $("#modelAbbrPickedDiv").append(arr.join(''));
}

function buildAbbrTable(data) {
  data.forEach(function (json, idex, arr) {
    json['unique_id'] = json.model_no + "/$/" + json.abbr_no;
    json['selected'] = "";
  });

  var columns = [
    { field: 'panel_size', title: 'Panel Size', width: '120', sortable: true },
    { field: 'model_no', title: 'Model', sortable: true },
    { field: 'abbr_no', title: 'Abbr', sortable: true },
    { field: 'description', title: 'Description', sortable: false }
  ];

  $("#abbrTable").bootstrapTable('destroy').bootstrapTable({
    columns: columns,
    classes: 'table table-hover table-bordered table-sm',
    data: data,
    uniqueId: 'unique_id',
    searchSelector: '#abbrSearch',
    pagination: true,
    pageSize: 15,
    pageList: [10, 15],
    locale: 'en-US',
    onColumnSwitch: function () {
      //doLangLocalize();
      //setClickInfo();
    },
    rowStyle: function (row, idx) {
      if (row['selected'] === "Y") {
        return { classes: "selected" };
      }
      return { classes: "" };
    }
  });

  $("#abbrTable").on('click-row.bs.table', function (e, row, $element, field) {
    clearModelAbbr("Abbr", "one");
    if ($element.hasClass('selected')) {
      row['selected'] = "";
      $element.removeClass('selected');
    }
    else {
      row['selected'] = "Y";
      $element.addClass('selected');
      builePickedItemAbbr(row.unique_id);
    }
  });
}

function buildSlotOptionDiv(slotNum) {
  if (!slotNum > 0) {
    $("#slotItemDiv, #opSlotItemDiv").text("(Cim Code for Slot Count Not Found!!)");
    return;
  }

  var arr = ['<div class="mb-1">'];
  var i, slotnum;
  for (i = 0; i < slotNum; i++) {
    slotnum = i + 1;
    arr.push('<button type="button" class="btn btn-outline-info mb-1" name="slotItem"');
    arr.push('value="' + slotnum + '">');
    if (i < 9) arr.push("0" + slotnum);
    else arr.push(slotnum);
    arr.push('</button> ');
  }
  $("#slotItemDiv, #opSlotItemDiv").html(arr.join(''));

  // 指定 Slot
  $("[name=slotItem], [name=opSlotItem]").click(function () {
    $(this).button('toggle');
  });

}

// #slotItemDiv, #opSlotItemDiv, #odrItemList
function buildNumberItemDiv($div, total, itemName) {
  $div.empty();

  if (!total > 0 && (itemName !== "odrItem")) {
    $div.text("(Cim Code for Slot Count Not Found!!)");
    return;
  }

  var arr = ['<div class="mb-1">'];
  var i, num;
  for (i = 0; i < total; i++) {
    num = i + 1;
    arr.push('<button type="button" class="btn btn-outline-info mb-1" name="');
    arr.push(itemName, '"');
    arr.push('value="', num, '">');
    if (i < 9) arr.push("0" + num);
    else arr.push(num);
    arr.push('</button> ');
  }
  $div.html(arr.join(''));

  // slotItem, odrItem, opSlotItem
  if (itemName === "opSlotItem") {
    $("[name=opSlotItem]").click(function () {
      $("#opslotDefaultBtn.active").removeClass("active");
      $(this).button('toggle');
    });
  }
  else {
    $("[name=" + itemName + "]").click(function () {
      $(this).button('toggle');
    });
  }


}
// 設置已選數字 1-2-3-7-8-9
function setupChosenNumberValue($div, itemName) {
  var arr = [];
  var $obj = $("[name=" + itemName + "].active");
  for (i = 0, len = $obj.length; i < len; i++) {
    var num = $obj.eq(i).val();
    //num = num < 10 ? num.substr(1) : num;
    arr.push(num);
  }
  $div.val(arr.join("-")).text(arr.join("-"));
  return (arr.length);
}

function buildOpListModal() {

  showWaitingDiv("#logoffOpDiv", "show");
  $("#logoffPickedDiv").empty();
  $("#extraOpDiv, #reworkOpDiv").hide();
  //$("#logoffOpSearch").off("keyup");

  $.ajax({
    type: "GET", async: true, cache: false, dataType: "json",
    url: G_Mqc_Root + "/db/MQuerySamplingDb.jsp",
    data: {
      modelAbbrList: $("#modelAbbrList").val(),
      processStage: PageVar.processStage,
      _event: "QUERY_MAIN_OP_BY_ABBR"
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("QUERY_MAIN_OP_BY_ABBR Ajax Fail:", jqXHR.status, ", errorThrown= ", errorThrown);
    },
    success: function (result) {
      var itemList = [];

      if (result.opList.length === 0) {
        Swal.fire({
          title: 'EQP ID : ' + eqpId + ' <br>查詢沒有相關 OP ID 呢!!?',
          text: 'Please Retry Or Call CIM!!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }

      result.opList.forEach(function (json) {
        itemList.push('<div class="col-6 col-sm-3 mb-2">');
        itemList.push('<button type="button" class="btn btn-outline-info btn-block" value="');
        itemList.push(json['op_id']);
        itemList.push('" name="logoffOpItem">');
        itemList.push(json['op_id']);
        itemList.push('</buttln></div>');
      });
      $("#logoffOpDiv").html(itemList.join(''));

      $("[name=logoffOpItem]").click(function () {
        var op = $(this).val();
        if ($(this).hasClass("active")) {
          $(this).removeClass("active");
          $("[data-logoffop='" + op + "']").remove();
        }
        else {
          $(this).addClass("active");
          var arr = ['<div class="col-12 btn-group mb-2 logoffop" data-logoffop="', op,
            '"><button type="text" class="btn btn-info">', op,
            '</button><label class="btn btn-info text-nowrap mb-0 border-left xlogoffop">',
            '<span class="fas fa-times"></span></label></div>'
          ].join('');
          $("#logoffPickedDiv").append(arr);
        }
      });

    },
    complete: function () {
      buildLogoffOpItem();
    }
  });
}

function setOpSlotChosenValue(dom, target) {
  var $aim = $(dom).parent().siblings(".setSlotArea").find('.setOpSlotBtn');

  // 將 op list slot value 設置到 slot no. item btn
  if (target === "copyToItem") {
    $("#opslotResetBtn").click();
    reBuildNumberItem($aim, "opSlotItem");
  }
  else { // target === "setItemToOp"
    setupChosenNumberValue($aim, "opSlotItem");
  }
}

function reBuildNumberItem($valueDiv, itemName) {
  // orderValue 的值需要再設定 odrItem.acitve
  var numArr = $valueDiv.val().split("-") || [];
  if (numArr.length > 0) {
    numArr.forEach(function (item, idx) {
      $("[name=" + itemName + "][value='" + item + "']").addClass("active");
    });
  }
  return $("[name=" + itemName + "].active").length;
}

function buildMutipleValueText($div, arr) {
  var str = arr.join(",</div><div class='col'>");
  str = "<div class='row align-items-center'><div class='col'>" + str + "</div>";
  $div.val(arr.join(",")).html(str);
}

function plusOneSampOpList() {
  var $div = $(".sampoplistDiv").eq(0).clone();
  var len = $(".sampoplistDiv").length;
  var listid = "sampOpList_" + len;
  $div.find("#sampOpList_0").val("").empty().attr("id", listid);
  $div.find("[data-listid='#sampOpList_0'] .routeCnt").text("0");

  listid = "#" + listid;
  $div.find("[data-listid='#sampOpList_0']").attr("data-listid", listid);
  $div.find("[name='sampOpTrash_0']").attr("name", "sampOpTrash_" + len);
  $("#plusSampOp").before($div);

  // 處理 opSlotList
  $div = $('#firstOpSlotDiv').clone().attr("id", "");
  $div.find("[data-listid='#sampOpList_0']").val("").text("(No Sampling OP)")
    .attr("data-listid", listid);
  $("#opSlotValueDiv").append($div);

  return listid;
}


function showWaitingDiv(elemId, action) {
  if (action === "show") {
    $(elemId).html('<div class="mt-5 text-info" style="margin: auto;" id="waitingDiv"><i class="fa-spin fa-spinner fas fa-3x"></i></div>');
  }
  else if (action === "hide") {
    $(elemId + " #waitingDiv").remove();
  }
}

function setErrorMsgDiv(errMsgDiv, errMsg, modalDiv) {
  $("#" + errMsgDiv > alert).html(errMsg);
  $("#" + errMsgDiv).fadeIn();

  if (modalDiv != null && modalDiv != "") {
    $("#" + modalDiv).modal("show");
  }
}

