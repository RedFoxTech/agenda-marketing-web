<template>
  <div>
    <navbar @openModalSchedule="onBeforeCreateSchedule(scheduleModal)" />
    <b-container fluid>
      <b-row>
        <b-col cols="12" sm="3" lg="2" class="p-3 menuLateral">
          <b-button
            size="md"
            variant="outline-danger"
            @click="onBeforeCreateSchedule(scheduleModal)"
            pill
          >Nova Agenda</b-button>
          <hr />
          <category
            @calendarList="e => calendarList = e"
            @calendarListItem="e => calendarListItem = e"
            @selectedCalendarList="e => selectedCalendarList = e"
          />
          <router-link to="/">Sair</router-link>
        </b-col>
        <b-col cols="12" sm="9" lg="10">
          <b-row class="p-3">
            <b-col xs="12" sm="3" class="mb-3">
              <b-form-select
                style="border-radius:20px"
                v-model="selectedView"
                :options="viewModeOptions"
                size="md"
              />
            </b-col>
            <b-col xs="12" sm="9">
              <b-button
                variant="outline-primary"
                pill
                class="mr-1"
                data-action="move-today"
                @click="movePrevNext(0)"
              >Today</b-button>
              <b-button
                variant="outline-primary"
                pill
                class="mr-1"
                size="sm"
                @click="movePrevNext(-1)"
              >
              <img src="../assets/left.png" class="m-1" width="18px">
              </b-button>
              <b-button variant="outline-primary" pill size="sm" @click="movePrevNext(1)">
              <img src="../assets/right.png" class="m-1" width="18px">
                
              </b-button>
              <span class="render-range ml-3">{{dateRange}}</span>
            </b-col>
          </b-row>

          <calendar
            ref="tuiCal"
            :useDetailPopup="useDetailPopup"
            :useCreationPopup="useCreationPopup"
            :view="selectedView"
            :calendars="calendarList"
            :schedules="scheduleList"
            :template="template"
            :taskView="true"
            :scheduleView="true"
            :month="month"
            :week="week"
            :timezones="timezones"
            :disableDblClick="disableDblClick"
            :isReadOnly="isReadOnly"
            @clickSchedule="onClickSchedule"
            @beforeCreateSchedule="onBeforeCreateSchedule"
            @beforeUpdateSchedule="onBeforeUpdateSchedule"
            @beforeDeleteSchedule="onBeforeDeleteSchedule"
          />
        </b-col>
      </b-row>

      <b-modal
        no-close-on-backdrop
        v-model="modalCreation"
        @ok="creationAndUpdateSchedule"
        title="Cadastrar agenda"
        ok-title="Cadastrar"
      >
        <b-form>
          <b-form-group>
            <label for="input-1">Categoria</label>
            <b-form-select
              id="input-1"
              v-model="scheduleModal.calendarId"
              :options="calendarListItem"
              required
            />
          </b-form-group>
          <b-form-group>
            <label for="input-2">Título</label>
            <b-form-input id="input-2" v-model="scheduleModal.title" placeholder="Título" />
          </b-form-group>
          <b-row>
            <b-col>
              <b-form-group>
                <label for="input-3">Início</label>
                <datepicker class="mb-2" v-model="scheduleModal.start._date"/>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group>
                <label for="input-4">Fim</label>

                <datepicker class="mb-2" v-model="scheduleModal.end._date" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-form-group>
            <label for="input-5">Membros</label>
            <b-form-select id="input-5" :options="users" v-model="user" class="mb-2 mt-2 w-100" />
          </b-form-group>
          <b-list-group>
            <b-list-group-item
              class="mb-2 d-flex"
              align-h="between"
              v-for="(user, index) in scheduleModal.attendees"
              :key="index"
              @click="scheduleModal.attendees.splice(index, 1)"
            >
              <b-col>{{user}}</b-col>
              <b-col sm="1" style="cursor:pointer">x</b-col>
            </b-list-group-item>
          </b-list-group>
        </b-form>
      </b-modal>
    </b-container>
  </div>
</template>
<script>
import "tui-time-picker/dist/tui-time-picker.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-calendar/dist/tui-calendar.css";

import Calendar from "../components/TuiCalendar";
import Category from "../components/Category";
import Navbar from "../components/Navbar";
import Datepicker from 'vuejs-datepicker';
 
import {
  loadingSchedule,
  deleteSchedule,
  updateSchedule,
  createSchedule
} from "../services/schedule";

import { loadingUsers } from "../services/user";

