Rails.application.routes.draw do
  resources :pokemon_battles
  resources :battles
  resources :pokemons
  resources :trainer_profiles
  namespace :api do
    namespace :v1 do
      resources :trainers
      resources :pokemon_battles
      resources :battles do
        collection do
          get 'with_pokemons', to: 'battles#index_with_pokemons'
        end
      end
      resources :pokemons do
        collection do
          get 'by_trainer', to: 'pokemons#index_by_trainer'
        end
      end
      resources :trainer_profiles do
        collection do
          get 'by_trainer', to: 'trainer_profiles#show_by_trainer'
        end
      end
      get 'trainer', to: 'trainers#me'
      post 'auth/login', to: 'authentication#login'
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
