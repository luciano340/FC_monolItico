import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

@Table({
  tableName: "invoice_items",
  timestamps: false,
})
export class InvoiceItemsModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  declare invoiceID: string;

  @BelongsTo(() => InvoiceModel, { onDelete: "no action", foreignKey: "invoiceID"})
  declare invoice: Awaited<InvoiceModel>

  @Column({ allowNull: false })
  declare createdAt: Date;

  @Column({ allowNull: false })
  declare updatedAt: Date;
}
