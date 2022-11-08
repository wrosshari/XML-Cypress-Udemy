/// <reference types="cypress"/>

describe("Network Requests", () =>{
    beforeEach(() =>{
        cy.visit("https://example.cypress.io/commands/network-requests");
    })

    it("Get Request", () =>{
        cy.intercept({
            method: "GET",
            url: "**/comments/*"
        }).as("getComment");

        cy.get(".network-btn").click(); //find and click button

        cy.wait("@getComment").its("response.statusCode").should("eq", 200); //check status code response from API
    })

    it.only("Get Request Mocking Response", () =>{
        cy.intercept({
            method: "GET",
            url: "**/comments/*", },{
                body:{
                    postId : 1,
                    id: 1,
                    name: "Jee",
                    email: "123@gmail.com",
                    body: "hello world"
                }
        }).as("getComment");

        cy.get(".network-btn").click(); //find and click button

        cy.wait("@getComment").its("response.statusCode").should("eq", 200); //check status code response from API
    })
})