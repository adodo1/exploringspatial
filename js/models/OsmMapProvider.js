/**
 * OsmMapProvider is a Backbone model that extends the MapProvider model.
 * It contains the attributed necessary to support the Leaflet OSM plugin.
 * Its main responsibility is initializing the various MapLayer models supported by OSM.
 */
define([
    'models/MapProvider',
    'models/MapLayer',
    'collections/MapLayers',
    'leaflet'
], function (MapProvider, MapLayer, MapLayers) {
    var OsmMapProvider = MapProvider.extend({

        /**
         * defaults contains properties unique to OSM maps.
         */
        defaults: {
            name: MapProvider.OSM,
            isSelected: false,
            mapLayers: new MapLayers(),
            roadAttribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            satelliteAttribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; ' +
            'Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
        },

        /**
         * The initialize function is responsible for initializing the MapLayer models supported by OSM.
         * @param args - Contains a reference to the MapEventDispatcher.
         */
        initialize: function (args) {
            this.dispatcher = args.dispatcher;
            this.on('change:isSelected', this.onMapProviderChanged, this);
            var osmLayers = [];
            osmLayers[0] = new MapLayer({
                type: MapLayer.ROAD,
                isBaseLayer: true,
                dispatcher: this.dispatcher,
                leafletLayer: new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: this.get('roadAttribution')
                })
            });
            osmLayers[1]= new MapLayer({
                type: MapLayer.SATELLITE,
                isBaseLayer: true,
                dispatcher: this.dispatcher,
                leafletLayer: new L.tileLayer('http://oatile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
                    attribution: this.get('satelliteAttribution'),
                    subdomains: '1234'
                })
            });
            this.get('mapLayers').set(osmLayers);
        }
    });

    return OsmMapProvider;
});