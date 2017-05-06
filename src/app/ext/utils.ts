declare var utils: any;

utils = {
    data: {
        // TODO: DEV MODE:  isDev: true, index.html = <base href="/">
        // TODO: PROD MODE:  isDev: false, index.html = <base href="dist">
        isDev: true 
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
