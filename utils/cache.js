let cache = {}

module.exports = {
    dev: {
        /**
         * Check if developer mode has been enabled
         * @returns If developer mode is enabled
         */
        get: function() {
            return cache.devMode || false;
        },
        /**
         * Change if developer mode is enabled
         * @param {Boolean} devMode If dev mode is enabled
         * @returns If the function was successful
         */
        set: function(value) {
            if (typeof value !== 'boolean') return false;
            cache.devMode = value;
            return true;
        }
    }
}