module SerializedItems
  extend ActiveSupport::Concern

  included do
    serialize :items_attributes, Array

    def add_item(attributes)
      attrs = ({ "id" => SecureRandom.uuid }).merge(attributes.stringify_keys.extract!("id", "title", "url", "scheduled_at", "published_at")).to_hash
      self.items_attributes << attrs

      build_item(attrs)
    end

    def unshift_item(attributes)
      attrs = ({ "id" => SecureRandom.uuid }).merge(attributes.stringify_keys.extract!("id", "title", "url", "scheduled_at", "published_at")).to_hash
      self.items_attributes.unshift attrs

      build_item(attrs)
    end

    def delete_item(item_id)
      self.items_attributes.reject! { |el| el["id"] == item_id }
    end

    def find_item(item_id)
      build_item self.items_attributes.find { |el| el["id"] == item_id } rescue nil
    end

    def update_item(item_id, attrs)
      self.items_attributes = items_attributes.map do |el|
        if el["id"] == item_id
          el.merge(attrs)
        else
          el
        end
      end
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
end
