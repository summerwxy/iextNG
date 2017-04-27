// ==============================================================
Ext.define('ext.pages.Pos1', {
    extend: 'Ext.grid.Panel',
    xtype: 'mypagespos1', // define xtype using xtype 
    autoLoad: true,
    store: 'ext.pages.pos1.store1', // Ext.data.StoreManager.lookup('ext.pages.pos1.store1'),
    columns: {
        defaults: { sortable: false, hideable: false, align: 'center' },
        items: [
            { text: '编号', width: 80, dataIndex: 'code' },
            { text: '标题', flex: 1, dataIndex: 'title', align: 'left' },
            { text: '日期', width: 100, dataIndex: 'ann_date' },
            { text: '经办人', width: 80, dataIndex: 'handler' },
            { text: '查看内容', xtype: 'actioncolumn', width: 80, items: [{
                iconCls: 'x-fa fa-external-link',
                tooltip: '查看内容',
                handler: function(grid, rowIndex, colIndex, item, e, record) {
                    // TODO: page_type = url not implment.
                    var id = record.data.code;
                    var title = '签报单：' + id;
                    var url = utils.getNotifyUrl(id); 
                    var data = record.data;
                    data.s_no = utils.getStoreVar('s_no');
                    data.s_name = utils.getStoreVar('s_name');
                    // write record to iwill_ann_log table
                    Ext.Ajax.request({
                        url: utils.getApiUrl('api/pos1_ann_log'), 
                        useDefaultXhrHeader: false, // <= HERE
                        method: 'GET',
                        params: { annId: record.data.id }
                    });
                    pos1_openNotifyTab('pos1', id, title, url, record.data);
                }
            }]}
        ]
    },
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'ext.pages.pos1.store1' // Ext.data.StoreManager.lookup('ext.pages.pos1.store1')
    }],
    viewConfig: {
        getRowClass: function(record, rowIndex, rowParams, store) {
            return (record.data.s_no) ? 'read_ann' : 'unread_ann';
        }
    },

    dummy: 'dummy'
});


// others
Ext.create('Ext.data.Store', {
    storeId: 'ext.pages.pos1.store1',
    fields: [ 'code', 'title', 'ann_date', 'handler', 'id' ],
    pageSize: 50,
    proxy: {
        type: 'ajax',
        url: utils.getApiUrl('api/pos1'), 
        useDefaultXhrHeader: false, // <= HERE
        reader: {
            type: 'json',
            root: 'rows',
            totalProperty: 'total',
            idProperty: 'id'
        }
    },
    listeners:{
        beforeload: function(store){
            store.getProxy().setExtraParam("s_no", utils.getStoreVar("s_no"));
        }
    }
});


// ========================== my function =======================
function pos1_openNotifyTab(funcName, id, title, url, data) {
    var tabId = 'tab_' + funcName + '_' + id;
    var tabs = Ext.getCmp('tabs');
    var isTabExist = false;
    url = url || 'http://www.baidu.com/'; // default url = www.baidu.com
    for (var i = 0; i < tabs.items.length && !isTabExist; i++) {
        if (tabs.items.items[i].id === tabId) {
            isTabExist = true;
        }
    }
    if (isTabExist) {
        tabs.setActiveTab(tabId);
    } else {
        var tbItems: any = [{
            xtype: 'tbtext', style: 'color: #FFFFFF', text: data.title
        }, '-', { 
            xtype: 'tbtext', style: 'color: #FFFFFF', text: data.ann_date
        }, '-', { 
            xtype: 'tbtext', style: 'color: #FFFFFF', text: data.handler 
        }, '->'];
        if (data.op_name) {
            tbItems.push({ xtype: 'tbtext', style: 'color: #FFFFFF', text: data.op_name });
            tbItems.push({ xtype: 'tbtext', style: 'color: #FFFFFF', text: data.date_created.substr(0, 19) });
        } else {
            tbItems.push({ xtype: 'textfield', name: 'workno', width: 80, emptyText: '工号' });
            tbItems.push({ xtype: 'textfield', inputType: 'password', name: 'password', width: 80, emptyText: '密码' });
            tbItems.push({
                xtype: 'button',
                text: data.s_name + '看过了',
                listeners: {
                    click: function(button) {
                        var tb = button.up("toolbar");
                        var workno = tb.down("[name=workno]").value;
                        var password = tb.down("[name=password]").value;
                        Ext.Ajax.request({
                            url: utils.getApiUrl('api/pos1_sign'), 
                            useDefaultXhrHeader: false, // <= HERE
                            method: 'GET',
                            params: { 
                                ann_id: data.id,
                                s_no: data.s_no,
                                workno: workno,
                                password: password
                            },
                            success: function(response, opts) {
                                var res = Ext.JSON.decode(response.responseText);
                                if (res.status === 'okay') {
                                    // remove and add info
                                    var items = tb.items.items;
                                    tb.remove(items[items.length - 1]);
                                    tb.remove(items[items.length - 1]);
                                    tb.remove(items[items.length - 1]);
                                    tb.add({ xtype: 'tbtext', style: 'color: #FFFFFF', text: res.op_name });
                                    tb.add({ xtype: 'tbtext', style: 'color: #FFFFFF', text: res.date_created.substr(0, 19) });
                                    // change parent row color
                                    var ptab = Ext.getCmp("tab_pos1");
                                    if (ptab) {
                                        var view = ptab.getView();
                                        var rows = view.getStore().data.items;
                                        for (var i = 0; i < rows.length; i++) {
                                            if (rows[i].data.id == data.id) {
                                                view.addRowCls(i, 'read_ann');
                                                view.removeRowCls(i, 'unread_ann');
                                                break;
                                            }
                                        }
                                    }
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
                }
            });
        }
        tabs.add({
            title: title,
            id: tabId,
            closable: true,
            xtype: 'panel',
            items: [{
                xtype: 'toolbar',
                border: true,
                cls: 'toolbar_cls',
                items: tbItems
            }, {
                xtype: 'component',
                width: '100%',
                height: '100%',
                autoEl: {
                    tag: 'iframe',
                    frameborder: 0,
                    src: url
                }
            }]
        }).show(); // set active tab
    }
};
// ========================================================================
