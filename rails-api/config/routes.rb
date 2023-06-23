Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # scope '/api' do
  resources :soldiers
  resources :missions
  resources :missions_soldiers

  get '/self', to: 'users#show'

  post 'login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'
  # end
end
