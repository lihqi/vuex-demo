<template>
    <div id="app">
        Clicked: {{ $store.state.count }} times, count is {{ evenOrOdd }}.
        <Button type="ghost" @click="increment">+</Button>
        <Button type="ghost" @click="decrement">-</Button>
        <Button type="ghost" @click="incrementIfOdd">Increment if odd</Button>
        <Button type="ghost" @click="incrementAsync">Increment async</Button>
        <Button type="ghost" @click="query">console</Button>
        <div>{{getIndex}}</div>
        <Button type="ghost" v-for="item in getArr" @click="showWhich(item)">{{item}}</Button>
        <Button type="ghost" @click="clearArr">clearArr</Button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            ary:[],
            testData: {
                status: "ok",
                message: "",
                data: [
                    {
                        title: "应用自建平",
                        isFolder: true,
                        key: "SORT_2",
                        children: [
                            {
                                title: "cmf自建测试0420",
                                isFolder: true,
                                key: "SORT_3",
                                children: [
                                    {
                                        title: "数学自建流程",
                                        isFolder: false,
                                        key: "FLOW_3",
                                    },
                                    {
                                        title: "cmf自建语文测试表单0425",
                                        isFolder: false,
                                        key: "FLOW_4",
                                    }
                                ]
                            },
                            {
                                title: "cmf自建测试0508",
                                isFolder: true,
                                key: "SORT_5",
                            }
                        ]
                    },
                    {
                        title: "通达业务流程",
                        isFolder: true,
                        key: "SORT_1",
                        children: [
                            {
                                title: "会议纪要",
                                isFolder: false,
                                key: "FLOW_14",
                            }
                        ]
                    }
                ]
            },
        }
    },
    computed: {
        ...mapGetters([
            'evenOrOdd'
        ]),
        getArr() {
            return this.$store.state.arr
        },
        getIndex() {
            return this.$store.state.thisIndex
        }
    },
    methods: {
        ...mapActions([
            'increment',
            'decrement',
            'incrementIfOdd',
            'incrementAsync',
            'setArrAsync'
        ]),
        query() {
            console.log('ok')
        },
        showWhich(item) {
            this.$store.commit('showWhich', item)
        },
        clearArr() {
            this.setArrAsync([333, 86])
        },
        collect(dataArr) {
            let obj = {};
            let arr = [];
            dataArr.forEach(item => {
                if (item.isFolder === false) {
                    obj.title = item.title;
                    obj.key = item.key;
                    arr.push(obj);
                    obj = {};
                };
                if (item.children) {
                    arr = arr.concat(this.collect(item.children));
                }
            })
            return arr;
        }
    },
    mounted(){
        // console.log('mounted')
        //console.log(this.testData.data);
        this.ary=this.collect(this.testData.data);
        //console.log(this.ary)
    },
    created(){
        // console.log('created')
    }


}
</script>
