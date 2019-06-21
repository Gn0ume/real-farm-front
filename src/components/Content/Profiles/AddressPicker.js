import React from "react";
import balloon from "../../../img/balloon.png";
import axios from "axios";
import './AddressPicker.css'

class AddressPicker extends React.Component {
  constructor(props) {
    super(props);
    this.addressPoint = {
      latitude: 0,
      longitude: 0
    };
    this.isFarm = false;
    this.farmAddress = this.props.farmaddress;
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=e11b502f-82b0-44f1-b5a7-82494a1be508&apm;lang=ru_RU";
    script.id = "map-script";
    script.async = true;

    document.body.insertBefore(script, document.body.firstChild);
    script.addEventListener('load', this.handleMapLoad);
    this.addressPoint = {latitude: this.props.point[0], longitude: this.props.point[1]};
    this.isFarm = true;
  }

  componentWillUnmount() {
    const script = document.getElementById("map-script");
    script.remove();
  }

  handleMapLoad = () => {
    window.ymaps.ready(() => {
      const addressInput = document.getElementById('farm-address');
      const myMap = new window.ymaps.Map('map', {
        center: [this.addressPoint.latitude, this.addressPoint.longitude],
        zoom: 9,
        controls: ["zoomControl"]
      }, {
        searchControlProvider: 'yandex#search'
      });
      let myPlacemark;
      if (this.isFarm) {
        const addressInput = document.getElementById('farm-address');
        addressInput.value = this.props.farmaddress;
        movePlacemark([this.addressPoint.latitude, this.addressPoint.longitude]);
      }
      const suggestView = new window.ymaps.SuggestView('farm-address', {
        provider: {
          suggest: function (request, options) {
            return window.ymaps.suggest(request)
              .then(response => (response.length === 1) ? [] : response);
          }
        }
      });

      suggestView.events.add('select', (event) => {
        const address = event.get('item').value.trim().replace(/ /g, '+');
        axios.get(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=e11b502f-82b0-44f1-b5a7-82494a1be508&geocode=${address}&results=1`)
          .then(res => {
            this.farmAddress = addressInput.value;
            const JSONaddress = JSON.parse(res.request.response);
            let point = JSONaddress.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
            this.addressPoint = {latitude: point[1], longitude: point[0]};
            const coords = [parseFloat(point[1]), parseFloat(point[0])];
            movePlacemark(coords);
            this.props.onChange(this.addressPoint, this.farmAddress);
          })
      });

      myMap.events.add('click', (e) => {
        let coords = e.get('coords');
        this.addressPoint = {latitude: coords[0], longitude: coords[1]};
        movePlacemark(coords);
        this.farmAddress = addressInput.value;
        getAddress(coords);
      });

      function movePlacemark(coordinates) {
        // Если метка уже создана – просто передвигаем ее
        if (myPlacemark) {
          myPlacemark.geometry.setCoordinates(coordinates);
        }
        // Если нет – создаем.
        else {
          myPlacemark = createPlacemark(coordinates);
          myMap.geoObjects.add(myPlacemark);
          // Слушаем событие окончания перетаскивания на метке.
          myPlacemark.events.add('dragend', () => {
            getAddress(myPlacemark.geometry.getCoordinates());
          });
        }
        myMap.setCenter(coordinates, 9);
      }

      // Создание метки.
      function createPlacemark(coords) {
        const MyIconContentLayout = window.ymaps.templateLayoutFactory.createClass(
          `<div style="width: 40px; height: 40px; border-radius: 50% 50% 50% 0; border: 2px solid #aeaeae; background:#fff;position:absolute; transform: rotate(-45deg); left: 50%; top: 50%; margin: -20px 0 0 -20px"><img src=${balloon} style="width:26px;position: absolute; left: 7px; top: 7px; transform: rotate(45deg)" alt=""/></div>`
        );
        return new window.ymaps.Placemark(coords, null, {
          iconLayout: 'default#imageWithContent',
          iconImageHref: '',
          // Смещение левого верхнего угла иконки относительно её "ножки" (точки привязки).
          iconImageOffset: [-10, -40],
          iconImageSize: [40, 40],
          iconContentLayout: MyIconContentLayout,
          cursor: "pointer",
          draggable: true
        });
      }

      // Определяем адрес по координатам (обратное геокодирование).
      const getAddress = (coords) => {
        window.ymaps.geocode(coords)
          .then((res) => {
            let firstGeoObject = res.geoObjects.get(0);
            const suggestViewInput = document.getElementById('farm-address');
            this.props.onChange({latitude: coords[0], longitude: coords[1]}, firstGeoObject.properties._data.text);
            return suggestViewInput.value = firstGeoObject.properties._data.text;
          })
          .catch(err => {
            console.log(err)
          });
      }
    })
  };


  render() {
    return (
      <div className="addresspicker-container">
        <span className="form-fields-name adderess-name">address</span>
        <input id="farm-address"
               name="address"
               className="farm-data-address"
               type="text"/>
        <div id="map" className="farm-data-map"/>
      </div>
    )
  };
}

export default AddressPicker