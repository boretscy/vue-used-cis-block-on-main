<template>
    <div 
        :class="{'pb-5 blue-mode-full': $root.settings.blueMode == 'full', 'blue-mode-semi': $root.settings.blueMode == 'semi'}">
        <div class="container">
            <div class="row">
                <div class="col">
                    <form
                        :class="{'p-3 p-md-5 b-radius-yaradius-25 bg-yawhite': $root.settings.blueMode == 'semi'}"
                        >
                        <div class="row mb-3">
                            <div 
                                class="col-md-6 h4 fw-normal"
                                :class="{'c-yawhite': $root.settings.blueMode == 'full', 'c-yalightblack': $root.settings.blueMode == 'semi'}"
                                >Найти автомобиль</div>
                            <div class="col-md-6 text-md-end">
                                <ul class="list-inline text-minus-minus pt-0 pt-md-2 mb-0">
                                    <li 
                                        class="list-inline-item ms-md-3 me-3 me-md-0 py-3"
                                        v-for="(item, indx) in $root.settings.items"
                                        v-if="indx == 0 || ($root.city.length != 1 && $root.city != 'Новороссийск')"
                                        :key="indx">
                                        <a 
                                            href="#" 
                                            class="text-uppercase text-decoration-none fw-bold py-2"
                                            :class="{
                                              'text-decoration-underline c-yawhite c-h-yawhite': $root.itemIndx == indx && $root.settings.blueMode == 'full', 
                                              'c-yawhite c-h-yawhite': $root.itemIndx != indx && $root.settings.blueMode == 'full', 
                                              'c-yagray c-h-yagray': $root.itemIndx == indx && $root.settings.blueMode == 'semi', 
                                              'c-yalightblack c-h-yalightblack': $root.itemIndx != indx && $root.settings.blueMode == 'semi'
                                              
                                            }"
                                            @click.prevent="$root.itemIndx = indx"
                                            >{{ item.name }}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6 col-xl-3 mb-3">
                                <multiselect 
                                    v-model="brandValue" 
                                    tag-placeholder="Выбрать бренд" 
                                    placeholder="Марка" 
                                    label="name" 
                                    track-by="code" 
                                    :options="brandOptions" 
                                    :multiple="true" 
                                    :searchable="false"
                                    :close-on-select="false" 
                                    :clear-on-select="false"
                                    selectLabel="Выбрать"
                                    selectedLabel="Выбрано"
                                    deselectLabel="Удалить"
                                    >
                                    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} выбрано</span></template>
                                    </multiselect>
                            </div>
                            <div class="col-6 col-xl-3 mb-3">
                                <multiselect 
                                    v-model="modelValue" 
                                    tag-placeholder="Выбрать модель" 
                                    placeholder="Модель" 
                                    label="name" 
                                    track-by="code" 
                                    :options="modelOptions" 
                                    :multiple="true" 
                                    :searchable="false"
                                    :close-on-select="false" 
                                    :clear-on-select="false"
                                    selectLabel="Выбрать"
                                    selectedLabel="Выбрано"
                                    deselectLabel="Удалить"
                                    >
                                    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} выбрано</span></template>
                                    </multiselect>
                            </div>
                            <div class="col-md-6 col-xl-3 mb-3">
                                <div 
                                    class="bg-yalightgray b-yalightgray b-radius-yaradius-15 position-relative"
                                    v-if="brandOptions">
                                    <div class="row px-3 pt-2 mb-2 align-items-center" style="height: 35px">
                                        <div class="col-6 text-start position-relative input-range">
                                            <input type="text" class="bg-yalightgray" v-model="minVal" @blur="rangeEnd" @keyup.enter="rangeEnd" @input="rangeInput">
                                            <span class="name">Цена от</span>
                                            <span class="rubble">₽</span>
                                        </div>
                                        <div class="col-6 text-end position-relative input-range">
                                            <input type="text" class="bg-yalightgray" v-model="maxVal" @blur="rangeEnd" @keyup.enter="rangeEnd" @input="rangeInput">
                                            <span class="name">до</span>
                                            <span class="rubble">₽</span>
                                        </div>
                                    </div>
                                    <section class="cis-filter-on-main-range-slider">
                                        <vue-slider 
                                            v-model="$root.price.value"
                                            :min="$root.price.range[0]"
                                            :max="$root.price.range[1]"
                                            :interval="1"
                                            :silent="true"
                                            tooltip="none"
                                            @drag-end="rangeEnd"
                                            ></vue-slider>
                                    </section>
                                </div>
                                <div 
                                    class="bg-yawhite b-yagray b-radius-yaradius-15"
                                    style="height: 45px;"
                                    v-else></div>
                            </div>
                            <div class="col-md-6 col-xl-3">
                                <a 
                                    :href="buttonLink" 
                                    class="d-block text-center c-yalightblack c-h-yalightblack bg-h-yayellow bg-yadarkyellow text-decoration-none b-radius-yaradius-15 but-lg fw-bold"
                                    :class="{'disabled': !activeButton}"
                                    style="padding: 12px;"
                                    >{{ (activeButton) ? 'Показать '+String(totalCount).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+' авто' : defaultButtonText }}</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import Multiselect from 'vue-multiselect'

