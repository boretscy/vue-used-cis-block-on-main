<template>
    <div class="pb-5 bg-yablue">
        <div class="container">
            <div class="row">
                <div class="col">
                    <form class="">
                        <div class="row mb-3">
                            <div class="col-6"><h3 class="fw-normal c-yawhite">Найти автомобиль</h3></div>
                            <div class="col-6 text-end">
                                <ul class="list-inline text-minus pt-2">
                                    <li class="list-inline-item ms-3">
                                        <a 
                                            href="#" 
                                            class="text-uppercase c-yawhite c-h-yawhite text-decoration-none letter-spacing-plus fw-bold"
                                            @click.prevent="setLink('pass')"
                                            >Легковые</a>
                                    </li>
                                    <li class="list-inline-item ms-3">
                                        <a 
                                            href="#" 
                                            class="text-uppercase c-yawhite c-h-yawhite text-decoration-none letter-spacing-plus fw-bold"
                                            @click.prevent="setLink('comm')"
                                            >Коммерческие</a>
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
</style>
