$.example.hot_tabs = ['color_tab', 'shape_tab'];
$.example.hot_divs = ['color_hot', 'shape_hot'];

$.example.tempColorTable = undefined;
$.example.tempShapeTable = undefined;

$.example.refColorTable = [{'name' : 'red',          'abbrv' : 'red',   'rgb' : "FF0000", 'keyorder' : 0},
                           {'name' : 'green',        'abbrv' : 'green', 'rgb' : "00FF00", 'keyorder' : 1},
                           {'name' : 'blue',         'abbrv' : 'blue',  'rgb' : "0000FF", 'keyorder' : 2},
                           {'name' : 'white',        'abbrv' : 'white', 'rgb' : "FFFFFF", 'keyorder' : 3},
                           {'name' : 'almost white', 'abbrv' : 'beige', 'rgb' : "EEEEEE", 'keyorder' : 4},
                           {'name' : 'kinda blue',   'abbrv' : 'cyan',  'rgb' : "9999FF", 'keyorder' : 5},
                           {'name' : 'black',        'abbrv' : 'noir',  'rgb' : "000000", 'keyorder' : 6},
                           {'name' : 'brown',        'abbrv' : 'brown', 'rgb' : "8B4C39", 'keyorder' : 7}];

$.example.refShapeTable = [{'name' : 'triangle',  'abbrv' : 'tri',       'sides' :  "3", 'keyorder' : 0},
                           {'name' : 'square',    'abbrv' : 'sq',        'sides' :  "4", 'keyorder' : 1},
                           {'name' : 'pentagon',  'abbrv' : 'pent',      'sides' :  "5", 'keyorder' : 2},
                           {'name' : 'hexagon',   'abbrv' : 'hex',       'sides' :  "6", 'keyorder' : 3},
                           {'name' : 'octagon',   'abbrv' : 'oct',       'sides' :  "8", 'keyorder' : 4},
                           {'name' : 'dodecagon', 'abbrv' : 'dodecagon', 'sides' : "12", 'keyorder' : 5}];

// Used to gray out readonly fields
$.example.rowRenderer = function(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    if (col === 3) {
        td.style.color = 'gray';
    } else {
        td.style.color = 'black';
    }
}

// This is the function that is called to display the dialog with the hot tabs
$.example.showExampleDialog = function() {
	$.example.toolbar.data.example(); // load form...
    $.example.fillExampleDialog();
}

