/// <reference types="cypress"/>

describe("Network Requests", () =>{
    let message = "Unable to find comment!"
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

    it("Get Request Mocking Response", () =>{
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

    it("Post Request", () =>{
        cy.intercept({
            method: "POST",
            url: "**/comments"
        }).as("postComment"); //intercept API

        cy.get(".network-post").click(); //find and click button

        cy.wait("@postComment").should(({request, response}) => {
            //console.log(request);
            //console.log(response);
            expect(response.statusCode).to.eq(201);
            expect(response.body).to.have.property("name", "Using POST in cy.intercept()");
            expect(request.body).to.include("email");
            expect(request.headers).to.have.property("content-type");
        })
    })

    it.only("Put request", () =>{
            cy.intercept({
                method: "PUT",
                url: "**/comments/*"
            },
            {
                statusCode : 404,
                body: { error: message},
                delay: 500
            }).as("putComment");

        cy.get(".network-put").click();

        cy.wait("@putComment");

        //assertion message
        cy.get(".network-put-comment").should("contain", message)
    })
});