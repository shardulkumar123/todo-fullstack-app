import {
  Table, Column, Model, DataType, Unique, AllowNull, PrimaryKey, AutoIncrement
} from "sequelize-typescript";

@Table({ tableName: "users", timestamps: true })
class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  declare email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare password: string;
}

export default User;
