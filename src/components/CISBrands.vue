<template>
    <div class="container my-5 d-none d-lg-block">
        <div class="row mt-5 mb-3 cis-filter-on-main-brands">
            <div class="col-md-9">
                <h1 class="h3 fw-normal">Автомобили в наличии <a :href="'/dealerships/?city='+linkCity" v-if="$root.inCity" role="top-menu-show-list-city">в {{ $root.inCity }}</a></h1>
            </div>
            <div class="col-md-3 text-start text-md-end">
                <a 
                    :href="'/cars/used/'" 
                    class="c-yablack c-h-yablack text-decoration-none text-minus">
                    Все марки
                    <svg xmlns="http://www.w3.org/2000/svg"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#corner-right"></use></svg>
                </a>
            </div>
        </div>
        <div
            class="row mb-5"
            v-if="brands"
            >
            <div 
                class="col-6 col-md-3 col-lg-2 cis-filter-on-main-brands-item"
                v-for="n in brandsCount"
                :key="n"
                >
                <a 
                    :href="buildLink(brands[n-1].code)" 
                    class="text-decoration-none c-yadarkgray c-h-yadarkgray d-block b-radius-small py-1 px-2 d-flex align-items-center justify-content-between"
                    >
                    {{ brands[n-1].name }}
                    <span class="b-radius-yaradius-3 bg-yalightgray c-yalightblack bg-h-yalightgray text-center fw-bold">{{ brands[n-1].vehicles }}</span>
                </a>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'CISBrands',
    computed: {
        brands() {return this.$root.brands},
        brandsCount() {
            let res = 18
            if ( this.$root.brands.length < res ) res = this.$root.brands.length
            return res
        },
        linkCity() {
            let s = []
            this.$root.city.forEach( (e) => {
                switch (e) {
                    case 'krasnodar': s.push('Краснодар'); break;
                    case 'maykop':  s.push('Майкоп'); break;
                    case 'novorossiysk':  s.push('Новороссийск'); break;
                    case 'yablonovskiy':  s.push('Яблоновский'); break;
                }
            })
            return s.join(',')
        }
    },
    methods: {
        buildLink( brand = null ) {
            let res = this.$root.settings.baseURL + '/' + this.$root.settings.items[this.$root.itemIndx].code + '/'
            if ( brand ) res += brand + '/'
            let get = []
            // if ( this.$root.settings.items[this.$root.itemIndx].params ) {
            //     for ( let i in this.$root.settings.items[this.$root.itemIndx].params ) {
            //         get.push(i+'='+this.$root.settings.items[this.$root.itemIndx].params[i])
            //     }
            // }
            if ( this.$root.city ) get.push('city='+this.$root.city)
            if ( get.length ) {
                res += '?'+get.join('&')
            }
            return res
        }
    }
}
</script>

<style scoped>
.cis-filter-on-main-brands svg {
	fill: var(--yayellow);
	width: 30px;
	height: 30px;
	margin-left: 15px;
	top: 0;
	right: 0;
}
.cis-filter-on-main-brands-item {
    font-size: 14px;
}
.cis-filter-on-main-brands-item:hover a {
    font-weight: 500;
}
.cis-filter-on-main-brands-item span {
    width: 30px;
    padding: 0 3px 0 3px !important;
    font-weight: normal;
    display: block;
}
.cis-filter-on-main-brands-item:hover span {
    background-color: var(--yayellow);

}
</style>