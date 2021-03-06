L.Control.TimeLineSlider = L.Control.extend({
    options: {
        position: "bottomright",
        timelineItems: ["Today", "Tomorrow", "The Next Day"],
        changeMap: function ({
            label: label,
            value: value,
            map: map
        }) {
            console.log("You are not using the value or label from the timeline to change the map.")
        },
        extraChangeMapParams: {},
        initializeChange: !0,
        thumbHeight: "4.5px",
        labelWidth: "80px",
        betweenLabelAndRangeSpace: "20px",
        labelFontSize: "14px",
        activeColor: "#37adbf",
        inactiveColor: "#8e8e8e",
        backgroundOpacity: .75,
        backgroundColor: "#ffffff",
        topBgPadding: "10px",
        bottomBgPadding: "0px",
        rightBgPadding: "30px",
        leftBgPadding: "30px"
    },
    initialize: function (options) {
        "function" != typeof options.changeMap && (options.changeMap = function ({
            label: label,
            value: value,
            map: map
        }) {
            console.log("You are not using the value or label from the timeline to change the map.")
        }), parseFloat(options.thumbHeight) <= 2 && console.log("The nodes on the timeline will not appear properly if its radius is less than 2px."), L.setOptions(this, options)
    },
    onAdd: function (map) {
        for (li of (this.map = map, this.sheet = document.createElement("style"), document.body.appendChild(this.sheet), this.container = L.DomUtil.create("div", "control_container"), L.DomEvent.disableClickPropagation(this.container), L.DomEvent.on(this.container, "control_container", function (ev) {
                L.DomEvent.stopPropagation(ev)
            }), L.DomEvent.disableScrollPropagation(this.container), this.slider = L.DomUtil.create("div", "range", this.container), this.slider.innerHTML = `<input id="rangeinputslide" type="range" min="1" max="${this.options.timelineItems.length}" steps="1" value="1"></input>`, this.rangeLabels = L.DomUtil.create("ul", "range-labels", this.container), this.rangeLabels.innerHTML = this.options.timelineItems.map(item => "<li>" + item + "</li>").join(""), this.rangeInput = L.DomUtil.get(this.slider).children[0], this.rangeLabelArray = Array.from(this.rangeLabels.getElementsByTagName("li")), this.sliderLength = this.rangeLabelArray.length, this.thumbSize = 2 * parseFloat(this.options.thumbHeight), this.activeThumbSize = 2 * this.thumbSize, this.rangeWidthCSS = parseFloat(this.options.labelWidth) * (this.options.timelineItems.length - 1) + 2 * this.thumbSize, this.rlLabelMargin = parseFloat(this.options.labelWidth) / 2 - parseFloat(this.options.thumbHeight) / 2, this.topLabelMargin = parseFloat(this.options.betweenLabelAndRangeSpace) - parseFloat(this.options.thumbHeight) - 2.5, this.backgroundRGBA = this.hexToRGBA(this.options.backgroundColor, this.options.backgroundOpacity), this.coverBackgroundRGBA = this.hexToRGBA(this.options.backgroundColor, 0), that = this, this.sheet.textContent = this.setupStartStyles(), L.DomEvent.on(this.rangeInput, "input", function () {
                curValue = this.value, that.sheet.textContent += that.getTrackStyle(this, that.sliderLength);
                var curLabel = that.rangeLabelArray[curValue - 1].innerHTML;
                mapParams = {
                    value: curValue,
                    label: curLabel,
                    map: map
                }, allChangeMapParameters = {
                    ...mapParams,
                    ...that.options.extraChangeMapParams
                }, that.options.changeMap(allChangeMapParameters)
            }), this.rangeLabelArray)) L.DomEvent.on(li, "click", function (e) {
            var targetli = e.target,
                index = that.rangeLabelArray.indexOf(targetli);
            that.rangeInput.value = index + 1;
            var inputEvent = new Event("input");
            that.rangeInput.dispatchEvent(inputEvent)
        });
        if (this.options.initializeChange) {
            var inputEvent = new Event("input");
            this.rangeInput.dispatchEvent(inputEvent)
        }
        return this.container
    },
    onRemove: function () {
        L.DomUtil.remove(this.container)
    },
    hexToRGBA: function (hex, opacity) {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) return 3 == (c = hex.substring(1).split("")).length && (c = [c[0], c[0], c[1], c[1], c[2], c[2]]), "rgba(" + [(c = "0x" + c.join("")) >> 16 & 255, c >> 8 & 255, 255 & c].join(",") + "," + opacity + ")";
        throw new Error("Bad Hex")
    },
    setupStartStyles: function () {
        return style = `\n            .control_container { \n                background-color: ${that.backgroundRGBA};\n                padding: ${that.options.topBgPadding} ${that.options.rightBgPadding} ${that.options.bottomBgPadding} ${that.options.leftBgPadding};\n            }\n\n            .range {\n                position: relative;\n                left: -${that.thumbSize}px;\n                height: 5px;\n                width: ${that.rangeWidthCSS}px;\n            }\n\n            .range input {\n                width: 100%;\n                position: absolute;\n                height: 0;\n                -webkit-appearance: none;\n            }\n\n            /* -1 because the height is 2 (half the height) */\n            .range input::-webkit-slider-thumb {\n                background: ${that.options.activeColor};\n                margin: -${that.thumbSize-1}px 0 0;\n                width: ${that.activeThumbSize}px;\n                height: ${that.activeThumbSize}px;    \n                -webkit-appearance: none;\n                border-radius: 50%;\n                cursor: pointer;\n                border: 0 !important;\n            }\n            .range input::-moz-range-thumb {\n                background: ${that.options.activeColor};\n                margin: -${that.thumbSize-1}px 0 0;\n                width: ${that.activeThumbSize}px;\n                height: ${that.activeThumbSize}px;\n                border-radius: 50%;\n                cursor: pointer;\n                border: 0 !important;\n            }\n            .range input::-ms-thumb {\n                background: ${that.options.activeColor};\n                margin: -${that.thumbSize-1}px 0 0;\n                width: ${that.activeThumbSize}px;\n                height: ${that.activeThumbSize}px;\n                border-radius: 50%;\n                cursor: pointer;\n                border: 0 !important;\n            }\n\n\n            .range input::-webkit-slider-runnable-track {\n                background: ${that.options.backgroundColor};\n                width: 100%;\n                height: 2px;\n                cursor: pointer;\n            }\n            .range input::-moz-range-track {\n                background: ${that.options.backgroundColor};\n                width: 100%;\n                height: 2px;\n                cursor: pointer;\n            }\n            .range input::-ms-track {\n                background: ${that.options.backgroundColor};\n                width: 100%;\n                height: 2px;\n                cursor: pointer;\n                background: transparent;\n                border-color: transparent;\n                color: transparent;\n            }\n\n            .range input:focus {\n                background: none;\n                outline: none;\n            }\n\n            . range input[type=range]::-moz-focus-outer {\n                border: 0;\n            }\n\n            .range-labels {\n                margin: ${that.topLabelMargin}px -${that.rlLabelMargin}px 0;\n                padding: 0;\n                list-style: none;\n            }\n\n            .range-labels li {\n                color: ${that.options.inactiveColor};\n                width: ${that.options.labelWidth};\n                font-size: ${that.options.labelFontSize};\n                position: relative;\n                float: left;\n                text-align: center;\n                cursor: pointer;\n            }\n            .range-labels li::before {\n                background: ${that.options.inactiveColor};\n                width: ${that.thumbSize}px;\n                height: ${that.thumbSize}px;\n                position: absolute;\n                top: -${that.options.betweenLabelAndRangeSpace};\n                right: 0;\n                left: 0;\n                content: "";\n                margin: 0 auto;\n                border-radius: 50%;\n            }\n            .range-labels .active {\n                color: ${that.options.activeColor};\n            }\n            .range-labels .selected::before {\n                background: ${that.options.activeColor};\n            }\n            .range-labels .active.selected::before {\n                display: none;\n            }\n            `, style
    },
    getTrackStyle: function (el, sliderLength) {
        prefs = ["webkit-slider-runnable-track", "moz-range-track", "ms-track"];
        var curVal = el.value,
            labelIndex = curVal - 1,
            val = labelIndex * (100 / (sliderLength - 1)),
            coverVal = parseFloat(that.thumbSize) / that.rangeWidthCSS * 100;
        for (li of (style = "", that.rangeLabelArray)) L.DomUtil.removeClass(li, "active"), L.DomUtil.removeClass(li, "selected");
        var curLabel = that.rangeLabelArray[labelIndex];
        for (L.DomUtil.addClass(curLabel, "active"), L.DomUtil.addClass(curLabel, "selected"), i = 0; i < curVal; i++) L.DomUtil.addClass(that.rangeLabelArray[i], "selected");
        for (var i = 0; i < prefs.length; i++) style += `.range {background: linear-gradient(to right, ${that.coverBackgroundRGBA} 0%, ${that.coverBackgroundRGBA} ${coverVal}%, ${that.options.activeColor} ${coverVal}%, ${that.options.activeColor} ${val}%,  ${that.coverBackgroundRGBA} 0%, ${that.coverBackgroundRGBA} 100%)}`, style += ".range input::-" + prefs[i] + `{background: linear-gradient(to right, ${that.coverBackgroundRGBA} 0%, ${that.coverBackgroundRGBA} ${coverVal}%, ${that.options.activeColor} 0%, ${that.options.activeColor} ${val}%, ${that.options.inactiveColor} ${val}%, ${that.options.inactiveColor} ${100-coverVal}%, ${that.coverBackgroundRGBA} ${100-coverVal}%, ${that.coverBackgroundRGBA} 100%)}`;
        return style
    }
}), L.control.timelineSlider = function (options) {
    return new L.Control.TimeLineSlider(options)
};