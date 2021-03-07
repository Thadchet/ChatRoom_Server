module.exports = (sequelize, Sequelize) => {
    const Friends = sequelize.define(
        "Friends",
        {
            ID: {
                type: Sequelize.INTEGER,
                field: "ID",
                primaryKey: true,
            },
            FriendID: {
                type: Sequelize.INTEGER,
                field: "FriendID",
                primaryKey: true,
            },
        },
        {
            timestamps: false,
        }
    );
    return Friends;
};
