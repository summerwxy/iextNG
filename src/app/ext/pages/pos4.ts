// ==============================================================
Ext.define('ext.pages.Pos4', {
    extend: 'Ext.grid.Panel',
    autoScroll: true,
    xtype: 'mypagespos4', // define xtype using xtype 
    dockedItems: [{
        xtype: 'toolbar',
        border: true,
        cls: ['toolbar_cls'],
        dock: 'top',
        items: [{
            xtype: 'tbtext', style: 'color: #FFFFFF', text: '年月: '
        }, {
            xtype: 'monthfield', name: 'ym', width: 90, editable: false
        }, {
            xtype: 'button', text: '查询',
            listeners: {
                click: function(view) {
                    var tb = view.up("toolbar");
                    var ym = tb.down("[name=ym]").value;
                    if (!ym) {
                        Ext.toast({ html: '请选择月份！', cls: 'toast_danger'});
                    } else {
                        var store = Ext.data.StoreManager.lookup('ext.pages.pos4.store1');
                        store.proxy.extraParams.s_no = utils.getStoreVar("s_no");
                        store.proxy.extraParams.sdate = ym;
                        store.load();
                    }
                }
            }
        }]
    }],
    features: [{
        ftype: 'summary'
    }],
    store: 'ext.pages.pos4.store1',
    columns: {
        defaults: { hideable: false, align: 'right' }, 
        items: [
            { text: '门店代码', width: 100, dataIndex: 'S_NO', align: 'center' },
            { text: '门店名称', width: 100, dataIndex: 'S_NAME', align: 'center' },
            { text: '日期', width: 100, dataIndex: 'SL_DATE', align: 'center', summaryType: 'count',
                summaryRenderer: function(value, summaryData, dataIndex) {
                    return '共 ' + value + ' 天';
                }            
            },
            { text: '营业总额', width: 120, dataIndex: '营业总额', xtype: 'numbercolumn', format:'0,000.0', summaryType: 'sum', summaryRenderer: function(value) { return Ext.util.Format.number(value, "0,000.0"); }  },
            { text: '实际业绩', width: 120, dataIndex: '实际业绩奖金', xtype: 'numbercolumn', format:'0,000.0', summaryType: 'sum', id: 'pos4_actual', summaryRenderer: function(value) { return Ext.util.Format.number(value, "0,000.0"); }  },
            { text: '总客流量', width: 120, dataIndex: '总客流量', xtype: 'numbercolumn', format:'0,000', summaryType: 'sum', summaryRenderer: function(value) { return Ext.util.Format.number(value, "0,000"); }  },
            { text: '日目标', width: 120, dataIndex: '目标', xtype: 'numbercolumn', format:'0,000', summaryType: 'sum', id: 'pos4_target', summaryRenderer: function(value) { return Ext.util.Format.number(value, "0,000"); } },
            { text: '达成率', width: 120, dataIndex: 'rate', xtype: 'numbercolumn', format:'0.0%', summaryType: 'sum', 
                summaryRenderer: function(value, summary, dataIndex) {
                    return (summary.pos4_target) ? Ext.util.Format.number(summary.pos4_actual / summary.pos4_target * 100, "0.0%") : 'N/A';
                }
            },
        ]
    }, 
    dummy: 'dummy'
});

// others
Ext.create('Ext.data.Store', {
    storeId: 'ext.pages.pos4.store1',
    fields: [ 'S_NO', 'S_NAME', 'SL_DATE', '营业总额', '实际业绩奖金', '总客流量', '目标', {
        name: 'rate', 
        type: 'number', 
        persist: false,
        convert:function(value, record){
            var data = record.getData();
            return (data.目标) ? data.实际业绩奖金 / data.目标 * 100 : null;
        }
    }],
    // groupField: 'category',
    sorters: {property: 'SL_DATE', direction: 'ASC'},
    proxy: {
        type: 'ajax',
        url: utils.getApiUrl('api/pos4'), 
        useDefaultXhrHeader: false, // <= HERE
        reader: {
            type: 'json',
            // idProperty: 'id'
        }
    }
});