import _ from 'lodash'

export default {
    name: 'CISForm',
    components: {
        VueSlider,
        Multiselect
    },
    data: function() {
        return {

            totalCount: 0,
            buttonLink: '/',

            brandValue: [
            ],
            modelValue: [
            ],

            defaultButtonText: '• • •'
        }
    },
    computed: {
        
        brandOptions() {
          let s = [...this.$root.brands]
          return s.sort((a, b) => a.code > b.code ? 1 : -1)
        },
        modelOptions() {return this.$root.models},

        activeButton() {return this.$root.activeButton},

        minVal: {
            get() {
                return String(this.$root.price.value[0]).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            },  
            set(v) {
                let dv = Number(v.replace(/[^\d;]/g, ''))
                this.$set(this.$root.price.value, 0, dv)
            }
        },
        maxVal: {
            get() {
                return String(this.$root.price.value[1]).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            },  
            set(v) {
                let dv = Number(v.replace(/[^\d;]/g, ''))
                if ( dv > this.$root.price.value[0] ) this.$set(this.$root.price.value, 1, dv)
            }
        }
    },
    watch: {
        brandValue: function(newValue) {
            this.$root.models = []
            this.modelValue = []
            
            if ( newValue.length ) {

                let url = this.$root.apiUrl + 'models'+ '/used/'
                let get = this.builGetParams()
                get.push('token='+this.$root.token)
                if ( this.$root.city ) get.push('city='+this.$root.city)
                url += '?' + get.join('&')

                this.axios.get(url).then((response) => {
                    this.$root.models = response.data
                })
            }

            let rangeSource = ( newValue.length ) ? 'brandValue' : 'brandOptions' 
            this.set(rangeSource)

        },
        modelValue: function(newValue) {
            let rangeSource = ( newValue.length ) ? 'modelValue' : 'modelOptions' 
            this.set(rangeSource)
        },
        '$root.itemIndx': function() {
            this.$parent.getBrands()
        },
        '$root.brands' : function() {
            this.set()
        }
    },

    mounted: function() {
        this.init()
    },

    methods: {

        init() {
            this.set()
            if (this.brandValue.length) this.brandValue = []
        },
        set(rangeSource = 'brandOptions') {
            this.buildRange(rangeSource)
            this.buttonLink = this.buildLink()
            this.totalCount = this.buildTotal()
        },

        buildLink() {

            let link = this.$root.settings.baseURL + '/' + this.$root.settings.items[this.$root.itemIndx].code + '/'
            let get = []
            let params = []

            if ( this.brandValue.length == 1 ) link += this.brandValue[0].code + '/'
            if ( this.brandValue.length == 1 && this.modelValue.length == 1 ) link += this.modelValue[0].code + '/'

            params = []
            if ( this.brandValue.length > 1 ) {
                this.brandValue.forEach( (i) => { params.push(i.code) })
                get.push('brand='+params.join(','))
            }

            params = []
            if ( 
                (this.brandValue.length == 1 && this.modelValue.length > 1) ||
                (this.brandValue.length > 1 && this.modelValue.length )
            ) {
                this.modelValue.forEach( (i) => { params.push(i.code) })
                get.push('model='+params.join(','))
            }

            if ( this.$root.price.value[0] != this.$root.price.range[0] || this.$root.price.value[1] != this.$root.price.range[1] ) {
               get.push('price='+this.$root.price.value.join(','))
            }

            if ( this.$root.settings.items[this.$root.itemIndx].params ) {
                for ( let i in this.$root.settings.items[this.$root.itemIndx].params ) {
                    get.push(i+'='+this.$root.settings.items[this.$root.itemIndx].params[i])
                }
            }

            // if ( this.$root.city ) get.push('city='+this.$root.city)

            if ( get.length ) {
                link += '?'+get.join('&')
            }
            
            return link
        },

        builGetParams() {

            let res = [], params = []

            if ( this.brandValue.length ) {
                this.brandValue.forEach( (i) => { params.push(i.code) })
                res.push('brand='+params.join(','))
            }

            if ( this.modelValue.length ) {
                this.modelValue.forEach( (i) => { params.push(i.code) })
                res.push('brand='+params.join(','))
            }

            if ( this.$root.price.value[0] != this.$root.price.range[0] || this.$root.price.value[1] != this.$root.price.range[1] ) {
               res.push('price='+this.$root.price.value.join(','))
            }

            if ( this.$root.settings.items[this.$root.itemIndx].params ) {
                for ( let i in this.$root.settings.items[this.$root.itemIndx].params ) {
                    res.push(i+'='+this.$root.settings.items[this.$root.itemIndx].params[i])
                }
            }

            return res
        },

        buildTotal() {
            
            let res = 0
            if ( this.modelOptions.length ) {
                if ( this.modelValue.length ) {
                    this.modelValue.forEach( (i) => {
                        res += i.vehicles
                    })
                } else {
                    this.modelOptions.forEach( (i) => {
                        res += i.vehicles
                    })
                }
            } else {
                if ( this.brandValue.length ) {
                    this.brandValue.forEach( (i) => {
                        res += i.vehicles
                    })
                } else {
                    this.brandOptions.forEach( (i) => {
                        res += i.vehicles
                    })
                }
            }

            return res
        },

        rangeEnd() {

            this.$root.activeButton = false;
            if ( Number(this.minVal.replace(/[^\d;]/g, '')) < this.$root.price.range[0] ) this.$set(this.$root.price.value, 0, this.$root.price.range[0])
            if ( Number(this.maxVal.replace(/[^\d;]/g, '')) > this.$root.price.range[1] ) this.$set(this.$root.price.value, 1, this.$root.price.range[1])

            let url = this.$root.apiUrl + 'filter' + '/' + this.$root.settings.items[this.$root.itemIndx].code + '/'
            let get = this.builGetParams()
            get.push('token='+this.$root.token)
            if ( this.$root.city ) get.push('city='+this.$root.city)
            url += '?' + get.join('&')
            
            this.axios.get(url).then((response) => {
                this.totalCount = response.data.totalCount
            }).then( () => {
                this.buttonLink = this.buildLink()
                this.$root.activeButton = true;
            })
            this.minVal
        },
        rangeInput: _.debounce(function() {
            this.rangeEnd();
        }, 1000),
        buildRange(rangeSource = 'brandOptions') {
            if ( this[rangeSource].length > 0 ) {

                this.$root.price.range = [0, 99999999]
                this.$root.price.value = [0, 99999999]
                
                let min = 99999999, max = 0
                this[rangeSource].forEach( (i) => {
                    if ( i.min < min ) min = i.min
                    if ( i.max > max ) max = i.max
                })

                this.$root.price.value = [min, max]
                this.$root.price.range = [min, max]
            }
        }
    }

}
</script>

