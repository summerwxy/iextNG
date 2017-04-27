// ==============================================================
Ext.define('ext.pages.Pos2', {
    extend: 'Ext.grid.Panel',
    xtype: 'mypagespos2', // define xtype using xtype 
    store: 'ext.pages.pos2.store1', 
    columns: {
        defaults: { hideable: false, align: 'right' },
        items: [
            { text: '品号', width: 80, dataIndex: 'P_NO', algin: 'center' },
            { text: '品名', width: 150, dataIndex: 'P_NAME', align: 'left' },
            { text: '订货', width: 80, dataIndex: 'PO_QTY', xtype: 'numbercolumn', format:'0,000' },
            { text: '进货', width: 80, dataIndex: 'IN_QTY', xtype: 'numbercolumn', format:'0,000' },
            { text: '差异', width: 80, dataIndex: 'DIFF_QTY', xtype: 'numbercolumn', format:'0,000' },
            { text: '生产入库', width: 100, dataIndex: 'SST_QTY', xtype: 'numbercolumn', format:'0,000' },
            { text: '期初', width: 80, dataIndex: 'PS_QTY', xtype: 'numbercolumn', format:'0,000' },
            { text: '调拨', width: 80, dataIndex: 'TR_QTY', xtype: 'numbercolumn', format:'0,000' },
            { text: '退货', width: 80, dataIndex: 'BA_QTY', xtype: 'numbercolumn', format:'0,000' },
            { text: '销售', width: 80, dataIndex: 'SL_QTY', xtype: 'numbercolumn', format:'0,000' },
            { text: '退货率(%)', width: 100, dataIndex: 'BA_PRCNT', xtype: 'numbercolumn', format:'0.0%' },
        ]
    },

    initComponent: function () {
        Ext.apply(this, {
            dockedItems: this.buildDocks()
        });
        this.callParent(arguments);
    },

    listeners:{
        afterrender: function(c){
            //c.getSize();//both width and height would be null, if you did not specify them
            //c.element.getSize(); //this is real size
            var df = this.down('[name=the_day]');
            if (df) {
                this.loadStore(df.rawValue);
            }
            
        }
    },

    buildDocks: function() {
        var dock = {
            xtype: 'toolbar',
            border: true,
            cls: 'toolbar_cls',
            items: [
                { xtype: 'tbtext', style: 'color: #FFFFFF', text: '日期:' },
                { xtype: 'datefield', name: 'the_day', id: 'pos2_the_day', width: 100, editable: false, value: Ext.Date.format(new Date((new Date()).valueOf() - 1000*60*60*24), 'Y/m/d') }, 
                {
                    xtype: 'button', text: '查询',
                    listeners: {
                        click: function(view) {
                            var tb = this.up('toolbar');
                            var df = tb.down('[name=the_day]');
                            this.up('mypagespos2').loadStore(df.rawValue);
                        }
                    }
                }, '->'
            ]
        };
        // TODO: sign input or sign info.
        return dock;
    },

    loadStore: function(the_day) {
        var store = Ext.data.StoreManager.lookup('ext.pages.pos2.store1');
        store.proxy.extraParams.s_no = '802A001'; // utils.getStoreVar("s_no")
        store.proxy.extraParams.the_day = the_day;
        store.load();
    },

    dummy: 'dummy'
});


// others
Ext.create('Ext.data.Store', {
    storeId: 'ext.pages.pos2.store1',
    fields: [ 'P_NO', 'P_NAME', 'PO_QTY', 'IN_QTY', 'SST_QTY', 'TR_OUT_QTY', 'TR_IN_QTY', 'BA_QTY', 'SL_QTY', 'PS_QTY', 'BA_PRCNT', {
        name: 'DIFF_QTY', type: 'number', persist: false,
        convert:function(value, record){
            var data = record.getData();
            return data.PO_QTY - data.IN_QTY;
        }
    }, {
        name: 'TR_QTY', type: 'number', persist: false,
        convert:function(value, record){
            var data = record.getData();
            return data.TR_IN_QTY - data.TR_OUT_QTY;
        }
    }],
    proxy: {
        type: 'ajax',
        url: utils.getApiUrl('api/pos2'), 
        useDefaultXhrHeader: false, // <= HERE
        reader: {
            type: 'json',
            root: 'rows',
        }
    },

});
