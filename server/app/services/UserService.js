// save user in the database mongoose function 
export const saveUser = async (user) => {
    try {
        const newUser = new UserModel({
            username: user.username,
            cui: user.cui,
            firstname: user.firstname,
            lastname: user.lastname,
            courses: user.courses,
            labs: user.labs,
        });
        return await newUser.save();
    } catch (error) {
        throw new Error("Error interno del servidor");
    }
}
