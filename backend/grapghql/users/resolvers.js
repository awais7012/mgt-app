const db = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = 'romeo';

exports.resolvers = {
    Mutation: {
        createUser: async (_, { input }) => {
            const { userName, userRole, email, password } = input;
            try {

                const [[{ emailExists }]] = await db.promise().query(
                    "SELECT EXISTS(SELECT 1 FROM users WHERE email = ?) AS emailExists",
                    [email]
                );
                if (emailExists) {
                    return { success: false, message: "Email already exists", token: null };
                }


                const hash = await bcrypt.hash(password, 10);


                const [result] = await db.promise().query(
                    "CALL createUser(?,?,?,?)",
                    [userName, userRole, email, hash]
                );
                const userId = result.insertId || result[0]?.insertId;


                const token = jwt.sign(
                    { user_id: userId, user_role: userRole, email },
                    SECRET,
                    { expiresIn: '1h' }
                );

                return {
                    success: true,
                    message: "User created successfully",
                    token,
                };
            } catch (err) {
                console.error(err);
                return { success: false, message: "Failed to create user", token: null };
            }
        },
        loginUser: async (_, { input }) => {

            const { email, password } = input;



            try {

                const [[user]] = await db.promise().query(
                    "SELECT * FROM users WHERE email = ?",
                    [email]
                );

                if (!user) {
                    return { success: false, message: "User not found", token: null };
                }

                // 2. Compare password
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return { success: false, message: "Invalid password", token: null };
                }

                // 3. Generate token
                const token = jwt.sign(
                    {
                        user_id: user.user_id,
                        user_role: user.user_role,
                        email: user.email
                    },
                    SECRET,
                    { expiresIn: '1h' }
                );

                return {
                    success: true,
                    message: "Login successful",
                    token,
                    user_role: user.user_role,
                    email: user.email,
                };

            } catch (err) {
                console.error("Login error:", err);
                return {
                    success: false,
                    message: "Internal server error",
                    token: null
                };
            }
        }

    }
};
