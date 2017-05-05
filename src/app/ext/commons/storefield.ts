Ext.define('ext.commons.field.Store', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.storefield',
    width: 200,
    // hideTrigger: true, // 隱藏旁邊的倒三角
    minChars: 2, // 輸入幾個字之後開始查詢
    typeAhead: true, // 當用戶輸入停頓超過 N ms 才去搜尋
    mode: 'remote',
    typeAheadDelya: 250, // 設定延遲時間, 預設是 250ms
    selectOnFocus: true,
    valueField: 'S_NO', // 這個選項的 value 值
    displayField: 'label', // 這個選項顯示的值
    queryParam: 'q', // 往後台查詢的時候參數的名稱
    autoLoad: true,
    store: 'ext.pages.qstore.store1',
    dummy: 'dummy'
});
