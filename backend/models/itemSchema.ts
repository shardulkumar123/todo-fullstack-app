import {
    Table, Column, Model, DataType, ForeignKey, BelongsTo, AllowNull, PrimaryKey, AutoIncrement
} from "sequelize-typescript";
import User from "./userSchema";

@Table({ tableName: "items", timestamps: false })
class Item extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare user_id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare title: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare description: string;

    @AllowNull(false)
    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    declare created_at: Date;

    @BelongsTo(() => User)
    user!: User;
}

export default Item;