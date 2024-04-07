// objeto javascript
//array
let participantes = [
    {
      nome: "Mayk Brito",
      email: "mayk@gmail.com",
      dataInscricao: new Date(2024, 2, 22, 19, 20),
      dataCheckIn: new Date(2024, 2, 25, 22, 00)
    },
    {
      nome: "Diego Fernandes",
      email: "diego@gmail.com",
      dataInscricao: new Date(2024, 2, 1, 19, 23),
      dataCheckIn: new Date(2024, 2, 1, 20, 20)
    },
    {
      nome: "Ana Souza",
      email: "ana@gmail.com",
      dataInscricao: new Date(2024, 2, 10, 15, 45),
      dataCheckIn: new Date(2024, 2, 11, 10, 30)
    },
    {
      nome: "Pedro Silva",
      email: "pedro@gmail.com",
      dataInscricao: new Date(2024, 2, 5, 8, 10),
      dataCheckIn: new Date(2024, 2, 7, 14, 15)
    },
    {
      nome: "Camila Oliveira",
      email: "camila@gmail.com",
      dataInscricao: new Date(2024, 2, 14, 17, 30),
      dataCheckIn: new Date(2024, 2, 16, 9, 45)
    },
    {
      nome: "Rafael Santos",
      email: "rafael@gmail.com",
      dataInscricao: new Date(2024, 2, 3, 10, 20),
      dataCheckIn: new Date(2024, 2, 5, 12, 00)
    },
    {
      nome: "Juliana Lima",
      email: "juliana@gmail.com",
      dataInscricao: new Date(2024, 2, 8, 14, 15),
      dataCheckIn: new Date(2024, 2, 10, 18, 30)
    },
    {
      nome: "Lucas Martins",
      email: "lucas@gmail.com",
      dataInscricao: new Date(2024, 2, 18, 11, 40),
      dataCheckIn: new Date(2024, 2, 20, 13, 45)
    },
    {
      nome: "Carolina Costa",
      email: "carolina@gmail.com",
      dataInscricao: new Date(2024, 2, 12, 16, 55),
      dataCheckIn: new Date(2024, 2, 15, 10, 20)
    },
    {
      nome: "Thiago Oliveira",
      email: "thiago@gmail.com",
      dataInscricao: new Date(2024, 2, 20, 9, 30),
      dataCheckIn: new Date(2024, 2, 22, 15, 40)
    }
  ];
  
  const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)
  
    //condicional
    if(participante.dataCheckIn == null) {
      dataCheckIn = `
        <button
          data-email="${participante.email}"
          onclick="fazerCheckIn(event)">
          Confirmar Check-in
        </button>
      `
  
    }
  
  // pegar informação do html
      return `
      <tr>
        <td>
          <strong> ${participante.nome} </strong>
          <br> <small> ${participante.email} </small>
        </td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
      </tr>
      `
    }
  
  const atualizarlista = (participantes) => {
     let output = ""
     // estrutura de repetição - Loop
      for (let participante of participantes){
        //faça alguma coisa
        output = output + criarNovoParticipante(participante)
      }
  
     // substituir informação do html
    document.querySelector('tbody').innerHTML = output
  
  }
  
  atualizarlista(participantes)
  
  const adicionarParticipante = (event) => {
    event.preventDefault()
  
    const dadosDoFormulario = new FormData(event.target)
    
    const participante = {
      nome: dadosDoFormulario.get('nome'),
      email: dadosDoFormulario.get('email'),
      dataInscricao: new Date(),
      dataCheckIn: null
    }
  
    // verificar se o participante já existe
    const participanteExiste = participantes.find(
      (p) => {
        return p.email == participante.email
      }
    )
  
    if(participanteExiste) {
      alert('E-mail já cadastrado')
      return
    }
  
    participantes = [participante, ...participantes]  
    atualizarlista(participantes)
  
    // Limpar o formulário
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""  
  }
  
  const fazerCheckIn = (event) => {
    // confirmar se realmente quer o check-in
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
      if (confirm(mensagemConfirmacao) == false){
        return 
      }
    //encontrar o participante dentro da lista
    const participante = participantes.find((p) => {
      return p.email == event.target.dataset.email
    })
  
  
    // atualizar o check-in do participante
    participante.dataCheckIn = new Date()
    //atualizar a lista de participantes
    atualizarlista(participantes)  
  }
  
  