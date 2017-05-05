// ==============================================================
Ext.define('ext.pages.Qstore', {
    extend: 'Ext.grid.Panel',
    autoScroll: true,
    xtype: 'mypagesqstore', // define xtype using xtype 
    dockedItems: [{
        xtype: 'toolbar',
        border: true,
        cls: ['toolbar_cls'],
        dock: 'top',
        items: [{
            xtype: 'tbtext', style: 'color: #FFFFFF', text: '门店: '
        }, {
            xtype: 'textfield', name: 'store', enableKeyEvents: true,
            listeners: {
                keypress: function(view, e) {
                    if (e.getCharCode() == Ext.EventObject.ENTER) {
                        var button = this.up('toolbar').down('button');
                        button.fireEvent('click', button); // ?_? 沒懂為什麼第二個參數要button
                    }
                }
            }
        }, {
            xtype: 'button', text: '查询',
            listeners: {
                click: function(view) {
                    var tb = view.up("toolbar");
                    var kw = tb.down("[name=store]").value;
                    if (!kw) {
                        Ext.toast({ html: '请输入关键字！', cls: 'toast_danger'});
                    } else {
                        var store = Ext.data.StoreManager.lookup('ext.pages.qstore.store1');
                        store.proxy.extraParams.q = kw;
                        store.load();
                    }
                }
            }
        }, {
            xtype: 'tbtext', style: 'color: #FFFFFF', text: '(拼音, 电话)'
        }]
    }],
    store: 'ext.pages.qstore.store1',
    columns: {
        defaults: { hideable: false, align: 'center' }, 
        items: [
            { text: '门店代号', width: 100, dataIndex: 'S_NO' },
            { text: '门店名称', width: 150, dataIndex: 'S_NAME' },
            { text: '区域', width: 100, dataIndex: 'R_NAME' },
            { text: '电话', width: 180, dataIndex: 'S_TEL' },
            { text: 'IP', width: 180, dataIndex: 'S_IP' },
            { text: '状态', width: 100, dataIndex: 'S_STATUS_NAME' },
        ]
    },
    dummy: 'dummy'
});

// others
Ext.create('Ext.data.Store', {
    storeId: 'ext.pages.qstore.store1',
    fields: [ 'S_NO', 'S_NAME', 'S_TEL', 'S_IP', 'R_NAME', 'S_STATUS', 'S_PY', 'S_STATUS_NAME', 'label'],
    sorters: {property: 'S_NO', direction: 'ASC'},
    proxy: {
        type: 'ajax',
        url: utils.getApiUrl('api/qstore'), 
        useDefaultXhrHeader: false, // <= HERE
        reader: {
            type: 'json',
        }
    }
});
