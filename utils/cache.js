module.exports = {
  dev: {
    /**
     * Check if developer mode has been enabled
     * @returns If developer mode is enabled
     */
    enabled: false,
    /**
     * Change if developer mode is enabled
     * @param {Boolean} value If dev mode is enabled
     * @returns If the function was successful
     */
    changeState: function(value) {
      if (typeof value !== "boolean") return false;
      this.enabled = value;
      return true;
    }
  }
}