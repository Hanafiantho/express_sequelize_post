import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CommentAttributes {
    id: number;
    comment: string;
    userId: number;
    postId: number;
    // isPin: boolean;
    // totalLikes: number;
    isDeleted?: boolean;
    createdAt?: Date;
    udaptedAt?: Date;
}

type CommentCreationAttributes = Optional<CommentAttributes, 'id'>;

class Comment
    extends Model<CommentAttributes, CommentCreationAttributes>
    implements CommentAttributes
{
    public id!: number;
    public comment!: string;
    public postId!: number;
    public userId!: number;
    // public isPin!: boolean;
    // public totalLikes?: number;
    public isDeleted!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CACADE',
            onUpdate: 'CASCADE',
        },
        postId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'posts',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        tableName: 'comments',
    },
);

export default Comment;
