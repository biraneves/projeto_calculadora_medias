const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./assets/images/aprovado.png" alt="Emoji celebrando">';
const imgReprovado = '<img src="./assets/images/reprovado.png" alt="Emoji decepcionado">';
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const mediaAprovacao = parseFloat(prompt('Informe a média mínima para aprovação:'));
const atividades = [];
const notas = [];

let linhas = '';

form.addEventListener('submit', (e) => {
  e.preventDefault();

  adicionaLinha();
  atualizaTabela();
  atualizaMediaFinal();
});

function adicionaLinha() {
  const inputNomeAtividade = document.getElementById('nome-atividade');
  const inputNotaAtividade = document.getElementById('nota-atividade');

  if (verificaAtividade(inputNomeAtividade.value)) {
    alert(`A atividade ${inputNomeAtividade.value} já foi inserida.`);
  } else {
    atividades.push(inputNomeAtividade.value);
    notas.push(parseFloat(inputNotaAtividade.value));

    let linha = '<tr>';
    linha += `<td>${inputNomeAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value >= mediaAprovacao ? imgAprovado : imgReprovado}</td>`;
    linha += '<tr>';

    linhas += linha;
  }

  inputNomeAtividade.value = '';
  inputNotaAtividade.value = '';
  inputNomeAtividade.focus();
}

function verificaAtividade(nomeAtividade) {
  return atividades.includes(nomeAtividade);
}

function atualizaTabela() {
  const corpoDaTabela = document.querySelector('tbody');
  corpoDaTabela.innerHTML = linhas;
}

function calculaMediaFinal() {
  if (atividades.length > 0) {
    return notas.reduce((acc, item) => acc + item, 0) / atividades.length;
  }

  return 0;
}

function atualizaMediaFinal() {
  const mediaFinal = calculaMediaFinal();
  
  document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(1).replace('.', ',');
  document.getElementById('media-final-resultado').innerHTML = mediaFinal >= mediaAprovacao ? spanAprovado : spanReprovado; 
}
