let catalogo = [];
        let filmeEditando = null;


        // Função para cadastrar novo filme
        function cadastrarFilme() {
            const nome = document.getElementById('nome').value;
            const classificacao = document.getElementById('classificacao').value;
            const duracao = document.getElementById('duracao').value;
            const genero = document.getElementById('genero').value;
            const ano = document.getElementById('ano').value;
            const sinopse = document.getElementById('sinopse').value;
            const trailer = document.getElementById('trailer')

            if (nome && classificacao && duracao && genero && ano && sinopse && trailer) {
                const novoFilme = {
                    nome,
                    classificacao,
                    duracao,
                    genero,
                    ano,
                    sinopse,
                    trailer
                };


                catalogo.push(novoFilme);
                alert(`Filme "${nome}" cadastrado com sucesso!`);
                limparCampos();
                listarFilmes();
            } else {
                alert("Por favor, preencha todos os campos!");
            }
        }


        // Função para buscar filme por nome
        function buscarFilme() {
            const busca = document.getElementById('busca').value.toLowerCase();
            const filmeEncontrado = catalogo.find(filme => filme.nome.toLowerCase() === busca);


            const listaFilmes = document.getElementById('lista-filmes');
            listaFilmes.innerHTML = '';


            if (filmeEncontrado) {
                listaFilmes.innerHTML = formatarDetalhesFilme(filmeEncontrado);
            } else {
                listaFilmes.innerHTML = `<p>Filme "${busca}" não encontrado.</p>`;
            }
        }


        // Função para listar todos os filmes
        function listarFilmes() {
            const listaFilmes = document.getElementById('lista-filmes');
            listaFilmes.innerHTML = '';


            if (catalogo.length === 0) {
                listaFilmes.innerHTML = '<p>Nenhum filme cadastrado no catálogo.</p>';
            } else {
                catalogo.forEach((filme, index) => {
                    listaFilmes.innerHTML += formatarDetalhesFilme(filme, index);
                });
            }
        }


        // Função auxiliar para formatar os detalhes de um filme com botões de editar e excluir
        function formatarDetalhesFilme(filme, index) {
            return `
                <div class="filme-item">
                    <strong>Nome:</strong> ${filme.nome}
                    <strong>Classificação Indicativa:</strong> ${filme.classificacao}
                    <strong>Duração:</strong> ${filme.duracao} minutos
                    <strong>Gênero:</strong> ${filme.genero}
                    <strong>Ano de Lançamento:</strong> ${filme.ano}
                    <strong>Sinopse:</strong> ${filme.sinopse}
                    <strong>Trailer:</strong><iframe ${filme.trailer}></iframe>
                    <div class="actions">
                        <button onclick="editarFilme(${index})">Editar</button>
                        <button onclick="excluirFilme(${index})" style="background-color: #dc3545;">Excluir</button>
                    </div>
                </div>
            `;
        }


        // Função para limpar os campos do formulário
        function limparCampos() {
            document.getElementById('nome').value = '';
            document.getElementById('classificacao').value = '';
            document.getElementById('duracao').value = '';
            document.getElementById('genero').value = '';
            document.getElementById('ano').value = '';
            document.getElementById('sinopse').value = '';
            document.getElementById('btn-atualizar').style.display = 'none';
            filmeEditando = null;
        }


        // Função para editar um filme
        function editarFilme(index) {
            const filme = catalogo[index];
            document.getElementById('nome').value = filme.nome;
            document.getElementById('classificacao').value = filme.classificacao;
            document.getElementById('duracao').value = filme.duracao;
            document.getElementById('genero').value = filme.genero;
            document.getElementById('ano').value = filme.ano;
            document.getElementById('sinopse').value = filme.sinopse;


            filmeEditando = index;
            document.getElementById('btn-atualizar').style.display = 'inline';
        }


        // Função para atualizar um filme editado
        function atualizarFilme() {
            if (filmeEditando !== null) {
                catalogo[filmeEditando] = {
                    nome: document.getElementById('nome').value,
                    classificacao: document.getElementById('classificacao').value,
                    duracao: document.getElementById('duracao').value,
                    genero: document.getElementById('genero').value,
                    ano: document.getElementById('ano').value,
                    sinopse: document.getElementById('sinopse').value
                };


                alert("Filme atualizado com sucesso!");
                limparCampos();
                listarFilmes();
            }
        }


        // Função para excluir um filme
        function excluirFilme(index) {
            catalogo.splice(index, 1);
            alert("Filme excluído com sucesso!");
            listarFilmes();
        }