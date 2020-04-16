new Vue({
  el: '#app',
  data() {
    return {
      veiculos: null,
      veiculo: {
        id: null,
        marca: null,
        modelo: null,
        cor: null,
        ano: null,
        preco: null,
      }
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    listar() {// depois de salvar chama o listar
      axios
        .get('http://127.0.0.1:5000/veiculos')
        .then(response => (this.veiculos = response.data));
    },

    salvar() {
      if (this.veiculo.id) {// inclusao ou alteração, esse é o motivo para usar o if, se tiver o id
        axios
          .put(`http://127.0.0.1:5000/veiculos/${this.veiculo.id}`, this.veiculo) // indicar os dados que vão ser enviados
          .then(response => {
            alert(`OK! Veiculo Alterado com Sucesso`)
            this.listar()
            // this.veiculo = {}// limpa todos os nossos atributos

          });

      } else {
        axios
          .post('http://127.0.0.1:5000/veiculos', this.veiculo) // indicar os dados que vão ser enviados
          .then(response => {
            alert(`OK! Veiculo Cadastrado com Código ${response.data.id}`)
            this.listar()
            // this.veiculo = {}// limpa todos os nossos atributos

          });
      }
      this.listar()
      this.veiculo = {}// limpa todos os nossos atributos
    },

    editar(id) {
      axios
        .get('http://127.0.0.1:5000/veiculos/' + id)
        .then(response => (this.veiculo = response.data));
      this.$refs.marca.focus()// posicionar no campo
    }

  }
});