const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: ''
    };
  },
  computed: {
    fullName() {
      if (this.name === '') {
        return '';
      }

      return this.name + ' Play';
    }
  },
  methods: {
    add(n) {
      this.counter += n;
    },
    reduce(n) {
      this.counter -= n;
    },
    setName(event, lastName) {
      this.name = event.target.value;
    }
  }
});

app.mount('#events');