<style>
#CISMAinBlock {
  font-size: 14px;
}
#CISMAinBlock .blue-mode-full {
    background-color: var(--yablue);
}
#CISMAinBlock .blue-mode-semi {
    position: relative;
}
#CISMAinBlock .blue-mode-semi::before {
    content: '';
    position: absolute;
    background-color: var(--yablue);
    width: 100%;
    height: 120px;
    top: 0;
    z-index: -1;
}
#CISMAinBlock .cis-filter-on-main-range-slider {
    position: absolute;
	bottom: -25px;
    width: 94%;
    left: 3%;
    height: 35px;
    text-align: center;
}

fieldset[disabled] .multiselect {
  pointer-events: none;
}

#CISMAinBlock .input-range input {
    border: none;
    width: 100%;
    padding-top: 7px;
    outline: none;
}
#CISMAinBlock .input-range:first-child input {
    margin-left: 5px;
    text-align: left;
    position: relative;
}
#CISMAinBlock .input-range:first-child::after {
    content: '';
    width: 1px;
    height: 20px;
    right: 0;
    bottom: 0;
    position: absolute;
    background: var(--yagray);
}
#CISMAinBlock .input-range:last-child input {
    margin-right: 10px;
    text-align: right;
}
#CISMAinBlock .input-range span {
    position: absolute;
    color: var(--yadarkgray);
    top: -8px;
    font-size: 10px;
}
#CISMAinBlock .input-range span.name {
    left: 15px;
    top: -5px;
}
#CISMAinBlock .input-range span.rubble {
    right: 5px;
    top: -5px
}

