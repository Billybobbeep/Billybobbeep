/**
 * Dev-mode cache
 */
export declare namespace dev {
    /**
     * Check if developer mode has been enabled
     * @returns If developer mode is enabled
     */
    declare function get(): Boolean;
    /**
     * Change if developer mode is enabled
     * @param {Boolean} devMode If dev mode is enabled
     * @returns If the function was successful
     */
    declare function set(value: Boolean): Boolean;
}