//
// Copyright (c) 2013-2016 SKYARCH NETWORKS INC.
//
// This software is released under the MIT License.
//
// http://opensource.org/licenses/mit-license.php
//
(function () {
  'use_strict';

  //browserify functions for vue filters functionality
  var wrap = require('./modules/wrap');
  var listen = require('./modules/listen');
  var queryString = require('query-string').parse(location.search);
  var modal = require('modal');
  var app;

  Vue.component('demo-grid', {
    template: '#grid-template',
    replace: true,
    props: {
      data: Array,
      columns: Array,
      filterKey: String
    },
    data: function () {
      var sortOrders = {};
      this.columns.forEach(function (key) {
        sortOrders[key] = 1;
      });
      return {
        sortKey: '',
        sortOrders: sortOrders,
        option: ['project'],
        lang: queryString.lang,
        pages: 10,
        pageNumber: 0,
        filteredLength: null,
        picked: null,
          };
      },
    methods: {
      sortBy: function (key) {
          if(key !== 'id')
            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1;
      },
      showPrev: function(){
          if(this.pageNumber === 0) return;
          this.pageNumber--;
      },
      showNext: function(){
          if(this.isEndPage) return;
          this.pageNumber++;
      },
      select_entry: function(item)  {
        this.$parent.picked = item;
        this.picked = item;
      },
      show_entry: function(item){
        window.location.assign(item.infrastructures_path);
      }
    },
    computed: {
      isStartPage: function(){
          return (this.pageNumber === 0);
      },
      isEndPage: function(){
          return ((this.pageNumber + 1) * this.pages >= this.data.length);
      },
    },
    created: function (){
        var il = new Loader();
        var self = this;
        self.loading = true;
        var id =  queryString.client_id;
        var monthNames = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"
                          ];
       $.ajax({
           cache: false,
           url:'projects?client_id='+id+'&lang='+self.lang,
           success: function (data) {
             this.pages = data.length;
             self.data = data;
             self.$emit('data-loaded');
             var empty = t('projects.msg.empty-list');
             if(self.data.length === 0){ $('#empty').show().html(empty);}
             self.filteredLength = data.length;
           }
         });
         $("#loading").hide();
    },
    filters:{
      wrap: wrap,
      listen: listen,
      paginate: function(list) {
        var index = this.pageNumber * this.pages;
        return list.slice(index, index + this.pages);
      },
      roundup: function (val) { return (Math.ceil(val));},
      count: function (arr) {
        // record length
        this.$set('filteredLength', arr.length);
        // return it intact
        return arr;
      },
    },
 });


  var projectIndex = new Vue({
    el: '#indexElement',
    data: {
      searchQuery: '',
      gridColumns: ['code','name', 'cloud_provider', 'access_key'],
      gridData: [],
      picked: {
        edit_url: null,
        project_settings: {
          dishes_path: null,
          key_pairs_path: null,
          project_parameters_path: null
        }
      }
    },
    methods: {
      can_edit: function() {
        if (this.picked)
          return this.picked.edit_project_url ? true : false;
      },
      can_delete: function() {
        if (this.picked.delete_project_url)
          return (this.picked.code[1] > 0);
      },
      delete_entry: function()  {
        var delete_project_url = this.picked.delete_project_url;
        modal.Confirm(t('projects.project'), t('projects.msg.delete_project'), 'danger').done(function () {
          $.ajax({
            type: "POST",
            url: delete_project_url,
            dataType: "json",
            data: {"_method":"delete"},
          });
          event.preventDefault();
          location.reload();
        });
      }
    },

  });
})();
