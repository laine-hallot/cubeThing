json.extract! user, :id, :name, :time, :created_at, :updated_at
json.url user_url(user, format: :json)
