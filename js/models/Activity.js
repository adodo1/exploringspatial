/**
 * Activity is a Backbone model representing a Garmin Activity.
 *
 */
define([
    'underscore',
    'backbone',
    'models/Geometry',
    'models/Properties'
], function (_, Backbone, Geometry, Properties) {
    var Activity = Backbone.Model.extend({
        urlRoot: "activity/",
        idAttribute: "activityId",

        /**
         * Override Backbone parse to convert properties of properties into child Backbone models.
         * @param data
         * @returns {{}}
         */
        parse: function (data) {
            var json = {};
            json.type = data.type;
            json.geometry = new Geometry(data.geometry);
            json.properties = new Properties(data.properties);
            json.id = data.id;
            return json;
        },

        /**
         * Override Backbone toJSON to return child Backbone models into properties of properties.
         */
        toJSON: function() {
            var json = _.clone(this.attributes);
            for (var attr in json) {
                if((json[attr] instanceof Backbone.Model)) {
                    json[attr] = json[attr].toJSON();
                }
            }
            return json;
        }
    });
    return Activity;
});