#CISMAinBlock .disabled {
    opacity: .3;
    cursor: progress;
}

#CISMAinBlock .vue-slider-process {
  background-color: var(--yayellow);
  border-radius: 15px;
}
#CISMAinBlock .multiselect__spinner {
  position: absolute;
  right: 1px;
  top: 1px;
  width: 48px;
  height: 35px;
  background: var(--yawhite);
  display: block;
}
#CISMAinBlock .multiselect__spinner:before,
#CISMAinBlock .multiselect__spinner:after {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  margin: -8px 0 0 -8px;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  border-color: var(--yadarkblue) transparent transparent;
  border-style: solid;
  border-width: 2px;
  box-shadow: 0 0 0 1px transparent;
}
#CISMAinBlock .multiselect__spinner:before {
  animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
  animation-iteration-count: infinite;
}
#CISMAinBlock .multiselect__spinner:after {
  animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
  animation-iteration-count: infinite;
}
#CISMAinBlock .multiselect__loading-enter-active,
#CISMAinBlock .multiselect__loading-leave-active {
  transition: opacity 0.4s ease-in-out;
  opacity: 1;
}
#CISMAinBlock .multiselect__loading-enter,
#CISMAinBlock .multiselect__loading-leave-active {
  opacity: 0;
}
#CISMAinBlock .multiselect,
#CISMAinBlock .multiselect__input,
#CISMAinBlock .multiselect__single {
  font-family: inherit;
  font-size: 14px;
  touch-action: manipulation;
}
#CISMAinBlock .multiselect {
  box-sizing: content-box;
  display: block;
  position: relative;
  width: 100%;
  height: 40px;
  text-align: left;
  color: var(--yadarkgray);
}
#CISMAinBlock .multiselect * {
  box-sizing: border-box;
}
#CISMAinBlock .multiselect:focus {
  outline: none;
}
#CISMAinBlock .multiselect--disabled {
  background: #ededed;
  pointer-events: none;
  opacity: 0.6;
}
#CISMAinBlock .multiselect--active {
  z-index: 50;
}
#CISMAinBlock .multiselect--active:not(.multiselect--above) .multiselect__current,
#CISMAinBlock .multiselect--active:not(.multiselect--above) .multiselect__input,
#CISMAinBlock .multiselect--active:not(.multiselect--above) .multiselect__tags {
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

#CISMAinBlock .multiselect--active {
    transform: none !important;
  }
