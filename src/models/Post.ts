import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface PostAttributes {
    id: number;
    title: string;
    content: string;
    authorId: number;
    isArchived: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

type PostCreationAttributes = Optional<PostAttributes, 'id'>;

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
    public id!: number;
    public title!: string;
    public content!: string;
    public authorId!: number;
    public isArchived!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        authorId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        isArchived: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        tableName: 'posts',
    },
);

export default Post;
