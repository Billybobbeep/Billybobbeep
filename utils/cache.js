let cache = {}

module.exports = {
    discord: {
        responseTime: {
            /**
             * @returns {Number} The discord response time
             */
            get: function() {
                return cache.discordResponse || 90;
            },
            /**
             * Set the discord response time
             * @param {Number} time The time it takes for discords API to respond
             * @returns {Boolean} If the function was successful
             */
            set: function(time) {
                if (typeof time !== 'number') return false;
                cache.discordResponse = time;
                return true;
            }
        }
    },
    dev: {
        /**
         * @returns {Boolean} If dev mode is enabled
         */
        get: function() {
            return cache.devMode || false;
        },
        /**
         * Change if dev mode is enabled
         * @param {Boolean} devMode If dev mode is enabled
         * @returns {Boolean} If the function was successful
         */
        set: function(devMode) {
            if (typeof devMode !== 'boolean') return false;
            cache.devMode = devMode;
            return true;
        }
    }
}