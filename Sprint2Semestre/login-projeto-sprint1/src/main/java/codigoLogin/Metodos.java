package codigoLogin;

import java.util.Scanner;

public class Metodos {

    String nomeUsuario;
    String senha;
    String grupoDeAtribuicao = "";
    Integer codigo;

    Scanner input = new Scanner(System.in);
    Scanner inputLine = new Scanner(System.in);

    String validacaoLogin() {

        System.out.println("Quer acessar sua página de usuário e acompanhar o monitoramento?");

        do {

            System.out.println("""
                Insira o grupo de atribuição ao qual pertence:
                1 - Convidado
                2 - Gestor
                3 - Estagiário
                4 - Financeiro
                5 - Jurídico
                6 - RH
                """);

            codigo = input.nextInt();

            switch (codigo) {

                case 1:
                    grupoDeAtribuicao = "Convidado";
                    break;

                case 2:
                    grupoDeAtribuicao = "Gestor";
                    break;

                case 3:
                    grupoDeAtribuicao = "Estagiário";
                    break;

                case 4:
                    grupoDeAtribuicao = "Financeiro";
                    break;

                case 5:
                    grupoDeAtribuicao = "Juridico";
                    break;

                case 6:
                    grupoDeAtribuicao = "RH";
                    break;

                default:
                    System.out.println("Nenhum grupo foi atribuído, falha no acesso");
            }

        } while (codigo != 1 && codigo != 2 && codigo != 3 && codigo != 4 && codigo != 5 && codigo != 6);

        System.out.println(grupoDeAtribuicao);

        System.out.println("Insira aqui seu nome de usuário:");
        nomeUsuario = inputLine.nextLine();

        while (!(nomeUsuario.equals("fernanda.caramico@sptech.school"))) {
            System.out.println("Nome de usuário incorreto. Tente novamente \n");

            System.out.println("Insira aqui seu nome de usuário:");
            nomeUsuario = inputLine.nextLine();
        }

        System.out.println("Insira aqui sua senha:");
        senha = inputLine.nextLine();

        while (!(senha.equals("SPtechPI"))) {
            System.out.println("Senha incorreta. Tente novamente \n");

            System.out.println("Insira aqui sua senha:");
            senha = inputLine.nextLine();
        }
        System.out.println("Você será direcionado à sua página de usuário. Obrigada!");
        return senha;
    }
}
