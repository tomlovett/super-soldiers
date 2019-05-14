Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :soldiers
  resources :missions do
    resources :soldiers
  end
end
