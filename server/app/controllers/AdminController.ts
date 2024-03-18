import UserModel from "../models/UserModel";

// Get all users
export const getUsers = async (req : any, res : any) => {
    try {
        const users = await UserModel.find();
        return res.status(200).json(users);
    } catch (error : any) {
        return res.status(500).json({ message: error.message });
    }
};

// Get user by cui
export const getUserByCui = async (req : any, res : any) => {
    try {
        const user = await UserModel.findOne({ cui: req.params.cui });
        return res.status(200).json(user);
    }
    catch (error : any) {
        return res.status(500).json({ message: error.message });
    }
}

