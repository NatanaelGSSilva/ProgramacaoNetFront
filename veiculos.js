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
      },
      filtro:"",// declarar uma variavel 
      erros:[],
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
        this.filtro = '';
    },

    salvar() {// essa verificação tem que ser no metodo salvar pois ele tem que pegar tanto na inclusao como na alteração
      if(!this.verificaForm()){// se retornar um false
        return;
      }
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
    },

    excluir(id, modelo, preco) {
      if (confirm(`Confirma  exclusão do veiculo '${modelo}' com preço de  '${preco}'? `)) {
        axios
          .delete('http://127.0.0.1:5000/veiculos/' + id)
          .then((response) => {
            alert(`Ok! Veiculo '${modelo}' com preço '${preco}' excluido com  sucesso!`)
            this.listar();
          });

      }
    },
    pesquisar() {
      if(this.filtro.length == 0){
        this.listar();
      } else{
      axios
        // .get('http://127.0.0.1:5000/veiculos/pesq/')
        .get(`http://127.0.0.1:5000/veiculos/pesq/${this.filtro}`)
        .then(response => (this.veiculos = response.data));
        
      }
    },

    verificaForm() {
      // limpa vetor de erros
      this.erros = [];
      if (
        this.veiculo.marca &&
        this.veiculo.modelo &&
        this.veiculo.cor &&
        this.veiculo.ano &&
        this.veiculo.preco &&
        this.veiculo.preco >= 9999 &&
        this.veiculo.preco <= 200000
      ) {
        return true;
      }

      if (!this.veiculo.marca) {
        this.erros.push("A marca do Veículo é Obrigatoria.");
      }
      if (!this.veiculo.modelo) {
        this.erros.push("O modelo do Veículo é Obrigatorio.");
      }
      if (!this.veiculo.cor) {
        this.erros.push("A cor do Veículo é Obrigatorio.");
      }
      if (!this.veiculo.ano) {
        this.erros.push("O ano do Veículo é Obrigatorio.");
      }
      if (this.veiculo.preco < 10000 || this.veiculo.preco > 200000) {
        this.erros.push("Preço deve ser maior que 9999 e menor que 200.000");
      }
      return false;
    },
  

  },

  filters:{
    formataPreco(value){
      return value.toFixed(1)
    }
  }
});