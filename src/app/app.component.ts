import { Component, OnInit, isDevMode } from '@angular/core';
declare var Ext: any;
declare var ext: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends OnInit {

  ngOnInit() {
    Ext.application({
      name: 'My App',
      stores: [], // 有共用的 stores 可能需要加在這邊
      launch: function() {
        Ext.onReady(function() {
          // ======================================================
          Ext.form.DateField.prototype.format = 'Y/m/d';
          Ext.Date.dayNames = ["日", "一", "二", "三", "四", "五", "六"];
          Ext.Date.monthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];


          Ext.Ajax.request({
            url: utils.getApiUrl('api/getStoreInfo'), 
            useDefaultXhrHeader: false, // <= HERE
            method: 'GET',
            success: function(response, opts) {
              var data = Ext.JSON.decode(response.responseText);
              if (data.s_no === '8027010') {
                Ext.create('ext.app.CompanyLayout');
              } else {
                Ext.create('ext.app.StoreLayout', data);
              }
            },
            failure: function(response, opts) {
              alert('出错了!');
              console.log(response);
              console.log(opts);
            }
          });      
          /*
          var panel = Ext.create('Ext.panel.Panel', {
              title: 'Test 2',
              autoScroll: true,
              forceFit: true,
              layout: { type: 'vbox', align: 'fit', padding: 5},
              items: 
              [
                  { xtype: 'panel', height: '75%', layout: { type: 'vbox', align: 'fit', padding: 5}},
                  { xtype: 'panel', height: '25%', layout: { type: 'vbox', align: 'fit', padding: 5}, items:[ { itemId: 'btnNewMission', xtype: 'button', height: 25, width: 125, text: 'New Mission' } ]}
              ]
          });

          var viewport = Ext.create('Ext.container.Viewport', {
              layout: 'fit',
              items:  [panel]
          });
          */
          // ======================================================
        });
      }
    });
  };

  clickButton = function() {
    //Ext.Msg.alert("測試","哈囉！！我是EXTJS初次見面，您好！^_^54321");
    // Ext.create('ext.test.Window1').show();
  };
}
