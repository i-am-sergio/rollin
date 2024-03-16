import { saveUser } from "../services/UserService";
import { Request, Response } from "express";

export const userMatriculate = async (req : Request, res : Response) => {
  try {
    const user = req.body;
    // validate request
    if (!req.body) {
      console.log("Content can not be empty!");
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // save user with user service
    const data = await saveUser(user);
    res.send(data);
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
};
