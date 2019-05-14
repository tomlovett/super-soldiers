Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :soldiers
  resources :missions

  post 'missions/:id/soldiers/:soldier_id', to: 'missions#add_soldier'
  delete 'missions/:id/soldiers/:soldier_id', to: 'missions#remove_soldier'

  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'
end
