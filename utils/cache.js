let cache = {}

module.exports = {
    /**
     * Dev-mode cache
     */
    dev: {
        /**
         * @returns {boolean} If dev mode is enabled
         */
        get: function () {
            return cache.devMode || false;
        },
        /**
         * Change if dev mode is enabled
         * @param {boolean} devMode If dev mode is enabled
         * @returns {boolean} If the function was successful
         */
        set: function (devMode) {
            if (typeof devMode !== 'boolean') return false;
            cache.devMode = devMode;
            return true;
        }
    }
}