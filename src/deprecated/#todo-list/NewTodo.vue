<!-- <template>
  <div class="new-todo-background" :class="{ 'active-background': showNewTodo }" @click="toggleCreate"></div>

  <div class="new-todo" :class="{ 'active-box': showNewTodo }">
    <header class="new-todo-header">
      <span>Create New Todo</span>
    </header>

    <div class="new-todo-details">
      <div class="new-task">
        <input type="text" placeholder="type your task here..." v-model="todoItem.task">
      </div>

      <div class="new-repeat">
        <span>Is repeating</span>
        <ToggleButton class="toggle-button" @toggle="toggleRepeat" :isToggled="todoItem.repeat" />
      </div>

      <div class="new-periodicity" :class="{ 'active-new-periodicity': todoItem.repeat }">
        <span>Repeat</span>

        <div class="repeat-selector">
          <div class="selector-icon left" @click="selectLeft">
            <i class="fi fi-rr-angle-small-left"></i>
          </div>

          <div class="selector-content">
            <div class="selector-options" v-for="period in periodicities" :key="period"
              :class="{ 'active-option': (period === periodicities[selectedPeriod]) }">
              {{ period }}
            </div>
          </div>

          <div class="selector-icon right" @click="selectRight">
            <i class="fi fi-rr-angle-small-right"></i>
          </div>
        </div>
      </div>

      <TodoWeek v-if="todoItem.periodicity === 'weekly'" />
      <TodoMonth v-if="todoItem.periodicity === 'monthly' || todoItem.periodicity === 'others'" />

      <TodoSublist />
    </div>

    <div class="todo-save" @click="saveTodo">
      <span>Save</span>
    </div>
  </div>
</template> -->

<!-- <script setup lang="ts">
import ToggleButton from '@/components/ToggleButton.vue';
import TodoWeek from './TodoWeek.vue';
import TodoMonth from './TodoMonth.vue';
import { useTodoStore } from '@/stores/todos.store';
import { ref, watchEffect } from 'vue';
import TodoSublist from './TodoSublist.vue';

const props = defineProps({
  showNewTodo: Boolean,
});

const periodicities = ['daily', 'weekly', 'monthly', 'select'];
const todoStore = useTodoStore();

const todoItem = ref({
  id: 999,
  task: '',
  repeat: false,
  periodicity: '',
  days: [],
  date: null,
  done: false
});

const emit = defineEmits(['showNewTodo']);
const toggleCreate = () => {
  selectedPeriod.value = 3;
  todoItem.value.repeat = false;
  emit('showNewTodo', !props.showNewTodo);
};

const selectedPeriod = ref(3);
const toggleRepeat = () => {
  todoItem.value.repeat = !todoItem.value.repeat;
  selectedPeriod.value = 3;
};
const selectLeft = () => {
  selectedPeriod.value--;
  if (selectedPeriod.value < 0) selectedPeriod.value = 3;
};
const selectRight = () => {
  selectedPeriod.value++;
  if (selectedPeriod.value > 3) selectedPeriod.value = 0;
};
const setPeriodicity = (period: string) => {
  todoItem.value.periodicity = period;
};
watchEffect(() => {
  if (selectedPeriod.value === 3) setPeriodicity('');
  else setPeriodicity(periodicities[selectedPeriod.value]);
});

const saveTodo = () => {
  todoStore.addTodo(todoItem.value);
};
</script> -->

<style scoped>
.new-todo-background {
  position: absolute;
  top: -1em;
  left: -1em;
  display: none;
  width: calc(100% + 1em);
  height: calc(100% + 1em);
  background-color: rgba(0, 0, 0, .5);
  z-index: 96;
}

.active-background {
  display: inline-block;
}

.new-todo {
  position: absolute;
  top: calc(50% / 2);
  left: calc(50% - 500px / 2);
  display: flex;
  flex-direction: column;
  width: 500px;
  max-height: 70%;
  scale: 0;
  border-radius: 1em;
  background-color: #fff;
  box-shadow: inset 0 0 .3em #777;
  transition: scale 200ms ease;
  overflow-y: scroll;
  z-index: 97;
}

.new-todo::-webkit-scrollbar {
  display: none;
}

.active-box {
  scale: 1;
}

.new-todo-header {
  display: flex;
  flex-direction: column;
}

.new-todo-header span {
  margin: 16px auto 16px 16px;
  font-size: 2em;
  font-weight: bold;
  text-align: start;
}

.new-todo-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.new-task {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 2.5em;
  border-radius: 2em;
  border: 1px solid #777;
}

.new-task input {
  width: calc(100% - 2em);
  height: 100%;
  padding: 0;
  font-size: 18px;
}

.new-repeat span,
.new-periodicity span {
  margin-left: 4em;
}

.new-repeat {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 2em);
  height: 4em;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  transition: border-bottom-color 200ms ease;
  z-index: 2;
}

.new-repeat:hover {
  border-bottom-color: #ccc;
}

.new-repeat .toggle-button {
  margin-right: 4em;
}

.new-periodicity {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 2em);
  height: 0;
  border-bottom: 1px solid #ddd;
  opacity: 0;
  transition: all 100ms ease;
  visibility: hidden;
}

.new-periodicity:hover {
  border-bottom-color: #ccc;
}

.active-new-periodicity {
  height: 4em;
  opacity: 1;
  visibility: visible;
}

.repeat-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 10em;
  height: 2.5em;
  margin-right: 4em;
  border-radius: 2.5em;
  border: 1px solid #ddd;
  box-shadow: inset 0 0 3px #ddd;
  transition: all 100ms ease;
}

.repeat-selector:hover {
  border-color: #ccc;
}

.selector-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5em;
  height: 100%;
  padding-top: 4px;
  transition: all 100ms ease;
  cursor: pointer;
}

.left:hover {
  transform: translateX(-3px);
}

.right:hover {
  transform: translateX(3px);
}

.selector-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: auto;
  height: 100%;
  overflow: hidden;
}

.selector-options {
  width: 0;
  opacity: 0;
  transition: all 100ms ease;
  text-transform: capitalize;
}

.active-option {
  width: 100%;
  opacity: 1;
}

.todo-save {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 2.5em;
  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;
  height: 2.5em;
  border-top: 1px solid #ddd;
  transition: all 100ms ease;
  cursor: pointer;
}

.todo-save:hover {
  background-color: #ddd;
  border-color: #ccc;
}

@media (max-width: 480px) {
  .new-todo {
    left: calc(50% - 300px / 2);
    width: 300px;
  }

  .active-box {
    scale: 1;
  }

  .new-repeat span,
  .new-periodicity span {
    margin-left: 2em;
  }

  .new-repeat .toggle-button {
    margin-right: 2em;
  }

  .new-periodicity .repeat-selector {
    width: 9em;
    margin-right: 1em;
  }
}
</style>