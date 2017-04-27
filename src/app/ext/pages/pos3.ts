// ==============================================================
Ext.define('ext.pages.Pos3', {
    extend: 'Ext.panel.Panel',
    autoScroll: true,
    xtype: 'mypagespos3', // define xtype using xtype 
    dockedItems: [{
        xtype: 'toolbar',
        border: true,
        cls: ['toolbar_cls'],
        dock: 'top',
        items: [{
            xtype: 'tbtext', style: 'color: #FFFFFF', text: '日期: '
        }, {
            xtype: 'datefield', name: 'sdate', width: 100, editable: false
        }, {
            xtype: 'tbtext', style: 'color: #FFFFFF', text: '~'
        }, {
            xtype: 'datefield', name: 'edate', width: 100, editable: false
        }, {
            xtype: 'button', text: '查询',
            listeners: {
                click: function(view) {
                    var tb = view.up("toolbar");
                    var sdate = tb.down("[name=sdate]").value;
                    var edate = tb.down("[name=edate]").value;
                    if (!sdate || !edate) {
                        Ext.toast({ html: '请选择日期！', cls: 'toast_danger'});
                    } else {
                        var store = Ext.data.StoreManager.lookup('ext.pages.pos3.store1');
                        store.proxy.extraParams.s_no = utils.getStoreVar("s_no");
                        store.proxy.extraParams.sdate = sdate;
                        store.proxy.extraParams.edate = edate;
                        store.load();
                    }
                }
            }
        }]
    }],
    defaults: {
        xtype: 'grid',
        padding: 10,
        features: [{
            ftype: 'summary'
        }],
        columns: {
            defaults: { hideable: false, align: 'right' }, 
            items: [
                { text: '门店', width: 100, dataIndex: 'S_NAME', align: 'center' },
                { text: '品号', width: 80, dataIndex: 'P_NO', align: 'center' },
                { text: '品名', width: 180, dataIndex: 'P_NAME', align: 'left', summaryType: 'count',
                    summaryRenderer: function(value, summaryData, dataIndex) {
                        return '共 ' + value + ' 笔';
                    }
                },
                { text: '进货数量', width: 100, dataIndex: 'in_qty', xtype: 'numbercolumn', format:'0', summaryType: 'sum' },
                { text: '进货金额', width: 100, dataIndex: 'in_amt', xtype: 'numbercolumn', format:'0.0', summaryType: 'sum' },
                { text: '生产数量', width: 100, dataIndex: 'sst_qty', xtype: 'numbercolumn', format:'0', summaryType: 'sum' },
                { text: '生产金额', width: 100, dataIndex: 'sst_amt', xtype: 'numbercolumn', format:'0.0', summaryType: 'sum' },
                { text: '退货数量', width: 100, dataIndex: 'ba_qty', xtype: 'numbercolumn', format:'0', summaryType: 'sum' },
                { text: '退货金额', width: 100, dataIndex: 'ba_amt', xtype: 'numbercolumn', format:'0.0', summaryType: 'sum' },
                { text: '销售数量', width: 100, dataIndex: 'sl_qty', xtype: 'numbercolumn', format:'0', summaryType: 'sum' },
                { text: '销售金额', width: 100, dataIndex: 'sl_amt', xtype: 'numbercolumn', format:'0.0', summaryType: 'sum' },
                { text: '转入数量', width: 100, dataIndex: 'tr_in_qty', xtype: 'numbercolumn', format:'0', summaryType: 'sum' },
                { text: '转入金额', width: 100, dataIndex: 'tr_in_amt', xtype: 'numbercolumn', format:'0.0', summaryType: 'sum' },
                { text: '转出数量', width: 100, dataIndex: 'tr_out_qty', xtype: 'numbercolumn', format:'0', summaryType: 'sum' },
                { text: '转出金额', width: 100, dataIndex: 'tr_out_amt', xtype: 'numbercolumn', format:'0.0', summaryType: 'sum' },
                { text: '退货率', width: 100, dataIndex: 'back_rate', xtype: 'numbercolumn', format:'0.0%' },            
            ]
        }
    },
    items: [
        { title: '1. 面包', store: {type: 'chained', source: 'ext.pages.pos3.store1', filters: [{ property: 'category', value: 'A'}]} }, 
        { title: '2. 蛋糕', store: {type: 'chained', source: 'ext.pages.pos3.store1', filters: [{ property: 'category', value: 'B'}]} }, 
        { title: '3. 冷点', store: {type: 'chained', source: 'ext.pages.pos3.store1', filters: [{ property: 'category', value: 'C'}]} }, 
        { title: '4. 西点', store: {type: 'chained', source: 'ext.pages.pos3.store1', filters: [{ property: 'category', value: 'D'}]} }, 
        { title: '5. 现烤', store: {type: 'chained', source: 'ext.pages.pos3.store1', filters: [{ property: 'category', value: 'E'}]} }
    ],
    dummy: 'dummy'
});
// others
Ext.create('Ext.data.Store', {
    storeId: 'ext.pages.pos3.store1',
    fields: [ 'S_NAME', 'category', 'P_NO', 'P_NAME', 'in_qty', 'in_amt', 'sst_qty', 'sst_amt', 'ba_qty', 'ba_amt', 'sl_qty', 'sl_amt', 'tr_in_qty', 'tr_in_amt', 'tr_out_qty', 'tr_out_amt', 'back_rate' ],
    // groupField: 'category',
    sorters: {property: 'id', direction: 'ASC'},
    proxy: {
        type: 'ajax',
        url: utils.getApiUrl('api/pos3'), 
        useDefaultXhrHeader: false, // <= HERE
        reader: {
            type: 'json',
            idProperty: 'id'
        }
    }
});
