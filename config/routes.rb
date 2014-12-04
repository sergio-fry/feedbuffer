Rails.application.routes.draw do
  root 'welcome#index'
  get 'app' => 'welcome#app'
end
