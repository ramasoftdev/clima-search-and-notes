Rails.application.routes.draw do
  devise_for :users, skip: %i[registrations sessions passwords]

  namespace :api do
    devise_scope :user do
      post 'signup', to: 'registrations#create'
      post 'login', to: 'sessions#create'
      delete 'logout', to: 'sessions#destroy'
      get 'login', to: 'sessions#create'
      # post 'search_notes', to: 'notes#index'
    end

    resources :notes
    resources :searches
    
    get 'get_places', to: 'searches#get_places'
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
