// tree panel
Ext.define('ext.menu.TreeMenu', {
    extend: 'Ext.tree.Panel',
    xtype: 'storetreemenu', // define xtype using xtype 
    rootVisible: false,
    store: Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true,
            children: [
                { text: '签报单', id: 'pos1', leaf: true },
                { text: '单品退货明细', id: 'pos2', leaf: true },
                { text: '销售与退货', id: 'pos3', leaf: true },
                { text: '实际业绩升降', id: 'pos4', leaf: true }
                /*
                { text: '单品退货明细', expanded: true, children: [
                    { text: '訂貨單', id: 'func2', leaf: true },
                    { text: '退貨單', id: 'func3', leaf: true}
                ] },    
                */
            ]
        }
    }),
    listeners: {
        itemclick: itemclick
    }
});

function itemclick(treemodel, record, item, index, e, eOpts) {
    if (record.data.leaf == true) {
        var tabId = 'tab_' + record.data.id;
        var isTabExist = false;
        var tabs = Ext.getCmp('tabs');

        for (var i = 0; i < tabs.items.length && !isTabExist; i++) {
            if (tabs.items.items[i].id === tabId) {
                isTabExist = true;
            }
        }

        if (isTabExist) {
            tabs.setActiveTab(tabId);
        } else {
            openTab(tabs, tabId, record);
        }
    }
}

function openTab(tabs, tabId, record) {
    var xtype = 'mypages' + record.data.id
    if (Ext.ClassManager.getByAlias('widget.' + xtype) === undefined) {
        xtype = 'mypagesblank';
    }
    tabs.add({
        title: record.data.text,
        id: tabId,
        closable: true,
        xtype: xtype
    }).show(); // set active tab
}



// =============== company tree panel ===================
Ext.define('ext.menu.TreeMenu', {
    extend: 'Ext.tree.Panel',
    xtype: 'companytreemenu', // define xtype using xtype 
    rootVisible: false,
    store: Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true,
            children: [
                { text: '门店查询', id: 'qstore', leaf: true },
                { text: '物料', id: 'qpart', leaf: true },
                { text: '6L产品异动明细', id: 'q6l', leaf: true },
                { text: '1V门市产品模板', id: 'q1v', leaf: true }
            ]
        }
    }),
    listeners: {
        itemclick: itemclick
    }
});