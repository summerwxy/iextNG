Ext.define('ext.pages.Func1', {
    extend: 'Ext.panel.Panel',
    xtype: 'mypagesfunc1', // define xtype using xtype 
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        style: { 'background-color': '#157FCC' },
        items: [{
            text: 'Docked to the top'
        }]
    }],
    /*
    tbar: [{
        xtype: 'toolbar',
        items:[{
            text: 'Button'
        }, {
            xtype: 'splitbutton',
            text: 'Split Button'
        }, '->', {
            xtype: 'textfield',
            name: 'field1',
            emptyText: 'enter search term'
        }, '-', 'text1', {
            xtype: 'tbspacer'
        }, 'text2', {
            xtype: 'tbspacer',
            width: 50
        }, 'text3']
    }],
    */
    dummy: 'dummy'
});