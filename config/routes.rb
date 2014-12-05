Rails.application.routes.draw do
  root 'welcome#index'
  get 'app' => 'welcome#app'

  mount Api::Api => '/api/v1'
  get 'api' => 'documentation#api'
end
