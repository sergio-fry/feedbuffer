class CreateExportQueues < ActiveRecord::Migration
  def change
    create_table :export_queues do |t|
      t.text :items_attributes, :null => false, :deafult => [].to_yaml
      t.datetime :next_scheduled_at

      t.timestamps
    end
  end
end
