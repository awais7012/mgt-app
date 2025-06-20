const db = require('../../db');
const taskAccess = require('../middleware/TaskAccess')
exports.resolvers = {
    Mutation: {
        createTask: async (_, { input }) => {
            const {
                taskId,
                taskName,
                taskDes,
                assignedBy,
                assignedTo,
                assignedTeamID,
            } = input;

            if (!taskId || !taskName || !taskDes || !assignedBy || !assignedTo || !assignedTeamID) {
                return {
                    success: false,
                    message: "All required fields must be filled.",
                    assignedTeamID: null, // This must match your schema type if nullable
                };

            }
            let canAccess = await taskAccess(assignedBy)
            if (!canAccess) {

                return {
                    success: false,
                    message: "Only Admins or TeamLeads can create tasks.",
                    assignedTeamID: null,

                }
            }

            try {
                await db.promise().query(
                    'CALL createTask(?,?,?,?,?,?)',
                    [taskId, taskName, taskDes, assignedBy, assignedTo, assignedTeamID]
                );

                return {
                    success: true,
                    message: "Task created successfully.",
                    assignedTeamID
                };
            } catch (err) {
                console.error("DB Error:", err);

                return {
                    success: false,
                    message: "Failed to create task. Database error.",
                    assignedTeamID: null,
                };
            }
        }
    },
    Query: {
        getTaskAccessUser: async () => {
            try {
                const [rows] = await db.promise().query('CALL getTaskAccessUsers()');

                const result = rows[0].map(user => ({
                    userId: user.user_id,
                    user_role: user.user_role
                }));
                console.log(JSON.stringify(rows, null, 2));


                return result;

            } catch (err) {
                console.error("DB Error:", err);
                throw new Error("Failed to fetch users with access");
            }
        }
    }


};
