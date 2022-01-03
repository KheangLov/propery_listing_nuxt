import Vue from 'vue';
import moment from 'moment';
import axios from 'axios';
import Noty from 'noty';

const mixin = {
  methods: {
    formatData(val) {
      return moment(val);
    },
    getAddressByLatLng(lat, lng) {
      axios.get(`${process.env.Z1_DATA_URL}v1/communes?lat=${lat}&lng=${lng}`)
        .then(({ data: { data: { commune_code } } }) => {
          this.$set(this, 'city', commune_code.substring(0, 2));
          this.$set(this, 'district', commune_code.substring(0, 4));
          this.$set(this, 'commune', commune_code.substring(0, 6));
          this.setAddressCode(commune_code);
        })
        .catch(err => {
          console.log(err);
          new Noty({
              text: 'Can not get data!',
              type: 'error'
          }).show();
        });
    },
    getLatLngByAnyLevel(code) {
      axios.get(`${process.env.Z1_DATA_URL}v1/administrations/${code}?boundary=true`)
        .then(async response => {
            const {
                data: {
                  data: {
                    center: {
                        geometry: {
                            coordinates
                        }
                    },
                  }
                }
            } = response;

            if (this.marker) {
              this.marker.setMap(null);
            }
            this.marker = new google.maps.Marker({
              position: { lat: coordinates[1], lng: coordinates[0] },
              map: this.$refs.gMap.map,
            });
            this.$refs.gMap.map.setCenter(this.marker.position);
            this.$set(this.form, 'latitude', coordinates[1]);
            this.$set(this.form, 'longitude', coordinates[0]);
        })
        .catch(err => {
          console.log(err);
          new Noty({
            text: 'Can not get data!',
            type: 'error'
          }).show();
        });
    },
    getAddress(code = '') {
      const vm = this;
      let url = `${process.env.API_URL}/kh_address`;
      if (code) {
        url += `?code=${code}`;
      }
      axios.get(url)
        .then(res => {
          let key = '';

          if (!code) {
            key = 'cities';
          } else if (code.length === 2) {
            key = 'districts';
          } else if (code.length === 4) {
            key = 'communes';
          } else if (code.length === 6) {
            key = 'villages';
          }

          if (!key.length) {
            return false;
          }

          vm.$set(vm, key, res.data.map(({ code: c, name_en }) => ({ value: c, text: name_en })));
        });
    }
  }
};

Vue.mixin(mixin);
