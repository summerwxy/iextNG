Ext.define('ext.commons.field.Part', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.partfield',
    width: 300,
    // hideTrigger: true, // 隱藏旁邊的倒三角
    minChars: 2, // 輸入幾個字之後開始查詢
    typeAhead: true, // 當用戶輸入停頓超過 N ms 才去搜尋
    mode: 'remote',
    typeAheadDelya: 250, // 設定延遲時間, 預設是 250ms
    selectOnFocus: true,
    valueField: 'P_NO', // 這個選項的 value 值
    displayField: 'label', // 這個選項顯示的值
    queryParam: 'q', // 往後台查詢的時候參數的名稱
    autoLoad: true,
    store: 'ext.pages.qpart.store1',
    listeners: {
        afterrender: function(v) {
            // 作法不是特別好, 應該是處理 store 但是不知道正確寫法, 先這樣做
            v.getStore().getProxy().setExtraParam('w', 'part');
        }
    },
    dummy: 'dummy'
});
