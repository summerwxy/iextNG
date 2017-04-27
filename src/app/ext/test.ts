Ext.define("ext.test.Window1", {
    extend: 'Ext.window.Window',
    title: 'Hello',
    height: 200,
    width: 400,
    layout: 'fit',
    items: {
        xtype: 'grid',
        border: false,
        columns: [{header: 'World'}],
        store: Ext.create('Ext.data.ArrayStore', {})
    }
});

