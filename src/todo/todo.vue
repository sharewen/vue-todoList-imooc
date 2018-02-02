<template>
    <section class="rel-app">
        <input 
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下来要做什么？"
            @keyup.enter="addTodo"
            
        > 
       
        <Item :todo="todo"
            v-for="todo in filterTodos"
            :key="todo.id"
            @del="deleteTodo"
         />
        <tabs 
            :filter="filter"
            :todos="todos"
            @toggle="toggleFilter"
            @deleteAllCompleted="deleteAllCompleted"
        />
    </section>
</template>
<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id=0;
export default{
    data(){
        return {
            id:0,
            todos:[
                {
                    id:2,
                    content:'item 2',
                    completed:false
                },
                 {
                    id:1,
                    content:'item 1',
                    completed:false
                }
            ],
            filter:'all'
        }
    },
    components:{
        Item,
        Tabs,

    },
    methods:{
        addTodo(e){
            var stId=this.todos.length;
            this.todos.unshift({
                id: ++stId,
                content:e.target.value.trim(),
                completed:false
            })
            e.target.value=''
        },
        deleteTodo(id){
            this.todos.splice(this.todos.findIndex(todo=>todo.id == id),1);
        },
        toggleFilter(state){
            this.filter=state;
        },
        deleteAllCompleted(){
            this.todos=this.todos.filter(todo=> !todo.completed);// 剩下complete == false 的
        }
    },
    computed:{
        filterTodos(){
            if(this.filter == 'all'){
                return this.todos
            }
            const completed =this.filter == 'completed'
            return this.todos.filter(todo=>completed == todo.completed)
        }
    }
}
</script>
<style lang="stylus" scoped>
.rel-app
  width 600px
  margin 0 auto 
  box-shadow 0 0 5px #666
.add-input
  position relative
  width 100%
  font-size 24px
  font-family inherit 
  font-weight inherit 
  line-height 1.4em
  outline none 
  color inherit 
  padding 6px
  border 1px solid #999
  box-shadow inset 0 -1px 5px 0 rgba(0, 0, 0, .5)
  box-sizing border-box
  padding 16px 16px 16px 60px
</style>