// This creates the tables and fills the tables with data. Separated from showExampleDialog
// because the Reset button will destroy and re-create the tables
$.example.fillExampleDialog = function() {
    var i = 0;
    var data = [];

    // due to a bug in handsontable, if the div isn't visible when the table is created, it will never show scrollbars
    $.example.showExampleTab('color');
    var ht = $("#color_hot");
    if ($.example.tempColorTable) {
        for (i = 0; i < $.example.tempColorTable.length; i++) {
            data.push([$.example.tempColorTable[i].name, $.example.tempColorTable[i].abbrv, $.example.tempColorTable[i].rgb, $.example.tempColorTable[i].keyorder]);
        }
    } else {
        for (i = 0; i < $.example.refColorTable.length; i++) {
            data.push([$.example.refColorTable[i].name, $.example.refColorTable[i].abbrv, $.example.refColorTable[i].rgb, $.example.refColorTable[i].keyorder]);
        }
    }
    ht.handsontable({
        data         : data,
        stretchH     : 'all',
        width        : 620,
        height       : 350,
        minSpareRows : 0,
        multiSelect  : false,
        rowHeaders   : true,
        colHeaders   : ["Name", "Abbrv", "RGB", "KeyOrder"],
        fillHandle   : false,
        contextMenu  : false,
        outsideClickDeselects : false,
        columns    : [
            {data: 0, type : 'text', readOnly: false},
            {data: 1, type : 'text', readOnly: false},
            {data: 2, type : 'text', readOnly: false},
            {data: 3, type : 'numeric', readOnly: true}
        ],
        cells : function(row, col, prop) {
            return {'renderer' : $.example.rowRenderer};
        },
        afterCreateRow: function(index, amount) {
            var ht = $("#color_hot").handsontable('getInstance');
            var rowData = ht.getDataAtRow(index);
            rowData[3] = index;
            ht.render();
        }
    });

    $.example.showExampleTab('shape');
    data = [];
    if ($.example.tempShapeTable) {
        for (i = 0; i < $.example.tempShapeTable.length; i++) {
            data.push([$.example.tempShapeTable[i].name, $.example.tempShapeTable[i].abbrv, Number($.example.tempShapeTable[i].sides), $.example.tempShapeTable[i].keyorder]);
        }
    } else {
        for (i = 0; i < $.example.refShapeTable.length; i++) {
            data.push([$.example.refShapeTable[i].name, $.example.refShapeTable[i].abbrv, Number($.example.refShapeTable[i].sides), $.example.refShapeTable[i].keyorder]);
        }
    }
    ht = $("#shape_hot");
    ht.handsontable({
        data         : data,
        stretchH     : 'all',
        width        : 620,
        height       : 350,
        minSpareRows : 0,
        multiSelect  : false,
        rowHeaders   : true,
        colHeaders   : ["Name", "Abbrv", "Sides", "KeyOrder"],
        fillHandle   : false,
        contextMenu  : false,
        outsideClickDeselects : false,
        columns    : [
            {data: 0, type : 'text', readOnly: false},
            {data: 1, type : 'text', readOnly: false},
            {data: 2, type : 'numeric', readOnly: false},
            {data: 3, type : 'numeric', readOnly: true}
        ],
        cells : function(row, col, prop) {
            return {'renderer' : $.example.rowRenderer};
        },
        afterCreateRow: function(index, amount) {
            var ht = $("#shape_hot").handsontable('getInstance');
            var rowData = ht.getDataAtRow(index);
            rowData[3] = index;
            ht.render();
        }
    });

    $.example.showExampleTab('color');

    var colorTab = $('#color_tab');
    colorTab.unbind();
    colorTab.click(function(e) {
        $.example.showExampleTab("color");
        e.preventDefault();
    });

    var shapeTab = $('#shape_tab');
    shapeTab.unbind();
    shapeTab.click(function(e) {
        $.example.showExampleTab("shape");
        e.preventDefault();
    });

    var hotOk = $('#hot_ok');
    hotOk.unbind();
    hotOk.click(function(e) {
        $.example.updateExampleData();
        $.example.saveExampleData();
        $.example.destroyExampleTables();
        e.preventDefault();
    });

    var hotApply = $('#hot_apply');
    hotApply.unbind();
    hotApply.click(function(e) {
        $.example.updateExampleData();
        $.example.destroyExampleTables();
        $.example.exampleDialogs.example.dialog("close");
        e.preventDefault();
    });

    var hotCancel = $('#hot_cancel');
    hotCancel.unbind();
    hotCancel.click(function(e) {
        $.example.destroyExampleTables();
        $.example.exampleDialogs.example.dialog("close");
        e.preventDefault();
    });

    var hotMoveUp = $('#hot_move_up');
    hotMoveUp.unbind();
    hotMoveUp.click(function(e) {
        var ht = $(".hot-contain-div").handsontable('getInstance');
        var selArray = ht.getSelected();
        if (selArray) {
            var row = selArray[0];
            if (row > 0) {
                var rowData = ht.getDataAtRow(row);
                var aboveRowData = ht.getDataAtRow(row - 1);
                var temp;

                for (var i = 0; i < rowData.length; i++) {
                    if (i != 3) {
                        temp = aboveRowData[i];
                        aboveRowData[i] = rowData[i];
                        rowData[i] = temp;
                    }
                }

                ht.deselectCell();
                ht.render();
            }
        }
        e.preventDefault();
    });

    var hotMoveDown = $('#hot_move_down');
    hotMoveDown.unbind();
    hotMoveDown.click(function(e) {
        var ht = $(".hot-contain-div").handsontable('getInstance');
        var selArray = ht.getSelected();
        if (selArray) {
            var row = selArray[0];
            if (row < ht.countRows()) {
                var rowData = ht.getDataAtRow(row);
                var belowRowData = ht.getDataAtRow(row + 1);
                var temp;

                for (var i = 0; i < rowData.length; i++) {
                    if (i != 3) {
                        temp = belowRowData[i];
                        belowRowData[i] = rowData[i];
                        rowData[i] = temp;
                    }
                }

                ht.deselectCell();
                ht.render();
            }
        }
        e.preventDefault();
    });

    var addRow = $('#hot_add_row');
    addRow.unbind();
    addRow.click(function(e) {
        var ht = $(".hot-contain-div").handsontable('getInstance');
        ht.alter('insert_row');
        ht.render();
        e.preventDefault();
    });

    var removeRow = $('#hot_remove_row');
    removeRow.unbind();
    removeRow.click(function(e) {
        var ht = $(".hot-contain-div").handsontable('getInstance');
        ht.alter('remove_row', ht.countRows() - 1);
        ht.render();
        e.preventDefault();
    });

    var resetAll = $('#hot_reset_all');
    resetAll.unbind();
    resetAll.click(function(e) {
        $.example.tempColorTable = undefined;
        $.example.tempShapeTable = undefined;
        $.example.destroyExampleTables();
        $.example.fillExampleDialog();
        e.preventDefault();
    });

    $.example.showExampleTab('flow');
};

