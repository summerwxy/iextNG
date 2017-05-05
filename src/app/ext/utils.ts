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
        return this.data.isDev ? 'http://localhost:8080/' + path : 'http://192.168.0.16:3000/iext/' + path;
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
