declare var Ext: any;

Ext.define('ext.app.StoreLayout', {
    extend: 'Ext.container.Viewport',
    id: 'storeLayout',
    layout: 'border',
    config: {
        s_no: '[[s_no]]',
        s_name: '[[s_name]]',
        foo: 'FOO'
    },
    constructor : function (config) {
        this.callParent(arguments);
        var me = this;
        this.add({
            region: 'north',
            layout: 'hbox',
            border: false,
            width: '100%',
            margin: '0 0 0 0',
            padding: '5 5 5 5',
            defaults: {bodyStyle: { 'background-color': '#3892D4', 'color': '#FFFFFF' }},
            items: [{
                html: '<h1 class="x-panel-header">爱维尔 - 门店专用系统</h1>',
                flex: 1,
            }, {
                html: '<h1 class="x-panel-header">' + me.s_no + " - " + me.s_name + '</h1>',
            }]
        });
    },
    items: [{
        region: 'west',
        collapsible: true,
        title: '功能菜单',
        width: 150,
        split: true,
        items: [{xtype: 'storetreemenu'}]
    }, {
        region: 'south',
        // title: 'South Panel',
        // collapsible: true,
        html: 'Powered by 0_o',
        bodyStyle: { 'background-color': '#3892D4', 'color': '#FFFFFF', 'text-align': 'center' },
        border: false,
        split: true,
        height: 20,
        minHeight: 20
    }, {
    /*
        region: 'east',
        title: 'East Panel',
        collapsible: true,
        split: true,
        width: 150
    }, {
    */
        region: 'center',
        id: 'tabs', 
        xtype: 'tabpanel', // TabPanel itself has no title
        activeTab: 0, // First tab active by default
        // minTabWidth: 150,
        items: [{
            title: 'HOME',
            html: '首页, 目前没内容'
        }]
    }]
});


// ============== 公司用 ==================
Ext.define('ext.app.CompanyLayout', {
    extend: 'Ext.container.Viewport',
    id: 'companyLayout',
    layout: 'border',
    config: {
    },
    constructor : function (config) {
        this.callParent(arguments);
        var me = this;
        this.add({
            region: 'north',
            layout: 'hbox',
            border: false,
            width: '100%',
            margin: '0 0 0 0',
            padding: '5 5 5 5',
            defaults: {bodyStyle: { 'background-color': '#3892D4', 'color': '#FFFFFF' }},
            items: [{
                html: '<h1 class="x-panel-header">爱维尔 - 公司专用系统</h1>',
                flex: 1,
            }]
        });
    },
    items: [{
        region: 'west',
        collapsible: true,
        title: '功能菜单',
        width: 150,
        split: true,
        items: [{xtype: 'companytreemenu'}]
    }, {
        region: 'south',
        // title: 'South Panel',
        // collapsible: true,
        html: 'Powered by 0_o',
        bodyStyle: { 'background-color': '#3892D4', 'color': '#FFFFFF', 'text-align': 'center' },
        border: false,
        split: true,
        height: 20,
        minHeight: 20
    }, {
    /*
        region: 'east',
        title: 'East Panel',
        collapsible: true,
        split: true,
        width: 150
    }, {
    */
        region: 'center',
        id: 'tabs', 
        xtype: 'tabpanel', // TabPanel itself has no title
        activeTab: 0, // First tab active by default
        // minTabWidth: 150,
        items: [{
            title: 'HOME',
            html: '首页, 目前没内容'
        }]
    }]
});