#CISMAinBlock .multiselect--above.multiselect--active .multiselect__current,
#CISMAinBlock .multiselect--above.multiselect--active .multiselect__input,
#CISMAinBlock .multiselect--above.multiselect--active .multiselect__tags {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
#CISMAinBlock .multiselect__input,
#CISMAinBlock .multiselect__single {
  position: relative;
  display: inline-block;
  min-height: 20px;
  line-height: 20px;
  border: none;
  border-radius: 5px;
  background: var(--yalightgray);
  padding: 0 0 0 5px;
  width: calc(100%);
  transition: border 0.1s ease;
  box-sizing: border-box;
  margin-bottom: 8px;
  vertical-align: top;
}
#CISMAinBlock .multiselect__input::placeholder {
  color: var(--yablack);
}
#CISMAinBlock .multiselect__tag ~ .multiselect__input,
#CISMAinBlock .multiselect__tag ~ .multiselect__single {
  width: auto;
}
#CISMAinBlock .multiselect__input:hover,
#CISMAinBlock .multiselect__single:hover {
  border-color: #cfcfcf;
}
#CISMAinBlock .multiselect__input:focus,
#CISMAinBlock .multiselect__single:focus {
  border-color: #a8a8a8;
  outline: none;
}
#CISMAinBlock .multiselect__single {
  padding-left: 5px;
  margin-bottom: 8px;
}
#CISMAinBlock .multiselect__tags-wrap {
  display: inline;
}
#CISMAinBlock .multiselect__tags {
  min-height: 40px;
  display: block;
  padding: 10px 40px 0 10px;
  border-radius: var(--yaradius15);
  border: none;
  background: var(--yalightgray);
  font-size: 14px;
  min-height: 45px;
}
#CISMAinBlock .multiselect__tag {
  position: relative;
  display: inline-block;
  padding: 4px 26px 4px 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: var(--yawhite);
  line-height: 1;
  background: var(--yablue);
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
}
#CISMAinBlock .multiselect__tag-icon {
  cursor: pointer;
  margin-left: 7px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  font-weight: 700;
  font-style: initial;
  width: 22px;
  text-align: center;
  line-height: 22px;
  transition: all 0.2s ease;
  border-radius: 5px;
}
#CISMAinBlock .multiselect__tag-icon:after {
  content: "×";
  color: var(--yayellow);
  font-size: 14px;
}
#CISMAinBlock .multiselect__tag-icon:focus,
#CISMAinBlock .multiselect__tag-icon:hover {
  background: var(--yayellow);
  color: var(--yadarkblue);
}
#CISMAinBlock .multiselect__tag-icon:focus:after,
#CISMAinBlock .multiselect__tag-icon:hover:after {
  color: white;
}
#CISMAinBlock .multiselect__current {
  line-height: 16px;
  min-height: 40px;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  padding: 8px 12px 0;
  padding-right: 30px;
  white-space: nowrap;
  margin: 0;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid var(--yagray);
  cursor: pointer;
}
#CISMAinBlock .multiselect__select {
  line-height: 16px;
  display: block;
  position: absolute;
  box-sizing: border-box;
  width: 40px;
  height: 42px;
  right: 1px;
  top: 1px;
  padding: 4px 8px;
  margin: 0;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}
