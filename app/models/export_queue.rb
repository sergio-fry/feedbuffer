require 'digest/sha1'
class ExportQueue < ActiveRecord::Base
  serialize :items_attributes, Array

  def add_item(attributes)
    attrs = attributes.stringify_keys.extract!("title", "url").merge("id" => SecureRandom.uuid).to_hash
    self.items_attributes << attrs

    build_item(attrs)
  end

  def delete_item(item_id)
    self.items_attributes.reject! { |el| el["id"] == item_id }
  end

  def items
    items_attributes.map do |attrs|
      OpenStruct.new attrs 
    end
  end

  def build_item(attributes)
    OpenStruct.new attributes 
  end
end
