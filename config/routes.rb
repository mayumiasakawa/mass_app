Rails.application.routes.draw do
  devise_for :users
  get 'tasks/index'
  root to: "tasks#index"
end