$.example.destroyExampleTables = function() {
    var ht = $("#color_hot").handsontable('getInstance');
    ht.destroy();
    ht = $("#shape_hot").handsontable('getInstance');
    ht.destroy();
};

$.example.updateExampleData = function() {
    var i;
    var dataColor;
    var dataShape;

    var ht = $("#color_hot").handsontable('getInstance');
    $.example.tempColorTable = [];
    dataColor = ht.getData();
    for (i = 0; i < dataColor.length; i++) {
        $.example.tempColorTable.push({'name' : dataColor[i][0], 'abbrv' : dataColor[i][1], 'rgb' : dataColor[i][2], 'keyorder' : dataColor[i][3]});
    }

    ht = $("#shape_hot").handsontable('getInstance');
    $.example.tempShapeTable = [];
    dataShape = ht.getData();
    for (i = 0; i < dataShape.length; i++) {
        $.example.tempShapeTable.push({'name' : dataShape[i][0], 'abbrv' : dataShape[i][1], 'sides' : new String(dataShape[i][2]), 'keyorder' : dataShape[i][3]});
    }
}

$.example.saveExampleData = function() {
    var i;
    var dataColor;
    var dataShape;

    var ht = $("#color_hot").handsontable('getInstance');
    dataColor = ht.getData();
    ht = $("#shape_hot").handsontable('getInstance');
    dataShape = ht.getData();

// Here is what I do to save data...
//    $.post('/url', {
//            "action" : "savedata",
//            "colors" : JSON.stringify(dataColor),
//            "shapes" : JSON.stringify(dataShape)
//        },
//        function (data) {
//            var obj = jQuery.parseJSON(data);
//            if (obj.status == 'fail') {
//            } else {
//                $.example.exampleDialogs.example.dialog("close");
//            }
//        }
//    );

    $.example.exampleDialogs.example.dialog("close");
}

$.example.loadExample = function() {

// here's what I do to load data from a php server (I replaced the URL and call for privacy)
//    var formParams = "call=loaddata";
//
//    $.ajax({
//        type : 'GET',
//        url : '/url',
//        async : false,
//        data : formParams,
//        complete : function(data) {
//            data.responseText = data.responseText.replace(/\\/g, '');
//            var obj = jQuery.parseJSON(data.responseText);
//            if (obj.status == 'fail') {
//            } else {
//                var i;
//                $.example.tempColorTable = [];
//                var dataColor = obj.colors;
//                for (i = 0; i < dataColor.length; i++) {
//                    $.example.tempColorTable.push({'name' : dataColor[i][0], 'abbrv' : dataColor[i][1], 'rgb' : dataColor[i][2], 'keyorder' : dataColor[i][3]});
//                }
//
//                $.example.tempShapeTable = [];
//                var dataShape = obj.shapes;
//                for (i = 0; i < dataShape.length; i++) {
//                    $.example.tempShapeTable.push({'name' : dataShape[i][0], 'abbrv' : dataShape[i][1], 'sides' : dataTemperature[i][2], 'keyorder' : dataTemperature[i][3]});
//                }
//            }
//        }
//    });
};

$.example.showExampleTab = function(option) {
    if (option == "color") {
        $.example.setExampleTabActive($.example.hot_tabs, $.example.hot_tabs[0], $.example.hot_divs, $.example.hot_divs[0]);
    } else if (option == "shape") {
        $.example.setExampleTabActive($.example.hot_tabs, $.example.hot_tabs[1], $.example.hot_divs, $.example.hot_divs[1]);
    }
};

$.example.setExampleTabActive = function(tabs, newActiveTab, divs, newActiveDiv) {
    for (var tab in tabs) {
        if (tabs[tab] == newActiveTab) {
            $("#" + tabs[tab]).removeClass("tab_style");
            $("#" + tabs[tab]).addClass("tab_style_active");
        } else {
            $("#" + tabs[tab]).removeClass("tab_style_active");
            $("#" + tabs[tab]).addClass("tab_style");
        }
    }

    for (var div in divs) {
        if (divs[div] == newActiveDiv) {
            $("#" + divs[div]).removeClass("hot-contain-div_hide");
            $("#" + divs[div]).addClass("hot-contain-div");
        } else {
            $("#" + divs[div]).removeClass("hot-contain-div");
            $("#" + divs[div]).addClass("hot-contain-div_hide");
        }
    }
};
