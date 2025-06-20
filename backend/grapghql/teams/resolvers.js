const db = require('../../db');

exports.resolvers = {
    Mutation: {
        createTeam: async (_, { input }) => {
            const { teamName, teamLead } = input; // ✅ match GraphQL input

            if (!teamName || !teamLead) {
                throw new Error('Error fill all the inputs');
            }

            try {
                const [result] = await db
                    .promise()
                    .query('CALL createTeam(?, ?)', [teamName, teamLead]);
                const assignedTeamID = result?.[0]?.id || null;
                return {
                    success: true,
                    message: 'Team created successfully',
                    assignedTeamID,
                };
            } catch (err) {
                console.log(`Error: ${err}`);
                return {
                    success: false,
                    message: 'Database error',
                };
            }
        }
    }
};
