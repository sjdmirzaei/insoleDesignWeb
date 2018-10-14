/**
 * @module echarts/component/helper/MapDraw
 */
define(function (require) {

    var RoamController = require('./RoamController');
<<<<<<< HEAD
    var roamHelper = require('../../component/helper/roamHelper');
    var cursorHelper = require('../../component/helper/cursorHelper');
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    var graphic = require('../../util/graphic');
    var zrUtil = require('zrender/core/util');

    function getFixedItemStyle(model, scale) {
        var itemStyle = model.getItemStyle();
        var areaColor = model.get('areaColor');
<<<<<<< HEAD

        // If user want the color not to be changed when hover,
        // they should both set areaColor and color to be null.
        if (areaColor != null) {
=======
        if (areaColor) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            itemStyle.fill = areaColor;
        }

        return itemStyle;
    }

<<<<<<< HEAD
    function updateMapSelectHandler(mapDraw, mapOrGeoModel, group, api, fromView) {
        group.off('click');
        group.off('mousedown');

        if (mapOrGeoModel.get('selectedMode')) {

            group.on('mousedown', function () {
                mapDraw._mouseDownFlag = true;
            });

            group.on('click', function (e) {
                if (!mapDraw._mouseDownFlag) {
                    return;
                }
                mapDraw._mouseDownFlag = false;

                var el = e.target;
                while (!el.__regions) {
=======
    function updateMapSelectHandler(mapOrGeoModel, group, api, fromView) {
        group.off('click');
        mapOrGeoModel.get('selectedMode')
            && group.on('click', function (e) {
                var el = e.target;
                while (!el.__region) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    el = el.parent;
                }
                if (!el) {
                    return;
                }

<<<<<<< HEAD
                var action = {
                    type: (mapOrGeoModel.mainType === 'geo' ? 'geo' : 'map') + 'ToggleSelect',
                    batch: zrUtil.map(el.__regions, function (region) {
                        return {
                            name: region.name,
                            from: fromView.uid
                        };
                    })
=======
                var region = el.__region;
                var action = {
                    type: (mapOrGeoModel.mainType === 'geo' ? 'geo' : 'map') + 'ToggleSelect',
                    name: region.name,
                    from: fromView.uid
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                };
                action[mapOrGeoModel.mainType + 'Id'] = mapOrGeoModel.id;

                api.dispatchAction(action);

                updateMapSelected(mapOrGeoModel, group);
            });
<<<<<<< HEAD
        }
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    }

    function updateMapSelected(mapOrGeoModel, group) {
        // FIXME
        group.eachChild(function (otherRegionEl) {
<<<<<<< HEAD
            zrUtil.each(otherRegionEl.__regions, function (region) {
                otherRegionEl.trigger(mapOrGeoModel.isSelected(region.name) ? 'emphasis' : 'normal');
            });
=======
            if (otherRegionEl.__region) {
                otherRegionEl.trigger(mapOrGeoModel.isSelected(otherRegionEl.__region.name) ? 'emphasis' : 'normal');
            }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        });
    }

    /**
     * @alias module:echarts/component/helper/MapDraw
     * @param {module:echarts/ExtensionAPI} api
     * @param {boolean} updateGroup
     */
    function MapDraw(api, updateGroup) {

        var group = new graphic.Group();

        /**
         * @type {module:echarts/component/helper/RoamController}
         * @private
         */
<<<<<<< HEAD
        this._controller = new RoamController(api.getZr());

        /**
         * @type {Object} {target, zoom, zoomLimit}
         * @private
         */
        this._controllerHost = {target: updateGroup ? group : null};
=======
        this._controller = new RoamController(
            api.getZr(), updateGroup ? group : null, null
        );
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

        /**
         * @type {module:zrender/container/Group}
         * @readOnly
         */
        this.group = group;

        /**
         * @type {boolean}
         * @private
         */
        this._updateGroup = updateGroup;
<<<<<<< HEAD

        /**
         * This flag is used to make sure that only one among
         * `pan`, `zoom`, `click` can occurs, otherwise 'selected'
         * action may be triggered when `pan`, which is unexpected.
         * @type {booelan}
         */
        this._mouseDownFlag;
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    }

    MapDraw.prototype = {

        constructor: MapDraw,

        draw: function (mapOrGeoModel, ecModel, api, fromView, payload) {

<<<<<<< HEAD
            var isGeo = mapOrGeoModel.mainType === 'geo';

            // map series has data, geo model that controlled by map series
            // has no data, otherwise data exists.
            var data = mapOrGeoModel.getData && mapOrGeoModel.getData();
            isGeo && ecModel.eachComponent({mainType: 'series', subType: 'map'}, function (mapSeries) {
                if (!data && mapSeries.getHostGeoModel() === mapOrGeoModel) {
                    data = mapSeries.getData();
                }
            });
=======
            // geoModel has no data
            var data = mapOrGeoModel.getData && mapOrGeoModel.getData();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            var geo = mapOrGeoModel.coordinateSystem;

            var group = this.group;

            var scale = geo.scale;
            var groupNewProp = {
                position: geo.position,
                scale: scale
            };

            // No animation when first draw or in action
            if (!group.childAt(0) || payload) {
                group.attr(groupNewProp);
            }
            else {
                graphic.updateProps(group, groupNewProp, mapOrGeoModel);
            }

            group.removeAll();

            var itemStyleAccessPath = ['itemStyle', 'normal'];
            var hoverItemStyleAccessPath = ['itemStyle', 'emphasis'];
            var labelAccessPath = ['label', 'normal'];
            var hoverLabelAccessPath = ['label', 'emphasis'];
<<<<<<< HEAD
            var nameMap = zrUtil.createHashMap();

            zrUtil.each(geo.regions, function (region) {

                // Consider in GeoJson properties.name may be duplicated, for example,
                // there is multiple region named "United Kindom" or "France" (so many
                // colonies). And it is not appropriate to merge them in geo, which
                // will make them share the same label and bring trouble in label
                // location calculation.
                var regionGroup = nameMap.get(region.name)
                    || nameMap.set(region.name, new graphic.Group());

=======

            zrUtil.each(geo.regions, function (region) {

                var regionGroup = new graphic.Group();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                var compoundPath = new graphic.CompoundPath({
                    shape: {
                        paths: []
                    }
                });
                regionGroup.add(compoundPath);

                var regionModel = mapOrGeoModel.getRegionModel(region.name) || mapOrGeoModel;

                var itemStyleModel = regionModel.getModel(itemStyleAccessPath);
                var hoverItemStyleModel = regionModel.getModel(hoverItemStyleAccessPath);
                var itemStyle = getFixedItemStyle(itemStyleModel, scale);
                var hoverItemStyle = getFixedItemStyle(hoverItemStyleModel, scale);

                var labelModel = regionModel.getModel(labelAccessPath);
                var hoverLabelModel = regionModel.getModel(hoverLabelAccessPath);

                var dataIdx;
                // Use the itemStyle in data if has data
                if (data) {
                    dataIdx = data.indexOfName(region.name);
                    // Only visual color of each item will be used. It can be encoded by dataRange
                    // But visual color of series is used in symbol drawing
                    //
                    // Visual color for each series is for the symbol draw
                    var visualColor = data.getItemVisual(dataIdx, 'color', true);
                    if (visualColor) {
                        itemStyle.fill = visualColor;
                    }
                }

                var textStyleModel = labelModel.getModel('textStyle');
                var hoverTextStyleModel = hoverLabelModel.getModel('textStyle');

<<<<<<< HEAD
                zrUtil.each(region.geometries, function (geometry) {
                    if (geometry.type !== 'polygon') {
                        return;
                    }
                    compoundPath.shape.paths.push(new graphic.Polygon({
                        shape: {
                            points: geometry.exterior
                        }
                    }));

                    for (var i = 0; i < (geometry.interiors ? geometry.interiors.length : 0); i++) {
                        compoundPath.shape.paths.push(new graphic.Polygon({
                            shape: {
                                points: geometry.interiors[i]
                            }
                        }));
                    }
=======
                zrUtil.each(region.contours, function (contour) {

                    var polygon = new graphic.Polygon({
                        shape: {
                            points: contour
                        }
                    });

                    compoundPath.shape.paths.push(polygon);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                });

                compoundPath.setStyle(itemStyle);
                compoundPath.style.strokeNoScale = true;
                compoundPath.culling = true;
                // Label
                var showLabel = labelModel.get('show');
                var hoverShowLabel = hoverLabelModel.get('show');

                var isDataNaN = data && isNaN(data.get('value', dataIdx));
                var itemLayout = data && data.getItemLayout(dataIdx);
                // In the following cases label will be drawn
                // 1. In map series and data value is NaN
                // 2. In geo component
                // 4. Region has no series legendSymbol, which will be add a showLabel flag in mapSymbolLayout
                if (
<<<<<<< HEAD
                    (isGeo || isDataNaN && (showLabel || hoverShowLabel))
=======
                    (!data || isDataNaN && (showLabel || hoverShowLabel))
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                 || (itemLayout && itemLayout.showLabel)
                 ) {
                    var query = data ? dataIdx : region.name;
                    var formattedStr = mapOrGeoModel.getFormattedLabel(query, 'normal');
                    var hoverFormattedStr = mapOrGeoModel.getFormattedLabel(query, 'emphasis');
                    var text = new graphic.Text({
                        style: {
                            text: showLabel ? (formattedStr || region.name) : '',
                            fill: textStyleModel.getTextColor(),
                            textFont: textStyleModel.getFont(),
                            textAlign: 'center',
                            textVerticalAlign: 'middle'
                        },
                        hoverStyle: {
                            text: hoverShowLabel ? (hoverFormattedStr || region.name) : '',
                            fill: hoverTextStyleModel.getTextColor(),
                            textFont: hoverTextStyleModel.getFont()
                        },
                        position: region.center.slice(),
                        scale: [1 / scale[0], 1 / scale[1]],
                        z2: 10,
                        silent: true
                    });

                    regionGroup.add(text);
                }

                // setItemGraphicEl, setHoverStyle after all polygons and labels
                // are added to the rigionGroup
                if (data) {
                    data.setItemGraphicEl(dataIdx, regionGroup);
                }
                else {
                    var regionModel = mapOrGeoModel.getRegionModel(region.name);
                    // Package custom mouse event for geo component
                    compoundPath.eventData = {
                        componentType: 'geo',
                        geoIndex: mapOrGeoModel.componentIndex,
                        name: region.name,
                        region: (regionModel && regionModel.option) || {}
                    };
                }

<<<<<<< HEAD
                var groupRegions = regionGroup.__regions || (regionGroup.__regions = []);
                groupRegions.push(region);

                graphic.setHoverStyle(
                    regionGroup,
                    hoverItemStyle,
                    {hoverSilentOnTouch: !!mapOrGeoModel.get('selectedMode')}
                );
=======
                regionGroup.__region = region;

                graphic.setHoverStyle(regionGroup, hoverItemStyle);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

                group.add(regionGroup);
            });

            this._updateController(mapOrGeoModel, ecModel, api);

<<<<<<< HEAD
            updateMapSelectHandler(this, mapOrGeoModel, group, api, fromView);
=======
            updateMapSelectHandler(mapOrGeoModel, group, api, fromView);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            updateMapSelected(mapOrGeoModel, group);
        },

        remove: function () {
            this.group.removeAll();
            this._controller.dispose();
<<<<<<< HEAD
            this._controllerHost = {};
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        _updateController: function (mapOrGeoModel, ecModel, api) {
            var geo = mapOrGeoModel.coordinateSystem;
            var controller = this._controller;
<<<<<<< HEAD
            var controllerHost = this._controllerHost;

            controllerHost.zoomLimit = mapOrGeoModel.get('scaleLimit');
            controllerHost.zoom = geo.getZoom();

=======
            controller.zoomLimit = mapOrGeoModel.get('scaleLimit');
            // Update zoom from model
            controller.zoom = geo.getZoom();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            // roamType is will be set default true if it is null
            controller.enable(mapOrGeoModel.get('roam') || false);
            var mainType = mapOrGeoModel.mainType;

            function makeActionBase() {
                var action = {
                    type: 'geoRoam',
                    componentType: mainType
                };
                action[mainType + 'Id'] = mapOrGeoModel.id;
                return action;
            }
<<<<<<< HEAD

            controller.off('pan').on('pan', function (dx, dy) {
                this._mouseDownFlag = false;

                roamHelper.updateViewOnPan(controllerHost, dx, dy);

                api.dispatchAction(zrUtil.extend(makeActionBase(), {
                    dx: dx,
                    dy: dy
                }));
            }, this);

            controller.off('zoom').on('zoom', function (zoom, mouseX, mouseY) {
                this._mouseDownFlag = false;

                roamHelper.updateViewOnZoom(controllerHost, zoom, mouseX, mouseY);

                api.dispatchAction(zrUtil.extend(makeActionBase(), {
                    zoom: zoom,
                    originX: mouseX,
                    originY: mouseY
                }));

                if (this._updateGroup) {
                    var group = this.group;
                    var scale = group.scale;
                    group.traverse(function (el) {
                        if (el.type === 'text') {
                            el.attr('scale', [1 / scale[0], 1 / scale[1]]);
                        }
                    });
                }
            }, this);

            controller.setPointerChecker(function (e, x, y) {
                return geo.getViewRectAfterRoam().contain(x, y)
                    && !cursorHelper.onIrrelevantElement(e, api, mapOrGeoModel);
            });
=======
            controller.off('pan')
                .on('pan', function (dx, dy) {
                    api.dispatchAction(zrUtil.extend(makeActionBase(), {
                        dx: dx,
                        dy: dy
                    }));
                });
            controller.off('zoom')
                .on('zoom', function (zoom, mouseX, mouseY) {
                    api.dispatchAction(zrUtil.extend(makeActionBase(), {
                        zoom: zoom,
                        originX: mouseX,
                        originY: mouseY
                    }));

                    if (this._updateGroup) {
                        var group = this.group;
                        var scale = group.scale;
                        group.traverse(function (el) {
                            if (el.type === 'text') {
                                el.attr('scale', [1 / scale[0], 1 / scale[1]]);
                            }
                        });
                    }
                }, this);

            controller.rectProvider = function () {
                return geo.getViewRectAfterRoam();
            };
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        }
    };

    return MapDraw;
});