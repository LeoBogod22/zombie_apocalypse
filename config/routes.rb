Rails.application.routes.draw do
  root 'home#index'
  resources :locations, only: [:index, :show, :create]
  get '/locations/:id/survival', to: 'locations#survival'

  resources :places, only: [:index, :show, :create]
end
