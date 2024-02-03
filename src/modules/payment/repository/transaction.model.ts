import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "transacations",
    timestamps: false,
})
export default class TransactionModel extends Model {

    @PrimaryKey
    @Column({allowNull: false, field: "order_id"})
    declare id: string;

    @Column({allowNull: false})
    declare orderId: string;

    @Column({allowNull: false})
    declare amount: number;

    @Column({allowNull: false})
    declare status: string;

    @Column({allowNull: true, field: "created_at"})
    declare createdAt: Date;

    @Column({allowNull: true, field: "updated_at"})
    declare updatedAt: Date;
}