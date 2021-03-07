module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define(
        "Users",
        {
            ID: {
                type: Sequelize.INTEGER,
                // field: "ID",
                primaryKey: true,
            },
            Username: {
                type: Sequelize.STRING,
                // field: "Username",
            },
            Password: {
                type: Sequelize.STRING,
                // field: "Password",
            },
            Profile: {
                type: Sequelize.STRING,
                // field: "Profile",
            },
            Status: {
                type: Sequelize.STRING,
                // field: "Status",
            },
        },
        {
            timestamps: false,
        }
    );
    return Users;
};