#CISMAinBlock .multiselect__select:before {
  position: relative;
  right: 0;
  top: 65%;
  color: var(--yamiddlegray);
  margin-top: 4px;
  border-style: solid;
  border-width: 5px 5px 0 5px;
  border-color: var(--yamiddlegray) transparent transparent transparent;
  content: "";
}
#CISMAinBlock .multiselect__placeholder {
  color: var(--yalightblack);
  display: inline-block;
  margin-bottom: 10px;
  padding-top: 2px;
}
#CISMAinBlock .multiselect--active .multiselect__placeholder {
  display: none;
}
#CISMAinBlock .multiselect__content-wrapper {
  position: absolute;
  display: block;
  background: var(--yawhite);
  width: 100%;
  max-height: 240px;
  overflow: auto;
  border: none;
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 50;
  -webkit-overflow-scrolling: touch;
}
#CISMAinBlock .multiselect__content {
  list-style: none;
  display: inline-block;
  padding: 0;
  margin: 0;
  min-width: 100%;
  vertical-align: top;
}
#CISMAinBlock .multiselect--above .multiselect__content-wrapper {
  bottom: 100%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: none;
  border-top: 1px solid var(--yagray);
}
#CISMAinBlock .multiselect__content::webkit-scrollbar {
  display: none;
}
#CISMAinBlock .multiselect__element {
  display: block;
}
#CISMAinBlock .multiselect__option {
  display: block;
  padding: 12px;
  min-height: 40px;
  line-height: 16px;
  text-decoration: none;
  text-transform: none;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
}
#CISMAinBlock .multiselect__option:after {
  top: 0;
  right: 0;
  position: absolute;
  line-height: 40px;
  padding-right: 12px;
  padding-left: 20px;
  font-size: 13px;
}
#CISMAinBlock .multiselect__option--highlight {
  background: var(--yalightgray);
  outline: none;
  color: var(--yablack);
}
#CISMAinBlock .multiselect__option--highlight:after {
  content: attr(data-select);
  background: var(--yalightgray);
  color: var(--yamiddlegray);
}
#CISMAinBlock .multiselect__option--selected {
  background: var(--yalightgray);
  color: var(--yablack);
  font-weight: bold;
}
#CISMAinBlock .multiselect__option--selected:after {
  content: attr(data-selected);
  color: var(--yamiddlegray);
}
#CISMAinBlock .multiselect__option--selected.multiselect__option--highlight {
  background: var(--yalightgray);
  color: var(--yamiddlegray);
}
#CISMAinBlock .multiselect__option--selected.multiselect__option--highlight:after {
  background: var(--yalightgray);
  content: attr(data-deselect);
  color: var(--yamiddlegray);
}
#CISMAinBlock .multiselect--disabled .multiselect__current,
#CISMAinBlock .multiselect--disabled .multiselect__select {
  background: #ededed;
  color: #a6a6a6;
}
#CISMAinBlock .multiselect__option--disabled {
  background: #ededed !important;
  color: #a6a6a6 !important;
  cursor: text;
  pointer-events: none;
}
#CISMAinBlock .multiselect__option--group {
  background: #ededed;
  color: var(--yablack);
}
#CISMAinBlock .multiselect__option--group.multiselect__option--highlight {
  background: var(--yamiddlegray);
  color: var(--yawhite);
}
#CISMAinBlock .multiselect__option--group.multiselect__option--highlight:after {
  background: var(--yablack);
}
#CISMAinBlock .multiselect__option--disabled.multiselect__option--highlight {
  background: #dedede;
}
#CISMAinBlock .multiselect__option--group-selected.multiselect__option--highlight {
  background: var(--yalightgray);
  color: var(--yawhite);
}
#CISMAinBlock .multiselect__option--group-selected.multiselect__option--highlight:after {
  background: var(--yalightgray);
  content: attr(data-deselect);
  color: var(--yawhite);
}
#CISMAinBlock .multiselect-enter-active,
#CISMAinBlock .multiselect-leave-active {
  transition: all 0.15s ease;
}
#CISMAinBlock .multiselect-enter,
#CISMAinBlock .multiselect-leave-active {
  opacity: 0;
}
#CISMAinBlock .multiselect__strong {
  margin-bottom: 8px;
  line-height: 20px;
  display: inline-block;
  vertical-align: top;
}
*[dir="rtl"] .multiselect {
  text-align: right;
}
*[dir="rtl"] .multiselect__select {
  right: auto;
  left: 1px;
}
*[dir="rtl"] .multiselect__tags {
  padding: 8px 8px 0px 40px;
}
*[dir="rtl"] .multiselect__content {
  text-align: right;
}
*[dir="rtl"] .multiselect__option:after {
  right: auto;
  left: 0;
}
*[dir="rtl"] .multiselect__clear {
  right: auto;
  left: 12px;
}
*[dir="rtl"] .multiselect__spinner {
  right: auto;
  left: 1px;
}
@keyframes spinning {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(2turn);
  }
}
@media (max-width: 991.98px) {
  #CISMAinBlock .blue-mode-semi::before {
    content: '';
    position: absolute;
    background-color: var(--yablue);
    width: 100%;
    height: 78%;
    top: 0;
    z-index: -1;
}
#CISMAinBlock .blue-mode-semi::after {
    content: '';
    position: absolute;
    background-color: var(--yalightgray);
    width: 100%;
    height: 22%;
    bottom: 0;
    z-index: -1;
}
}
</style>
