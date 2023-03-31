<template>
    <div 
        :class="{'pb-5 blue-mode-full': $root.settings.blueMode == 'full', 'blue-mode-semi': $root.settings.blueMode == 'semi'}">
        <div class="container">
            <div class="row">
                <div class="col">
                    <form 
                    :class="{'p-3 p-md-5 b-radius-yaradius-25 bg-yawhite': $root.settings.blueMode == 'semi'}">
                        <div class="row mb-3">
                            <div 
                                class="col-6 h4 fw-normal"
                                :class="{'c-yawhite': $root.settings.blueMode == 'full', 'c-yalightblack': $root.settings.blueMode == 'semi'}"
                                >Найти автомобиль</div>
                            <div class="col-6 text-end">
                                <ul class="list-inline text-minus-minus pt-0 pt-md-2 mb-0">
                                    <li 
                                        class="list-inline-item ms-md-3 me-3 me-md-0 py-3"
                                        v-for="(item, indx) in $root.settings.items"
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
                            <div class="col"><div class="bg-yalightgray b-radius-small" style="height: 44px"></div></div>
                            <div class="col"><div class="bg-yalightgray b-radius-small" style="height: 44px"></div></div>
                            <div class="col"><div class="bg-yalightgray b-radius-small" style="height: 44px"></div></div>
                            <div class="col"><div class="bg-yalightgray b-radius-small" style="height: 44px"></div></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CISForm'
}
</script>

<style scoped>
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
</style>
