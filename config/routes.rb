Rails.application.routes.draw do
  root 'home#index'
  resources :locations, only: [:index, :show, :create]
  resources :places, only: [:index, :show, :create]
end
