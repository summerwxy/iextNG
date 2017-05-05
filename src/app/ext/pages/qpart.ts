// ==============================================================
Ext.define('ext.pages.Qpart', {
    extend: 'Ext.grid.Panel',
    autoScroll: true,
    xtype: 'mypagesqpart', // define xtype using xtype 
    dockedItems: [{
        xtype: 'toolbar',
        border: true,
        cls: ['toolbar_cls'],
        dock: 'top',
        items: [{
            xtype: 'tbtext', style: 'color: #FFFFFF', text: '门店: '
        }, {
            xtype: 'textfield', name: 'kw', enableKeyEvents: true,
            listeners: {
                keypress: function(view, e) {
                    if (e.getCharCode() == Ext.EventObject.ENTER) {
                        var button = this.up('toolbar').down('[name=qbtn]');
                        button.fireEvent('click', button); // ?_? 沒懂為什麼第二個參數要button
                    }
                }
            }
        }, {
            xtype: 'button', name: 'qbtn', text: '查询',
            listeners: {
                click: function(view) {
                    var tb = view.up("toolbar");
                    var kw = tb.down("[name=kw]").value;
                    if (!kw) {
                        Ext.toast({ html: '请输入关键字！', cls: 'toast_danger'});
                    } else {
                        var store = Ext.data.StoreManager.lookup('ext.pages.qpart.store1');
                        store.proxy.extraParams.w = 'part';
                        store.proxy.extraParams.q = kw;
                        store.load();
                    }
                }
            }
        }, {
            xtype: 'tbtext', style: 'color: #FFFFFF', text: '(拼音，品号，max 500) '
        }, '-', {
            xtype: 'button', name: 'pbtn', text: '列出PDA出错料号',
            listeners: {
                click: function(view) {
                    var store = Ext.data.StoreManager.lookup('ext.pages.qpart.store1');
                    store.proxy.extraParams.w = 'pda';
                    store.proxy.extraParams.q = '';
                    store.load();
                }
            }
        }]
    }],
    store: 'ext.pages.qpart.store1',
    columns: {
        defaults: { hideable: false, align: 'center' }, 
        items: [
            { text: '大分类', width: 100, dataIndex: 'SUB_NAME' },
            { text: '中分类', width: 150, dataIndex: 'D_CNAME' },
            { text: '品号', width: 100, dataIndex: 'P_NO' },
            { text: '品名', width: 180, dataIndex: 'P_NAME' },
            { text: '规格', width: 180, dataIndex: 'P_SPMODE' },
            { text: '单位', width: 100, dataIndex: 'UN_NO' },
            { text: '单价', width: 100, dataIndex: 'P_PRICE' },
            { text: '状态', width: 100, dataIndex: 'P_STATUS_NAME' },
            { text: 'PDA', width: 100, dataIndex: 'P_PDA' },
        ]
    },
    dummy: 'dummy'
});

// others
Ext.create('Ext.data.Store', {
    storeId: 'ext.pages.qpart.store1',
    fields: ['D_CNAME', 'PDASTR', 'P_NAME', 'P_NO', 'P_PDA', 'P_PRICE', 'P_PY', 'P_SPMODE', 'P_STATUS', 'P_STATUS_NAME', 'SUB_NAME', 'UN_NO', 'label'],
    sorters: {property: 'P_NO', direction: 'ASC'},
    proxy: {
        type: 'ajax',
        url: utils.getApiUrl('api/qpart'), 
        useDefaultXhrHeader: false, // <= HERE
        reader: {
            type: 'json',
        }
    }
});
