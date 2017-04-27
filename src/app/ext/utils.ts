declare var utils: any;

utils = {
    data: {
        // TODO: index.html 也要改成  <base href="dist">    <base href="/">  
        // TODO: edit this when pack angular
        isDev: false 
    },

    isDev: function() {
        return this.data.isDev;
    },

    getApiUrl: function(path) {
        return this.data.isDev ? 'https://localhost:8443/' + path : 'http://192.168.0.16:3000/iext/' + path;
    },

    getNotifyUrl: function(code) {
        return "http://192.168.0.45:3000/pages/" + code + ".htm";
    },


    getStoreVar: function(name) {
        var layout = Ext.getCmp('storeLayout');
        return (layout) ? layout[name] : undefined;
    },

    dummy: 'dummy'
};
/*
utils.foo = function() {
    alert('foo');
};
*/


Ext.define('Ext.form.field.Month', {
    extend: 'Ext.form.field.Date',
    alias: 'widget.monthfield',
    requires: ['Ext.picker.Month'],
    alternateClassName: ['Ext.form.MonthField', 'Ext.form.Month'],
    selectMonth: null,
    format: 'Y/m',
    createPicker: function () {
        var me = this;
        var format = Ext.String.format;
        return Ext.create('Ext.picker.Month', {
            pickerField: me,
            ownerCt: me.ownerCt,
            renderTo: document.body,
            floating: true,
            hidden: true,
            focusOnShow: true,
            minDate: me.minValue,
            maxDate: me.maxValue,
            disabledDatesRE: me.disabledDatesRE,
            disabledDatesText: me.disabledDatesText,
            disabledDays: me.disabledDays,
            disabledDaysText: me.disabledDaysText,
            format: me.format,
            showToday: me.showToday,
            startDay: me.startDay,
            minText: format(me.minText, me.formatDate(me.minValue)),
            maxText: format(me.maxText, me.formatDate(me.maxValue)),
            listeners: {
                select: { scope: me, fn: me.onSelect },
                monthdblclick: { scope: me, fn: me.onOKClick },
                yeardblclick: { scope: me, fn: me.onOKClick },
                OkClick: { scope: me, fn: me.onOKClick },
                CancelClick: { scope: me, fn: me.onCancelClick }
            },
            keyNavConfig: {
                esc: function () {
                    me.collapse();
                }
            }
        });
    },
    onCancelClick: function () {
        var me = this;
        me.selectMonth = null;
        me.collapse();
    },
    onOKClick: function () {
        var me = this;
        if (me.selectMonth) {
            me.setValue(me.selectMonth);
            me.fireEvent('select', me, me.selectMonth);
        }
        me.collapse();
    },
    onSelect: function (m, d) {
        var me = this;
        me.selectMonth = new Date((d[0] + 1) + '/1/' + d[1]);
    }
});
