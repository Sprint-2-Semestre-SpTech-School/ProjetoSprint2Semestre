package codigoLogin;

import java.util.Scanner;

public class Metodos {

    String nomeUsuario;
    String senha;

    Scanner inputLine = new Scanner(System.in);

    void validacaoLogin() {

        System.out.println("Quer acessar sua página de usuário e acompanhar o monitoramento?");

        System.out.println("Insira aqui seu nome de usuário:");
        nomeUsuario = inputLine.nextLine();

        while (!(nomeUsuario.equals("fernanda.caramico"))) {
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
    }
}
