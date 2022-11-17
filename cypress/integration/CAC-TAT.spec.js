/// <reference types="Cypress" >

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
   
   
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, testeteste, teste, teste, teste, teste, teste, teste, teste, teste,teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type('Walmyr')
        cy.get('#lastName').type('Filho')
        cy.get('#email').type('walmyr@exemple.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })


    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Walmyr')
        cy.get('#lastName').type('Filho')
        cy.get('#email').type('walmyr@exemple,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('campo telefone continua vazio quando preenchido com valor não-numerico', function() {
        cy.get('#phone')
          .type('abcdfghij')
          .should('have.value', '')  

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatorio mas não é preenchido', function() {
        cy.get('#firstName').type('Walmyr')
        cy.get('#lastName').type('Filho')
        cy.get('#email').type('walmyr@exemple.com')
        cy.get('#check > [for="phone"]').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('Preeche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
          .type('Walmyr')
          .should('have.value', 'Walmyr')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Filho')
          .should('have.value', 'Filho')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('walmyr@exemple.com')
          .should('have.value', 'walmyr@exemple.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('1234567890')
          .should('have.value', '1234567890')
          .clear()
          .should('have.value', '')
    })

    
    it('exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatorios', function() {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formulario com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu indice', function() {
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it.only('marca o tipo de atendimento "Feedback"', function() {
      cy.get('input[type="radio"][value=feedback]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    })
  })