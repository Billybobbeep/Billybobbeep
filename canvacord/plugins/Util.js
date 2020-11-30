const moment = require("moment");
const abbrev = require("./abbrev");
const renderEmoji = require("./renderEmoji");
require("moment-duration-format");

class Util {

    /**
     * Canvacord Util
     */
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
    }

    /**
     * Converts regular timestamp to discord like time
     * @param {Date} time Timestamp to convert
     */
    static discordTime(time = new Date()) {
        let date = time && time  instanceof Date ? time : new Date();
        let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `Today at ${hours}:${minutes}`;
    }

    /**
     * Formats time
     * @param {number} time Time to format
     */
    static formatTime(time) {
        if (!time) return "00:00";
        const fmt = moment.duration(time).format("dd:hh:mm:ss");

        const chunk = fmt.split(":");
        if (chunk.length < 2) chunk.unshift("00");
        return chunk.join(":");
    }

    /**
     * Shorten text.
     * @param {string} text Text to shorten 
     * @param {number} len Max Length
     */
    static shorten(text, len) {
        if (typeof text !== "string") return "";
        if (text.length <= len) return text;
        return text.substr(0, len).trim() + "...";
    }

    /**
     * Converts numbers into units like `1K`, `1M`, `1B` etc.
     * @param {number|string} num
     * @returns {string} 
     */
    static toAbbrev(num) {
        return abbrev(num);
    }

    /**
     * Renders text with emoji
     * @param {CanvasRenderingContext2D} ctx CanvasRenderingContext2D
     * @param {string} msg Message
     * @param {number} x X
     * @param {number} y Y
     */
    static renderEmoji(ctx, msg, x, y) {
        return renderEmoji(ctx, msg, x, y);
    }

    /**
     * Returns formatted hex code
     * @param {string} hex Hex code to format
     */
    static formatHex(hex, alt = "#000000") {
        if (!hex || typeof hex !== "string") return "#000000";
        hex = hex.replace("#", "");
        if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        if (hex.length !== 6) return "#000000";

        return `#${hex}`;
    }

    /**
     * Inverts hex color
     * @param {string} hex Hex color code to invert
     */
    static invertColor(hex) {
        if (!hex || typeof hex !== "string") return "#FFFFFF";
        hex = hex.replace("#", "");

        // match hex color
        if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        if (hex.length !== 6) return "#FFFFFF";

        // invert colors
        const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16);
        const g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16);
        const b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);

        // return new hex
        const pad = (txt, length) => {
            length = length || 2;
            let arr = [length].join("0");
            return (arr + txt).slice(-length);
        };

        const finalHex = `#${pad(r)}${pad(g)}${pad(b)}`;
        console.log(finalHex)
        return finalHex;
    }

    /**
     * Returns acronym
     * @param {string} name Name to parse acronym
     */
    static getAcronym(name) {
        if (!name || typeof name !== "string") return "";
        return name
            .replace(/'s /g, " ")
            .replace(/\w+/g, e => e[0])
            .replace(/\s/g, "");
    }

    /**
     * Returns array of lines
     * @param {object} params Params
     * @param {string} text Text
     * @param {CanvasRenderingContext2D} ctx CanvasRenderingContext2D
     * @param {number} maxWidth Max width 
     */
    static getLines({ text, ctx, maxWidth }) {
        if (!text) return [];
        if (!ctx) throw new Error("Canvas context was not provided!");
        if (!maxWidth) throw new Error("No max-width provided!");
        const lines = [];

        while (text.length) {
            let i;
            for (i = text.length; ctx.measureText(text.substr(0, i)).width > maxWidth; i -= 1);
            const result = text.substr(0, i);
            let j;
            if (i !== text.length) for (j = 0; result.indexOf(" ", j) !== -1; j = result.indexOf(" ", j) + 1);
            lines.push(result.substr(0, j || result.length));
            text = text.substr(lines[lines.length - 1].length, text.length);
        }

        return lines;
    }

}

module.exports = Util;