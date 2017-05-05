// ==============================================================
Ext.define('ext.pages.Q1v', {
    extend: 'Ext.panel.Panel',
    autoScroll: true,
    xtype: 'mypagesq1v', // define xtype using xtype 
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    defaults: {
        flex: 1,
        border: true,
        xtype: 'grid'
    },
    items: [{
        store: 'ext.pages.q1v.store1',
        autoLoad: true,
        columns: {
            defaults: { sortable: false, hideable: false, align: 'center' }, 
            items: [
                { text: '序号', width: 80, dataIndex: 'RECNO' },
                { text: '编号', width: 80, dataIndex: 'D_NO' },
                { text: '名称', flex: 1, dataIndex: 'D_CNAME', align: 'left' },
            ]
        },
        listeners: {
            itemclick: function(dv, record, item, index, e) {
                var store = Ext.data.StoreManager.lookup('ext.pages.q1v.store2');
                store.proxy.extraParams.d_no = record.data.D_NO;
                store.load();
            }
        }
    }, {
        store: 'ext.pages.q1v.store2',
        columns: {
            defaults: { sortable: false, hideable: false, align: 'center' }, 
            items: [
                { text: '序号', width: 80, dataIndex: 'RECNO' },
                { text: '编号', width: 80, dataIndex: 'P_NO' },
                { text: '名称', flex: 1, dataIndex: 'P_NAME', align: 'left' },
            ]
        }, 
        listeners: {
            itemclick: function(dv, record, item, index, e) {
                // TODO: 有底下這個錯誤, 不知道正確處理方式, 某地方看到 6.2.1 解決了這個 bug, 但是 GPL 還沒有這個版本, 待觀察
                // polyfills.bundle.js:2448 Uncaught TypeError: Cannot read property 'isModel' of null  
                var store = Ext.data.StoreManager.lookup('ext.pages.q1v.store3');
                store.proxy.extraParams.p_no = record.data.P_NO;
                store.load();
            }
        }
    }, {
        store: 'ext.pages.q1v.store3',
        columns: {
            defaults: { sortable: false, hideable: false, align: 'center' }, 
            items: [
                { text: '门店', flex: 1, dataIndex: 'S_NAME' },
                { text: '即使库存', flex: 1, dataIndex: 'PS_QTY' },
            ]
        }
    }],
    dummy: 'dummy'
});

// others
Ext.create('Ext.data.Store', {
    storeId: 'ext.pages.q1v.store1',
    fields: ['RECNO', 'D_NO', 'D_CNAME'],
    proxy: {
        type: 'ajax',
        url: utils.getApiUrl('api/q1v_1'), 
        useDefaultXhrHeader: false, // <= HERE
        reader: {
            type: 'json',
        }
    }
});

Ext.create('Ext.data.Store', {
    storeId: 'ext.pages.q1v.store2',
    fields: ['RECNO', 'P_NO', 'P_NAME'],
    proxy: {
        type: 'ajax',
        url: utils.getApiUrl('api/q1v_2'), 
        useDefaultXhrHeader: false, // <= HERE
        reader: {
            type: 'json',
        }
    }
});

Ext.create('Ext.data.Store', {
    storeId: 'ext.pages.q1v.store3',
    fields: ['S_NAME', 'PS_QTY'],
    proxy: {
        type: 'ajax',
        url: utils.getApiUrl('api/q1v_3'), 
        useDefaultXhrHeader: false, // <= HERE
        reader: {
            type: 'json',
        }
    }
});
