export namespace dev {
  /**
   * Check if developer mode has been enabled
   * @returns If developer mode is enabled
   */
  export var enabled: Boolean;
  /**
   * Change if developer mode is enabled
   * @param {Boolean} value If dev mode is enabled
   * @returns If the function was successful
   */
  export declare function changeState(value: Boolean): Boolean;
}