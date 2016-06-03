Rails.application.routes.draw do
  root 'home#index'
  resources :locations, only: [:index, :show, :create]
  get '/locations/:id/survival', to: 'locations#survival'
  get '/places/:location_id/:resource_id', to: 'places#resource'

  resources :places, only: [:index, :show, :create]
end
