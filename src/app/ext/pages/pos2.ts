// ==============================================================
Ext.define('ext.pages.Pos2', {
    extend: 'Ext.panel.Panel',
    xtype: 'mypagespos2', // define xtype using xtype 
    autoScroll: true,
    dockedItems: [{
        xtype: 'toolbar',
        border: true,
        cls: 'toolbar_cls',
        items: [
            { xtype: 'tbtext', style: 'color: #FFFFFF', text: '日期:' },
            { xtype: 'datefield', name: 'the_day', width: 100, editable: false, value: Ext.Date.format(new Date((new Date()).valueOf() - 1000*60*60*24), 'Y/m/d') }, 
            {
                xtype: 'button', text: '查询',
                listeners: {
                    click: function(view) {
                        var df = this.up('toolbar').down('[name=the_day]');
                        this.up('mypagespos2').queryData(df.rawValue);
                    }
                }
            }
        ]
    }],
    items: [{
        xtype: 'grid',
        id: 'pos2_grid',
        padding: 10,
        title: '',
        // header: { cls: 'unread_ann' }, 
        store: 'ext.pages.pos2.store1',
        dockedItems: [{
            xtype: 'toolbar',
            border: true, 
            cls: 'toolbar_cls',
            items: []
        }],
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
    }],

    listeners:{
        afterrender: function(c){
            var df = this.down('[name=the_day]');
            if (df) {
                this.queryData(df.rawValue);
            }
        }
    },

    queryData: function(the_day) {
        var grid = this.down('grid');
        if (grid) {
            grid.setTitle(the_day);
        }
        var store = Ext.data.StoreManager.lookup('ext.pages.pos2.store1');
        store.proxy.extraParams.s_no = utils.getStoreVar("s_no"); // '802A001'
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
            root: 'rows'
        }
    },
    listeners: {
        metachange: function(store, meta) {
            var grid = Ext.getCmp("pos2_grid");
            var tb = grid.down('toolbar');
            if (store.data.length == 0) {
                tb.removeAll(); // 沒有資料 把簽名那邊清空
                grid.header.removeCls('unread_ann');
            } else if (meta.op_name) {
                tb.removeAll();
                tb.add({ xtype: 'tbtext', style: 'color: #FFFFFF', text: meta.op_name });
                tb.add({ xtype: 'tbtext', style: 'color: #FFFFFF', text: meta.date_created.substr(0, 19) });
                grid.header.removeCls('unread_ann');
            } else {
                tb.removeAll();
                tb.add({ xtype: 'textfield', name: 'workno', width: 80, emptyText: '工号' });
                tb.add({ xtype: 'textfield', inputType: 'password', name: 'password', width: 80, emptyText: '密码' });
                tb.add({ xtype: 'button', text: utils.getStoreVar('s_name') + '看过了', listeners: {
                    click: function(button) {
                        var tb = button.up("toolbar");
                        var workno = tb.down("[name=workno]").value;
                        var password = tb.down("[name=password]").value;
                        Ext.Ajax.request({
                            url: utils.getApiUrl('api/pos2_sign'), 
                            useDefaultXhrHeader: false, // <= HERE
                            method: 'GET',
                            params: { 
                                workno: workno,
                                password: password,
                                s_no: utils.getStoreVar('s_no'),
                                the_day: grid.title
                            },
                            success: function(response, opts) {
                                var res = Ext.JSON.decode(response.responseText);
                                if (res.status === 'okay') {
                                    // remove and add info
                                    tb.removeAll();
                                    tb.add({ xtype: 'tbtext', style: 'color: #FFFFFF', text: res.op_name });
                                    tb.add({ xtype: 'tbtext', style: 'color: #FFFFFF', text: res.date_created.substr(0, 19) });
                                    grid.header.removeCls('unread_ann');
                                    Ext.toast({ html: '签名成功！', cls: 'toast_success'});
                                } else if (res.status === 'invalid') {
                                    Ext.toast({ html: '工号/密码 错误！', cls: 'toast_danger'});
                                } else {
                                    alert('huh?');
                                }
                            },
                            failure: function(response, opts) {
                                alert('出错了!');
                                console.log(response);
                                console.log(opts);
                            }
                        });  
                    }
                }});

                grid.header.addCls("unread_ann");
            }
        }
    }
});
