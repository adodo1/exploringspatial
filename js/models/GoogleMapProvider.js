/**
 * GoogleMapProvider is a Backbone model that extends the MapProvider model.
 * It contains the attributed necessary to support the Leaflet Google plugin.
 * Its main responsibility is initializing the various MapLayer models supported by Google.
 */
define([
    'models/MapProvider',
    'models/MapLayer',
    'collections/MapLayers',
    'leaflet_google'
], function (MapProvider, MapLayer, MapLayers) {
    var GoogleMapProvider = MapProvider.extend({

        /**
         * defaults contains properties unique to Google maps.
         */
        defaults: {
            name: MapProvider.GOOGLE,
            isSelected: false,
            mapLayers: new MapLayers()
        },

        /**
         * The initialize function is responsible for initializing the MapLayer models supported by Google.
         * @param args - Contains a reference to the MapEventDispatcher.
         */
        initialize: function (args) {
            this.dispatcher = args.dispatcher;
            this.on('change:isSelected', this.onMapProviderChanged, this);
            var googleLayers = [];
            googleLayers[0] = new MapLayer({
                type: MapLayer.ROAD,
                isBaseLayer: true,
                dispatcher: this.dispatcher,
                leafletLayer: new L.Google('ROADMAP')
            });
            googleLayers[1]= new MapLayer({
                type: MapLayer.SATELLITE,
                isBaseLayer: true,
                dispatcher: this.dispatcher,
                leafletLayer: new L.Google('SATELLITE')
            });
            googleLayers[2]= new MapLayer({
                type: MapLayer.HYBRID,
                isBaseLayer: true,
                dispatcher: this.dispatcher,
                leafletLayer: new L.Google('HYBRID')
            });
            googleLayers[3]= new MapLayer({
                type: MapLayer.TERRAIN,
                isBaseLayer: true,
                dispatcher: this.dispatcher,
                leafletLayer: new L.Google('TERRAIN')
            });
            this.get('mapLayers').set(googleLayers);
        }
    });

    return GoogleMapProvider;
});