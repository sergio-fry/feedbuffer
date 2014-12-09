class CreateExportHistories < ActiveRecord::Migration
  def change
    create_table :export_histories do |t|
      t.text :items_attributes, :null => false, :deafult => [].to_yaml

      t.timestamps
    end
  end
end
