import ListItem from '../src/dummys/ListItem.vue';
import ListTransition from '../src/wrappers/ListTransition.vue';
import { shuffle } from 'lodash-es'
import { ref, computed } from 'vue';

export default {
  title: 'Transitions/List transition',
  component: ListTransition,
  argTypes: {
  },
};


const Template = (args) => ({
  components: { ListTransition, ListItem },
  setup() {
    const options = ref([0]);
    const add = () => {
      options.value.push(Math.random())
    }
    const remove = () => {
      options.value.pop()
    }
    const shuffleOptions = () => {
      options.value = shuffle(options.value);
    }
    return { args, options, add, remove, shuffleOptions };
  },
  template: `
    <div class="py-5 flex justify-center gap-10 relative">
      <button @click="add" class="bg-indigo-700 text-white rounded-xl px-3 py-2">Add</button>
      <button @click="remove" class="bg-indigo-700 text-white rounded-xl px-3 py-2">Remove</button>
      <button @click="shuffleOptions" class="bg-indigo-700 text-white rounded-xl px-3 py-2">Shuffle</button>
    </div>
    <list-transition v-bind="args" tag="div" class="flex mx-auto flex-col gap-3 justify-center relative w-[700px]">
      <ListItem v-for="opt in options" :key="opt" />
    </list-transition>`,
});

export const Lifo = Template.bind({});

const TemplateWithSearch = (args) => ({
  components: { ListTransition, ListItem },
  setup() {

    const options = ref([]);
    const inputValue = ref('');

    fetch('https://dummyjson.com/products?limit=15')
    .then(res => res.json())
      .then(json => options.value = json.products)
    const filtered = computed(() => {
      if (inputValue.value.trim()) {
        return options.value.filter((el) => el.title.toLowerCase().includes(inputValue.value.toLocaleLowerCase()))
      }
      return options.value;
    })

    return { args, options, inputValue, filtered };
  },
  template: `
    <div class="py-5 flex justify-center gap-10 relative">
      <input v-model="inputValue" type="text" class="px-3 py-2 h-12 border border-gray-500 w-[340px] rounded-md" placeholder="Filter">
    </div>
    <list-transition v-bind="args" :itemsLength="filtered.length" tag="div" class="flex mx-auto flex-col gap-3 justify-center relative w-100">
      <ListItem v-for="(opt, i) in filtered" :style="{'--i': i}" :key="opt.title">{{ opt.title }}</ListItem>
    </list-transition>`,
});

export const Filtered = TemplateWithSearch.bind({});

const TemplateWithSearchGrid = (args) => ({
  components: { ListTransition, ListItem },
  setup() {

    const options = ref([]);
    const inputValue = ref('');

    fetch('https://dummyjson.com/products?limit=15')
    .then(res => res.json())
      .then(json => options.value = json.products)
    const filtered = computed(() => {
      if (inputValue.value.trim()) {
        return options.value.filter((el) => el.title.toLowerCase().includes(inputValue.value.toLocaleLowerCase()))
      }
      return options.value;
    })

    return { args, options, inputValue, filtered };
  },
  template: `
    <div class="py-5 flex justify-center gap-10 relative">
      <input v-model="inputValue" type="text" class="px-3 py-2 h-12 border border-gray-500 w-[340px] rounded-md" placeholder="Filter">
    </div>
    <list-transition v-bind="args" :itemsLength="filtered.length" tag="div" class="grid grid-cols-3 gap-3 justify-center relative w-100">
      <ListItem v-for="(opt, i) in filtered" :style="{'--i': i}" :key="opt.title">{{ opt.title }}</ListItem>
    </list-transition>`,
});

export const FilteredGrid = TemplateWithSearchGrid.bind({});