$.example = {
	exampleDialogs:{}
}

$.example.toolbar = {};

$.example.toolbar.loadDialog = function(name, title, width, height) {
    if (!$.example.exampleDialogs[name]) {
        if (width) {
	        $.example.exampleDialogs[name] = $('<div class="' + name + '"></div>')
	            .html('')
	            .dialog({
	                autoOpen:false,
	                title:title,
	                modal:true,
                    width:width,
                    height:height,
                    minWidth:width,
                    minHeight:height,
	                close: function(event, ui) {
	                }
	            });
        } else {
	        $.example.exampleDialogs[name] = $('<div class="' + name + '"></div>')
            .html('')
            .dialog({
                autoOpen:false,
                title:title,
                modal:true,
                close: function(event, ui) {
                }
            });
        }
        $.example.exampleDialogs[name].dialog('open');
        $('.' + name).dform($.example.toolbar.forms[name]);
    } else {
        $.example.exampleDialogs[name].dialog('open');
    }
};

//Data
$.example.toolbar.data = {
    'example': function() {
        $.example.toolbar.loadDialog('example', 'Example', 760, 500);
    }
};

//Forms
$.example.toolbar.forms = {
    'example':{
        "action":"",
        "method":"get",
        "html":[
            {
                'type'     : 'table',
                'border'   : '0',
                'width'    : '100%',
                'style'    : 'line-height: 25px; margin-bottom: 10px;',
                'html' : [
                    {
                        'type'     : 'tr',
                        'html' : [
                            {
                                'type'     : 'td',
                                'width'    : '80%',
                                'html' : [
                                    {
                                        'type'  : 'span',
                                        'class' : 'tab_style_active',
                                        'id'    : 'color_tab',
                                        'html'  : 'Color'
                                    },
                                    {
                                        'type'  : 'span',
                                        'class' : 'tab_style',
                                        'id'    : 'shape_tab',
                                        'html'  : 'Shape'
                                    },
                                    {
                                        'type' : 'div',
                                        'class': 'cleardiv'
                                    },
                                    {
                                        'type'  : 'div',
                                        'id'    : 'color_hot',
                                        'class' : 'handsontable hot-contain-div',
                                        'style' : 'width: 620px; height: 350px; overflow: auto;'
                                    },
                                    {
                                        'type'  : 'div',
                                        'id'    : 'shape_hot',
                                        'class' : 'handsontable hot-contain-div_hide',
                                        'style' : 'width: 620px; height: 350px; overflow: auto;'
                                    }
                                ]
                            },
                            {
                                'type'     : 'td',
                                'align'   : 'center',
                                'width'    : '20%',
                                'html' : [
                                    {
                                        'type'    : 'a',
                                        'id'      : 'hot_move_up',
                                        'class'   : 'hot_button',
                                        'style'   : 'font-size: 20px; font-weight: bold;',
                                        'html'    : '/\\'
                                    },
                                    {
                                        'type' : 'div',
                                        'class': 'cleardiv'
                                    },
                                    {
                                        'type'  : 'p',
                                        'style' : 'font-size: 14px; font-weight: bold; color: black;',
                                        'html'  : 'Change Order'
                                    },
                                    {
                                        'type' : 'div',
                                        'class': 'cleardiv'
                                    },
                                    {
                                        'type'    : 'a',
                                        'id'      : 'hot_move_down',
                                        'class'   : 'hot_button',
                                        'style'   : 'font-size: 20px; font-weight: bold;',
                                        'html'    : '\\/'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                'type' : 'div',
                'class': 'cleardiv'
            },
            {
                "type"  : "a",
                'class' : 'hot_button',
                "html"  : "Ok",
                "id"    : "hot_ok"
            },
            {
                'type' : 'span',
                'class': 'spacespan'
            },
            {
                "type"  : "a",
                'class' : 'hot_button',
                "id"    : "hot_cancel",
                "html"  : "Cancel"
            },
            {
                'type' : 'span',
                'class': 'spacespan'
            },
            {
                "type"  : "a",
                'class' : 'hot_button',
                "id"    : "hot_apply",
                "html"  : "Apply"
            },
            {
                'type' : 'span',
                'class': 'spacespan'
            },
            {
                "type"  : "a",
                'class' : 'hot_button',
                "id"    : "hot_add_row",
                "html"  : "Add Row"
            },
            {
                'type' : 'span',
                'class': 'spacespan'
            },
            {
                "type"  : "a",
                'class' : 'hot_button',
                "id"    : "hot_remove_row",
                "html"  : "Remove Row"
            },
            {
                'type' : 'span',
                'class': 'spacespan'
            },
            {
                'type' : 'span',
                'class': 'spacespan'
            },
            {
                "type"  : "a",
                'class' : 'hot_button',
                "id"    : "hot_reset_all",
                "html"  : "Reset All"
            }
        ]
    }
}
