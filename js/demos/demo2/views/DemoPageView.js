define([
    'jquery',
    'underscore',
    'backbone',
    'text!demos/demo2/templates/DemoPageView.html'
], function ($, _, Backbone, templateHtml) {
    var DemoPageView = Backbone.View.extend({

        initialize: function () {
            this.template = _.template(templateHtml);
            this.render();
        },

        render: function () {
            var $window = $(window);
            var width = $window.width() - 100;
            var height = $window.height() - 220;
            this.$el.html(this.template({mapHeight: height, mapWidth: width}));
            var s = "http://www.arcgis.com/home/webmap/templates/OnePane/basicviewer/embed.html?webmap=0e73fa10d87940979c9e026578b8ce52&amp;gcsextent=-180,-50.7791,-17.7411,67.7838&amp;displayslider=true&amp;displayscalebar=true&amp;displaylegend=true&amp;displaybasemaps=true";
            var iframe1 = document.getElementById('iframe1');
            if (-1 == navigator.userAgent.indexOf("MSIE")) {
                iframe1.src = s;
            }
            else {
                iframe1.location = s;
            }
        },

        sizeMaps: function () {
            // no op
        },

        destroy: function () {
            // Remove view from DOM
            this.remove();
        },

        getDemoId: function () {
            return 2;
        }

    });

    DemoPageView.DEMO_ID = 2;

    return DemoPageView;
});