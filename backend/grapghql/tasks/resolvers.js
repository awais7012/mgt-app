const db = require('../../db');

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
                return rows[0];
            } catch (err) {
                console.error(`Error in getTaskAccessUser: ${err}`);
                throw new Error("Failed to fetch users with task access.");
            }
        }
    }

};
