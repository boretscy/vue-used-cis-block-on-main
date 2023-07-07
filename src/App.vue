<template>
    <div id="CISMAinBlock">
        <CISForm v-if="$root.brands.length > 0" ref="CISForm" />
        <CISFormEmpty v-else />
        <CISBrands v-if="$root.brands.length > 0" />
        <CISBrandsEmpty v-else />
        <div v-if="$root.settings.bodies">
            <CISBodies v-if="$root.bodies"/>
            <CISBodiesEmpty v-else />
        </div>
    </div>
</template>

<script>

import CISForm from './components/CISForm.vue'
import CISFormEmpty from './components/CISFormEmpty.vue'
import CISBrands from './components/CISBrands.vue'
import CISBrandsEmpty from './components/CISBrandsEmpty.vue'
import CISBodies from './components/CISBodies.vue'
import CISBodiesEmpty from './components/CISBodiesEmpty.vue'


import _ from 'lodash'
export default {
    name: 'App',
    components: {
        CISForm, CISFormEmpty,
        CISBrands, CISBrandsEmpty,
        CISBodies, CISBodiesEmpty
    },
    mounted: function() {
        this.getBrands()
        setInterval(() => {
            if ( !_.isEqual(this.$cookies.get('SELECTED_CITY'), this.$root.city) ) {
                this.$root.city = [...this.$cookies.get('SELECTED_CITY')]
                this.getBrands()
            }
        }, 100);
    },
    methods: {
        getBrands() {

            this.$root.activeButton = false;

            let url = this.$root.apiUrl + 'brands'+ '/used/'
            let get = []
            get.push('token='+this.$root.token)
            for ( let i in this.$root.settings.items[this.$root.itemIndx].params ) get.push(i+'='+this.$root.settings.items[this.$root.itemIndx].params[i])
            let s = []
            this.$root.city.forEach( (item) => {
                s.push(this.getCityName(item))
            })
            get.push('city='+s.toString())
            url += '?' + get.join('&')

            this.axios.get(url).then((response) => {
                this.$root.brands = []
                this.$root.brands = response.data.dropLists.brands
                this.$root.bodies = response.data.dropLists.bodies
                this.$root.brands.sort((a, b) => a.vehicles < b.vehicles ? 1 : -1)
                this.$root.inCity = response.data.in_city
            }).then(() => {
                this.$refs.CISForm.init()
                this.$root.activeButton = true;
            })
        },
        getCityName( q ) {
            switch ( q ) {
                case 'maykop': return 'Майкоп';
                case 'novorossiysk': return 'Новороссийск';
                case 'krasnodar': return 'Краснодар';
                case 'yablonovskiy': return 'Яблоновский';
            }
        }
    }
}
</script>

<style>
</style>