export default {
  name: "App",
  components: {
    Calendar,
    Category,
    Navbar,
    Datepicker
  },
  data() {
    return {
      getSchedules: [],
      modalCategory: false,
      modalCreation: false,
      users: [],
      user: null,
      scheduleExists: false,
      scheduleModal: {
        id: "0",
        calendarId: 0,
        title: "",
        start: {
          _date: null
        },
        end: {
          _date: null
        },
        attendees: []
      },
      viewModeOptions: [
        {
          value: "month",
          text: "Mês"
        },
        {
          value: "week",
          text: "Semana"
        },
        {
          value: "day",
          text: "Dia"
        }
      ],
      dateRange: "",
      selectedView: "month",
      selectedCalendar: 0,
      calendarListItem: [],
      calendarList: [],
      selectedCalendarList: [],
      scheduleList: [],
      timezones: [],
      template: {
        milestone(schedule) {
          return `<span style="color:#fff;background-color: ${schedule.bgColor};">${schedule.title}</span>`;
        },
        milestoneTitle() {
          return "Milestone";
        },
        allday(schedule) {
          return `${schedule.title}<i class="fa fa-refresh"></i>`;
        },
        alldayTitle() {
          return "All Day";
        }
      },
      month: {
        startDayOfWeek: 0,
        workweek: true
      },
      week: {
        showTimezoneCollapseButton: true,
        timezonesCollapsed: true
      },
      taskView: true,
      scheduleView: true,
      useDetailPopup: true,
      useCreationPopup: false,
      disableDblClick: true,
      isReadOnly: false
    };
  },
  watch: {
    selectedView(newValue) {
      this.$refs.tuiCal.invoke("changeView", newValue, true);
      this.setRenderRangeText();
    },
    user: function(val) {
      if (this.scheduleModal.attendees.indexOf(val) < 0)
        this.scheduleModal.attendees.push(val);
    },
    selectedCalendarList(val) {
      this.scheduleList = [];

      this.getSchedules.map((item, i) => {
        val.map(ctg => {
          if (item.calendarId.indexOf(ctg) === 0)
            this.scheduleList.push(this.getSchedules[i]);
        });
      });

      if (this.scheduleList.length === 0) this.scheduleList = this.getSchedules;
    }
  },
  methods: {
    async init() {
      this.clearModal();

      await loadingSchedule().then(
        res => (this.getSchedules = res.data.schedules)
      );
      this.scheduleList = this.getSchedules;
      await loadingUsers().then(res =>
        res.data.users.map(us => this.users.push(us.email))
      );
      this.setRenderRangeText();
    },
    async creationAndUpdateSchedule() {
      if (!this.scheduleExists) {
        await createSchedule(this.scheduleModal).then(res => {
          this.getSchedules.push(res.data.schedule);
        });
        this.scheduleList = this.getSchedules;
      } else {
        var indice = 0;
        this.getSchedules.map((schedule, i) => {
          if (schedule.id === this.scheduleModal.id) indice = i;
        });

        const id = this.getSchedules[indice]._id;

        await updateSchedule(this.scheduleModal, id).then(res =>
          this.getSchedules.splice(indice, 1, res.data.schedule)
        );

        this.scheduleList = this.getSchedules;
      }
      this.clearModal();
      this.scheduleExists = false;
    },
    async onBeforeUpdateSchedule(e) {
      if (e.changes) {
        var indice = 0;

        this.getSchedules.map((schedule, i) => {
          if (schedule.id === e.schedule.id) indice = i;
        });
        e.changes.start = e.start;
        const id = this.scheduleList[indice]._id;

        await updateSchedule(e.changes, id).then(res =>
          this.getSchedules.splice(indice, 1, res.data.schedule)
        );

        return (this.scheduleList = this.getSchedules);
      }
      this.scheduleExists = true;
      this.modalCreation = true;
    },
    async onBeforeCreateSchedule(res) {
      this.scheduleModal.start._date = res.start._date;
      this.scheduleModal.end._date = res.end._date;
      this.modalCreation = true;
    },
    async onBeforeDeleteSchedule(res) {
      const idx = this.getSchedules.findIndex(
        item => item.id === res.schedule.id
      );
      const id = this.getSchedules[idx]._id;
      await deleteSchedule(id);

      this.getSchedules.splice(idx, 1);

      this.scheduleList = this.getSchedules;
    },
    clearModal() {
      this.scheduleModal = {
        id: "0",
        calendarId: 0,
        title: "",
        start: {
          _date: null
        },
        end: {
          _date: null
        },
        attendees: []
      };
    },
    onCreateCategory() {
      this.modalCategory = true;
    },
    setRenderRangeText() {
      const { invoke } = this.$refs.tuiCal;
      const view = invoke("getViewName");
      const calDate = invoke("getDate");
      const rangeStart = invoke("getDateRangeStart");
      const rangeEnd = invoke("getDateRangeEnd");
      let year = calDate.getFullYear();
      let month = calDate.getMonth() + 1;
      let date = calDate.getDate();
      let dateRangeText = "";
      let endMonth, endDate, start, end;
      switch (view) {
        case "month":
          dateRangeText = `${month}/${year}`;
          break;
        case "week":
          year = rangeStart.getFullYear();
          month = rangeStart.getMonth() + 1;
          date = rangeStart.getDate();
          endMonth = rangeEnd.getMonth() + 1;
          endDate = rangeEnd.getDate();
          start = `${year}/${month}/${date}`;
          end = `${endMonth}-${endDate}`;
          dateRangeText = `${start} ~ ${end}`;
          break;
        default:
          dateRangeText = `${date}/${month}/${year}`;
      }
      this.dateRange = dateRangeText;
    },
    onClickNavi(event) {
      if (event.target.tagName === "BUTTON") {
        const { target } = event;
        let action = target.dataset
          ? target.dataset.action
          : target.getAttribute("data-action");
        action = action.replace("move-", "");
        this.$refs.tuiCal.invoke(action);
        this.setRenderRangeText();
      }
    },
    onClickSchedule(res) {
      this.scheduleModal = {
        title: res.schedule.title,
        start: res.schedule.start,
        end: res.schedule.end,
        id: res.schedule.id,
        attendees: res.schedule.attendees
      };
    },

    movePrevNext(val) {
      const { moveToNextOrPrevRange } = this.$refs.tuiCal;
      moveToNextOrPrevRange(val);

      const { invoke } = this.$refs.tuiCal;
      const calDate = invoke("getDate");
      let year = calDate.getFullYear();
      let month = calDate.getMonth() + 1;
      this.dateRange = `${month}/${year}`;
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style>
a {
  color: #000 !important;
}
</style>