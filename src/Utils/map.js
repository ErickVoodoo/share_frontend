// @flow

export const setManyPoints = ({ positions }): void => {
  if (window.ymaps && window.ymaps.geocode && positions && positions.length) {
    console.log(JSON.stringify(positions));
    const clusterer = new ymaps.Clusterer({
      preset: 'islands#invertedVioletClusterIcons',
      /**
       * Ставим true, если хотим кластеризовать только точки с одинаковыми координатами.
       */
      groupByCoordinates: false,
      /**
       * Опции кластеров указываем в кластеризаторе с префиксом "cluster".
       * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
       */
      clusterDisableClickZoom: true,
      clusterHideIconOnBalloonOpen: false,
      geoObjectHideIconOnBalloonOpen: false
    });

    const getPointData = (index) => ({
      balloonContentBody: 'балун <strong>метки ' + index + '</strong>',
      clusterCaption: 'метка <strong>' + index + '</strong>'
    });

    const getPointOptions = () => ({
        preset: 'islands#violetIcon'
    });

    const points = positions;
    let geoObjects = [];

    for(var i = 0, len = points.length; i < len; i++) {
      geoObjects[i] = new ymaps.Placemark(points[i], getPointData(i), getPointOptions());
    }

    clusterer.options.set({
      gridSize: 80,
      clusterDisableClickZoom: true
    });

    clusterer.add(geoObjects);
    window.defaultMap.geoObjects.add(clusterer);

    window.defaultMap.setBounds(clusterer.getBounds(), {
      checkZoomRange: true
    });
  }
}
