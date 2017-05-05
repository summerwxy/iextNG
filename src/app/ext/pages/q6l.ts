// ==============================================================
Ext.define('ext.pages.Q6l', {
    extend: 'Ext.grid.Panel',
    autoScroll: true,
    xtype: 'mypagesq6l', // define xtype using xtype 
    dockedItems: [{
        xtype: 'toolbar',
        border: true,
        cls: ['toolbar_cls'],
        dock: 'top',
        items: [{
            xtype: 'tbtext', style: 'color: #FFFFFF', text: '门店: '
        }, {
            xtype: 'storefield', name: 's_no'
        }, {
            xtype: 'tbtext', style: 'color: #FFFFFF', text: '品号: '
        }, {
            xtype: 'partfield', name: 'p_no'
        }, {
            xtype: 'tbtext', style: 'color: #FFFFFF', text: '日期: '
        }, {
            xtype: 'datefield', name: 'sdate', width: 100, editable: false
        }, {
            xtype: 'tbtext', style: 'color: #FFFFFF', text: '~'
        }, {
            xtype: 'datefield', name: 'edate', width: 100, editable: false
        }, {
            xtype: 'button', name: 'qbtn', text: '查询',
            listeners: {
                click: function(view) {
                    var tb = view.up("toolbar");
                    var s_no = tb.down("[name=s_no]").value;
                    var p_no = tb.down("[name=p_no]").value;
                    var sdate = tb.down("[name=sdate]").value;
                    var edate = tb.down("[name=edate]").value;
                    if (!s_no || !p_no || !sdate || !edate) {
                        Ext.toast({ html: '请输入关键字！', cls: 'toast_danger'});
                    } else {
                        var store = Ext.data.StoreManager.lookup('ext.pages.q6l.store1');
                        store.proxy.extraParams.s_no = s_no;
                        store.proxy.extraParams.p_no = p_no;
                        store.proxy.extraParams.sdate = sdate;
                        store.proxy.extraParams.edate = edate;
                        store.load();               
                    }
                }
            }
        }]
    }],
    store: 'ext.pages.q6l.store1',
    columns: {
        defaults: { sortable: false, hideable: false, align: 'center' }, 
        items: [
            { text: '商品编号', width: 100, dataIndex: 'P_NO' },
            { text: '商品名称', width: 200, dataIndex: 'P_NAME' },
            { text: '现在库存量', width: 100, dataIndex: 'PS_QTY' },
            { text: '异动前库存', width: 100, dataIndex: 'PSL_OLD_QTY' },
            { text: '异动量', width: 100, dataIndex: 'PSL_CHG_QTY' },
            { text: '单据类型', width: 250, dataIndex: 'PSL_BILL_BNO' },
            { text: '原单据编号', width: 100, dataIndex: 'REMARK' },
            { text: '异动日期', width: 100, dataIndex: 'PLS_DATE' },
            { text: '异动时间', width: 100, dataIndex: 'PLS_TIME' },
        ]
    },
    
    dummy: 'dummy'
});

// others
Ext.create('Ext.data.Store', {
    storeId: 'ext.pages.q6l.store1',
    fields: ['S_NO', 'P_NO', 'P_NAME', 'PS_QTY', 'PSL_OLD_QTY', 'PSL_CHG_QTY', 'PSL_BILL_BNO', 'REMARK', 'PLS_DATE', 'PLS_TIME'],
    proxy: {
        type: 'ajax',
        url: utils.getApiUrl('api/q6l'), 
        useDefaultXhrHeader: false, // <= HERE
        reader: {
            type: 'json',
        }
    }
});
