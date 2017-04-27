Ext.define("ext.Person", {
    Name: '',
    Age: 0,
    Say: function (msg) {
        Ext.Msg.alert(this.Name + " Says:", msg);
    },
    constructor: function (name, age) {
        this.Name = name;
        this.Age = age;
    }
});

