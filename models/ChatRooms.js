module.exports = (sequelize, Sequelize) => {
    const ChatRooms = sequelize.define(
        "ChatRooms",
        {
            RoomID: {
                type: Sequelize.INTEGER,
                field: "RoomID",
                primaryKey: true,
            },
            Member: {
                type: Sequelize.STRING,
                field: "Member",
                primaryKey: true,
            },
            RoomName: {
                type: Sequelize.STRING,
                field: "RoomName",
            },
        },
        {
            timestamps: false,
        }
    );
    return ChatRooms;
};
