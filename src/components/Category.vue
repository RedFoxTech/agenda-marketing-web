<template>
  <div>
    <h5>Categorias</h5>
    <b-button
      variant="outline-danger"
      size="sm"
      @click="openModalCategory=!openModalCategory"
      pill
    >+ categoria</b-button>
    <b-form-checkbox-group
      id="calendarList"
      v-model="selectedCalendarList"
      :options="calendarListItem"
      name="calendarList"
      class="mt-4"
      :stacked="stacked"
      aria-label="Individual Calendar"
    ></b-form-checkbox-group>
    <b-modal v-model="openModalCategory" ok-title="Cadastrar" @ok="onCreateCategory" title="Criar categoria">
      <b-form>
        <b-form-group>
          <label for="input-1">Categoria</label>
          <b-form-input id="input-1" v-model="category.name" required />
        </b-form-group>
        <b-form-group class="btn_colors">
          <b-button
            class="mr-3"
            @click="selectedColor(color)"
            :style="'background:'+color"
            v-for="(color, i) in colors"
            :key="i"
          />
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { createCategory, loadingCategory } from "../services/category";

export default {
  data() {
    return {
      openModalCategory: false,
      category: {
        name: null,
        bgColor: "",
        borderColor: ""
      },
      colors: ["#FD0057", "#FF8F39", "#5ACA65", "#2E5AAC", "#7339AF"],
      calendarListItem: [],
      calendarList: [],
      selectedCalendarList: [],
      stacked: true
    };
  },
  watch: {
    calendarListItem(val) {
      this.$emit("calendarListItem", val);
    },
    calendarList(val) {
      this.$emit("calendarList", val);
    },
    selectedCalendarList(val) {
      this.$emit("selectedCalendarList", val);
    }
  },
  methods: {
    async init() {
      await loadingCategory().then(
        res => (this.calendarList = res.data.categorys)
      );
      this.initCalendarList();
    },
    async onCreateCategory() {
      if (this.category.name) {
        await createCategory(this.category).then(res =>
          this.calendarList.push(res.data.category)
        );
        this.initCalendarList();
      }
    },
    initCalendarList() {
      this.calendarListItem = [];
      this.calendarList.map(item => {
        this.calendarListItem.push({
          text: item.name,
          value: parseInt(item.id)
        });
        this.selectedCalendarList.push(parseInt(item.id))
      });
    },
    selectedColor(color) {
      this.category.bgColor = color;
      this.category.borderColor = color;
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
.btn_colors button {
  border: inherit;
  height: 20px;
  width: 20px;
  border-radius: 100%;
}
</style>