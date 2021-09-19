/**
 * Dev-mode cache
 */
export namespace dev {
    function get(): Boolean;
    /**
     * Change if dev mode is enabled
     * @param {Boolean} devMode If dev mode is enabled
     * @returns If the function was successful
    */
    function set(value: Boolean): Boolean;
}