import bodyParser from "body-parser";
import { Application, Request, Response } from "express";

export const CrmRouter = (app: Application) => {
  var jsonParser = bodyParser.json();
  // Create a new contact
  // app.route("/contact").post(this.contactController.addNewContact);
  // Get all contacts
  // app.route("/contact").get(this.contactController.getContacts);
  // get a specific contact
  // app.route("/contact/:contactId");
  // update a specific contact
  // app.route("/contact/:contactId").put(this.contactController.updateContact);
  // delete a specific contact
  // app.route("/contact/:contactId").delete(this.contactController.deleteContact);

  //     app.route('/contact/:contactId')
  //    // edit specific contact
  //    .get(this.contactController.getContactWithID)
  //    .put(this.contactController.updateContact)
  //    .delete(this.contactController.deleteContact)

  app
    .route("/contact")
    // GET endpoint
    .get((req: Request, res: Response) => {
      // Get all contacts
      res.status(200).send({
        message: "GET contact request successfulll!!!!",
      });
    })
    // POST endpoint
    .post((req: Request, res: Response) => {
      // Create new contact
    });

  // Contact detail
  app
    .route("/contact/:contactId")
    // get specific contact
    .get((req: Request, res: Response) => {
      // Get a single contact detail
      res.status(200).send({
        message: "GET request successfulll!!!!",
      });
    })
    .put((req: Request, res: Response) => {
      // Update a contact
      res.status(200).send({
        message: "PUT request successfulll!!!!",
      });
    })
    .delete((req: Request, res: Response) => {
      // Delete a contact
      res.status(200).send({
        message: "DELETE request successfulll!!!!",
      });
    });
};
