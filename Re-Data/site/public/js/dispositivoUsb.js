// Modal para sair
function sair() {
    const modalSairDentro = document.getElementById('modalSair')
    modalSairDentro.classList.add('abrir')

    modalSairDentro.addEventListener('click', (e) => {
        if (e.target.id == 'fecharModal' || e.target.id == 'modalSair') {
            modalSairDentro.classList.remove('abrir')
        }
    })
}

function sairConta() {
    setTimeout(() => {
        window.location = "login.html";
    }, "1000");
}

// Formulario
document.addEventListener('DOMContentLoaded', function () {
    // Esconde o formulário quando a página carregar
    document.getElementById('formularioAdicionar').classList.add('hidden');

    // Exibe o formulário quando o botão "Novo" for clicado
    document.querySelector('.buttonTools').addEventListener('click', function () {
        document.getElementById('formularioAdicionar').classList.remove('hidden');
    });

    // Esconde o formulário quando o botão "Salvar" for clicado
    document.getElementById('saveButton').addEventListener('click', function (event) {
        event.preventDefault(); // Impede o envio do formulário para demonstração
        document.getElementById('formularioAdicionar').classList.add('hidden');
    });

    // Exibe o formulário quando o botão de editar for clicado
    document.querySelectorAll('.edit').forEach(function (button) {
        button.addEventListener('click', function () {
            document.getElementById('formularioEditar').classList.remove('hidden');
            // Aqui você pode adicionar o código para preencher o formulário com os dados do usuário a ser editado
        });
    });

    // Esconde o formulário quando o botão "Salvar" for clicado
    document.getElementById('saveButton').addEventListener('click', function (event) {
        event.preventDefault(); // Impede o envio do formulário para demonstração
        document.getElementById('formularioEditar').classList.add('hidden');
    });
});
